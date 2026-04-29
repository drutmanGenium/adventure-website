// ─── Avatar validation & sanitization helpers ────────────────────────────────
//
// These helpers exist to mitigate XSS risk from user-supplied avatar URLs.
//
// Threat model: the avatar pipeline accepts a base64 data URL from the client,
// stores it in `user.avatarUrl`, and later renders it inside an <img src=…>.
// If a URL like `data:text/html,<script>…</script>` slips through, the browser
// will interpret it as HTML in some contexts (e.g. if loaded via a different
// element, copy-pasted, or rendered without sanitization).
//
// LIMITATION: full mitigation requires the *server* to (1) re-validate the
// uploaded bytes, (2) store images on disk/blob storage, and (3) serve them
// from a separate, sandboxed domain (or at least via a content-disposition
// attachment header) so that any HTML/script that bypasses validation cannot
// run with the application's origin. The backend lives outside this repo, so
// we apply defense-in-depth on the client: strict MIME allowlist, magic-byte
// verification, structural decode via the browser's Image() pipeline, and a
// safe-URL guard at every render site.

// Allowlist of acceptable image MIME types. Anything else (text/*, etc.) is
// rejected to prevent data-URL XSS.
export const ALLOWED_AVATAR_MIME_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
] as const

export type AllowedAvatarMime = (typeof ALLOWED_AVATAR_MIME_TYPES)[number]

// Magic-byte signatures for each allowed format. We validate the file's
// actual bytes rather than trusting the client-supplied MIME type.
const MAGIC_BYTE_SIGNATURES: Array<{
  mime: AllowedAvatarMime
  test: (bytes: Uint8Array) => boolean
}> = [
  {
    mime: "image/jpeg",
    test: (b) => b.length >= 3 && b[0] === 0xff && b[1] === 0xd8 && b[2] === 0xff,
  },
  {
    mime: "image/png",
    test: (b) =>
      b.length >= 8 &&
      b[0] === 0x89 &&
      b[1] === 0x50 &&
      b[2] === 0x4e &&
      b[3] === 0x47 &&
      b[4] === 0x0d &&
      b[5] === 0x0a &&
      b[6] === 0x1a &&
      b[7] === 0x0a,
  },
  {
    mime: "image/gif",
    test: (b) =>
      b.length >= 6 &&
      b[0] === 0x47 &&
      b[1] === 0x49 &&
      b[2] === 0x46 &&
      b[3] === 0x38 &&
      (b[4] === 0x37 || b[4] === 0x39) &&
      b[5] === 0x61,
  },
  {
    mime: "image/webp",
    test: (b) =>
      b.length >= 12 &&
      // "RIFF"
      b[0] === 0x52 &&
      b[1] === 0x49 &&
      b[2] === 0x46 &&
      b[3] === 0x46 &&
      // "WEBP"
      b[8] === 0x57 &&
      b[9] === 0x45 &&
      b[10] === 0x42 &&
      b[11] === 0x50,
  },
]

function detectImageMime(bytes: Uint8Array): AllowedAvatarMime | null {
  for (const sig of MAGIC_BYTE_SIGNATURES) {
    if (sig.test(bytes)) return sig.mime
  }
  return null
}

/**
 * Validates that a data URL is a safe avatar image:
 *   - has the form `data:<allowed-image-mime>;base64,<payload>`
 *   - decodes successfully
 *   - the decoded bytes match the magic-byte signature for the declared MIME
 *
 * Returns a normalized data URL (with the verified MIME) on success, or
 * throws an Error with a generic message on failure. Callers should treat
 * the returned string as safe to send to the server, and should still
 * re-validate via `isSafeAvatarUrl` before rendering anything that came
 * back from the server.
 */
export async function validateAvatarDataUrl(dataUrl: string): Promise<string> {
  // Step 1: structural check on the data URL prefix.
  const match = /^data:([^;,]+);base64,([A-Za-z0-9+/=]+)$/.exec(dataUrl)
  if (!match) {
    throw new Error("Invalid avatar data URL")
  }

  const declaredMime = match[1].toLowerCase()
  const base64Payload = match[2]

  if (!ALLOWED_AVATAR_MIME_TYPES.includes(declaredMime as AllowedAvatarMime)) {
    throw new Error("Unsupported avatar MIME type")
  }

  // Step 2: decode the base64 payload and check magic bytes.
  let bytes: Uint8Array
  try {
    const binary = atob(base64Payload)
    bytes = new Uint8Array(binary.length)
    for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i)
  } catch {
    throw new Error("Invalid avatar payload")
  }

  const detectedMime = detectImageMime(bytes)
  if (!detectedMime || detectedMime !== declaredMime) {
    throw new Error("Avatar bytes do not match declared image type")
  }

  // Step 3: structural decode via the browser's image pipeline. This catches
  // truncated / corrupt images and confirms the bytes really do parse as the
  // claimed image format.
  await new Promise<void>((resolve, reject) => {
    const img = new Image()
    img.onload = () => resolve()
    img.onerror = () => reject(new Error("Avatar image failed to decode"))
    // Reconstruct the data URL with the *verified* MIME so we don't echo
    // back any client-supplied parameters.
    img.src = `data:${detectedMime};base64,${base64Payload}`
  })

  return `data:${detectedMime};base64,${base64Payload}`
}

/**
 * Returns true if `url` is safe to render as an avatar image src.
 *
 * Accepts:
 *   - data: URLs whose MIME is in `ALLOWED_AVATAR_MIME_TYPES`
 *   - http(s):// URLs (which the browser cannot evaluate as script)
 *
 * Rejects everything else (javascript:, vbscript:, file:, data:text/html, …).
 */
export function isSafeAvatarUrl(url: unknown): url is string {
  if (typeof url !== "string" || url.length === 0) return false

  // Data URL: must declare an allowlisted image MIME, base64-encoded.
  if (url.startsWith("data:")) {
    const m = /^data:([^;,]+);base64,[A-Za-z0-9+/=]+$/.exec(url)
    if (!m) return false
    return ALLOWED_AVATAR_MIME_TYPES.includes(
      m[1].toLowerCase() as AllowedAvatarMime,
    )
  }

  // Network URL: only http(s).
  try {
    const parsed = new URL(url)
    return parsed.protocol === "http:" || parsed.protocol === "https:"
  } catch {
    return false
  }
}

/**
 * Returns the URL if it passes `isSafeAvatarUrl`, otherwise null. Use this
 * at every render site so a malicious value that bypassed upload validation
 * (e.g. injected directly into the database) still cannot reach an
 * <img src=…> attribute.
 */
export function safeAvatarSrc(url: unknown): string | null {
  return isSafeAvatarUrl(url) ? url : null
}

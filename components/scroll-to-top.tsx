"use client"

import { useEffect } from "react"
import { usePathname } from "next/navigation"

export function ScrollToTop() {
  const pathname = usePathname()

  useEffect(() => {
    // Disable browser scroll restoration so it doesn't override us
    if ("scrollRestoration" in history) {
      history.scrollRestoration = "manual"
    }
  }, [])

  useEffect(() => {
    // On every pathname change check for a hash anchor
    const hash = window.location.hash

    if (hash) {
      // Give the DOM a tick to render the target element
      const id = hash.slice(1)
      setTimeout(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })
      }, 50)
    } else {
      window.scrollTo({ top: 0, left: 0, behavior: "instant" })
    }
  }, [pathname])

  return null
}

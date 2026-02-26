"use client"

import { useSearchParams } from "next/navigation"
import { useMemo, useState, useRef, useCallback } from "react"
import { ACTIVITIES } from "@/components/actividades-view"
import { Button } from "@/components/ui/button"
import { Calendar, ChevronLeft, Users } from "lucide-react"
import Link from "next/link"

// ─── Helpers ─────────────────────────────────────────────────────────────────

function isoToDisplayDate(iso: string) {
  const [y, m, d] = iso.split("-").map(Number)
  return new Date(y, m - 1, d).toLocaleDateString("es-AR", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  })
}

function isoToShortDate(iso: string) {
  const [y, m, d] = iso.split("-").map(Number)
  return new Date(y, m - 1, d).toLocaleDateString("es-AR", {
    day: "numeric",
    month: "short",
    year: "numeric",
  })
}

function isValidEmail(v: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)
}

function isValidPhone(v: string) {
  return v.replace(/\D/g, "").length >= 7
}

// ─── Types ────────────────────────────────────────────────────────────────────

interface BookingForm {
  firstName: string
  lastName: string
  email: string
  phone: string
  pickupAddress: string
  city: string
  references: string
  isHotel: boolean
  hotelName: string
  guests: number
}

interface FormErrors {
  firstName?: string
  lastName?: string
  email?: string
  phone?: string
  pickupAddress?: string
  city?: string
  hotelName?: string
}

// ─── Input component ─────────────────────────────────────────────────────────

function Field({
  label,
  id,
  error,
  children,
}: {
  label: string
  id: string
  error?: string
  children: React.ReactNode
}) {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-foreground mb-1.5">
        {label}
      </label>
      {children}
      {error && (
        <p className="mt-1.5 text-xs text-destructive">{error}</p>
      )}
    </div>
  )
}

const inputClass = (error?: string) =>
  `w-full border rounded-xl px-4 py-3 text-sm bg-background focus:outline-none focus:ring-2 transition-colors ${
    error
      ? "border-destructive focus:ring-destructive/20 focus:border-destructive"
      : "border-border focus:ring-primary/20 focus:border-primary"
  }`

// ─── Section card wrapper ─────────────────────────────────────────────────────

function SectionCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="bg-card border border-border rounded-2xl p-6 shadow-sm">
      <h2 className="text-lg font-semibold text-foreground mb-5">{title}</h2>
      {children}
    </section>
  )
}

// ─── Main component ───────────────────────────────────────────────────────────

export function ReservarView() {
  const searchParams = useSearchParams()
  const departureId = searchParams.get("departureId") ?? ""

  const { activity, date } = useMemo(() => {
    if (!departureId) return { activity: null, date: null }
    const maybeDatePart = departureId.slice(-10)
    const isIsoDate = /^\d{4}-\d{2}-\d{2}$/.test(maybeDatePart)
    if (!isIsoDate) return { activity: null, date: null }
    const activityId = departureId.slice(0, -11)
    const found = ACTIVITIES.find((a) => a.id === activityId) ?? null
    return { activity: found, date: maybeDatePart }
  }, [departureId])

  const [form, setForm] = useState<BookingForm>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    pickupAddress: "",
    city: "Ushuaia",
    references: "",
    isHotel: false,
    hotelName: "",
    guests: 1,
  })

  const [errors, setErrors] = useState<FormErrors>({})
  const [touched, setTouched] = useState<Partial<Record<keyof BookingForm, boolean>>>({})
  const [submitted, setSubmitted] = useState(false)

  // Refs for scroll-to-error
  const firstNameRef = useRef<HTMLInputElement>(null)
  const lastNameRef = useRef<HTMLInputElement>(null)
  const emailRef = useRef<HTMLInputElement>(null)
  const phoneRef = useRef<HTMLInputElement>(null)
  const addressRef = useRef<HTMLInputElement>(null)
  const cityRef = useRef<HTMLInputElement>(null)

  const set = (field: keyof BookingForm) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const value = e.target.type === "checkbox" ? (e.target as HTMLInputElement).checked : e.target.value
    setForm((prev) => ({ ...prev, [field]: value }))
    // Clear error on change if field was touched
    if (touched[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }))
    }
  }

  const blur = (field: keyof BookingForm) => () => {
    setTouched((prev) => ({ ...prev, [field]: true }))
    setErrors((prev) => ({ ...prev, ...validateField(field, form) }))
  }

  const validateField = useCallback((field: keyof BookingForm, values: BookingForm): FormErrors => {
    const errs: FormErrors = {}
    switch (field) {
      case "firstName":
        if (!values.firstName.trim()) errs.firstName = "El nombre es obligatorio."
        break
      case "lastName":
        if (!values.lastName.trim()) errs.lastName = "El apellido es obligatorio."
        break
      case "email":
        if (!values.email.trim()) errs.email = "El email es obligatorio."
        else if (!isValidEmail(values.email)) errs.email = "Ingresá un email válido."
        break
      case "phone":
        if (!values.phone.trim()) errs.phone = "El teléfono es obligatorio."
        else if (!isValidPhone(values.phone)) errs.phone = "Ingresá un número válido (mín. 7 dígitos)."
        break
      case "pickupAddress":
        if (!values.pickupAddress.trim()) errs.pickupAddress = "La dirección es obligatoria."
        break
      case "city":
        if (!values.city.trim()) errs.city = "La ciudad es obligatoria."
        break
      case "hotelName":
        if (values.isHotel && !values.hotelName.trim()) errs.hotelName = "Ingresá el nombre del hotel."
        break
    }
    return errs
  }, [])

  const validateAll = useCallback((values: BookingForm): FormErrors => {
    const fields: (keyof BookingForm)[] = ["firstName", "lastName", "email", "phone", "pickupAddress", "city"]
    if (values.isHotel) fields.push("hotelName")
    return fields.reduce((acc, f) => ({ ...acc, ...validateField(f, values) }), {} as FormErrors)
  }, [validateField])

  const handleSubmit = () => {
    const allErrors = validateAll(form)
    setErrors(allErrors)
    setTouched({ firstName: true, lastName: true, email: true, phone: true, pickupAddress: true, city: true, hotelName: true })

    if (Object.keys(allErrors).length > 0) {
      // Scroll to first invalid field
      const refMap: Record<string, React.RefObject<HTMLInputElement | null>> = {
        firstName: firstNameRef,
        lastName: lastNameRef,
        email: emailRef,
        phone: phoneRef,
        pickupAddress: addressRef,
        city: cityRef,
      }
      const firstError = Object.keys(allErrors)[0]
      refMap[firstError]?.current?.scrollIntoView({ behavior: "smooth", block: "center" })
      refMap[firstError]?.current?.focus()
      return
    }

    setSubmitted(true)
  }

  if (!activity || !date) {
    return (
      <div className="max-w-2xl mx-auto px-6 py-24 text-center">
        <h1 className="text-2xl font-bold mb-4">Reserva no encontrada</h1>
        <p className="text-muted-foreground mb-8">
          No pudimos encontrar la salida. Volvé a actividades y seleccioná una fecha.
        </p>
        <Button asChild>
          <Link href="/actividades">Ver Actividades</Link>
        </Button>
      </div>
    )
  }

  if (submitted) {
    return (
      <div className="max-w-2xl mx-auto px-6 py-24 text-center">
        <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
          <svg className="w-8 h-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h1 className="text-3xl font-bold mb-3">Solicitud enviada</h1>
        <p className="text-muted-foreground mb-2 text-lg">
          Recibimos tu solicitud para <strong>{activity.title}</strong>.
        </p>
        <p className="text-muted-foreground mb-8">
          Te contactaremos a <strong>{form.email}</strong> en las próximas horas para confirmar tu lugar.
        </p>
        <Button asChild variant="outline">
          <Link href="/actividades">Ver más actividades</Link>
        </Button>
      </div>
    )
  }

  const pricePerPerson = activity.price_from
  const subtotal = pricePerPerson * form.guests
  const total = subtotal

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

      {/* Back link */}
      <Link
        href={`/trekkings/${activity.id}?date=${date}`}
        className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground mb-8 transition-colors group"
      >
        <ChevronLeft className="h-4 w-4 group-hover:-translate-x-0.5 transition-transform" />
        Volver a {activity.title}
      </Link>

      <h1 className="text-3xl font-bold text-foreground mb-1">Confirmar y pagar</h1>
      <p className="text-muted-foreground mb-10 text-sm">Completá los datos para confirmar tu lugar.</p>

      <div className="grid lg:grid-cols-[1fr_400px] gap-10 items-start">

        {/* ── LEFT COLUMN ───────────────────────────────────────── */}
        <div className="space-y-6">

          {/* 1. Datos del participante */}
          <SectionCard title="Datos del participante">
            <div className="space-y-4">
              {/* Nombre + Apellido row */}
              <div className="grid sm:grid-cols-2 gap-4">
                <Field label="Nombre" id="firstName" error={errors.firstName}>
                  <input
                    ref={firstNameRef}
                    id="firstName"
                    type="text"
                    value={form.firstName}
                    onChange={set("firstName")}
                    onBlur={blur("firstName")}
                    placeholder="Juan"
                    className={inputClass(errors.firstName)}
                  />
                </Field>
                <Field label="Apellido" id="lastName" error={errors.lastName}>
                  <input
                    ref={lastNameRef}
                    id="lastName"
                    type="text"
                    value={form.lastName}
                    onChange={set("lastName")}
                    onBlur={blur("lastName")}
                    placeholder="García"
                    className={inputClass(errors.lastName)}
                  />
                </Field>
              </div>

              <Field label="Email" id="email" error={errors.email}>
                <input
                  ref={emailRef}
                  id="email"
                  type="email"
                  value={form.email}
                  onChange={set("email")}
                  onBlur={blur("email")}
                  placeholder="juan@ejemplo.com"
                  className={inputClass(errors.email)}
                />
              </Field>

              <Field label="Teléfono / WhatsApp" id="phone" error={errors.phone}>
                <div className="flex gap-2">
                  <span className="flex items-center justify-center border border-border rounded-xl px-3 bg-muted text-sm text-muted-foreground shrink-0 select-none">
                    +54
                  </span>
                  <input
                    ref={phoneRef}
                    id="phone"
                    type="tel"
                    value={form.phone}
                    onChange={set("phone")}
                    onBlur={blur("phone")}
                    placeholder="9 2901 000000"
                    className={inputClass(errors.phone)}
                  />
                </div>
              </Field>
            </div>
          </SectionCard>

          {/* 2. Dirección de pick-up */}
          <SectionCard title="Dirección de pick-up">
            <p className="text-sm text-muted-foreground mb-4 -mt-2">
              Indicanos dónde te pasamos a buscar antes de la salida.
            </p>
            <div className="space-y-4">
              <Field label="Dirección (calle y número)" id="pickupAddress" error={errors.pickupAddress}>
                <input
                  ref={addressRef}
                  id="pickupAddress"
                  type="text"
                  value={form.pickupAddress}
                  onChange={set("pickupAddress")}
                  onBlur={blur("pickupAddress")}
                  placeholder="San Martín 450"
                  className={inputClass(errors.pickupAddress)}
                />
              </Field>

              <Field label="Ciudad" id="city" error={errors.city}>
                <input
                  ref={cityRef}
                  id="city"
                  type="text"
                  value={form.city}
                  onChange={set("city")}
                  onBlur={blur("city")}
                  placeholder="Ushuaia"
                  className={inputClass(errors.city)}
                />
              </Field>

              <Field label="Referencias (opcional)" id="references">
                <textarea
                  id="references"
                  value={form.references}
                  onChange={set("references")}
                  placeholder="Timbre rojo, dpto 2B…"
                  rows={2}
                  className="w-full border border-border rounded-xl px-4 py-3 text-sm bg-background focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors resize-none"
                />
              </Field>

              {/* Hotel checkbox */}
              <label className="flex items-center gap-3 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={form.isHotel}
                  onChange={set("isHotel")}
                  className="w-4 h-4 rounded border-border accent-primary cursor-pointer"
                />
                <span className="text-sm text-foreground select-none">Es un hotel</span>
              </label>

              {form.isHotel && (
                <Field label="Nombre del hotel" id="hotelName" error={errors.hotelName}>
                  <input
                    id="hotelName"
                    type="text"
                    value={form.hotelName}
                    onChange={set("hotelName")}
                    onBlur={blur("hotelName")}
                    placeholder="Hotel Los Acebos"
                    className={inputClass(errors.hotelName)}
                  />
                </Field>
              )}
            </div>
          </SectionCard>

          {/* 3. Método de pago */}
          <SectionCard title="Método de pago">
            <div className="flex items-center justify-between py-3 px-4 border border-border rounded-xl bg-muted/30">
              <div className="flex items-center gap-3">
                {/* Mock card icon */}
                <div className="w-10 h-7 rounded-md bg-gradient-to-br from-slate-700 to-slate-900 flex items-center justify-center">
                  <div className="w-5 h-3 rounded-sm bg-yellow-400/80" />
                </div>
                <span className="text-sm text-foreground">Tarjeta terminada en 4242</span>
              </div>
              <button className="text-sm font-medium text-primary hover:underline">
                Cambiar
              </button>
            </div>
            {/* Payment icons row */}
            <div className="flex items-center gap-2 mt-4">
              {["VISA", "MC", "AMEX", "MP"].map((brand) => (
                <span
                  key={brand}
                  className="text-[10px] font-bold border border-border rounded px-1.5 py-0.5 text-muted-foreground tracking-wide"
                >
                  {brand}
                </span>
              ))}
            </div>
          </SectionCard>

          {/* 4. CTA + terms */}
          <div className="pt-2">
            <Button
              className="w-full bg-primary text-primary-foreground hover:bg-primary/90 rounded-xl h-14 text-base font-semibold"
              onClick={handleSubmit}
            >
              Confirmar y pagar
            </Button>
            <p className="mt-3 text-xs text-muted-foreground text-center leading-relaxed">
              Al confirmar, aceptás los{" "}
              <a href="#" className="underline hover:text-foreground transition-colors">
                Términos de reserva
              </a>{" "}
              y la{" "}
              <a href="#" className="underline hover:text-foreground transition-colors">
                Política de privacidad
              </a>
              .
            </p>
          </div>
        </div>

        {/* ── RIGHT COLUMN — sticky summary ─────────────────────── */}
        <div className="lg:sticky lg:top-24">
          <div className="bg-card border border-border rounded-2xl shadow-sm overflow-hidden">

            {/* Activity image + title */}
            <div className="flex items-start gap-4 p-5 border-b border-border">
              <div className="w-24 h-20 rounded-xl overflow-hidden bg-muted shrink-0">
                <img
                  src={activity.cover_image}
                  alt={activity.title}
                  className="w-full h-full object-cover"
                  onError={(e) => { e.currentTarget.src = "/placeholder.jpg" }}
                />
              </div>
              <div className="min-w-0">
                <p className="text-xs text-muted-foreground mb-0.5">{activity.location}</p>
                <h3 className="font-semibold text-sm text-foreground leading-snug text-balance">
                  {activity.title}
                </h3>

              </div>
            </div>

            <div className="p-5 space-y-4">

              {/* Date */}
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-xs text-muted-foreground mb-0.5">Fecha</p>
                  <p className="text-sm font-medium capitalize">{isoToShortDate(date)}</p>
                </div>
                <Calendar className="h-4 w-4 text-muted-foreground mt-0.5 shrink-0" />
              </div>

              {/* Guests */}
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-muted-foreground mb-0.5">Personas</p>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => setForm((f) => ({ ...f, guests: Math.max(1, f.guests - 1) }))}
                      disabled={form.guests <= 1}
                      className="w-7 h-7 rounded-full border border-border flex items-center justify-center text-base font-bold hover:border-primary transition-colors disabled:opacity-30"
                    >
                      −
                    </button>
                    <span className="text-sm font-semibold w-4 text-center">{form.guests}</span>
                    <button
                      onClick={() => setForm((f) => ({ ...f, guests: Math.min(activity.capacity_remaining, f.guests + 1) }))}
                      disabled={form.guests >= activity.capacity_remaining}
                      className="w-7 h-7 rounded-full border border-border flex items-center justify-center text-base font-bold hover:border-primary transition-colors disabled:opacity-30"
                    >
                      +
                    </button>
                  </div>
                </div>
                <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                  <Users className="h-3.5 w-3.5" />
                  <span>{activity.capacity_remaining} disponibles</span>
                </div>
              </div>

              {/* Divider */}
              <div className="border-t border-border" />

              {/* Price breakdown */}
              <div className="space-y-2">
                <h4 className="text-sm font-semibold text-foreground">Detalle del precio</h4>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground underline decoration-dotted cursor-help">
                    {activity.currency} {pricePerPerson} × {form.guests} {form.guests === 1 ? "persona" : "personas"}
                  </span>
                  <span>{activity.currency} {subtotal}</span>
                </div>

              </div>

              {/* Total */}
              <div className="border-t border-border pt-4 flex justify-between items-center">
                <span className="font-bold text-base">Total</span>
                <span className="font-bold text-base">{activity.currency} {total}</span>
              </div>

              {/* Coupon */}
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Código de descuento"
                  className="flex-1 border border-border rounded-xl px-3 py-2 text-sm bg-background focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                />
                <button className="px-4 py-2 rounded-xl border border-border text-sm font-medium hover:bg-muted transition-colors">
                  Aplicar
                </button>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}

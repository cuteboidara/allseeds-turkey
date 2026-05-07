'use client'

import { useState, FormEvent } from 'react'
import { useRouter } from 'next/navigation'

const GREEN = '#2c5f2d'
const ORANGE = '#e07b39'

interface FormData {
  firstName: string
  lastName: string
  company: string
  email: string
  phone: string
  product: string
  volume: string
  timeline: string
  specialRequirements: string
  contactMethod: string
  consent: boolean
}

type FormErrors = Partial<Record<keyof FormData, string>>

const INITIAL: FormData = {
  firstName: '',
  lastName: '',
  company: '',
  email: '',
  phone: '',
  product: '',
  volume: '',
  timeline: '',
  specialRequirements: '',
  contactMethod: '',
  consent: false,
}

function validate(form: FormData): FormErrors {
  const e: FormErrors = {}
  if (!form.firstName.trim()) e.firstName = 'First name is required'
  if (!form.lastName.trim()) e.lastName = 'Last name is required'
  if (!form.company.trim()) e.company = 'Company name is required'
  if (!form.email.trim()) e.email = 'Email is required'
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Enter a valid email address'
  if (!form.phone.trim()) e.phone = 'Phone number is required'
  else if (form.phone.replace(/\D/g, '').length < 10) e.phone = 'Phone must be at least 10 digits'
  if (!form.product) e.product = 'Please select a product'
  if (!form.volume) e.volume = 'Please select a volume'
  if (!form.timeline) e.timeline = 'Please select a timeline'
  if (!form.contactMethod) e.contactMethod = 'Please select a contact method'
  if (!form.consent) e.consent = 'You must agree to receive communication'
  return e
}

export default function QuotationForm() {
  const router = useRouter()
  const [form, setForm] = useState<FormData>(INITIAL)
  const [errors, setErrors] = useState<FormErrors>({})
  const [submitting, setSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState('')

  function set<K extends keyof FormData>(key: K, value: FormData[K]) {
    setForm((prev) => ({ ...prev, [key]: value }))
    if (errors[key]) setErrors((prev) => ({ ...prev, [key]: undefined }))
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    const errs = validate(form)
    setErrors(errs)
    if (Object.keys(errs).length > 0) {
      const firstErrorKey = Object.keys(errs)[0]
      document.getElementById(firstErrorKey)?.focus()
      return
    }
    setSubmitting(true)
    setSubmitError('')
    try {
      const res = await fetch('/api/quotation-submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (!res.ok) {
        const data = await res.json().catch(() => ({}))
        throw new Error(data.error || 'Submission failed. Please try again.')
      }
      router.push('/quotation-thank-you')
    } catch (err: unknown) {
      setSubmitError(err instanceof Error ? err.message : 'Something went wrong. Please try again.')
      setSubmitting(false)
    }
  }

  const inputClass = (name: keyof FormData) =>
    `w-full px-4 py-3 rounded-lg border text-sm focus:outline-none focus:ring-2 focus:ring-green-700 transition-colors ${
      errors[name] ? 'border-red-400 bg-red-50' : 'border-gray-200 bg-white'
    }`

  const selectClass = (name: keyof FormData) =>
    `w-full px-4 py-3 rounded-lg border text-sm focus:outline-none focus:ring-2 focus:ring-green-700 bg-white transition-colors ${
      errors[name] ? 'border-red-400 bg-red-50' : 'border-gray-200'
    }`

  return (
    <form onSubmit={handleSubmit} id="quotationForm" noValidate className="space-y-5">
      {/* Section 1: Contact Info */}
      <div className="bg-gray-50 rounded-2xl p-6 space-y-4">
        <h3
          className="text-xs font-bold uppercase tracking-widest"
          style={{ color: GREEN }}
        >
          1 — Contact Information
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="firstName" className="block text-sm font-semibold text-gray-700 mb-1">
              First Name <span className="text-red-500">*</span>
            </label>
            <input
              id="firstName"
              type="text"
              value={form.firstName}
              onChange={(e) => set('firstName', e.target.value)}
              placeholder="John"
              className={inputClass('firstName')}
            />
            {errors.firstName && <p className="text-red-500 text-xs mt-1">{errors.firstName}</p>}
          </div>

          <div>
            <label htmlFor="lastName" className="block text-sm font-semibold text-gray-700 mb-1">
              Last Name <span className="text-red-500">*</span>
            </label>
            <input
              id="lastName"
              type="text"
              value={form.lastName}
              onChange={(e) => set('lastName', e.target.value)}
              placeholder="Smith"
              className={inputClass('lastName')}
            />
            {errors.lastName && <p className="text-red-500 text-xs mt-1">{errors.lastName}</p>}
          </div>
        </div>

        <div>
          <label htmlFor="company" className="block text-sm font-semibold text-gray-700 mb-1">
            Company Name <span className="text-red-500">*</span>
          </label>
          <input
            id="company"
            type="text"
            value={form.company}
            onChange={(e) => set('company', e.target.value)}
            placeholder="ABC Trading Co."
            className={inputClass('company')}
          />
          {errors.company && <p className="text-red-500 text-xs mt-1">{errors.company}</p>}
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-1">
            Work Email <span className="text-red-500">*</span>
          </label>
          <input
            id="email"
            type="email"
            value={form.email}
            onChange={(e) => set('email', e.target.value)}
            placeholder="john@company.com"
            className={inputClass('email')}
          />
          {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
        </div>

        <div>
          <label htmlFor="phone" className="block text-sm font-semibold text-gray-700 mb-1">
            Phone Number <span className="text-red-500">*</span>
          </label>
          <input
            id="phone"
            type="tel"
            value={form.phone}
            onChange={(e) => set('phone', e.target.value)}
            placeholder="+1 234 567 8900"
            className={inputClass('phone')}
          />
          {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
        </div>
      </div>

      {/* Section 2: Product Details */}
      <div className="bg-gray-50 rounded-2xl p-6 space-y-4">
        <h3
          className="text-xs font-bold uppercase tracking-widest"
          style={{ color: GREEN }}
        >
          2 — Product Details
        </h3>

        <div>
          <label htmlFor="product" className="block text-sm font-semibold text-gray-700 mb-1">
            What product? <span className="text-red-500">*</span>
          </label>
          <select
            id="product"
            value={form.product}
            onChange={(e) => set('product', e.target.value)}
            className={selectClass('product')}
          >
            <option value="">Select product...</option>
            <option value="refined">Refined Sunflower Oil (food-grade)</option>
            <option value="crude">Crude Sunflower Oil (industrial)</option>
            <option value="both">Both (I want to compare)</option>
          </select>
          {errors.product && <p className="text-red-500 text-xs mt-1">{errors.product}</p>}
        </div>

        <div>
          <label htmlFor="volume" className="block text-sm font-semibold text-gray-700 mb-1">
            How much volume? <span className="text-red-500">*</span>
          </label>
          <select
            id="volume"
            value={form.volume}
            onChange={(e) => set('volume', e.target.value)}
            className={selectClass('volume')}
          >
            <option value="">Select volume...</option>
            <option value="50-100">50–100 tons</option>
            <option value="100-500">100–500 tons</option>
            <option value="500-1000">500–1,000 tons</option>
            <option value="1000+">1,000+ tons</option>
          </select>
          {errors.volume && <p className="text-red-500 text-xs mt-1">{errors.volume}</p>}
        </div>

        <div>
          <label htmlFor="timeline" className="block text-sm font-semibold text-gray-700 mb-1">
            When do you need it? <span className="text-red-500">*</span>
          </label>
          <select
            id="timeline"
            value={form.timeline}
            onChange={(e) => set('timeline', e.target.value)}
            className={selectClass('timeline')}
          >
            <option value="">Select timeline...</option>
            <option value="urgent">Urgent (ASAP — within 2 weeks)</option>
            <option value="1-2months">1–2 months</option>
            <option value="flexible">Flexible</option>
            <option value="exploring">Exploring options</option>
          </select>
          {errors.timeline && <p className="text-red-500 text-xs mt-1">{errors.timeline}</p>}
        </div>

        <div>
          <label htmlFor="specialRequirements" className="block text-sm font-semibold text-gray-700 mb-1">
            Any special requirements? <span className="text-gray-400 font-normal">(optional)</span>
          </label>
          <textarea
            id="specialRequirements"
            value={form.specialRequirements}
            onChange={(e) => set('specialRequirements', e.target.value)}
            rows={3}
            placeholder="Certifications needed, price sensitivity, delivery location, etc."
            className="w-full px-4 py-3 rounded-lg border border-gray-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-green-700 resize-none"
          />
        </div>
      </div>

      {/* Section 3: Contact Preference */}
      <div className="bg-gray-50 rounded-2xl p-6 space-y-4">
        <h3
          className="text-xs font-bold uppercase tracking-widest"
          style={{ color: GREEN }}
        >
          3 — How to Contact You
        </h3>

        <div>
          <p className="block text-sm font-semibold text-gray-700 mb-3">
            Preferred contact method <span className="text-red-500">*</span>
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {['WhatsApp', 'Email', 'Phone Call', 'Both'].map((method) => (
              <label
                key={method}
                className={`flex items-center justify-center px-3 py-3 rounded-xl border cursor-pointer text-sm font-semibold transition-all ${
                  form.contactMethod === method
                    ? 'border-green-600 bg-green-50 text-green-800'
                    : 'border-gray-200 bg-white text-gray-600 hover:border-gray-300'
                }`}
              >
                <input
                  type="radio"
                  name="contactMethod"
                  value={method}
                  checked={form.contactMethod === method}
                  onChange={() => set('contactMethod', method)}
                  className="sr-only"
                />
                {method}
              </label>
            ))}
          </div>
          {errors.contactMethod && (
            <p className="text-red-500 text-xs mt-2">{errors.contactMethod}</p>
          )}
        </div>

        <div>
          <label className="flex items-start gap-3 cursor-pointer group">
            <input
              type="checkbox"
              checked={form.consent}
              onChange={(e) => set('consent', e.target.checked)}
              className="mt-0.5 w-4 h-4 rounded border-gray-300 accent-green-700 flex-shrink-0"
            />
            <span className="text-sm text-gray-600 leading-snug">
              I agree to receive a quotation and follow-up communication from Allseeds Turkey{' '}
              <span className="text-red-500">*</span>
            </span>
          </label>
          {errors.consent && (
            <p className="text-red-500 text-xs mt-1 ml-7">{errors.consent}</p>
          )}
        </div>
      </div>

      {submitError && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-red-700 text-sm">
          {submitError}
        </div>
      )}

      <button
        type="submit"
        disabled={submitting}
        className="w-full py-4 rounded-xl font-bold text-white text-base tracking-wide transition-all disabled:opacity-60 disabled:cursor-not-allowed shadow-lg hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0"
        style={{ backgroundColor: submitting ? '#999' : ORANGE }}
      >
        {submitting ? 'Sending your request...' : 'GET MY FREE QUOTATION'}
      </button>

      <p className="text-center text-xs text-gray-400">
        No spam. No commitment. We respond within 24 hours.
      </p>
    </form>
  )
}

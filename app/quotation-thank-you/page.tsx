import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Quotation Request Received — Allseeds Turkey',
  description: 'Thank you — your bulk sunflower oil quotation request has been received.',
  robots: { index: false },
}

const GREEN = '#2c5f2d'
const ORANGE = '#e07b39'

const NEXT_STEPS = [
  {
    step: '1',
    title: 'Request logged',
    desc: 'Your quotation request has been received and assigned to our sales team.',
    time: 'Right now',
  },
  {
    step: '2',
    title: 'Sales team review',
    desc: 'We review your product, volume, and timeline to prepare a competitive offer.',
    time: 'Within 2 hours',
  },
  {
    step: '3',
    title: 'We contact you',
    desc: 'Our team reaches out via your preferred channel with pricing and terms.',
    time: 'Within 24 hours',
  },
]

const FAQ_POST_SUBMIT = [
  {
    q: 'When will I hear back?',
    a: 'Our team contacts you within 24 hours. During business hours (9 AM – 6 PM Istanbul), typical response is 2–4 hours.',
  },
  {
    q: 'What if I made a mistake in my form?',
    a: 'No problem — just WhatsApp or email us directly with the correct details and we\'ll update your request.',
  },
  {
    q: 'Can I request multiple product types?',
    a: 'Absolutely. We offer both refined (food-grade) and crude (industrial) sunflower oil. Our team will compare options for you.',
  },
]

export default function QuotationThankYouPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* ── SUCCESS HEADER ── */}
      <section
        className="relative py-16 px-4 sm:px-6 lg:px-8 text-white text-center overflow-hidden"
        style={{ background: `linear-gradient(135deg, ${GREEN} 0%, #1a3d1b 100%)` }}
      >
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)',
            backgroundSize: '30px 30px',
          }}
        />
        <div className="relative">
          {/* Big checkmark */}
          <div
            className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 text-4xl font-bold shadow-lg"
            style={{ backgroundColor: 'rgba(255,255,255,0.2)' }}
          >
            ✓
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold mb-3">
            Quotation Request Received!
          </h1>
          <p className="text-white/70 text-lg max-w-lg mx-auto">
            Thank you for reaching out. Our team will contact you within 24 hours with a custom quotation.
          </p>
        </div>
      </section>

      {/* ── NEXT STEPS ── */}
      <section className="py-14 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-xl font-bold text-center mb-2" style={{ color: GREEN }}>
            What happens next
          </h2>
          <p className="text-center text-gray-500 text-sm mb-10">
            Here is the timeline for your quotation
          </p>

          <div className="space-y-4">
            {NEXT_STEPS.map((step) => (
              <div
                key={step.step}
                className="flex items-start gap-5 bg-white rounded-2xl px-6 py-5 shadow-sm border border-gray-100"
              >
                <div
                  className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm"
                  style={{ backgroundColor: GREEN }}
                >
                  {step.step}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-4 flex-wrap">
                    <h3 className="font-bold text-base" style={{ color: GREEN }}>
                      {step.title}
                    </h3>
                    <span
                      className="text-xs font-semibold px-3 py-1 rounded-full flex-shrink-0"
                      style={{ backgroundColor: '#e8f5e9', color: GREEN }}
                    >
                      {step.time}
                    </span>
                  </div>
                  <p className="text-gray-500 text-sm mt-1">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CAN'T WAIT? ── */}
      <section className="pb-14 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <div
            className="rounded-2xl p-8 text-white text-center"
            style={{ backgroundColor: GREEN }}
          >
            <h2 className="text-xl font-bold mb-2">Can't wait? Contact us now</h2>
            <p className="text-white/70 text-sm mb-6 max-w-md mx-auto">
              Business hours: 9 AM – 6 PM Istanbul time (UTC+3). WhatsApp is the fastest way to reach us.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a
                href="https://wa.me/905464921032"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-bold text-white text-sm transition-transform hover:-translate-y-0.5"
                style={{ backgroundColor: '#25d366' }}
              >
                <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current flex-shrink-0">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                WhatsApp +90 546 492 1032
              </a>
              <a
                href="mailto:turkey@allseeds.com"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-bold text-sm transition-colors"
                style={{ backgroundColor: 'rgba(255,255,255,0.15)', color: '#fff' }}
              >
                <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                turkey@allseeds.com
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="pb-14 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-xl font-bold mb-8 text-center" style={{ color: GREEN }}>
            Common questions
          </h2>
          <div className="space-y-4">
            {FAQ_POST_SUBMIT.map((faq) => (
              <div key={faq.q} className="bg-white rounded-2xl border border-gray-100 p-6">
                <h3 className="font-bold text-sm mb-2" style={{ color: GREEN }}>
                  {faq.q}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── LEARN MORE ── */}
      <section className="pb-14 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-gray-500 text-sm mb-4">While you wait, learn more about us:</p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Link
              href="/en/company"
              className="px-5 py-2.5 rounded-xl border border-gray-200 bg-white text-sm font-semibold text-gray-700 hover:border-green-600 hover:text-green-700 transition-colors"
            >
              About Allseeds Turkey
            </Link>
            <Link
              href="/en/activities"
              className="px-5 py-2.5 rounded-xl border border-gray-200 bg-white text-sm font-semibold text-gray-700 hover:border-green-600 hover:text-green-700 transition-colors"
            >
              Our Products
            </Link>
            <Link
              href="/sunflower-oil-quote"
              className="px-5 py-2.5 rounded-xl text-sm font-semibold transition-colors"
              style={{ backgroundColor: ORANGE, color: '#fff' }}
            >
              Submit Another Request
            </Link>
          </div>
        </div>
      </section>

      {/* ── MINIMAL FOOTER ── */}
      <footer className="mt-auto py-6 px-4 text-center text-xs text-gray-400 bg-white border-t border-gray-100">
        <p>
          &copy; {new Date().getFullYear()} Allseeds Turkey · Istanbul, Turkey ·{' '}
          <a href="mailto:turkey@allseeds.com" className="hover:text-gray-600">
            turkey@allseeds.com
          </a>
        </p>
      </footer>
    </div>
  )
}

import type { Metadata } from 'next'
import QuotationForm from '../../components/QuotationForm'

export const metadata: Metadata = {
  title: 'Bulk Sunflower Oil Quotation — Allseeds Turkey',
  description:
    'Get a free quotation for bulk sunflower oil from Turkey. ISO certified, competitive pricing, 50–1,000+ ton shipments. Direct from processor.',
  openGraph: {
    title: 'Bulk Sunflower Oil Quotation — Allseeds Turkey',
    description:
      'Get instant quotation for refined or crude sunflower oil. 10+ years experience. Fast shipping from Turkey.',
    siteName: 'Allseeds Turkey',
  },
  robots: { index: false },
}

const GREEN = '#2c5f2d'
const ORANGE = '#e07b39'

const VALUE_PROPS = [
  {
    icon: '💰',
    title: '$50/ton cheaper than market',
    desc: 'Direct processor pricing — no middlemen, no hidden fees',
  },
  {
    icon: '🏆',
    title: '10+ years experience',
    desc: 'ISO 9001 · ISO 22000 · FSSC 22000 certified operations',
  },
  {
    icon: '🚢',
    title: 'Fast shipping: 15–20 days',
    desc: 'Port of Istanbul — flexible FOB, CIF & DAP terms',
  },
]

const FAQS = [
  {
    q: 'What is the minimum order quantity?',
    a: 'Our minimum order is 50 tons. We handle orders from 50 tons up to 5,000+ tons per shipment.',
  },
  {
    q: 'What certifications does your oil carry?',
    a: 'Our facility holds ISO 9001, ISO 22000, and FSSC 22000 certifications. Halal and Kosher certificates are available on request.',
  },
  {
    q: 'What payment terms do you offer?',
    a: 'We accept Letter of Credit (L/C), T/T (bank transfer), and D/P. Payment terms are discussed based on order volume and buyer profile.',
  },
  {
    q: 'How long does shipping take?',
    a: 'Typical transit time is 15–20 days from Turkey. We ship FOB Istanbul, CIF, or DAP to your port. Exact schedule is confirmed at order.',
  },
  {
    q: 'Can I get a sample before ordering?',
    a: 'Yes. We can provide a lab analysis certificate (CoA) immediately. Physical samples are available for confirmed buyers.',
  },
  {
    q: 'What is the price for refined sunflower oil?',
    a: 'Prices vary with global market conditions. Fill out the form and we\'ll send you a current competitive price within 24 hours.',
  },
]

export default function SunflowerOilQuotePage() {
  return (
    <div className="min-h-screen bg-white">
      {/* ── HERO ── */}
      <section
        className="relative py-16 px-4 sm:px-6 lg:px-8 text-white overflow-hidden"
        style={{ background: `linear-gradient(135deg, ${GREEN} 0%, #1a3d1b 100%)` }}
      >
        {/* Subtle pattern overlay */}
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage:
              'radial-gradient(circle, #fff 1px, transparent 1px)',
            backgroundSize: '30px 30px',
          }}
        />

        <div className="relative max-w-6xl mx-auto">
          {/* Trust badge */}
          <div className="flex justify-center mb-6">
            <span
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest"
              style={{ background: 'rgba(255,255,255,0.15)', color: '#a3d9a5' }}
            >
              ISO 9001 · ISO 22000 · FSSC 22000 Certified
            </span>
          </div>

          {/* Headline */}
          <h1 className="text-center text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight mb-4 max-w-3xl mx-auto">
            Get a Free Bulk Sunflower Oil Quotation
          </h1>
          <p className="text-center text-white/70 text-lg max-w-2xl mx-auto mb-10">
            Direct from Turkish processor. 50–5,000+ tons. Competitive pricing. Fast shipping.
            Fill out the form below — we respond within 24 hours.
          </p>

          {/* Value props */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl mx-auto mb-12">
            {VALUE_PROPS.map((vp) => (
              <div
                key={vp.title}
                className="rounded-2xl px-5 py-4 text-center"
                style={{ background: 'rgba(255,255,255,0.1)' }}
              >
                <div className="text-2xl mb-2">{vp.icon}</div>
                <p className="font-bold text-sm mb-1">{vp.title}</p>
                <p className="text-white/60 text-xs leading-snug">{vp.desc}</p>
              </div>
            ))}
          </div>

          {/* Scroll cue */}
          <div className="flex justify-center">
            <a
              href="#quote-form"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm transition-transform hover:-translate-y-0.5"
              style={{ backgroundColor: ORANGE, color: '#fff' }}
            >
              Get My Free Quotation
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
              </svg>
            </a>
          </div>
        </div>
      </section>

      {/* ── MAIN CONTENT: Form + Sidebar ── */}
      <section id="quote-form" className="py-14 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
            {/* Form column */}
            <div className="lg:col-span-3">
              <h2 className="text-2xl font-bold mb-2" style={{ color: GREEN }}>
                Request Your Free Quotation
              </h2>
              <p className="text-gray-500 text-sm mb-6">
                Takes 2 minutes. No spam. No commitment. Our team responds within 24 hours.
              </p>
              <QuotationForm />
            </div>

            {/* Sidebar */}
            <aside className="lg:col-span-2 space-y-6">
              {/* Trust signals */}
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <h3 className="font-bold text-base mb-4" style={{ color: GREEN }}>
                  Why buyers choose Allseeds Turkey
                </h3>
                <ul className="space-y-3 text-sm text-gray-600">
                  {[
                    'Direct processor — no brokers or middlemen',
                    '10+ years exporting to 25+ countries',
                    '$50/ton below market average pricing',
                    '1,000–5,000 tons annual export capacity',
                    '15–20 day shipping from Port of Istanbul',
                    'Full documentation: CoA, SGS, phytosanitary',
                    'Flexible terms: FOB, CIF, DAP',
                    'ISO 9001 · ISO 22000 · FSSC 22000',
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <span className="flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold" style={{ backgroundColor: '#e8f5e9', color: GREEN }}>
                        ✓
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Contact info */}
              <div className="rounded-2xl p-6 text-white" style={{ backgroundColor: GREEN }}>
                <h3 className="font-bold text-base mb-4">
                  Prefer to talk directly?
                </h3>
                <div className="space-y-3">
                  <a
                    href="https://wa.me/905464921032"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 px-4 py-3 rounded-xl font-semibold text-sm transition-transform hover:-translate-y-0.5"
                    style={{ backgroundColor: '#25d366', color: '#fff' }}
                  >
                    <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current flex-shrink-0">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                    </svg>
                    WhatsApp: +90 546 492 1032
                  </a>
                  <a
                    href="mailto:turkey@allseeds.com"
                    className="flex items-center gap-3 px-4 py-3 rounded-xl font-semibold text-sm text-white/80 hover:text-white transition-colors"
                  >
                    <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    turkey@allseeds.com
                  </a>
                </div>
                <p className="text-white/50 text-xs mt-4">
                  Business hours: 9 AM – 6 PM Istanbul (UTC+3)
                </p>
              </div>

              {/* Social proof */}
              <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
                <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-3">
                  Trusted by buyers in
                </p>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Egypt · Saudi Arabia · UAE · India · Pakistan · Algeria · Morocco · Iraq · Libya · Jordan · and 15+ more markets
                </p>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="py-14 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold mb-2 text-center" style={{ color: GREEN }}>
            Frequently Asked Questions
          </h2>
          <p className="text-center text-gray-500 text-sm mb-10">
            Common questions from international bulk buyers
          </p>
          <div className="space-y-4">
            {FAQS.map((faq) => (
              <div
                key={faq.q}
                className="rounded-2xl border border-gray-100 p-6 bg-gray-50"
              >
                <h3 className="font-bold text-base mb-2" style={{ color: GREEN }}>
                  {faq.q}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── BOTTOM CTA ── */}
      <section
        className="py-14 px-4 sm:px-6 lg:px-8 text-center text-white"
        style={{ backgroundColor: GREEN }}
      >
        <h2 className="text-2xl font-bold mb-3">Ready to get your quotation?</h2>
        <p className="text-white/70 mb-6 max-w-md mx-auto text-sm">
          Fill out the form above or contact us directly. We respond within 24 hours.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <a
            href="#quote-form"
            className="inline-block px-8 py-3 rounded-xl font-bold text-white text-sm transition-transform hover:-translate-y-0.5"
            style={{ backgroundColor: ORANGE }}
          >
            Get Free Quotation
          </a>
          <a
            href="https://wa.me/905464921032"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-8 py-3 rounded-xl font-bold text-sm transition-colors"
            style={{ backgroundColor: 'rgba(255,255,255,0.15)', color: '#fff' }}
          >
            WhatsApp Us Now
          </a>
        </div>
      </section>

      {/* ── MINIMAL FOOTER ── */}
      <footer className="py-6 px-4 text-center text-xs text-gray-400 bg-gray-50 border-t border-gray-100">
        <p>
          &copy; {new Date().getFullYear()} Allseeds Turkey · Istanbul, Turkey ·{' '}
          <a href="mailto:turkey@allseeds.com" className="hover:text-gray-600">
            turkey@allseeds.com
          </a>{' '}
          ·{' '}
          <a href="/en" className="hover:text-gray-600">
            Main website
          </a>
        </p>
      </footer>
    </div>
  )
}

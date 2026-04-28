import { getTranslations } from 'next-intl/server'
import { setRequestLocale } from 'next-intl/server'
import Image from 'next/image'
import ContactForm from '../../../components/ContactForm'
import { client } from '../../../sanity/lib/client'
import { contactQuery } from '../../../lib/sanity/queries'
import { urlFor } from '../../../sanity/lib/image'
import type { Metadata } from 'next'

const NAVY = '#1a2a4a'
const CREAM = '#f5f1e8'

interface Props {
  params: Promise<{ lang: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params
  const t = await getTranslations({ locale: lang, namespace: 'contact' })
  return { title: t('pageTitle') }
}

const fallbackCategories = [
  {
    icon: '🌾',
    titleKey: 'seedSuppliers',
    email: 'turkey@allseeds.com',
    descEn: 'Sunflower, rapeseed and soybean procurement enquiries',
    descTr: 'Ayçiçeği, kolza ve soya fasulyesi tedarik sorguları',
  },
  {
    icon: '🛢️',
    titleKey: 'vegOilSuppliers',
    email: 'turkey@allseeds.com',
    descEn: 'Vegetable oil, meal and oilcake buying enquiries',
    descTr: 'Bitkisel yağ, küspe ve yağlı tohum küspesi alım sorguları',
  },
  {
    icon: '🚢',
    titleKey: 'shippingLogistics',
    email: 'turkey@allseeds.com',
    descEn: 'Shipping, freight and logistics coordination',
    descTr: 'Nakliye, navlun ve lojistik koordinasyonu',
  },
  {
    icon: '💼',
    titleKey: 'careers',
    email: 'hr.turkey@allseeds.com',
    descEn: 'Job applications and HR enquiries for Turkey',
    descTr: 'Türkiye için iş başvuruları ve İK sorguları',
  },
]

const globalOffices = [
  { city: 'Istanbul', country: 'Turkey', flag: '🇹🇷', email: 'turkey@allseeds.com', isPrimary: true },
  { city: 'Geneva', country: 'Switzerland', flag: '🇨🇭', email: 'info@allseeds.com', isPrimary: false },
  { city: 'Luxembourg', country: 'Luxembourg', flag: '🇱🇺', email: 'info@allseeds.com', isPrimary: false },
  { city: 'Kyiv', country: 'Ukraine', flag: '🇺🇦', email: 'info@allseeds.com', isPrimary: false },
  { city: 'Mumbai', country: 'India', flag: '🇮🇳', email: 'info@allseeds.com', isPrimary: false },
]

export default async function ContactPage({ params }: Props) {
  const { lang } = await params
  setRequestLocale(lang)

  const t = await getTranslations({ locale: lang })
  const data = await client.fetch(contactQuery, { lang }).catch(() => null)

  const sanityCategories: Array<{
    title: string
    description: string
    email: string
    icon: string
  }> = data?.contactCategories ?? []

  const locations: Array<{
    city: string
    country: string
    address: string
    phone?: string
    email?: string
  }> = data?.locations ?? []

  return (
    <>
      {/* ── HERO ── */}
      <section
        className="relative flex items-end justify-start pt-32 pb-20 px-6 sm:px-10 lg:px-20 min-h-[60vh]"
        style={{ backgroundColor: NAVY }}
      >
        {data?.heroImage && (
          <Image
            src={urlFor(data.heroImage).width(1920).height(800).url()}
            alt="Contact"
            fill
            className="object-cover opacity-30"
            priority
          />
        )}
        <div className="relative z-10 text-white max-w-3xl">
          <p className="text-green-400 text-xs font-bold uppercase tracking-widest mb-3">
            {t('nav.contact')}
          </p>
          <h1 className="text-4xl sm:text-5xl font-bold leading-tight mb-4">
            {data?.pageTitle || t('contact.pageTitle')}
          </h1>
          <p className="text-white/60 text-lg">
            {data?.pageSubtitle || t('contact.pageSubtitle')}
          </p>
        </div>
      </section>

      {/* ── ENQUIRY CATEGORIES (cream) ── */}
      <section style={{ backgroundColor: CREAM }} className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-gray-500 text-sm uppercase tracking-widest font-semibold mb-2">
            {t('contact.categories')}
          </p>
          <h2 className="text-2xl font-bold mb-10" style={{ color: NAVY }}>
            {lang === 'tr' ? 'Sorgunuza Uygun Ekiple İletişime Geçin' : 'Get in Touch with the Right Team'}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {(sanityCategories.length > 0
              ? sanityCategories.map((c) => ({
                  icon: c.icon || '📧',
                  title: c.title,
                  email: c.email,
                  desc: c.description,
                }))
              : fallbackCategories.map((fc) => ({
                  icon: fc.icon,
                  title: t(`contact.${fc.titleKey}`),
                  email: fc.email,
                  desc: lang === 'tr' ? fc.descTr : fc.descEn,
                }))
            ).map((cat) => (
              <a
                key={cat.title}
                href={`mailto:${cat.email}`}
                className="rounded-2xl p-6 flex flex-col gap-3 hover:shadow-md transition-shadow group"
                style={{ backgroundColor: '#ffffff', border: '1px solid #e5e0d5' }}
              >
                <span className="text-3xl">{cat.icon}</span>
                <h3 className="font-bold text-base group-hover:text-green-600 transition-colors" style={{ color: NAVY }}>
                  {cat.title}
                </h3>
                <p className="text-sm text-gray-500 leading-snug flex-1">{cat.desc}</p>
                <span className="text-xs font-semibold text-green-600 mt-auto">{cat.email}</span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ── CONTACT FORM + OFFICES (white) ── */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Form */}
            <div>
              <p className="text-green-600 text-xs font-bold uppercase tracking-widest mb-3">
                {lang === 'tr' ? 'Mesaj Gönderin' : 'Send a Message'}
              </p>
              <h2 className="text-2xl font-bold mb-8" style={{ color: NAVY }}>
                {data?.formTitle || t('contact.pageTitle')}
              </h2>
              <ContactForm />
            </div>

            {/* Offices */}
            <div>
              <p className="text-green-600 text-xs font-bold uppercase tracking-widest mb-3">
                {t('contact.offices')}
              </p>
              <h2 className="text-2xl font-bold mb-8" style={{ color: NAVY }}>
                {lang === 'tr' ? 'Küresel Ofislerimiz' : 'Our Global Offices'}
              </h2>
              <div className="space-y-4">
                {(locations.length > 0
                  ? locations.map((loc) => ({
                      city: loc.city,
                      country: loc.country,
                      flag: '🌍',
                      email: loc.email ?? 'turkey@allseeds.com',
                      isPrimary: false,
                    }))
                  : globalOffices
                ).map((office) => (
                  <div
                    key={office.city}
                    className="rounded-xl p-5 flex items-center gap-4"
                    style={
                      office.isPrimary
                        ? { backgroundColor: NAVY, color: 'white' }
                        : { backgroundColor: CREAM }
                    }
                  >
                    <span className="text-2xl">{office.flag}</span>
                    <div className="flex-1 min-w-0">
                      <h3
                        className="font-bold text-sm"
                        style={{ color: office.isPrimary ? 'white' : NAVY }}
                      >
                        {office.city}, {office.country}
                      </h3>
                      <a
                        href={`mailto:${office.email}`}
                        className="text-xs truncate block mt-0.5"
                        style={{ color: office.isPrimary ? '#4ade80' : '#16a34a' }}
                      >
                        {office.email}
                      </a>
                    </div>
                    {office.isPrimary && (
                      <span className="text-xs font-bold bg-green-400 text-[#1a2a4a] px-2 py-0.5 rounded flex-shrink-0">
                        {lang === 'tr' ? 'Türkiye' : 'Turkey'}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

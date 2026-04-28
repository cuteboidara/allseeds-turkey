import { getTranslations } from 'next-intl/server'
import { setRequestLocale } from 'next-intl/server'
import Image from 'next/image'
import PortableText from '../../../components/PortableText'
import { client } from '../../../sanity/lib/client'
import { companyQuery } from '../../../lib/sanity/queries'
import type { SanityImageSource } from '@sanity/image-url'
import { urlFor } from '../../../sanity/lib/image'
import type { Metadata } from 'next'

const NAVY = '#1a2a4a'
const CREAM = '#f5f1e8'

interface Props {
  params: Promise<{ lang: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params
  const t = await getTranslations({ locale: lang, namespace: 'company' })
  return { title: t('pageTitle') }
}

const fallbackStats = [
  { value: '>2,000', label: 'Oilseed Suppliers', labelTr: 'Yağlı Tohum Tedarikçisi' },
  { value: '725,000 MT', label: 'Annual Crush Capacity', labelTr: 'Yıllık Kırma Kapasitesi' },
  { value: '#3', label: 'Vegetable Oil Exporter from Ukraine', labelTr: "Ukrayna'dan Bitkisel Yağ İhracatçısı" },
  { value: '3', label: 'Crushing Plants', labelTr: 'Kırma Tesisi' },
]

const fallbackOffices = [
  { city: 'Geneva', country: 'Switzerland', flag: '🇨🇭', role: 'Trading Hub' },
  { city: 'Luxembourg', country: 'Luxembourg', flag: '🇱🇺', role: 'Finance' },
  { city: 'Kyiv', country: 'Ukraine', flag: '🇺🇦', role: 'Operations' },
  { city: 'Mumbai', country: 'India', flag: '🇮🇳', role: 'Asia Pacific' },
  { city: 'Istanbul', country: 'Turkey', flag: '🇹🇷', role: 'Turkish Branch' },
]

export default async function CompanyPage({ params }: Props) {
  const { lang } = await params
  setRequestLocale(lang)

  const t = await getTranslations({ locale: lang })
  const data = await client.fetch(companyQuery, { lang }).catch(() => null)

  const keyFigures: Array<{ value: string; label: string }> = data?.keyFigures ?? []
  const locations: Array<{ city: string; country: string; address: string; isPrimary: boolean }> =
    data?.locations ?? []

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
            alt="Company"
            fill
            className="object-cover opacity-30"
            priority
          />
        )}
        <div className="relative z-10 text-white max-w-3xl">
          <p className="text-green-400 text-xs font-bold uppercase tracking-widest mb-3">
            {t('nav.company')}
          </p>
          <h1 className="text-4xl sm:text-5xl font-bold leading-tight mb-4">
            {data?.pageTitle || t('company.pageTitle')}
          </h1>
          <p className="text-white/60 text-lg">
            {data?.pageSubtitle || t('company.pageSubtitle')}
          </p>
        </div>
      </section>

      {/* ── OUR STORY (cream) ── */}
      <section style={{ backgroundColor: CREAM }} className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <p className="text-green-600 text-xs font-bold uppercase tracking-widest mb-3">
                {t('company.ourStory')}
              </p>
              <h2 className="text-3xl font-bold mb-6" style={{ color: NAVY }}>
                {t('home.aboutText')}
              </h2>
              {data?.aboutText ? (
                <PortableText value={data.aboutText} className="text-gray-600 leading-relaxed" />
              ) : (
                <p className="text-gray-600 leading-relaxed">
                  {lang === 'tr'
                    ? 'Allseeds Group, Ukrayna\'nın en büyük bitkisel yağ ihracatçılarından biridir. Ayçiçeği, kolza ve soya fasulyesi tedarikinden endüstriyel ölçekte kırma işlemine, depolama ve terminal operasyonlarından küresel ticarete kadar tüm değer zincirini yönetmekteyiz.'
                    : 'Allseeds Group is one of Ukraine\'s largest vegetable oil exporters. We manage the entire value chain from oilseed procurement through industrial-scale crushing, storage and terminal operations, to global trade.'}
                </p>
              )}
              {data?.founded && (
                <p className="mt-6 text-sm text-gray-500">
                  {lang === 'tr' ? 'Kuruluş' : 'Founded'}:{' '}
                  <span className="font-semibold" style={{ color: NAVY }}>{data.founded}</span>
                </p>
              )}
            </div>
            <div
              className="relative h-80 lg:h-[420px] rounded-2xl overflow-hidden"
              style={{ backgroundColor: '#d0cab8' }}
            >
              {data?.heroImage ? (
                <Image
                  src={urlFor(data.heroImage).width(800).height(600).url()}
                  alt={t('company.ourStory')}
                  fill
                  className="object-cover"
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-7xl">🏢</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ── KEY FIGURES (navy) ── */}
      <section style={{ backgroundColor: NAVY }} className="py-20 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-2">{t('company.keyFigures')}</h2>
            <p className="text-white/50 text-sm uppercase tracking-widest">
              {t('home.keyFiguresSubtitle')}
            </p>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {(keyFigures.length > 0 ? keyFigures : fallbackStats).map((stat, i) => (
              <div
                key={i}
                className="rounded-2xl p-8 flex flex-col items-center text-center"
                style={{ backgroundColor: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)' }}
              >
                <div className="w-14 h-14 rounded-full bg-green-400 flex items-center justify-center mb-5">
                  <span className="text-2xl">{['🌾', '⚙️', '🏆', '🏭'][i] ?? '📊'}</span>
                </div>
                <div className="text-3xl font-bold text-green-400 mb-2">{stat.value}</div>
                <div className="text-sm text-white/60 leading-snug">
                  {lang === 'tr' && 'labelTr' in stat
                    ? (stat as typeof fallbackStats[0]).labelTr
                    : stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── GLOBAL OFFICES (cream) ── */}
      <section style={{ backgroundColor: CREAM }} className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <p className="text-green-600 text-xs font-bold uppercase tracking-widest mb-3">
              {t('company.locations')}
            </p>
            <h2 className="text-3xl font-bold" style={{ color: NAVY }}>
              {lang === 'tr' ? 'Küresel Ofislerimiz' : 'Our Global Presence'}
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
            {(locations.length > 0
              ? locations.map((loc) => ({
                  city: loc.city,
                  country: loc.country,
                  flag: '🌍',
                  role: loc.isPrimary ? 'Headquarters' : loc.address,
                }))
              : fallbackOffices
            ).map((office) => (
              <div
                key={office.city}
                className="rounded-2xl p-6 flex flex-col gap-2"
                style={
                  office.city === 'Istanbul'
                    ? { backgroundColor: NAVY, color: 'white' }
                    : { backgroundColor: '#e8e2d5' }
                }
              >
                <span className="text-3xl">{office.flag}</span>
                <h3
                  className="font-bold text-base"
                  style={{ color: office.city === 'Istanbul' ? 'white' : NAVY }}
                >
                  {office.city}
                </h3>
                <p
                  className="text-sm"
                  style={{ color: office.city === 'Istanbul' ? 'rgba(255,255,255,0.7)' : '#6b7280' }}
                >
                  {office.country}
                </p>
                <span
                  className="text-xs font-semibold mt-1"
                  style={{ color: office.city === 'Istanbul' ? '#4ade80' : '#16a34a' }}
                >
                  {office.role}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── ACTIVITIES OVERVIEW (white) ── */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="grid grid-cols-2 gap-4">
              {[
                { num: '01', label: lang === 'tr' ? 'Tedarik' : 'Procurement', icon: '🌾' },
                { num: '02', label: lang === 'tr' ? 'İşleme' : 'Processing', icon: '⚙️' },
                { num: '03', label: lang === 'tr' ? 'Depolama' : 'Storage', icon: '🏭' },
                { num: '04', label: lang === 'tr' ? 'Ticaret' : 'Trading', icon: '🌍' },
              ].map(({ num, label, icon }) => (
                <div
                  key={num}
                  className="rounded-xl p-5 flex flex-col gap-2"
                  style={{ backgroundColor: CREAM }}
                >
                  <span className="text-xs font-bold text-green-600">{num}</span>
                  <span className="text-2xl">{icon}</span>
                  <span className="text-sm font-semibold" style={{ color: NAVY }}>{label}</span>
                </div>
              ))}
            </div>
            <div>
              <p className="text-green-600 text-xs font-bold uppercase tracking-widest mb-3">
                {lang === 'tr' ? 'Dikey Entegrasyon' : 'Vertical Integration'}
              </p>
              <h2 className="text-3xl font-bold mb-5" style={{ color: NAVY }}>
                {t('home.activitiesTitle')}
              </h2>
              <p className="text-gray-600 leading-relaxed">{t('home.activitiesIntro')}</p>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

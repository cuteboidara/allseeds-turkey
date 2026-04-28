import { getTranslations } from 'next-intl/server'
import { setRequestLocale } from 'next-intl/server'
import Image from 'next/image'
import { Link } from '../../lib/navigation'
import { client } from '../../sanity/lib/client'
import { homepageQuery } from '../../lib/sanity/queries'
import { urlFor } from '../../sanity/lib/image'
import { HERO_IMAGES } from '../../lib/heroImages'

interface Props {
  params: Promise<{ lang: string }>
}

const NAVY = '#1a2a4a'
const CREAM = '#f5f1e8'

export default async function HomePage({ params }: Props) {
  const { lang } = await params
  setRequestLocale(lang)

  const t = await getTranslations({ locale: lang })
  const data = await client.fetch(homepageQuery, { lang }).catch(() => null)

  const stats = data?.statsItems ?? [
    { value: '>2,000', label: lang === 'tr' ? 'Yağlı Tohum Tedarikçisi' : 'Oilseed Suppliers' },
    { value: '725,000 MT', label: lang === 'tr' ? 'Yıllık Kırma Kapasitesi' : 'Annual Crush Capacity' },
    { value: '#3', label: lang === 'tr' ? "Ukrayna'dan Bitkisel Yağ İhracatçısı" : 'Vegetable Oil Exporter from Ukraine' },
  ]

  const sustainabilityPillars = [
    {
      icon: '🌿',
      title: lang === 'tr' ? 'Çevre Sorumluluğu' : 'Environmental Stewardship',
      desc: t('sustainability.environmentalDesc'),
    },
    {
      icon: '✅',
      title: lang === 'tr' ? 'Ürün Kalitesi ve Güvenliği' : 'Product Quality & Safety',
      desc: t('sustainability.qualityDesc'),
    },
    {
      icon: '🤝',
      title: lang === 'tr' ? 'Sosyal Sürdürülebilirlik' : 'Social Sustainability',
      desc: t('sustainability.socialDesc'),
    },
  ]

  return (
    <>
      {/* ── HERO ── */}
      <section
        className="relative flex items-end justify-start min-h-[92vh] overflow-hidden"
        style={{ backgroundColor: NAVY }}
      >
        <Image
          src={
            data?.heroImage
              ? urlFor(data.heroImage).width(1920).height(1080).url()
              : HERO_IMAGES.home
          }
          alt={data?.heroTitle || 'Allseeds Turkey'}
          fill
          className="object-cover"
          priority
        />
        {/* dark gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

        <div className="relative z-10 text-white px-6 sm:px-10 lg:px-20 pb-20 max-w-3xl">
          <p className="text-green-400 text-sm font-semibold uppercase tracking-widest mb-4">
            Allseeds Turkey
          </p>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6">
            {data?.heroTitle || t('home.heroTitle')}
          </h1>
          <p className="text-lg text-white/80 leading-relaxed mb-8 max-w-xl">
            {data?.heroSubtitle || t('home.heroSubtitle')}
          </p>
          <Link
            href="/activities"
            className="inline-flex items-center gap-2 bg-green-400 text-[#1a2a4a] font-bold px-7 py-3.5 rounded hover:bg-green-300 transition-colors"
          >
            {t('home.ourActivities')} →
          </Link>
        </div>
      </section>

      {/* ── ABOUT (cream) ── */}
      <section style={{ backgroundColor: CREAM }} className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <p className="text-green-600 text-xs font-bold uppercase tracking-widest mb-3">
                {t('home.aboutTitle')}
              </p>
              <h2 className="text-3xl lg:text-4xl font-bold leading-snug mb-6" style={{ color: NAVY }}>
                {data?.aboutTitle ? data.aboutTitle : t('home.aboutText')}
              </h2>
              <p className="text-gray-600 leading-relaxed mb-8">
                {t('home.aboutText')}
              </p>
              <Link
                href="/company"
                className="inline-flex items-center gap-2 bg-green-400 text-[#1a2a4a] font-bold px-6 py-3 rounded hover:bg-green-300 transition-colors text-sm"
              >
                {t('home.learnMore')} →
              </Link>
            </div>

            {/* Image grid 2×2 */}
            <div className="grid grid-cols-2 gap-3">
              {[
                { emoji: '🌾', label: lang === 'tr' ? 'Tedarik' : 'Procurement' },
                { emoji: '⚙️', label: lang === 'tr' ? 'İşleme' : 'Processing' },
                { emoji: '🏭', label: lang === 'tr' ? 'Depolama' : 'Storage' },
                { emoji: '🚢', label: lang === 'tr' ? 'Sevkiyat' : 'Shipping' },
              ].map(({ emoji, label }) =>
                data?.aboutImage ? (
                  <div key={label} className="relative h-44 rounded-xl overflow-hidden">
                    <Image
                      src={urlFor(data.aboutImage).width(400).height(300).url()}
                      alt={label}
                      fill
                      className="object-cover"
                    />
                  </div>
                ) : (
                  <div
                    key={label}
                    className="h-44 rounded-xl flex flex-col items-center justify-center gap-2"
                    style={{ backgroundColor: '#e8e2d5' }}
                  >
                    <span className="text-4xl">{emoji}</span>
                    <span className="text-xs font-semibold text-gray-500">{label}</span>
                  </div>
                )
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ── KEY FIGURES (dark navy) ── */}
      <section style={{ backgroundColor: NAVY }} className="py-20 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-2">{t('home.keyFiguresTitle')}</h2>
            <p className="text-white/50 text-sm uppercase tracking-widest">{t('home.keyFiguresSubtitle')}</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {stats.map((stat: { value: string; label: string }, i: number) => (
              <div
                key={i}
                className="rounded-2xl p-8 flex flex-col items-center text-center"
                style={{ backgroundColor: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)' }}
              >
                <div className="w-14 h-14 rounded-full bg-green-400 flex items-center justify-center mb-5">
                  <span className="text-2xl">{['🌾', '⚙️', '🏆'][i] ?? '📊'}</span>
                </div>
                <div className="text-4xl font-bold text-green-400 mb-2">{stat.value}</div>
                <div className="text-sm text-white/60 leading-snug">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── ACTIVITIES TEASER (cream) ── */}
      <section style={{ backgroundColor: CREAM }} className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <span
                  className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-green-400 text-[#1a2a4a] font-bold text-sm"
                >
                  01
                </span>
                <span className="text-xs font-bold uppercase tracking-widest text-gray-400">
                  {t('home.ourActivities')}
                </span>
              </div>
              <h2 className="text-3xl lg:text-4xl font-bold mb-5" style={{ color: NAVY }}>
                {t('home.activitiesTitle')}
              </h2>
              <p className="text-gray-600 leading-relaxed mb-8">{t('home.activitiesIntro')}</p>
              <Link
                href="/activities"
                className="inline-flex items-center gap-2 bg-green-400 text-[#1a2a4a] font-bold px-6 py-3 rounded hover:bg-green-300 transition-colors text-sm"
              >
                {t('home.viewAll')} →
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { num: '01', title: lang === 'tr' ? 'Tedarik' : 'Procurement', icon: '🌾' },
                { num: '02', title: lang === 'tr' ? 'İşleme' : 'Processing', icon: '⚙️' },
                { num: '03', title: lang === 'tr' ? 'Depolama' : 'Storage', icon: '🏭' },
                { num: '04', title: lang === 'tr' ? 'Ticaret' : 'Trading', icon: '🌍' },
              ].map(({ num, title, icon }) => (
                <div
                  key={num}
                  className="rounded-xl p-5 flex flex-col gap-2"
                  style={{ backgroundColor: '#e8e2d5' }}
                >
                  <span className="text-xs font-bold text-green-600">{num}</span>
                  <span className="text-2xl">{icon}</span>
                  <span className="text-sm font-semibold" style={{ color: NAVY }}>{title}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── SUSTAINABILITY (dark navy) ── */}
      <section style={{ backgroundColor: NAVY }} className="py-24 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-6">
            <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-green-400 text-[#1a2a4a] font-bold text-sm">
              02
            </span>
            <span className="text-xs font-bold uppercase tracking-widest text-white/40">
              {t('nav.sustainability')}
            </span>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start mb-14">
            <h2 className="text-3xl lg:text-4xl font-bold leading-snug">
              {t('home.sustainabilityTitle')}
            </h2>
            <div>
              <p className="text-white/60 leading-relaxed mb-8">{t('home.sustainabilityIntro')}</p>
              <Link
                href="/sustainability"
                className="inline-flex items-center gap-2 bg-green-400 text-[#1a2a4a] font-bold px-6 py-3 rounded hover:bg-green-300 transition-colors text-sm"
              >
                {t('home.learnMore')} →
              </Link>
            </div>
          </div>
          {/* 3 Pillar cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {sustainabilityPillars.map(({ icon, title, desc }) => (
              <div
                key={title}
                className="rounded-2xl p-7"
                style={{ backgroundColor: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)' }}
              >
                <span className="text-3xl mb-4 block">{icon}</span>
                <h3 className="text-base font-bold mb-2 text-green-400">{title}</h3>
                <p className="text-sm text-white/60 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PEOPLE (cream) ── */}
      <section style={{ backgroundColor: CREAM }} className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <p className="text-green-600 text-xs font-bold uppercase tracking-widest mb-3">
                {t('home.ourPeople')}
              </p>
              <h2 className="text-3xl lg:text-4xl font-bold mb-5" style={{ color: NAVY }}>
                {t('home.peopleTitle')}
              </h2>
              <p className="text-gray-600 leading-relaxed mb-8">{t('home.peopleIntro')}</p>
              <Link
                href="/people"
                className="inline-flex items-center gap-2 bg-green-400 text-[#1a2a4a] font-bold px-6 py-3 rounded hover:bg-green-300 transition-colors text-sm"
              >
                {t('home.meetTeam')} →
              </Link>
            </div>
            {/* Team portrait placeholders */}
            <div className="grid grid-cols-3 gap-3">
              {Array.from({ length: 6 }).map((_, i) => (
                <div
                  key={i}
                  className="rounded-xl aspect-square flex items-center justify-center"
                  style={{ backgroundColor: '#e8e2d5' }}
                >
                  <span className="text-3xl">👤</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── CAREERS (dark navy) ── */}
      <section style={{ backgroundColor: NAVY }} className="py-20 text-white text-center">
        <div className="max-w-2xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-4">{t('home.careersTitle')}</h2>
          <p className="text-white/60 leading-relaxed mb-8">{t('home.careersIntro')}</p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 bg-green-400 text-[#1a2a4a] font-bold px-7 py-3.5 rounded hover:bg-green-300 transition-colors"
          >
            {t('home.seeOpenings')} →
          </Link>
        </div>
      </section>
    </>
  )
}

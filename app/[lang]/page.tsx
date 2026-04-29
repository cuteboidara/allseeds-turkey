import { getTranslations } from 'next-intl/server'
import { setRequestLocale } from 'next-intl/server'
import Image from 'next/image'
import { Link } from '../../lib/navigation'
import { client } from '../../sanity/lib/client'
import { homepageQuery } from '../../lib/sanity/queries'
import { urlFor } from '../../sanity/lib/image'
import type { SanityImageSource } from '@sanity/image-url'
import {
  HERO_IMAGES,
  ABOUT_GRID_IMAGES,
  ACTIVITY_IMAGES_LIST,
  SUSTAINABILITY_IMAGES_LIST,
  HOME_TEAM_IMAGES,
} from '../../lib/heroImages'

interface Props {
  params: Promise<{ lang: string }>
}

const NAVY = '#1a2a4a'
const CREAM = '#f5f1e8'

/** Gray box shown when a Sanity image slot hasn't been filled yet */
function ImgPlaceholder({ label, className = '' }: { label?: string; className?: string }) {
  return (
    <div
      className={`absolute inset-0 flex flex-col items-center justify-center gap-2 ${className}`}
      style={{ backgroundColor: '#ddd8cf' }}
    >
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}
        className="w-8 h-8 text-gray-400">
        <rect x="3" y="5" width="18" height="14" rx="2" />
        <circle cx="12" cy="12" r="3" />
        <path d="M9 5l1.5-2h3L15 5" />
      </svg>
      {label && <span className="text-[10px] font-semibold text-gray-400 text-center px-2">{label}</span>}
    </div>
  )
}

/** Resolves a Sanity image to URL, or falls back to a Picsum seed URL */
function resolveImg(
  sanityImg: SanityImageSource | null | undefined,
  fallback: string,
  w: number,
  h: number,
) {
  return sanityImg ? urlFor(sanityImg).width(w).height(h).url() : fallback
}

export default async function HomePage({ params }: Props) {
  const { lang } = await params
  setRequestLocale(lang)

  const t = await getTranslations({ locale: lang })
  const data = await client.fetch(homepageQuery, { lang }).catch(() => null)

  // ── About cards ──────────────────────────────────────────────────────────────
  const aboutCardLabels = [
    lang === 'tr' ? 'Tedarik' : 'Procurement',
    lang === 'tr' ? 'İşleme' : 'Processing',
    lang === 'tr' ? 'Depolama' : 'Storage',
    lang === 'tr' ? 'Sevkiyat' : 'Shipping',
  ]
  const aboutCards: Array<{ title?: string; image?: SanityImageSource }> =
    data?.aboutCards ?? []

  // ── Stats / Key figures ───────────────────────────────────────────────────
  const statsItems: Array<{ value: string; label: string; icon?: SanityImageSource }> =
    data?.statsItems ?? [
      { value: '>2,000', label: lang === 'tr' ? 'Yağlı Tohum Tedarikçisi' : 'Oilseed Suppliers' },
      { value: '725,000 MT', label: lang === 'tr' ? 'Yıllık Kırma Kapasitesi' : 'Annual Crush Capacity' },
      { value: '#3', label: lang === 'tr' ? "Ukrayna'dan Bitkisel Yağ İhracatçısı" : 'Vegetable Oil Exporter from Ukraine' },
    ]

  // ── Activity teaser cards ─────────────────────────────────────────────────
  const activityDefaults = [
    { num: '01', title: lang === 'tr' ? 'Tedarik' : 'Procurement' },
    { num: '02', title: lang === 'tr' ? 'İşleme' : 'Processing' },
    { num: '03', title: lang === 'tr' ? 'Depolama' : 'Storage' },
    { num: '04', title: lang === 'tr' ? 'Ticaret' : 'Trading' },
  ]
  const activityCards: Array<{ num?: string; title?: string; image?: SanityImageSource }> =
    data?.activityCards ?? []

  // ── Sustainability cards ───────────────────────────────────────────────────
  const sustainabilityDefaults = [
    { title: lang === 'tr' ? 'Çevre Sorumluluğu' : 'Environmental Stewardship', description: t('sustainability.environmentalDesc') },
    { title: lang === 'tr' ? 'Ürün Kalitesi ve Güvenliği' : 'Product Quality & Safety', description: t('sustainability.qualityDesc') },
    { title: lang === 'tr' ? 'Sosyal Sürdürülebilirlik' : 'Social Sustainability', description: t('sustainability.socialDesc') },
  ]
  const sustainabilityCards: Array<{ title?: string; description?: string; image?: SanityImageSource }> =
    data?.sustainabilityCards ?? []

  // ── Team members ──────────────────────────────────────────────────────────
  const homeTeamMembers: Array<{ name?: string; role?: string; photo?: SanityImageSource }> =
    data?.homeTeamMembers ?? []

  return (
    <>
      {/* ── HERO ── */}
      <section
        className="relative flex items-end justify-start min-h-[92vh] overflow-hidden"
        style={{ backgroundColor: NAVY }}
      >
        <Image
          src={resolveImg(data?.heroImage, HERO_IMAGES.home, 1920, 1080)}
          alt={data?.heroTitle || 'Allseeds Turkey'}
          fill
          className="object-cover"
          priority
        />
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
                {data?.aboutTitle || t('home.aboutText')}
              </h2>
              <p className="text-gray-600 leading-relaxed mb-8">{t('home.aboutText')}</p>
              <Link
                href="/company"
                className="inline-flex items-center gap-2 bg-green-400 text-[#1a2a4a] font-bold px-6 py-3 rounded hover:bg-green-300 transition-colors text-sm"
              >
                {t('home.learnMore')} →
              </Link>
            </div>

            {/* About 2×2 image grid */}
            <div className="grid grid-cols-2 gap-3">
              {aboutCardLabels.map((label, i) => {
                const card = aboutCards[i]
                const sanityImg = card?.image ?? data?.aboutImage
                return (
                  <div key={i} className="relative h-44 rounded-xl overflow-hidden">
                    {sanityImg ? (
                      <Image
                        src={urlFor(sanityImg).width(400).height(300).url()}
                        alt={card?.title || label}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <>
                        <Image
                          src={ABOUT_GRID_IMAGES[i]}
                          alt={label}
                          fill
                          className="object-cover"
                        />
                        <div className="absolute inset-0 bg-black/10" />
                      </>
                    )}
                    <div className="absolute bottom-0 left-0 right-0 px-3 py-2 bg-gradient-to-t from-black/50 to-transparent">
                      <span className="text-xs font-semibold text-white">{label}</span>
                    </div>
                  </div>
                )
              })}
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
            {statsItems.map((stat, i) => (
              <div
                key={i}
                className="rounded-2xl p-8 flex flex-col items-center text-center"
                style={{ backgroundColor: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)' }}
              >
                {/* Icon circle — Sanity image > clean placeholder */}
                <div className="relative w-14 h-14 rounded-full bg-green-400 overflow-hidden flex items-center justify-center mb-5 flex-shrink-0">
                  {stat.icon ? (
                    <Image
                      src={urlFor(stat.icon).width(56).height(56).url()}
                      alt={stat.label}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}
                      className="w-6 h-6 text-[#1a2a4a]">
                      <path d="M3 12l9-9 9 9" />
                      <path d="M9 21V12h6v9" />
                    </svg>
                  )}
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
                <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-green-400 text-[#1a2a4a] font-bold text-sm">
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

            {/* Activity 2×2 image cards */}
            <div className="grid grid-cols-2 gap-4">
              {activityDefaults.map(({ num, title }, i) => {
                const card = activityCards[i]
                const sanityImg = card?.image
                const cardTitle = card?.title || title
                return (
                  <div
                    key={num}
                    className="relative rounded-xl overflow-hidden h-40"
                    style={{ backgroundColor: '#d0cab8' }}
                  >
                    {sanityImg ? (
                      <Image
                        src={urlFor(sanityImg).width(400).height(300).url()}
                        alt={cardTitle}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <Image
                        src={ACTIVITY_IMAGES_LIST[i]}
                        alt={cardTitle}
                        fill
                        className="object-cover"
                      />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-3">
                      <span className="text-[10px] font-bold text-green-400 block mb-0.5">{card?.num || num}</span>
                      <span className="text-sm font-semibold text-white">{cardTitle}</span>
                    </div>
                  </div>
                )
              })}
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

          {/* 3 Pillar cards with image tops */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {sustainabilityDefaults.map(({ title, description }, i) => {
              const card = sustainabilityCards[i]
              const sanityImg = card?.image
              const cardTitle = card?.title || title
              const cardDesc = card?.description || description
              return (
                <div
                  key={i}
                  className="rounded-2xl overflow-hidden"
                  style={{ backgroundColor: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)' }}
                >
                  {/* Image area */}
                  <div className="relative h-36">
                    {sanityImg ? (
                      <Image
                        src={urlFor(sanityImg).width(600).height(300).url()}
                        alt={cardTitle}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <Image
                        src={SUSTAINABILITY_IMAGES_LIST[i]}
                        alt={cardTitle}
                        fill
                        className="object-cover opacity-60"
                      />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/40" />
                  </div>
                  {/* Text area */}
                  <div className="p-6">
                    <h3 className="text-base font-bold mb-2 text-green-400">{cardTitle}</h3>
                    <p className="text-sm text-white/60 leading-relaxed">{cardDesc}</p>
                  </div>
                </div>
              )
            })}
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

            {/* Team portrait 3×2 grid */}
            <div className="grid grid-cols-3 gap-3">
              {Array.from({ length: 6 }).map((_, i) => {
                const member = homeTeamMembers[i]
                const sanityPhoto = member?.photo
                return (
                  <div key={i} className="relative rounded-xl aspect-square overflow-hidden">
                    {sanityPhoto ? (
                      <Image
                        src={urlFor(sanityPhoto).width(300).height(300).url()}
                        alt={member?.name || `Team member ${i + 1}`}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <Image
                        src={HOME_TEAM_IMAGES[i]}
                        alt={`Team member ${i + 1}`}
                        fill
                        className="object-cover"
                      />
                    )}
                    {member?.name && (
                      <div className="absolute bottom-0 left-0 right-0 px-2 py-1.5 bg-gradient-to-t from-black/60 to-transparent">
                        <span className="text-[10px] font-semibold text-white block truncate">{member.name}</span>
                        {member.role && <span className="text-[9px] text-white/70 block truncate">{member.role}</span>}
                      </div>
                    )}
                  </div>
                )
              })}
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

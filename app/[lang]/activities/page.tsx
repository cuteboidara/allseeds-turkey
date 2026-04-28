import { getTranslations } from 'next-intl/server'
import { setRequestLocale } from 'next-intl/server'
import Image from 'next/image'
import PortableText from '../../../components/PortableText'
import { client } from '../../../sanity/lib/client'
import { activitiesQuery } from '../../../lib/sanity/queries'
import type { SanityImageSource } from '@sanity/image-url'
import { urlFor } from '../../../sanity/lib/image'
import { ACTIVITY_IMAGES_LIST } from '../../../lib/heroImages'
import type { Metadata } from 'next'

const NAVY = '#1a2a4a'
const CREAM = '#f5f1e8'

interface Props {
  params: Promise<{ lang: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params
  const t = await getTranslations({ locale: lang, namespace: 'activities' })
  return { title: t('pageTitle') }
}

const fallbackItems = [
  {
    slug: 'procurement',
    numBadge: '01',
    icon: '🌾',
    highlights: ['Direct sourcing', 'Verified quality', 'European standards'],
    capacities: null,
  },
  {
    slug: 'processing',
    numBadge: '02',
    icon: '⚙️',
    highlights: ['Modern equipment', 'High daily volumes', 'Full traceability'],
    capacities: ['2,400 MT/day — Sunflower', '1,800 MT/day — Rapeseed', '1,500 MT/day — Soybean'],
  },
  {
    slug: 'storage',
    numBadge: '03',
    icon: '🏭',
    highlights: ['Unique location', 'High loading capacity', 'Multimodal hub'],
    capacities: ['100,000 MT oil storage', '10,000 MT/day dry cargo', 'Panamax vessels'],
  },
  {
    slug: 'trading',
    numBadge: '04',
    icon: '🌍',
    highlights: ['Reliable partner', 'Flexible terms', 'Smart logistics'],
    capacities: null,
  },
]

export default async function ActivitiesPage({ params }: Props) {
  const { lang } = await params
  setRequestLocale(lang)

  const t = await getTranslations({ locale: lang })
  const data = await client.fetch(activitiesQuery, { lang }).catch(() => null)

  const items: Array<{
    _key: string
    slug: string
    title: string
    description: Parameters<typeof PortableText>[0]['value']
    image: SanityImageSource
  }> = data?.items ?? []

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
            alt="Activities"
            fill
            className="object-cover opacity-30"
            priority
          />
        )}
        <div className="relative z-10 text-white max-w-3xl">
          <p className="text-green-400 text-xs font-bold uppercase tracking-widest mb-3">
            {t('home.ourActivities')}
          </p>
          <h1 className="text-4xl sm:text-5xl font-bold leading-tight mb-4">
            {data?.pageTitle || t('activities.pageTitle')}
          </h1>
          <p className="text-white/60 text-lg">{data?.pageSubtitle || t('activities.pageSubtitle')}</p>
        </div>
      </section>

      {/* ── OVERVIEW INTRO (cream) ── */}
      <section style={{ backgroundColor: CREAM }} className="py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-gray-500 text-sm uppercase tracking-widest font-semibold mb-2">Overview</p>
          <h2 className="text-2xl font-bold" style={{ color: NAVY }}>
            {t('home.activitiesTitle')}
          </h2>
        </div>
      </section>

      {/* ── ACTIVITY SECTIONS ── */}
      {items.length > 0 ? (
        items.map((item, idx) => {
          const fallback = fallbackItems[Math.min(idx, fallbackItems.length - 1)]
          const isEven = idx % 2 === 0
          const bg = idx % 2 === 0 ? '#ffffff' : CREAM

          return (
            <section key={item.slug} style={{ backgroundColor: bg }} className="py-20">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${isEven ? '' : ''}`}>
                  {/* Text side */}
                  <div className={isEven ? '' : 'lg:order-2'}>
                    <div className="flex items-center gap-3 mb-6">
                      <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-green-400 text-[#1a2a4a] font-bold text-sm">
                        {fallback?.numBadge ?? `0${idx + 1}`}
                      </span>
                      <span className="text-xs font-bold uppercase tracking-widest text-gray-400">
                        {item.title.replace(/^\d+\.\s*/, '')}
                      </span>
                    </div>
                    <h2 className="text-2xl lg:text-3xl font-bold mb-5" style={{ color: NAVY }}>
                      {item.title}
                    </h2>
                    <PortableText value={item.description} className="text-gray-600 mb-6" />

                    {/* Highlights */}
                    {fallback?.highlights && (
                      <ul className="space-y-2 mb-6">
                        {fallback.highlights.map((h) => (
                          <li key={h} className="flex items-center gap-2 text-sm text-gray-700">
                            <span className="w-4 h-4 rounded-full bg-green-400 flex-shrink-0" />
                            {h}
                          </li>
                        ))}
                      </ul>
                    )}

                    {/* Capacity badges */}
                    {fallback?.capacities && (
                      <div className="flex flex-wrap gap-2 mt-4">
                        {fallback.capacities.map((c) => (
                          <span
                            key={c}
                            className="text-xs font-semibold px-3 py-1.5 rounded-full text-white"
                            style={{ backgroundColor: NAVY }}
                          >
                            {c}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Image side */}
                  <div className={`relative h-72 lg:h-[420px] rounded-2xl overflow-hidden ${isEven ? '' : 'lg:order-1'}`}
                    style={{ backgroundColor: '#d9d3c7' }}>
                    <Image
                      src={
                        item.image
                          ? urlFor(item.image).width(800).height(600).url()
                          : ACTIVITY_IMAGES_LIST[Math.min(idx, ACTIVITY_IMAGES_LIST.length - 1)]
                      }
                      alt={item.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
              </div>
            </section>
          )
        })
      ) : (
        /* Fallback when no Sanity data */
        fallbackItems.map((fb, idx) => {
          const isEven = idx % 2 === 0
          const bg = isEven ? '#ffffff' : CREAM
          const titleKey = fb.slug === 'procurement' ? 'procurementTitle'
            : fb.slug === 'processing' ? 'processingTitle'
            : fb.slug === 'storage' ? 'storageTitle'
            : 'tradingTitle'
          const descKey = fb.slug === 'procurement' ? 'procurementDesc'
            : fb.slug === 'processing' ? 'processingDesc'
            : fb.slug === 'storage' ? 'storageDesc'
            : 'tradingDesc'

          return (
            <section key={fb.slug} style={{ backgroundColor: bg }} className="py-20">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                  <div className={isEven ? '' : 'lg:order-2'}>
                    <div className="flex items-center gap-3 mb-6">
                      <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-green-400 text-[#1a2a4a] font-bold text-sm">
                        {fb.numBadge}
                      </span>
                      <span className="text-xs font-bold uppercase tracking-widest text-gray-400">
                        {t(`activities.${fb.slug}`)}
                      </span>
                    </div>
                    <h2 className="text-2xl lg:text-3xl font-bold mb-4" style={{ color: NAVY }}>
                      {t(`activities.${titleKey}`)}
                    </h2>
                    <p className="text-gray-600 leading-relaxed mb-6">{t(`activities.${descKey}`)}</p>
                    {fb.highlights && (
                      <ul className="space-y-2 mb-6">
                        {fb.highlights.map((h) => (
                          <li key={h} className="flex items-center gap-2 text-sm text-gray-700">
                            <span className="w-4 h-4 rounded-full bg-green-400 flex-shrink-0" />
                            {h}
                          </li>
                        ))}
                      </ul>
                    )}
                    {fb.capacities && (
                      <div className="flex flex-wrap gap-2">
                        {fb.capacities.map((c) => (
                          <span key={c} className="text-xs font-semibold px-3 py-1.5 rounded-full text-white"
                            style={{ backgroundColor: NAVY }}>
                            {c}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                  <div className={`relative h-72 lg:h-[420px] rounded-2xl overflow-hidden ${isEven ? '' : 'lg:order-1'}`}>
                    <Image
                      src={ACTIVITY_IMAGES_LIST[Math.min(idx, ACTIVITY_IMAGES_LIST.length - 1)]}
                      alt={t(`activities.${fb.slug}`)}
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
              </div>
            </section>
          )
        })
      )}
    </>
  )
}

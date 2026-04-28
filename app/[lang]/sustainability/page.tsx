import { getTranslations } from 'next-intl/server'
import { setRequestLocale } from 'next-intl/server'
import Image from 'next/image'
import PortableText from '../../../components/PortableText'
import { client } from '../../../sanity/lib/client'
import { sustainabilityQuery } from '../../../lib/sanity/queries'
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
  const t = await getTranslations({ locale: lang, namespace: 'sustainability' })
  return { title: t('pageTitle') }
}

const fallbackPillars = [
  {
    key: 'environmental',
    numBadge: '01',
    icon: '🌿',
    points: [
      'Energy-efficient production processes',
      '95% sea freight for lower emissions',
      'Waste minimisation across all facilities',
      'Continuous environmental monitoring',
    ],
  },
  {
    key: 'quality',
    numBadge: '02',
    icon: '✅',
    points: [
      'Guaranteed national and international standards',
      'Independent laboratory testing at every stage',
      'Continuous quality monitoring',
      'Full traceability from field to delivery',
    ],
  },
  {
    key: 'social',
    numBadge: '03',
    icon: '🤝',
    points: [
      'Employee health and safety programmes',
      'Continuous onsite training',
      'Offsite educational programmes',
      'Support for local communities',
    ],
  },
]

export default async function SustainabilityPage({ params }: Props) {
  const { lang } = await params
  setRequestLocale(lang)

  const t = await getTranslations({ locale: lang })
  const data = await client.fetch(sustainabilityQuery, { lang }).catch(() => null)

  const pillars: Array<{
    slug: string
    title: string
    description: Parameters<typeof PortableText>[0]['value']
    image: SanityImageSource
  }> = data?.pillars ?? []

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
            alt="Sustainability"
            fill
            className="object-cover opacity-30"
            priority
          />
        )}
        <div className="relative z-10 text-white max-w-3xl">
          <p className="text-green-400 text-xs font-bold uppercase tracking-widest mb-3">
            {t('nav.sustainability')}
          </p>
          <h1 className="text-4xl sm:text-5xl font-bold leading-tight mb-4">
            {data?.pageTitle || t('sustainability.pageTitle2')}
          </h1>
          <p className="text-white/60 text-lg">
            {data?.pageSubtitle || t('sustainability.pageSubtitle')}
          </p>
        </div>
      </section>

      {/* ── INTRO STRIP (cream) ── */}
      <section style={{ backgroundColor: CREAM }} className="py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-gray-500 text-sm uppercase tracking-widest font-semibold mb-2">Our Commitment</p>
          <h2 className="text-2xl font-bold" style={{ color: NAVY }}>
            {t('home.sustainabilityTitle')}
          </h2>
        </div>
      </section>

      {/* ── PILLAR SECTIONS ── */}
      {pillars.length > 0 ? (
        pillars.map((pillar, idx) => {
          const fallback = fallbackPillars[Math.min(idx, fallbackPillars.length - 1)]
          const isEven = idx % 2 === 0
          const bg = isEven ? '#ffffff' : CREAM

          return (
            <section key={pillar.slug} style={{ backgroundColor: bg }} className="py-20">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                  <div className={isEven ? '' : 'lg:order-2'}>
                    <div className="flex items-center gap-3 mb-6">
                      <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-green-400 text-[#1a2a4a] font-bold text-sm">
                        {fallback?.numBadge ?? `0${idx + 1}`}
                      </span>
                      <span className="text-xs font-bold uppercase tracking-widest text-gray-400">
                        {t('nav.sustainability')}
                      </span>
                    </div>
                    <h2 className="text-2xl lg:text-3xl font-bold mb-5" style={{ color: NAVY }}>
                      {pillar.title}
                    </h2>
                    <PortableText value={pillar.description} className="text-gray-600 mb-6" />
                    {fallback?.points && (
                      <ul className="space-y-2">
                        {fallback.points.map((p) => (
                          <li key={p} className="flex items-center gap-2 text-sm text-gray-700">
                            <span className="w-4 h-4 rounded-full bg-green-400 flex-shrink-0" />
                            {p}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>

                  <div
                    className={`relative h-72 lg:h-[420px] rounded-2xl overflow-hidden ${isEven ? '' : 'lg:order-1'}`}
                    style={{ backgroundColor: '#d9d3c7' }}
                  >
                    {pillar.image ? (
                      <Image
                        src={urlFor(pillar.image).width(800).height(600).url()}
                        alt={pillar.title}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <div
                        className="absolute inset-0 flex flex-col items-center justify-center gap-3"
                        style={{ backgroundColor: '#d0cab8' }}
                      >
                        <span className="text-7xl">{fallback?.icon ?? '🌿'}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </section>
          )
        })
      ) : (
        fallbackPillars.map((fb, idx) => {
          const isEven = idx % 2 === 0
          const bg = isEven ? '#ffffff' : CREAM
          const titleKey = fb.key === 'environmental' ? 'environmental'
            : fb.key === 'quality' ? 'quality'
            : 'social'

          return (
            <section key={fb.key} style={{ backgroundColor: bg }} className="py-20">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                  <div className={isEven ? '' : 'lg:order-2'}>
                    <div className="flex items-center gap-3 mb-6">
                      <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-green-400 text-[#1a2a4a] font-bold text-sm">
                        {fb.numBadge}
                      </span>
                      <span className="text-xs font-bold uppercase tracking-widest text-gray-400">
                        {t('nav.sustainability')}
                      </span>
                    </div>
                    <h2 className="text-2xl lg:text-3xl font-bold mb-4" style={{ color: NAVY }}>
                      {t(`sustainability.${titleKey}`)}
                    </h2>
                    <p className="text-gray-600 leading-relaxed mb-6">
                      {t(`sustainability.${titleKey}Desc`)}
                    </p>
                    <ul className="space-y-2">
                      {fb.points.map((p) => (
                        <li key={p} className="flex items-center gap-2 text-sm text-gray-700">
                          <span className="w-4 h-4 rounded-full bg-green-400 flex-shrink-0" />
                          {p}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div
                    className={`h-72 lg:h-[420px] rounded-2xl flex flex-col items-center justify-center gap-3 ${isEven ? '' : 'lg:order-1'}`}
                    style={{ backgroundColor: '#d0cab8' }}
                  >
                    <span className="text-7xl">{fb.icon}</span>
                  </div>
                </div>
              </div>
            </section>
          )
        })
      )}

      {/* ── COMMITMENT CTA (navy) ── */}
      <section style={{ backgroundColor: NAVY }} className="py-20 text-white text-center">
        <div className="max-w-2xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-4">{t('home.sustainabilityTitle')}</h2>
          <p className="text-white/60 leading-relaxed">{t('home.sustainabilityIntro')}</p>
        </div>
      </section>
    </>
  )
}

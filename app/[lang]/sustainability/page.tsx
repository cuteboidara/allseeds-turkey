import { getTranslations } from 'next-intl/server'
import { setRequestLocale } from 'next-intl/server'
import Image from 'next/image'
import Hero from '../../../components/Hero'
import PortableText from '../../../components/PortableText'
import { client } from '../../../sanity/lib/client'
import { sustainabilityQuery } from '../../../lib/sanity/queries'
import type { SanityImageSource } from '@sanity/image-url'
import { urlFor } from '../../../sanity/lib/image'
import type { Metadata } from 'next'

interface Props {
  params: Promise<{ lang: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params
  const t = await getTranslations({ locale: lang, namespace: 'sustainability' })
  return { title: t('pageTitle') }
}

export default async function SustainabilityPage({ params }: Props) {
  const { lang } = await params
  setRequestLocale(lang)

  const t = await getTranslations({ locale: lang })
  const data = await client.fetch(sustainabilityQuery, { lang }).catch(() => null)

  const fallbackPillars = [
    { key: 'environmental', icon: '🌿', color: 'bg-emerald-50 border-emerald-200' },
    { key: 'quality', icon: '✅', color: 'bg-blue-50 border-blue-200' },
    { key: 'social', icon: '🤝', color: 'bg-orange-50 border-orange-200' },
  ] as const

  return (
    <>
      <Hero
        title={data?.pageTitle || t('sustainability.pageTitle')}
        subtitle={data?.pageSubtitle || t('sustainability.pageSubtitle')}
        imageUrl={data?.heroImage ? urlFor(data.heroImage).width(1920).height(800).url() : undefined}
        size="medium"
      />

      {/* Pillars */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {data?.pillars && data.pillars.length > 0 ? (
            <div className="space-y-20">
              {data.pillars.map((pillar: { slug: string; title: string; description: Parameters<typeof PortableText>[0]['value']; image: SanityImageSource }, idx: number) => (
                <div key={pillar.slug} className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center`}>
                  <div className={idx % 2 === 1 ? 'lg:order-2' : ''}>
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">{pillar.title}</h2>
                    <PortableText value={pillar.description} />
                  </div>
                  <div className={`relative h-72 lg:h-96 rounded-2xl overflow-hidden bg-green-100 ${idx % 2 === 1 ? 'lg:order-1' : ''}`}>
                    {pillar.image ? (
                      <Image
                        src={urlFor(pillar.image).width(800).height(600).url()}
                        alt={pillar.title}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-6xl">{fallbackPillars[idx]?.icon}</span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {fallbackPillars.map(({ key, icon, color }) => (
                <div key={key} className={`rounded-2xl p-10 border ${color}`}>
                  <div className="text-5xl mb-4">{icon}</div>
                  <h2 className="text-xl font-bold text-gray-900 mb-3">
                    {t(`sustainability.${key}`)}
                  </h2>
                  <p className="text-gray-600 leading-relaxed">
                    {t(`sustainability.${key}Desc`)}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Commitment */}
      {data?.commitmentText && (
        <section className="py-16 bg-green-50">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <PortableText value={data.commitmentText} />
          </div>
        </section>
      )}
    </>
  )
}

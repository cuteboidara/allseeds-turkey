import { getTranslations } from 'next-intl/server'
import { setRequestLocale } from 'next-intl/server'
import Image from 'next/image'
import Hero from '../../../components/Hero'
import PortableText from '../../../components/PortableText'
import { client } from '../../../sanity/lib/client'
import { activitiesQuery } from '../../../lib/sanity/queries'
import type { SanityImageSource } from '@sanity/image-url'
import { urlFor } from '../../../sanity/lib/image'
import type { Metadata } from 'next'

interface Props {
  params: Promise<{ lang: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params
  const t = await getTranslations({ locale: lang, namespace: 'activities' })
  return { title: t('pageTitle') }
}

export default async function ActivitiesPage({ params }: Props) {
  const { lang } = await params
  setRequestLocale(lang)

  const t = await getTranslations({ locale: lang })
  const data = await client.fetch(activitiesQuery, { lang }).catch(() => null)

  const fallbackItems = [
    { key: 'procurement', icon: '🌾' },
    { key: 'processing', icon: '⚙️' },
    { key: 'storage', icon: '🏭' },
    { key: 'trading', icon: '🌍' },
  ] as const

  return (
    <>
      <Hero
        title={data?.pageTitle || t('activities.pageTitle')}
        subtitle={data?.pageSubtitle || t('activities.pageSubtitle')}
        imageUrl={data?.heroImage ? urlFor(data.heroImage).width(1920).height(800).url() : undefined}
        size="medium"
      />

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {data?.items && data.items.length > 0 ? (
            <div className="space-y-20">
              {data.items.map((item: { slug: string; title: string; description: Parameters<typeof PortableText>[0]['value']; image: SanityImageSource }, idx: number) => (
                <div
                  key={item.slug}
                  className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${idx % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}
                >
                  <div className={idx % 2 === 1 ? 'lg:order-2' : ''}>
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">{item.title}</h2>
                    <PortableText value={item.description} className="text-gray-600" />
                  </div>
                  <div className={`relative h-72 lg:h-96 rounded-2xl overflow-hidden bg-green-100 ${idx % 2 === 1 ? 'lg:order-1' : ''}`}>
                    {item.image ? (
                      <Image
                        src={urlFor(item.image).width(800).height(600).url()}
                        alt={item.title}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-6xl">{fallbackItems[idx]?.icon}</span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {fallbackItems.map(({ key, icon }) => (
                <div key={key} className="bg-gray-50 rounded-2xl p-10 border border-gray-100">
                  <div className="text-5xl mb-4">{icon}</div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-3">
                    {t(`activities.${key}`)}
                  </h2>
                  <p className="text-gray-600 leading-relaxed">
                    {t(`activities.${key}Desc`)}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  )
}

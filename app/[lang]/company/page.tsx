import { getTranslations } from 'next-intl/server'
import { setRequestLocale } from 'next-intl/server'
import Image from 'next/image'
import Hero from '../../../components/Hero'
import PortableText from '../../../components/PortableText'
import { client } from '../../../sanity/lib/client'
import { companyQuery } from '../../../lib/sanity/queries'
import type { SanityImageSource } from '@sanity/image-url'
import { urlFor } from '../../../sanity/lib/image'
import type { Metadata } from 'next'

interface Props {
  params: Promise<{ lang: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params
  const t = await getTranslations({ locale: lang, namespace: 'company' })
  return { title: t('pageTitle') }
}

export default async function CompanyPage({ params }: Props) {
  const { lang } = await params
  setRequestLocale(lang)

  const t = await getTranslations({ locale: lang })
  const data = await client.fetch(companyQuery, { lang }).catch(() => null)

  return (
    <>
      <Hero
        title={data?.pageTitle || t('company.pageTitle')}
        subtitle={data?.pageSubtitle || t('company.pageSubtitle')}
        imageUrl={data?.heroImage ? urlFor(data.heroImage).width(1920).height(800).url() : undefined}
        size="medium"
      />

      {/* Our Story */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">{t('company.ourStory')}</h2>
              {data?.aboutText ? (
                <PortableText value={data.aboutText} />
              ) : (
                <p className="text-gray-600 leading-relaxed text-lg">
                  Allseeds Turkey is a leading agricultural commodity trading company with a strong presence in global markets.
                </p>
              )}
              {data?.founded && (
                <p className="mt-4 text-sm text-gray-500">
                  Founded: <span className="font-semibold text-gray-700">{data.founded}</span>
                </p>
              )}
            </div>
            <div className="relative h-80 lg:h-96 rounded-2xl overflow-hidden bg-green-100">
              {data?.heroImage ? (
                <Image
                  src={urlFor(data.heroImage).width(800).height(600).url()}
                  alt={t('company.ourStory')}
                  fill
                  className="object-cover"
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-6xl">🏢</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Key figures */}
      {data?.keyFigures && data.keyFigures.length > 0 && (
        <section className="py-16 bg-green-800 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-center mb-10 text-green-100">
              {t('company.keyFigures')}
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              {data.keyFigures.map((fig: { value: string; label: string }, i: number) => (
                <div key={i}>
                  <div className="text-4xl font-bold text-green-300">{fig.value}</div>
                  <div className="text-sm text-green-100 mt-1">{fig.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Locations */}
      {data?.locations && data.locations.length > 0 && (
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
              {t('company.locations')}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {data.locations.map((loc: { city: string; country: string; address: string; isPrimary: boolean }, i: number) => (
                <div key={i} className={`rounded-2xl p-8 border ${loc.isPrimary ? 'bg-green-700 text-white border-green-600' : 'bg-white border-gray-200'}`}>
                  {loc.isPrimary && (
                    <span className="inline-block text-xs font-semibold bg-green-500 text-white px-2 py-0.5 rounded mb-3">
                      HQ
                    </span>
                  )}
                  <h3 className={`text-lg font-bold mb-1 ${loc.isPrimary ? 'text-white' : 'text-gray-900'}`}>
                    {loc.city}
                  </h3>
                  <p className={`text-sm ${loc.isPrimary ? 'text-green-100' : 'text-gray-500'}`}>{loc.country}</p>
                  <p className={`text-sm mt-2 ${loc.isPrimary ? 'text-green-100' : 'text-gray-600'}`}>{loc.address}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Gallery */}
      {data?.galleryImages && data.galleryImages.length > 0 && (
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {data.galleryImages.map((img: SanityImageSource, i: number) => (
                <div key={i} className="relative h-48 md:h-64 rounded-xl overflow-hidden">
                  <Image
                    src={urlFor(img).width(600).height(400).url()}
                    alt={`Gallery ${i + 1}`}
                    fill
                    className="object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  )
}

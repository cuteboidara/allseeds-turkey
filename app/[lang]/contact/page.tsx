import { getTranslations } from 'next-intl/server'
import { setRequestLocale } from 'next-intl/server'
import Hero from '../../../components/Hero'
import ContactForm from '../../../components/ContactForm'
import { client } from '../../../sanity/lib/client'
import { contactQuery } from '../../../lib/sanity/queries'
import imageUrlBuilder from '@sanity/image-url'
import type { SanityImageSource } from '@sanity/image-url'
import type { Metadata } from 'next'

const builder = imageUrlBuilder(client)
function urlFor(source: SanityImageSource) {
  return builder.image(source)
}

interface Props {
  params: Promise<{ lang: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params
  const t = await getTranslations({ locale: lang, namespace: 'contact' })
  return { title: t('pageTitle') }
}

export default async function ContactPage({ params }: Props) {
  const { lang } = await params
  setRequestLocale(lang)

  const t = await getTranslations({ locale: lang })
  const data = await client.fetch(contactQuery, { lang }).catch(() => null)

  return (
    <>
      <Hero
        title={data?.pageTitle || t('contact.pageTitle')}
        subtitle={data?.pageSubtitle || t('contact.pageSubtitle')}
        imageUrl={data?.heroImage ? urlFor(data.heroImage).width(1920).height(800).url() : undefined}
        size="medium"
      />

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Contact info */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">{t('contact.offices')}</h2>
              <div className="space-y-4">
                {data?.locations && data.locations.length > 0 ? (
                  data.locations.map((loc: { city: string; country: string; address: string; phone?: string; email?: string }, i: number) => (
                    <div key={i} className="bg-gray-50 rounded-xl p-6 border border-gray-100">
                      <h3 className="font-semibold text-gray-900">{loc.city}, {loc.country}</h3>
                      <p className="text-sm text-gray-600 mt-1">{loc.address}</p>
                      {loc.phone && <p className="text-sm text-gray-600 mt-2">📞 {loc.phone}</p>}
                      {loc.email && <p className="text-sm text-gray-600">📧 {loc.email}</p>}
                    </div>
                  ))
                ) : (
                  <div className="bg-gray-50 rounded-xl p-6 border border-gray-100">
                    <h3 className="font-semibold text-gray-900">Istanbul, Turkey</h3>
                    <p className="text-sm text-gray-500 mt-0.5">Headquarters</p>
                    <div className="mt-3 space-y-1 text-sm text-gray-600">
                      <p>📧 {data?.email || 'info@allseedsturkey.com'}</p>
                      {data?.phone && <p>📞 {data.phone}</p>}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Form */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                {data?.formTitle || t('contact.pageTitle')}
              </h2>
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

import { getTranslations } from 'next-intl/server'
import { setRequestLocale } from 'next-intl/server'
import Image from 'next/image'
import { Link } from '../../lib/navigation'
import { client } from '../../sanity/lib/client'
import { homepageQuery } from '../../lib/sanity/queries'
import { urlFor } from '../../sanity/lib/image'

interface Props {
  params: Promise<{ lang: string }>
}

export default async function HomePage({ params }: Props) {
  const { lang } = await params
  setRequestLocale(lang)

  const t = await getTranslations({ locale: lang })
  const data = await client.fetch(homepageQuery, { lang }).catch(() => null)

  const activities = [
    { key: 'procurement', icon: '🌾', href: '/activities' },
    { key: 'processing', icon: '⚙️', href: '/activities' },
    { key: 'storage', icon: '🏭', href: '/activities' },
    { key: 'trading', icon: '🌍', href: '/activities' },
  ] as const

  return (
    <>
      {/* Hero */}
      <section className="relative flex items-center justify-center min-h-[90vh] bg-green-900 overflow-hidden">
        {data?.heroImage && (
          <Image
            src={urlFor(data.heroImage).width(1920).height(1080).url()}
            alt={data.heroTitle || 'Allseeds Turkey'}
            fill
            className="object-cover"
            priority
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/60" />
        <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto">
          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold leading-tight mb-6 drop-shadow-md">
            {data?.heroTitle || t('home.heroTitle')}
          </h1>
          <p className="text-lg sm:text-xl text-white/90 max-w-2xl mx-auto leading-relaxed drop-shadow mb-8">
            {data?.heroSubtitle || t('home.heroSubtitle')}
          </p>
          <Link
            href="/contact"
            className="inline-block bg-green-600 hover:bg-green-500 text-white font-semibold px-8 py-3 rounded-lg transition-colors"
          >
            {t('nav.contact')}
          </Link>
        </div>
      </section>

      {/* Stats bar */}
      {data?.statsItems && data.statsItems.length > 0 && (
        <section className="bg-green-800 text-white py-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              {data.statsItems.map((stat: { value: string; label: string }, i: number) => (
                <div key={i}>
                  <div className="text-3xl font-bold text-green-300">{stat.value}</div>
                  <div className="text-sm text-green-100 mt-1">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* About section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                {data?.aboutTitle || t('home.aboutTitle')}
              </h2>
              <p className="text-gray-600 leading-relaxed text-lg">
                {t('home.aboutText')}
              </p>
              <Link
                href="/company"
                className="inline-block mt-6 text-green-700 font-semibold hover:text-green-600 transition-colors"
              >
                {t('home.learnMore')} →
              </Link>
            </div>
            <div className="relative h-80 lg:h-96 rounded-2xl overflow-hidden bg-green-100">
              {data?.aboutImage ? (
                <Image
                  src={urlFor(data.aboutImage).width(800).height(600).url()}
                  alt={data.aboutTitle || 'About Allseeds Turkey'}
                  fill
                  className="object-cover"
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-6xl">🌿</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Activities grid */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">{t('home.ourActivities')}</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {activities.map(({ key, icon, href }) => (
              <Link
                key={key}
                href={href}
                className="group bg-white rounded-2xl p-8 shadow-sm hover:shadow-md transition-shadow border border-gray-100"
              >
                <div className="text-4xl mb-4">{icon}</div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-green-700 transition-colors">
                  {t(`activities.${key}`)}
                </h3>
                <p className="text-sm text-gray-500 leading-relaxed">
                  {t(`activities.${key}Desc`)}
                </p>
              </Link>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link
              href="/activities"
              className="inline-block bg-green-700 hover:bg-green-600 text-white font-semibold px-6 py-3 rounded-lg transition-colors"
            >
              {t('home.viewAll')}
            </Link>
          </div>
        </div>
      </section>

      {/* Sustainability teaser */}
      <section className="py-20 bg-green-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">{t('sustainability.pageTitle')}</h2>
          <p className="text-green-100 max-w-2xl mx-auto mb-8">
            {t('sustainability.pageSubtitle')}
          </p>
          <Link
            href="/sustainability"
            className="inline-block bg-white text-green-800 hover:bg-green-50 font-semibold px-6 py-3 rounded-lg transition-colors"
          >
            {t('home.learnMore')}
          </Link>
        </div>
      </section>
    </>
  )
}

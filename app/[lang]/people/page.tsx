import { getTranslations } from 'next-intl/server'
import { setRequestLocale } from 'next-intl/server'
import Image from 'next/image'
import Hero from '../../../components/Hero'
import PortableText from '../../../components/PortableText'
import { client } from '../../../sanity/lib/client'
import { peopleQuery } from '../../../lib/sanity/queries'
import type { SanityImageSource } from '@sanity/image-url'
import { urlFor } from '../../../sanity/lib/image'
import type { Metadata } from 'next'

interface Props {
  params: Promise<{ lang: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params
  const t = await getTranslations({ locale: lang, namespace: 'people' })
  return { title: t('pageTitle') }
}

export default async function PeoplePage({ params }: Props) {
  const { lang } = await params
  setRequestLocale(lang)

  const t = await getTranslations({ locale: lang })
  const data = await client.fetch(peopleQuery, { lang }).catch(() => null)

  return (
    <>
      <Hero
        title={data?.pageTitle || t('people.pageTitle')}
        subtitle={data?.pageSubtitle || t('people.pageSubtitle')}
        imageUrl={data?.heroImage ? urlFor(data.heroImage).width(1920).height(800).url() : undefined}
        size="medium"
      />

      {/* Team grid */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
            {t('people.meetTeam')}
          </h2>

          {data?.teamMembers && data.teamMembers.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {data.teamMembers.map((member: { name: string; title: string; bio: Parameters<typeof PortableText>[0]['value']; photo: SanityImageSource; email?: string }, i: number) => (
                <div key={i} className="bg-gray-50 rounded-2xl overflow-hidden border border-gray-100 hover:shadow-md transition-shadow">
                  <div className="relative h-64 bg-green-100">
                    {member.photo ? (
                      <Image
                        src={urlFor(member.photo).width(400).height(400).url()}
                        alt={member.name}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-24 h-24 rounded-full bg-green-200 flex items-center justify-center">
                          <span className="text-3xl text-green-700 font-bold">
                            {member.name.charAt(0)}
                          </span>
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="p-6">
                    <h3 className="text-lg font-bold text-gray-900">{member.name}</h3>
                    <p className="text-green-700 text-sm font-medium mt-0.5">{member.title}</p>
                    {member.bio && (
                      <div className="mt-3 text-sm text-gray-600">
                        <PortableText value={member.bio} />
                      </div>
                    )}
                    {member.email && (
                      <a href={`mailto:${member.email}`} className="inline-block mt-3 text-xs text-green-700 hover:text-green-600">
                        {member.email}
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20 text-gray-400">
              <div className="text-6xl mb-4">👥</div>
              <p className="text-lg">{t('common.loading')}</p>
            </div>
          )}
        </div>
      </section>

      {/* Culture */}
      {data?.cultureText && (
        <section className="py-16 bg-green-50">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <PortableText value={data.cultureText} />
          </div>
        </section>
      )}
    </>
  )
}

import { getTranslations } from 'next-intl/server'
import { setRequestLocale } from 'next-intl/server'
import Image from 'next/image'
import PortableText from '../../../components/PortableText'
import { Link } from '../../../lib/navigation'
import { client } from '../../../sanity/lib/client'
import { peopleQuery } from '../../../lib/sanity/queries'
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
  const t = await getTranslations({ locale: lang, namespace: 'people' })
  return { title: t('pageTitle') }
}

export default async function PeoplePage({ params }: Props) {
  const { lang } = await params
  setRequestLocale(lang)

  const t = await getTranslations({ locale: lang })
  const data = await client.fetch(peopleQuery, { lang }).catch(() => null)

  const teamMembers: Array<{
    name: string
    title: string
    bio: Parameters<typeof PortableText>[0]['value']
    photo: SanityImageSource
    email?: string
  }> = data?.teamMembers ?? []

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
            alt="Our People"
            fill
            className="object-cover opacity-30"
            priority
          />
        )}
        <div className="relative z-10 text-white max-w-3xl">
          <p className="text-green-400 text-xs font-bold uppercase tracking-widest mb-3">
            {t('home.ourPeople')}
          </p>
          <h1 className="text-4xl sm:text-5xl font-bold leading-tight mb-4">
            {data?.pageTitle || t('people.pageTitle2')}
          </h1>
          <p className="text-white/60 text-lg">
            {data?.pageSubtitle || t('people.pageSubtitle')}
          </p>
        </div>
      </section>

      {/* ── INTRO (cream) ── */}
      <section style={{ backgroundColor: CREAM }} className="py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-gray-500 text-sm uppercase tracking-widest font-semibold mb-2">Our Team</p>
          <h2 className="text-2xl font-bold" style={{ color: NAVY }}>
            {t('people.meetTeam')}
          </h2>
        </div>
      </section>

      {/* ── TEAM GRID (white) ── */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {teamMembers.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {teamMembers.map((member, i) => (
                <div
                  key={i}
                  className="rounded-2xl overflow-hidden border border-gray-100 hover:shadow-md transition-shadow"
                  style={{ backgroundColor: CREAM }}
                >
                  <div className="relative h-64" style={{ backgroundColor: '#d0cab8' }}>
                    {member.photo ? (
                      <Image
                        src={urlFor(member.photo).width(400).height(400).url()}
                        alt={member.name}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div
                          className="w-20 h-20 rounded-full flex items-center justify-center"
                          style={{ backgroundColor: '#b8b0a0' }}
                        >
                          <span className="text-2xl font-bold text-white">
                            {member.name.charAt(0)}
                          </span>
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="p-6">
                    <h3 className="text-lg font-bold mb-0.5" style={{ color: NAVY }}>{member.name}</h3>
                    <p className="text-green-600 text-sm font-medium">{member.title}</p>
                    {member.bio && (
                      <div className="mt-3 text-sm text-gray-600">
                        <PortableText value={member.bio} />
                      </div>
                    )}
                    {member.email && (
                      <a
                        href={`mailto:${member.email}`}
                        className="inline-block mt-3 text-xs text-green-600 hover:text-green-500"
                      >
                        {member.email}
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            /* Placeholder grid when no Sanity data */
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {Array.from({ length: 8 }).map((_, i) => (
                <div
                  key={i}
                  className="rounded-2xl aspect-square flex flex-col items-center justify-center gap-2"
                  style={{ backgroundColor: '#e8e2d5' }}
                >
                  <span className="text-4xl">👤</span>
                  <span className="text-xs font-semibold text-gray-400">Team Member</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ── VALUES (cream) ── */}
      <section style={{ backgroundColor: CREAM }} className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <p className="text-green-600 text-xs font-bold uppercase tracking-widest mb-3">Why Join Us</p>
              <h2 className="text-3xl font-bold mb-5" style={{ color: NAVY }}>
                {t('home.peopleTitle')}
              </h2>
              <p className="text-gray-600 leading-relaxed mb-8">{t('home.peopleIntro')}</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { icon: '🌍', label: lang === 'tr' ? 'Küresel Erişim' : 'Global Reach' },
                  { icon: '📈', label: lang === 'tr' ? 'Kariyer Gelişimi' : 'Career Growth' },
                  { icon: '🤝', label: lang === 'tr' ? 'İşbirlikçi Ekip' : 'Collaborative Team' },
                  { icon: '🏆', label: lang === 'tr' ? 'Kanıtlanmış Liderlik' : 'Proven Leadership' },
                ].map(({ icon, label }) => (
                  <div
                    key={label}
                    className="rounded-xl p-4 flex items-center gap-3"
                    style={{ backgroundColor: '#e8e2d5' }}
                  >
                    <span className="text-2xl">{icon}</span>
                    <span className="text-sm font-semibold" style={{ color: NAVY }}>{label}</span>
                  </div>
                ))}
              </div>
            </div>
            <div
              className="h-72 lg:h-[420px] rounded-2xl flex flex-col items-center justify-center gap-3"
              style={{ backgroundColor: '#d0cab8' }}
            >
              <span className="text-7xl">👥</span>
              <span className="text-sm font-semibold text-gray-500">
                {lang === 'tr' ? '25+ Yıllık Uzmanlık' : '25+ Years of Expertise'}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ── JOIN US (navy) ── */}
      <section style={{ backgroundColor: NAVY }} className="py-20 text-white text-center">
        <div className="max-w-2xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-4">{t('home.careersTitle')}</h2>
          <p className="text-white/60 leading-relaxed mb-8">{t('people.joinUsIntro')}</p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 bg-green-400 text-[#1a2a4a] font-bold px-7 py-3.5 rounded hover:bg-green-300 transition-colors"
          >
            {t('people.joinUs')} →
          </Link>
        </div>
      </section>
    </>
  )
}

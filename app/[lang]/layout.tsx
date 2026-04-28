import type { Metadata } from 'next'
import { NextIntlClientProvider } from 'next-intl'
import { getMessages, getTranslations } from 'next-intl/server'
import { notFound } from 'next/navigation'
import { hasLocale } from 'next-intl'
import { routing } from '../../lib/routing'
import Header from '../../components/Header'
import Footer from '../../components/Footer'

interface Props {
  children: React.ReactNode
  params: Promise<{ lang: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params
  if (!hasLocale(routing.locales, lang)) notFound()

  const t = await getTranslations({ locale: lang, namespace: 'home' })

  return {
    title: {
      default: 'Allseeds Turkey',
      template: '%s | Allseeds Turkey',
    },
    description: t('heroSubtitle'),
  }
}

export function generateStaticParams() {
  return routing.locales.map((lang) => ({ lang }))
}

export default async function LangLayout({ children, params }: Props) {
  const { lang } = await params
  if (!hasLocale(routing.locales, lang)) notFound()

  const messages = await getMessages()

  return (
    <NextIntlClientProvider messages={messages}>
      <Header />
      <main className="flex-1 pt-16">{children}</main>
      <Footer />
    </NextIntlClientProvider>
  )
}

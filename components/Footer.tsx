import { useTranslations } from 'next-intl'
import { Link } from '../lib/navigation'

export default function Footer() {
  const t = useTranslations()
  const year = new Date().getFullYear()

  const quickLinks = [
    { href: '/activities', label: t('nav.activities') },
    { href: '/sustainability', label: t('nav.sustainability') },
    { href: '/people', label: t('nav.people') },
    { href: '/company', label: t('nav.company') },
    { href: '/contact', label: t('nav.contact') },
  ]

  return (
    <footer className="bg-green-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <div className="text-2xl font-bold mb-2">
              Allseeds<span className="text-green-300">Turkey</span>
            </div>
            <p className="text-green-200 text-sm leading-relaxed">
              {t('footer.tagline')}
            </p>
          </div>

          {/* Quick links */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-green-300 mb-4">
              {t('footer.quickLinks')}
            </h3>
            <ul className="space-y-2">
              {quickLinks.map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href as '/'}
                    className="text-sm text-green-100 hover:text-white transition-colors"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-green-300 mb-4">
              {t('footer.company')}
            </h3>
            <p className="text-sm text-green-100">Allseeds Turkey</p>
            <p className="text-sm text-green-100 mt-1">Istanbul, Turkey</p>
            <Link
              href="/contact"
              className="inline-block mt-3 text-sm text-green-300 hover:text-white transition-colors"
            >
              {t('nav.contact')} →
            </Link>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-green-800 flex flex-col sm:flex-row justify-between items-center gap-2">
          <p className="text-xs text-green-400">
            © {year} Allseeds Turkey. {t('footer.rights')}
          </p>
        </div>
      </div>
    </footer>
  )
}

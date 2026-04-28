'use client'

import { useTranslations } from 'next-intl'
import { Link } from '../lib/navigation'

export default function Footer() {
  const t = useTranslations()
  const year = new Date().getFullYear()

  return (
    <footer style={{ backgroundColor: '#1a2a4a' }} className="text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-14 pb-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 pb-10 border-b border-white/10">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <div className="text-2xl font-bold mb-3 tracking-tight">
              Allseeds<span className="text-green-400">Turkey</span>
            </div>
            <p className="text-white/60 text-sm leading-relaxed max-w-[220px]">
              {t('footer.tagline')}
            </p>
          </div>

          {/* Locations */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-widest text-white/40 mb-4">
              {t('footer.locations')}
            </h3>
            <ul className="space-y-2 text-sm text-white/70">
              <li>Istanbul</li>
              <li>Geneva</li>
              <li>Luxembourg</li>
              <li>Kyiv</li>
              <li>Mumbai</li>
            </ul>
          </div>

          {/* Activities */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-widest text-white/40 mb-4">
              {t('footer.activities')}
            </h3>
            <ul className="space-y-2">
              {['activities', 'sustainability', 'people', 'company'].map((href) => (
                <li key={href}>
                  <Link
                    href={`/${href}` as '/'}
                    className="text-sm text-white/70 hover:text-green-400 transition-colors"
                  >
                    {t(`nav.${href}`)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-widest text-white/40 mb-4">
              {t('footer.company')}
            </h3>
            <ul className="space-y-2">
              <li>
                <Link href="/contact" className="text-sm text-white/70 hover:text-green-400 transition-colors">
                  {t('nav.contact')}
                </Link>
              </li>
              <li>
                <a href="mailto:turkey@allseeds.com" className="text-sm text-white/70 hover:text-green-400 transition-colors">
                  turkey@allseeds.com
                </a>
              </li>
              <li className="text-sm text-white/70">Istanbul, Turkey</li>
            </ul>
          </div>
        </div>

        <div className="mt-6 flex flex-col sm:flex-row justify-between items-center gap-2">
          <p className="text-xs text-white/30">
            © {year} Allseeds Turkey. {t('footer.rights')}
          </p>
          <p className="text-xs text-white/30">
            Part of <span className="text-white/50">Allseeds Group</span>
          </p>
        </div>
      </div>
    </footer>
  )
}

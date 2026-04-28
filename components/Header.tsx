'use client'

import { useState } from 'react'
import { useTranslations, useLocale } from 'next-intl'
import { Link, usePathname } from '../lib/navigation'

export default function Header() {
  const t = useTranslations('nav')
  const locale = useLocale()
  const pathname = usePathname()
  const [menuOpen, setMenuOpen] = useState(false)

  const navLinks = [
    { href: '/', label: t('home') },
    { href: '/activities', label: t('activities') },
    { href: '/sustainability', label: t('sustainability') },
    { href: '/people', label: t('people') },
    { href: '/company', label: t('company') },
    { href: '/contact', label: t('contact') },
  ]

  const otherLocale = locale === 'en' ? 'tr' : 'en'

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <span className="text-xl font-bold text-green-800 tracking-tight">
              Allseeds<span className="text-green-500">Turkey</span>
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-6">
            {navLinks.map(({ href, label }) => (
              <Link
                key={href}
                href={href as '/'}
                className="text-sm font-medium text-gray-700 hover:text-green-700 transition-colors"
              >
                {label}
              </Link>
            ))}
          </nav>

          {/* Lang switcher + mobile toggle */}
          <div className="flex items-center gap-3">
            <Link
              href={pathname}
              locale={otherLocale}
              className="text-xs font-semibold px-2.5 py-1 rounded border border-gray-300 text-gray-600 hover:border-green-600 hover:text-green-700 transition-colors uppercase"
            >
              {otherLocale}
            </Link>

            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden p-2 text-gray-700 hover:text-green-700"
              aria-label="Toggle menu"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {menuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden border-t border-gray-100 bg-white">
          <nav className="px-4 py-3 flex flex-col gap-1">
            {navLinks.map(({ href, label }) => (
              <Link
                key={href}
                href={href as '/'}
                onClick={() => setMenuOpen(false)}
                className="py-2 text-sm font-medium text-gray-700 hover:text-green-700 transition-colors"
              >
                {label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  )
}

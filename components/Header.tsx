'use client'

import { useState } from 'react'
import { useLocale } from 'next-intl'
import { useTranslations } from 'next-intl'
import { Link, usePathname } from '../lib/navigation'

const NAVY = '#1a2a4a'
const CREAM = '#f5f1e8'

export default function Header() {
  const t = useTranslations('nav')
  const locale = useLocale()
  const pathname = usePathname()
  const [menuOpen, setMenuOpen] = useState(false)

  const navLinks = [
    { href: '/activities', label: t('activities') },
    { href: '/sustainability', label: t('sustainability') },
    { href: '/people', label: t('people') },
    { href: '/company', label: t('company') },
    { href: '/contact', label: t('contact') },
  ]

  return (
    <header className="fixed top-0 left-0 right-0 z-50" style={{ backgroundColor: CREAM }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-[68px]">

          {/* ── Logo ── */}
          <Link href="/" className="flex items-center gap-2 shrink-0">
            <span className="text-2xl leading-none">🌻</span>
            <span className="text-[17px] font-bold tracking-tight" style={{ color: NAVY }}>
              Allseeds<span className="text-green-500">Turkey</span>
            </span>
          </Link>

          {/* ── Desktop nav ── */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map(({ href, label }) => {
              const isActive = pathname === href
              return (
                <Link
                  key={href}
                  href={href as '/'}
                  className="relative text-sm font-medium pb-0.5 transition-colors hover:text-green-600"
                  style={{ color: isActive ? '#16a34a' : NAVY }}
                >
                  {label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-[2px] rounded-full bg-green-500" />
                  )}
                </Link>
              )
            })}
          </nav>

          {/* ── Right side: lang toggle + hamburger ── */}
          <div className="flex items-center gap-4">
            {/* Language toggle — desktop */}
            <div className="hidden md:flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-widest">
              <Link
                href={pathname}
                locale="en"
                className="transition-colors hover:text-green-600"
                style={{
                  color: locale === 'en' ? NAVY : '#aaa8a0',
                  textDecoration: locale === 'en' ? 'underline' : 'none',
                  textUnderlineOffset: '3px',
                }}
              >
                EN
              </Link>
              <span style={{ color: '#d0ccc4' }}>|</span>
              <Link
                href={pathname}
                locale="tr"
                className="transition-colors hover:text-green-600"
                style={{
                  color: locale === 'tr' ? NAVY : '#aaa8a0',
                  textDecoration: locale === 'tr' ? 'underline' : 'none',
                  textUnderlineOffset: '3px',
                }}
              >
                TR
              </Link>
            </div>

            {/* Hamburger — mobile only */}
            <button
              onClick={() => setMenuOpen((o) => !o)}
              className="md:hidden p-1.5 rounded transition-colors hover:bg-[#ece8dd]"
              style={{ color: NAVY }}
              aria-label="Toggle menu"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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

      {/* ── Mobile menu ── */}
      {menuOpen && (
        <div
          className="md:hidden border-t"
          style={{ backgroundColor: CREAM, borderColor: '#e0dbd0' }}
        >
          <nav className="max-w-7xl mx-auto px-4 py-2 flex flex-col">
            {navLinks.map(({ href, label }) => {
              const isActive = pathname === href
              return (
                <Link
                  key={href}
                  href={href as '/'}
                  onClick={() => setMenuOpen(false)}
                  className="py-3 text-sm font-medium border-b transition-colors"
                  style={{
                    color: isActive ? '#16a34a' : NAVY,
                    borderColor: '#e8e2d5',
                  }}
                >
                  {label}
                </Link>
              )
            })}

            {/* Language toggle inside mobile menu */}
            <div className="flex items-center gap-3 py-4 text-[11px] font-bold uppercase tracking-widest">
              <Link
                href={pathname}
                locale="en"
                onClick={() => setMenuOpen(false)}
                style={{
                  color: locale === 'en' ? NAVY : '#aaa8a0',
                  textDecoration: locale === 'en' ? 'underline' : 'none',
                  textUnderlineOffset: '3px',
                }}
              >
                EN
              </Link>
              <span style={{ color: '#d0ccc4' }}>|</span>
              <Link
                href={pathname}
                locale="tr"
                onClick={() => setMenuOpen(false)}
                style={{
                  color: locale === 'tr' ? NAVY : '#aaa8a0',
                  textDecoration: locale === 'tr' ? 'underline' : 'none',
                  textUnderlineOffset: '3px',
                }}
              >
                TR
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  )
}

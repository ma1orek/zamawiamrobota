import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Bot } from 'lucide-react'
import { theme } from '../theme'
import useIsMobile from '../hooks/useIsMobile'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const m = useIsMobile()
  const location = useLocation()
  const isHome = location.pathname === '/'

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setMenuOpen(false)
  }, [location])

  const handleNavClick = (href: string) => {
    setMenuOpen(false)
    if (isHome && href.startsWith('/#')) {
      const el = document.querySelector(href.replace('/', ''))
      if (el) el.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const onHero = isHome && !scrolled && !menuOpen
  const textColor = onHero ? '#fff' : theme.colors.text
  const linkColor = onHero ? 'rgba(255,255,255,0.7)' : theme.colors.textSecondary
  const linkHover = onHero ? '#fff' : theme.colors.text
  const hamburgerColor = onHero ? '#fff' : theme.colors.text

  const navLinks = [
    { label: 'Roboty', href: '/#roboty' },
    { label: 'Finansowanie', href: '/kupuje-robota' },
    { label: 'FAQ', href: '/#faq' },
  ]

  return (
    <nav
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        background: onHero
          ? 'rgba(0,0,0,0.25)'
          : theme.colors.navBg,
        backdropFilter: 'blur(16px)',
        borderBottom: onHero
          ? '1px solid rgba(255,255,255,0.08)'
          : `1px solid ${theme.colors.navBorder}`,
        transition: 'all 0.3s ease',
      }}
    >
      <div
        style={{
          maxWidth: 1400,
          margin: '0 auto',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: m ? '12px 20px' : '12px 48px',
        }}
      >
        <Link
          to="/"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            fontSize: 18,
            fontWeight: 700,
            color: textColor,
            letterSpacing: '-0.02em',
            transition: 'color 0.3s',
          }}
        >
          <Bot size={22} color={theme.colors.accent} />
          <span>zamawiam</span><span style={{ color: theme.colors.accent }}>robota</span>
        </Link>

        {m ? (
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 8 }}
          >
            <div style={{ width: 22, height: 2, background: hamburgerColor, marginBottom: 5, transition: 'all 0.3s', transform: menuOpen ? 'rotate(45deg) translate(3px, 3px)' : 'none' }} />
            <div style={{ width: 22, height: 2, background: hamburgerColor, marginBottom: 5, opacity: menuOpen ? 0 : 1, transition: 'opacity 0.3s' }} />
            <div style={{ width: 22, height: 2, background: hamburgerColor, transition: 'all 0.3s', transform: menuOpen ? 'rotate(-45deg) translate(3px, -3px)' : 'none' }} />
          </button>
        ) : (
          <div style={{ display: 'flex', alignItems: 'center', gap: 32 }}>
            {navLinks.map((item) =>
              item.href.startsWith('/#') && isHome ? (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={(e) => { e.preventDefault(); handleNavClick(item.href) }}
                  style={{ fontSize: 14, fontWeight: 500, color: linkColor, transition: 'color 0.2s' }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = linkHover)}
                  onMouseLeave={(e) => (e.currentTarget.style.color = linkColor)}
                >
                  {item.label}
                </a>
              ) : (
                <Link
                  key={item.label}
                  to={item.href}
                  style={{ fontSize: 14, fontWeight: 500, color: linkColor, transition: 'color 0.2s' }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = linkHover)}
                  onMouseLeave={(e) => (e.currentTarget.style.color = linkColor)}
                >
                  {item.label}
                </Link>
              )
            )}
            <Link
              to="/kupuje-robota"
              style={{
                background: theme.colors.accent,
                color: '#fff',
                padding: '10px 24px',
                borderRadius: theme.borderRadius.sm,
                fontSize: 14,
                fontWeight: 600,
                transition: 'background 0.2s',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = theme.colors.accentHover)}
              onMouseLeave={(e) => (e.currentTarget.style.background = theme.colors.accent)}
            >
              Zamów robota
            </Link>
          </div>
        )}
      </div>

      {m && menuOpen && (
        <div
          style={{
            padding: '16px 20px 24px',
            display: 'flex',
            flexDirection: 'column',
            gap: 16,
            borderTop: `1px solid ${theme.colors.navBorder}`,
            background: theme.colors.navBg,
          }}
        >
          {navLinks.map((item) => (
            <Link
              key={item.label}
              to={item.href}
              onClick={() => handleNavClick(item.href)}
              style={{ fontSize: 16, fontWeight: 500, color: theme.colors.text, padding: '8px 0' }}
            >
              {item.label}
            </Link>
          ))}
          <Link
            to="/kupuje-robota"
            onClick={() => setMenuOpen(false)}
            style={{
              background: theme.colors.accent,
              color: '#fff',
              padding: '12px 24px',
              borderRadius: theme.borderRadius.sm,
              fontSize: 15,
              fontWeight: 600,
              textAlign: 'center',
            }}
          >
            Zamów robota
          </Link>
        </div>
      )}
    </nav>
  )
}

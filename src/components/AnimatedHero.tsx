import { motion } from 'framer-motion'
import { ArrowDown, Bot, Sparkles } from 'lucide-react'
import { theme } from '../theme'
import useIsMobile from '../hooks/useIsMobile'

export default function AnimatedHero() {
  const m = useIsMobile()

  return (
    <section
      style={{
        position: 'relative',
        height: m ? '85vh' : '90vh',
        minHeight: 500,
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#0a0a1a',
      }}
    >
      {/* Video background */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 0,
        }}
      >
        <video
          autoPlay
          muted
          loop
          playsInline
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            minWidth: '100%',
            minHeight: '100%',
            width: 'auto',
            height: 'auto',
            objectFit: 'cover',
          }}
        >
          <source src="/robot/video2-1.mp4" type="video/mp4" />
        </video>
        {/* Dark overlay */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(180deg, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.4) 50%, rgba(0,0,0,0.7) 100%)',
            zIndex: 1,
          }}
        />
      </div>

      {/* Animated grid lines */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 1, opacity: 0.08, overflow: 'hidden' }}>
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={`v${i}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.5, 0] }}
            transition={{ duration: 4, delay: i * 0.3, repeat: Infinity, ease: 'easeInOut' }}
            style={{
              position: 'absolute',
              left: `${(i + 1) * (100 / 13)}%`,
              top: 0,
              bottom: 0,
              width: 1,
              background: `linear-gradient(180deg, transparent, ${theme.colors.accent}, transparent)`,
            }}
          />
        ))}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={`h${i}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.3, 0] }}
            transition={{ duration: 5, delay: i * 0.5, repeat: Infinity, ease: 'easeInOut' }}
            style={{
              position: 'absolute',
              top: `${(i + 1) * (100 / 7)}%`,
              left: 0,
              right: 0,
              height: 1,
              background: `linear-gradient(90deg, transparent, ${theme.colors.accent}, transparent)`,
            }}
          />
        ))}
      </div>

      {/* Floating particles */}
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={`p${i}`}
          initial={{
            x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1200),
            y: Math.random() * 600,
            opacity: 0,
          }}
          animate={{
            y: [null, Math.random() * -200 - 50],
            opacity: [0, 0.6, 0],
          }}
          transition={{
            duration: 6 + Math.random() * 4,
            delay: Math.random() * 5,
            repeat: Infinity,
            ease: 'easeOut',
          }}
          style={{
            position: 'absolute',
            width: 3,
            height: 3,
            borderRadius: '50%',
            background: theme.colors.accent,
            zIndex: 2,
          }}
        />
      ))}

      {/* Content */}
      <div
        style={{
          position: 'relative',
          zIndex: 3,
          textAlign: 'center',
          padding: m ? '0 24px' : '0 48px',
          maxWidth: 800,
        }}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 8,
            padding: '8px 20px',
            background: 'rgba(0, 102, 255, 0.15)',
            border: '1px solid rgba(0, 102, 255, 0.3)',
            borderRadius: 24,
            marginBottom: 24,
          }}
        >
          <Sparkles size={16} color={theme.colors.accent} />
          <span style={{ fontSize: 13, fontWeight: 600, color: theme.colors.accent }}>
            Przyszłość jest teraz
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          style={{
            fontSize: m ? 'clamp(32px, 9vw, 56px)' : 'clamp(40px, 5vw, 72px)',
            fontWeight: 700,
            color: '#fff',
            lineHeight: 1.1,
            letterSpacing: '-0.03em',
            marginBottom: 20,
          }}
        >
          Zamów swojego
          <br />
          <span style={{ color: theme.colors.accent }}>robota</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          style={{
            fontSize: m ? 16 : 20,
            color: 'rgba(255,255,255,0.7)',
            lineHeight: 1.6,
            maxWidth: 560,
            margin: '0 auto 32px',
          }}
        >
          Roboty humanoidalne i czworonożne z finansowaniem od 9 banków. Raty już od ~1 500 zł/mies.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}
        >
          <a
            href="#roboty"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              padding: '16px 36px',
              background: theme.colors.accent,
              color: '#fff',
              borderRadius: theme.borderRadius.sm,
              fontSize: 16,
              fontWeight: 700,
              transition: 'all 0.2s',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = theme.colors.accentHover
              e.currentTarget.style.transform = 'translateY(-2px)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = theme.colors.accent
              e.currentTarget.style.transform = 'translateY(0)'
            }}
          >
            <Bot size={20} />
            Zobacz roboty
          </a>
          <a
            href="/kupuje-robota"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              padding: '16px 28px',
              background: 'transparent',
              color: '#fff',
              border: '1px solid rgba(255,255,255,0.25)',
              borderRadius: theme.borderRadius.sm,
              fontSize: 14,
              fontWeight: 600,
              transition: 'all 0.2s',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(255,255,255,0.1)'
              e.currentTarget.style.borderColor = 'rgba(255,255,255,0.4)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'transparent'
              e.currentTarget.style.borderColor = 'rgba(255,255,255,0.25)'
            }}
          >
            Sprawdź finansowanie
          </a>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        style={{
          position: 'absolute',
          bottom: 32,
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 3,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 4,
        }}
      >
        <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
          Przewiń
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ArrowDown size={16} color="rgba(255,255,255,0.4)" />
        </motion.div>
      </motion.div>
    </section>
  )
}

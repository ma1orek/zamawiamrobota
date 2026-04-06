import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Wallet, Building, Zap, ArrowRight } from 'lucide-react'
import { theme } from '../theme'
import useIsMobile from '../hooks/useIsMobile'
import type { RobotProduct } from '../data/robotSpecs'
import { formatPLNShort } from '../utils/formatters'
import type { LucideIcon } from 'lucide-react'

const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, delay, ease: 'easeOut' as const },
})

interface Props {
  robot: RobotProduct
}

export default function ProductHero({ robot }: Props) {
  const m = useIsMobile()

  const trustBadges: { Icon: LucideIcon; text: string }[] = [
    { Icon: Wallet, text: `Finansowanie od ${robot.monthlyFrom} zł/mies.` },
    { Icon: Building, text: '9 banków do porównania' },
    { Icon: Zap, text: 'Decyzja w 15 min' },
  ]

  return (
    <section
      id="produkt"
      style={{
        padding: m ? '100px 20px 60px' : '120px 48px 80px',
        background: `linear-gradient(180deg, ${theme.colors.bgSecondary} 0%, ${theme.colors.bg} 100%)`,
      }}
    >
      <div
        style={{
          maxWidth: theme.spacing.maxWidth,
          margin: '0 auto',
          display: 'flex',
          flexDirection: m ? 'column' : 'row',
          alignItems: 'center',
          gap: m ? 40 : 64,
        }}
      >
        <div style={{ flex: 1 }}>
          <motion.p
            {...fadeUp(0)}
            style={{
              fontSize: 13,
              fontWeight: 600,
              color: theme.colors.accent,
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              marginBottom: 12,
            }}
          >
            Robot humanoidalny
          </motion.p>

          <motion.h1
            {...fadeUp(0.1)}
            style={{
              fontSize: m ? 'clamp(36px, 8vw, 56px)' : 'clamp(40px, 4vw, 64px)',
              fontWeight: 700,
              color: theme.colors.text,
              lineHeight: 1.1,
              letterSpacing: '-0.03em',
              marginBottom: 16,
            }}
          >
            {robot.name}
          </motion.h1>

          <motion.p
            {...fadeUp(0.2)}
            style={{
              fontSize: m ? 16 : 18,
              color: theme.colors.textSecondary,
              lineHeight: 1.6,
              maxWidth: 480,
              marginBottom: 24,
            }}
          >
            {robot.description}
          </motion.p>

          <motion.div
            {...fadeUp(0.3)}
            style={{
              display: 'flex',
              alignItems: 'baseline',
              gap: 12,
              marginBottom: 32,
            }}
          >
            <span style={{ fontSize: m ? 32 : 40, fontWeight: 700, color: theme.colors.text }}>
              {formatPLNShort(robot.price)}
            </span>
            <span style={{ fontSize: 14, color: theme.colors.textSecondary }}>
              lub od <strong style={{ color: theme.colors.accent }}>{robot.monthlyFrom} zł</strong>/mies.
            </span>
          </motion.div>

          <motion.div
            {...fadeUp(0.4)}
            style={{ display: 'flex', flexDirection: m ? 'column' : 'row', gap: 12, marginBottom: 32 }}
          >
            <Link
              to="/kupuje-robota"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 8,
                background: theme.colors.accent,
                color: theme.colors.accentText,
                padding: '16px 36px',
                borderRadius: theme.borderRadius.sm,
                fontSize: 16,
                fontWeight: 700,
                transition: 'background 0.2s, transform 0.2s',
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
              ZAMÓW ROBOTA
              <ArrowRight size={20} />
            </Link>

            <a
              href="#specyfikacja"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '16px 28px',
                border: `1px solid ${theme.colors.borderHover}`,
                borderRadius: theme.borderRadius.sm,
                fontSize: 14,
                fontWeight: 600,
                color: theme.colors.text,
                transition: 'all 0.2s',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = theme.colors.bgSecondary
                e.currentTarget.style.borderColor = theme.colors.accent
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'transparent'
                e.currentTarget.style.borderColor = theme.colors.borderHover
              }}
            >
              Zobacz specyfikację
            </a>
          </motion.div>

          <motion.div
            {...fadeUp(0.5)}
            style={{
              display: 'flex',
              gap: m ? 16 : 24,
              flexWrap: 'wrap',
            }}
          >
            {trustBadges.map((badge) => (
              <div
                key={badge.text}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 6,
                  fontSize: 13,
                  color: theme.colors.textSecondary,
                }}
              >
                <badge.Icon size={16} color={theme.colors.accent} />
                {badge.text}
              </div>
            ))}
          </motion.div>
        </div>

        <motion.div
          {...fadeUp(0.2)}
          style={{
            flex: 1,
            display: 'flex',
            justifyContent: 'center',
            maxWidth: m ? '100%' : 500,
          }}
        >
          <video
            autoPlay
            muted
            loop
            playsInline
            style={{
              width: '100%',
              maxWidth: 450,
              height: 'auto',
              borderRadius: theme.borderRadius.lg,
              objectFit: 'cover',
            }}
          >
            <source src="/robot/Unitree-G1-walking-running-1.mp4" type="video/mp4" />
          </video>
        </motion.div>
      </div>
    </section>
  )
}

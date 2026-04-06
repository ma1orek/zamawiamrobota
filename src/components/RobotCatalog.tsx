import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Bot } from 'lucide-react'
import { theme } from '../theme'
import useIsMobile from '../hooks/useIsMobile'
import { robots } from '../data/robotSpecs'
import { formatPLNShort } from '../utils/formatters'

export default function RobotCatalog() {
  const m = useIsMobile()
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-50px' })

  return (
    <section
      id="roboty"
      ref={ref}
      style={{
        padding: m ? '64px 20px 64px' : '80px 48px 100px',
        background: `linear-gradient(180deg, ${theme.colors.bgSecondary} 0%, ${theme.colors.bg} 100%)`,
      }}
    >
      <div style={{ maxWidth: theme.spacing.maxWidth, margin: '0 auto' }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          style={{ textAlign: 'center', marginBottom: m ? 40 : 64 }}
        >
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 16 }}>
            <Bot size={32} color={theme.colors.accent} />
          </div>
          <h1
            style={{
              fontSize: m ? 'clamp(28px, 7vw, 48px)' : 'clamp(36px, 4vw, 56px)',
              fontWeight: 700,
              color: theme.colors.text,
              letterSpacing: '-0.03em',
              lineHeight: 1.15,
              marginBottom: 16,
            }}
          >
            Roboty na wyciągnięcie ręki
          </h1>
          <p
            style={{
              fontSize: m ? 16 : 18,
              color: theme.colors.textSecondary,
              maxWidth: 560,
              margin: '0 auto',
              lineHeight: 1.6,
            }}
          >
            Wybierz robota, porównaj finansowanie z 9 banków i zamów z dostawą. Raty już od ~1 500 zł/mies.
          </p>
        </motion.div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: m ? '1fr' : 'repeat(3, 1fr)',
            gap: m ? 20 : 24,
          }}
        >
          {robots.map((robot, idx) => (
            <motion.div
              key={robot.id}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: idx * 0.15 }}
            >
              <Link
                to={`/robot/${robot.id}`}
                style={{
                  display: 'block',
                  background: theme.colors.bg,
                  border: `1px solid ${theme.colors.border}`,
                  borderRadius: theme.borderRadius.lg,
                  overflow: 'hidden',
                  transition: 'all 0.3s',
                  textDecoration: 'none',
                  color: 'inherit',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = theme.colors.accent
                  e.currentTarget.style.boxShadow = theme.colors.cardShadowHover
                  e.currentTarget.style.transform = 'translateY(-4px)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = theme.colors.border
                  e.currentTarget.style.boxShadow = 'none'
                  e.currentTarget.style.transform = 'translateY(0)'
                }}
              >
                <div
                  style={{
                    aspectRatio: '4/3',
                    background: theme.colors.bgSecondary,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    overflow: 'hidden',
                  }}
                >
                  <img
                    src={robot.heroImage}
                    alt={robot.name}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'contain',
                      padding: 16,
                    }}
                  />
                </div>

                <div style={{ padding: m ? 20 : 24 }}>
                  <p
                    style={{
                      fontSize: 12,
                      fontWeight: 600,
                      color: theme.colors.accent,
                      textTransform: 'uppercase',
                      letterSpacing: '0.08em',
                      marginBottom: 6,
                    }}
                  >
                    {robot.subtitle}
                  </p>

                  <h2
                    style={{
                      fontSize: m ? 22 : 24,
                      fontWeight: 700,
                      color: theme.colors.text,
                      marginBottom: 8,
                    }}
                  >
                    {robot.name}
                  </h2>

                  <p
                    style={{
                      fontSize: 14,
                      color: theme.colors.textSecondary,
                      lineHeight: 1.6,
                      marginBottom: 16,
                      minHeight: m ? 'auto' : 44,
                    }}
                  >
                    {robot.shortDescription}
                  </p>

                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'baseline',
                      gap: 8,
                      marginBottom: 16,
                      paddingTop: 16,
                      borderTop: `1px solid ${theme.colors.border}`,
                    }}
                  >
                    <span style={{ fontSize: 24, fontWeight: 700, color: theme.colors.text }}>
                      {formatPLNShort(robot.price)}
                    </span>
                    <span style={{ fontSize: 13, color: theme.colors.textSecondary }}>
                      lub {robot.monthlyFrom} zl/mies.
                    </span>
                  </div>

                  <div
                    style={{
                      display: 'flex',
                      flexWrap: 'wrap',
                      gap: 6,
                      marginBottom: 16,
                    }}
                  >
                    {robot.specs.slice(0, 4).map((spec) => (
                      <span
                        key={spec.label}
                        style={{
                          padding: '4px 10px',
                          background: theme.colors.bgSecondary,
                          borderRadius: 12,
                          fontSize: 11,
                          color: theme.colors.textSecondary,
                          fontWeight: 500,
                        }}
                      >
                        {spec.value}
                      </span>
                    ))}
                  </div>

                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 6,
                      fontSize: 14,
                      fontWeight: 600,
                      color: theme.colors.accent,
                    }}
                  >
                    Zobacz więcej
                    <ArrowRight size={16} />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

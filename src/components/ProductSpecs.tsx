import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { Settings2, Weight, Ruler, Battery, Zap, Dumbbell, Radar, Camera, Cpu, Wifi, BatteryCharging, RotateCw } from 'lucide-react'
import { theme } from '../theme'
import useIsMobile from '../hooks/useIsMobile'
import type { RobotProduct } from '../data/robotSpecs'
import type { LucideIcon } from 'lucide-react'

const specIconMap: Record<string, LucideIcon> = {
  'Stopnie swobody': Settings2,
  'Waga': Weight,
  'Wysokość': Ruler,
  'Czas pracy': Battery,
  'Prędkość': Zap,
  'Udźwig': Dumbbell,
  'LiDAR': Radar,
  'Kamera głębi': Camera,
  'Procesor': Cpu,
  'Łączność': Wifi,
  'Bateria': BatteryCharging,
  'Moment obrotowy': RotateCw,
}

interface Props {
  robot: RobotProduct
}

export default function ProductSpecs({ robot }: Props) {
  const m = useIsMobile()
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section
      id="specyfikacja"
      ref={ref}
      style={{
        padding: m ? '64px 20px' : '100px 48px',
      }}
    >
      <div style={{ maxWidth: theme.spacing.maxWidth, margin: '0 auto' }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          style={{ textAlign: 'center', marginBottom: m ? 40 : 64 }}
        >
          <h2
            style={{
              fontSize: m ? 28 : 40,
              fontWeight: 700,
              color: theme.colors.text,
              letterSpacing: '-0.02em',
              marginBottom: 12,
            }}
          >
            Specyfikacja techniczna
          </h2>
          <p style={{ fontSize: 16, color: theme.colors.textSecondary, maxWidth: 600, margin: '0 auto' }}>
            Poznaj parametry robota humanoidalnego {robot.name}
          </p>
        </motion.div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: m ? 'repeat(2, 1fr)' : 'repeat(4, 1fr)',
            gap: m ? 12 : 16,
            marginBottom: m ? 40 : 64,
          }}
        >
          {robot.specs.map((spec, idx) => {
            const IconComponent = specIconMap[spec.label]
            return (
              <motion.div
                key={spec.label}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: idx * 0.05 }}
                style={{
                  background: theme.colors.bgSecondary,
                  border: `1px solid ${theme.colors.border}`,
                  borderRadius: theme.borderRadius.md,
                  padding: m ? '16px 14px' : '20px',
                  textAlign: 'center',
                  transition: 'border-color 0.2s, box-shadow 0.2s',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = theme.colors.accent
                  e.currentTarget.style.boxShadow = theme.colors.cardShadow
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = theme.colors.border
                  e.currentTarget.style.boxShadow = 'none'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 8 }}>
                  {IconComponent ? (
                    <IconComponent size={24} color={theme.colors.accent} />
                  ) : (
                    <Settings2 size={24} color={theme.colors.accent} />
                  )}
                </div>
                <div style={{ fontSize: m ? 16 : 18, fontWeight: 700, color: theme.colors.text, marginBottom: 4 }}>
                  {spec.value}
                </div>
                <div style={{ fontSize: 12, color: theme.colors.textMuted, fontWeight: 500 }}>
                  {spec.label}
                </div>
              </motion.div>
            )
          })}
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: m ? '1fr' : 'repeat(2, 1fr)',
            gap: m ? 16 : 24,
          }}
        >
          {robot.features.map((feature, idx) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.3 + idx * 0.1 }}
              style={{
                background: theme.colors.bg,
                border: `1px solid ${theme.colors.border}`,
                borderRadius: theme.borderRadius.md,
                padding: m ? 24 : 32,
              }}
            >
              <h3
                style={{
                  fontSize: 18,
                  fontWeight: 600,
                  color: theme.colors.text,
                  marginBottom: 8,
                }}
              >
                {feature.title}
              </h3>
              <p style={{ fontSize: 14, color: theme.colors.textSecondary, lineHeight: 1.7 }}>
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.7 }}
          style={{
            marginTop: m ? 32 : 48,
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            gap: 12,
          }}
        >
          {robot.functions.map((fn) => (
            <span
              key={fn}
              style={{
                padding: '8px 16px',
                background: theme.colors.accentLight,
                color: theme.colors.accent,
                borderRadius: 20,
                fontSize: 13,
                fontWeight: 600,
              }}
            >
              {fn}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

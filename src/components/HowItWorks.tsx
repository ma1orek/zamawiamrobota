import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { Search, FileText, CheckCircle, PenTool, Bot } from 'lucide-react'
import { theme } from '../theme'
import useIsMobile from '../hooks/useIsMobile'
import type { LucideIcon } from 'lucide-react'

const steps: { num: number; title: string; description: string; Icon: LucideIcon }[] = [
  {
    num: 1,
    title: 'Porównaj oferty',
    description: 'Wpisz kwotę i okres spłaty, sprawdź ranking ofert kredytowych z 9 banków.',
    Icon: Search,
  },
  {
    num: 2,
    title: 'Wyślij zgłoszenie',
    description: 'Wybierz ofertę, która Cię zainteresowała i wyślij zgłoszenie. W kilka minut oddzwoni doradca.',
    Icon: FileText,
  },
  {
    num: 3,
    title: 'Wybierz kredyt',
    description: 'Poznaj szczegóły oferty, sprawdź warunki i wybierz najlepszy kredyt dla siebie.',
    Icon: CheckCircle,
  },
  {
    num: 4,
    title: 'Podpisz umowę',
    description: 'Przygotuj dokumenty i podpisz umowę kredytową w banku lub online.',
    Icon: PenTool,
  },
  {
    num: 5,
    title: 'Odbierz robota',
    description: 'Po uruchomieniu kredytu Twój robot Unitree G1 zostanie dostarczony pod wskazany adres.',
    Icon: Bot,
  },
]

export default function HowItWorks() {
  const m = useIsMobile()
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section
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
            Jak dostaniesz robota na kredyt?
          </h2>
          <p style={{ fontSize: 16, color: theme.colors.textSecondary }}>
            5 prostych kroków do Twojego robota humanoidalnego
          </p>
        </motion.div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: m ? '1fr' : 'repeat(5, 1fr)',
            gap: m ? 24 : 16,
          }}
        >
          {steps.map((step, idx) => (
            <motion.div
              key={step.num}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              style={{
                textAlign: 'center',
                position: 'relative',
              }}
            >
              <div
                style={{
                  width: 56,
                  height: 56,
                  borderRadius: '50%',
                  background: theme.colors.accentLight,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 16px',
                }}
              >
                <step.Icon size={24} color={theme.colors.accent} />
              </div>

              <div
                style={{
                  fontSize: 12,
                  fontWeight: 700,
                  color: theme.colors.accent,
                  marginBottom: 8,
                }}
              >
                KROK {step.num}
              </div>

              <h3
                style={{
                  fontSize: 16,
                  fontWeight: 600,
                  color: theme.colors.text,
                  marginBottom: 8,
                }}
              >
                {step.title}
              </h3>

              <p
                style={{
                  fontSize: 13,
                  color: theme.colors.textSecondary,
                  lineHeight: 1.6,
                }}
              >
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

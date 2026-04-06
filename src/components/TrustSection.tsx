import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { Shield, Headphones, Wallet } from 'lucide-react'
import { theme } from '../theme'
import useIsMobile from '../hooks/useIsMobile'
import type { LucideIcon } from 'lucide-react'

const trustCards: { title: string; description: string; Icon: LucideIcon }[] = [
  {
    title: 'Dbamy o Twoje bezpieczeństwo',
    description:
      'Twoje dane otrzymają wyłącznie instytucje, które wskażesz. Nie pytamy i nigdy nie zapytamy o Twój numer PESEL czy dane karty kredytowej.',
    Icon: Shield,
  },
  {
    title: 'Dbamy o Twój komfort',
    description:
      'Nasz ranking jest przejrzysty na każdym urządzeniu. W kilka minut po wysłaniu zgłoszenia doradca oddzwoni z najlepszą ofertą.',
    Icon: Headphones,
  },
  {
    title: 'Dbamy o Twój portfel',
    description:
      'Szukamy najlepszych ofert i pomagamy je porównać. Niezależnie od tego, czy zależy Ci na najniższej racie, czy koszcie — z nami znajdziesz najlepszą ofertę. Za darmo.',
    Icon: Wallet,
  },
]

const stats = [
  { value: '76 143', label: 'Zadowolonych Klientów' },
  { value: '2,8 mld zł', label: 'Wartość złożonych wniosków' },
  { value: '9', label: 'Banków w naszym serwisie' },
]

export default function TrustSection() {
  const m = useIsMobile()
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section
      ref={ref}
      style={{
        padding: m ? '64px 20px' : '100px 48px',
        background: theme.colors.bgSecondary,
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
            Dlaczego warto z nami?
          </h2>
        </motion.div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: m ? '1fr' : 'repeat(3, 1fr)',
            gap: m ? 16 : 24,
            marginBottom: m ? 48 : 80,
          }}
        >
          {trustCards.map((card, idx) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              style={{
                background: theme.colors.bg,
                border: `1px solid ${theme.colors.border}`,
                borderRadius: theme.borderRadius.md,
                padding: m ? 24 : 32,
                textAlign: 'center',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 16 }}>
                <card.Icon size={36} color={theme.colors.accent} />
              </div>
              <h3 style={{ fontSize: 18, fontWeight: 600, color: theme.colors.text, marginBottom: 12 }}>
                {card.title}
              </h3>
              <p style={{ fontSize: 14, color: theme.colors.textSecondary, lineHeight: 1.7 }}>
                {card.description}
              </p>
            </motion.div>
          ))}
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: m ? '1fr' : 'repeat(3, 1fr)',
            gap: m ? 16 : 24,
          }}
        >
          {stats.map((stat, idx) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.3 + idx * 0.1 }}
              style={{ textAlign: 'center', padding: 24 }}
            >
              <div
                style={{
                  fontSize: m ? 32 : 40,
                  fontWeight: 700,
                  color: theme.colors.accent,
                  marginBottom: 8,
                }}
              >
                {stat.value}
              </div>
              <div style={{ fontSize: 14, color: theme.colors.textSecondary }}>
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

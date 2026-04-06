import { motion } from 'framer-motion'
import { Landmark, CreditCard, Banknote } from 'lucide-react'
import { theme } from '../theme'
import useIsMobile from '../hooks/useIsMobile'
import type { PaymentMethod } from '../types'
import type { LucideIcon } from 'lucide-react'

interface Props {
  onSelect: (method: PaymentMethod) => void
}

const methods: {
  id: PaymentMethod
  title: string
  subtitle: string
  description: string
  Icon: LucideIcon
  primary: boolean
  badge?: string
}[] = [
  {
    id: 'financing',
    title: 'Finansowanie',
    subtitle: 'od ~2 500 zł/mies.',
    description: 'Porównaj oferty kredytowe z 9 banków i rozłóż płatność na wygodne raty.',
    Icon: Landmark,
    primary: true,
    badge: 'Najpopularniejsze',
  },
  {
    id: 'transfer',
    title: 'Przelew bankowy',
    subtitle: 'pełna kwota',
    description: 'Zapłać przelewem na konto. Realizacja po zaksięgowaniu wpłaty.',
    Icon: CreditCard,
    primary: false,
  },
  {
    id: 'cash',
    title: 'Gotówka',
    subtitle: 'przy odbiorze',
    description: 'Zapłać gotówką przy osobistym odbiorze robota.',
    Icon: Banknote,
    primary: false,
  },
]

export default function PaymentMethodSelector({ onSelect }: Props) {
  const m = useIsMobile()

  return (
    <div style={{ maxWidth: 800, margin: '0 auto', padding: m ? '0 20px' : 0 }}>
      <div style={{ textAlign: 'center', marginBottom: m ? 32 : 48 }}>
        <h2
          style={{
            fontSize: m ? 24 : 32,
            fontWeight: 700,
            color: theme.colors.text,
            marginBottom: 8,
          }}
        >
          Wybierz sposób płatności
        </h2>
        <p style={{ fontSize: 15, color: theme.colors.textSecondary }}>
          Jak chcesz zapłacić za robota Unitree G1?
        </p>
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: m ? '1fr' : 'repeat(3, 1fr)',
          gap: 16,
        }}
      >
        {methods.map((method, idx) => (
          <motion.button
            key={method.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: idx * 0.1 }}
            onClick={() => onSelect(method.id)}
            style={{
              position: 'relative',
              background: method.primary ? theme.colors.accentLight : theme.colors.bg,
              border: method.primary
                ? `2px solid ${theme.colors.accent}`
                : `1px solid ${theme.colors.border}`,
              borderRadius: theme.borderRadius.md,
              padding: m ? 24 : 28,
              cursor: 'pointer',
              textAlign: 'left',
              transition: 'all 0.2s',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-4px)'
              e.currentTarget.style.boxShadow = theme.colors.cardShadowHover
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)'
              e.currentTarget.style.boxShadow = 'none'
            }}
          >
            {method.badge && (
              <span
                style={{
                  position: 'absolute',
                  top: -10,
                  left: '50%',
                  transform: 'translateX(-50%)',
                  background: theme.colors.accent,
                  color: '#fff',
                  padding: '4px 12px',
                  borderRadius: 12,
                  fontSize: 11,
                  fontWeight: 600,
                  whiteSpace: 'nowrap',
                }}
              >
                {method.badge}
              </span>
            )}

            <div style={{ marginBottom: 12 }}>
              <method.Icon size={32} color={theme.colors.accent} />
            </div>
            <h3 style={{ fontSize: 18, fontWeight: 600, color: theme.colors.text, marginBottom: 4 }}>
              {method.title}
            </h3>
            <p style={{ fontSize: 14, fontWeight: 600, color: theme.colors.accent, marginBottom: 12 }}>
              {method.subtitle}
            </p>
            <p style={{ fontSize: 13, color: theme.colors.textSecondary, lineHeight: 1.6 }}>
              {method.description}
            </p>
          </motion.button>
        ))}
      </div>
    </div>
  )
}

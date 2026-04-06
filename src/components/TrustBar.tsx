import { Star, ShieldCheck } from 'lucide-react'
import { theme } from '../theme'
import useIsMobile from '../hooks/useIsMobile'

interface Props {
  withTopMargin?: boolean
}

export default function TrustBar({ withTopMargin = false }: Props) {
  const m = useIsMobile()

  return (
    <div
      style={{
        background: theme.colors.bgSecondary,
        borderBottom: `1px solid ${theme.colors.border}`,
        padding: m ? '10px 20px' : '10px 48px',
        marginTop: withTopMargin ? 56 : 0,
      }}
    >
      <div
        style={{
          maxWidth: theme.spacing.maxWidth,
          margin: '0 auto',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: m ? 12 : 24,
          flexWrap: 'wrap',
          fontSize: m ? 12 : 13,
          color: theme.colors.textSecondary,
        }}
      >
        <span style={{ fontWeight: 600, color: theme.colors.text }}>
          Porównaj kredyty gotówkowe w 9 bankach
        </span>
        <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            {[...Array(5)].map((_, i) => (
              <Star key={i} size={14} fill={theme.colors.ratingGold} color={theme.colors.ratingGold} />
            ))}
          </span>
          <span style={{ fontWeight: 600, color: theme.colors.text }}>4.7</span>
          /5
        </span>
        <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
          <ShieldCheck size={14} color={theme.colors.success} />
          Dane chronione
        </span>
      </div>
    </div>
  )
}

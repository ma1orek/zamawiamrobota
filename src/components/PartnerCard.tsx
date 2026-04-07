import { ArrowRight, Clock, Shield } from 'lucide-react'
import { theme } from '../theme'
import useIsMobile from '../hooks/useIsMobile'

interface Props {
  name: string
  description: string
  features?: string[]
  onApply: () => void
  configured: boolean
}

export default function PartnerCard({ name, description, features, onApply, configured }: Props) {
  const m = useIsMobile()

  return (
    <div
      style={{
        background: theme.colors.bg,
        border: `1px solid ${theme.colors.border}`,
        borderRadius: theme.borderRadius.md,
        padding: m ? 20 : 24,
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
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
        <h3 style={{ fontSize: 17, fontWeight: 700, color: theme.colors.text }}>{name}</h3>
        {configured && (
          <span style={{ fontSize: 11, fontWeight: 600, color: theme.colors.success, display: 'flex', alignItems: 'center', gap: 4 }}>
            <Shield size={12} /> API aktywne
          </span>
        )}
      </div>

      <p style={{ fontSize: 13, color: theme.colors.textSecondary, lineHeight: 1.6, marginBottom: 16 }}>
        {description}
      </p>

      {features && features.length > 0 && (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 16 }}>
          {features.map((f) => (
            <span
              key={f}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 4,
                fontSize: 11,
                color: theme.colors.textSecondary,
                padding: '4px 10px',
                background: theme.colors.bgSecondary,
                borderRadius: 12,
              }}
            >
              <Clock size={10} />
              {f}
            </span>
          ))}
        </div>
      )}

      <button
        onClick={onApply}
        style={{
          width: '100%',
          padding: '12px 20px',
          background: theme.colors.cta,
          color: theme.colors.ctaText,
          border: 'none',
          borderRadius: theme.borderRadius.sm,
          fontSize: 14,
          fontWeight: 600,
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 6,
          transition: 'background 0.2s',
        }}
        onMouseEnter={(e) => (e.currentTarget.style.background = theme.colors.ctaHover)}
        onMouseLeave={(e) => (e.currentTarget.style.background = theme.colors.cta)}
      >
        Złóż wniosek
        <ArrowRight size={16} />
      </button>
    </div>
  )
}

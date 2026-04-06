import { theme } from '../theme'
import useIsMobile from '../hooks/useIsMobile'
import { formatPLN, formatPercentDisplay } from '../utils/formatters'
import type { ComputedBankOffer } from '../types'

interface Props {
  offer: ComputedBankOffer
  rank: number
  onApply: (offer: ComputedBankOffer) => void
  isBest?: boolean
}

export default function BankOfferCard({ offer, rank, onApply, isBest }: Props) {
  const m = useIsMobile()

  return (
    <div
      style={{
        background: theme.colors.bg,
        border: isBest ? `2px solid ${theme.colors.success}` : `1px solid ${theme.colors.border}`,
        borderRadius: theme.borderRadius.md,
        padding: m ? 20 : 24,
        position: 'relative',
        transition: 'box-shadow 0.2s',
      }}
      onMouseEnter={(e) => (e.currentTarget.style.boxShadow = theme.colors.cardShadow)}
      onMouseLeave={(e) => (e.currentTarget.style.boxShadow = 'none')}
    >
      {isBest && (
        <span
          style={{
            position: 'absolute',
            top: -10,
            right: 16,
            background: theme.colors.success,
            color: '#fff',
            padding: '4px 12px',
            borderRadius: 12,
            fontSize: 11,
            fontWeight: 600,
          }}
        >
          Najlepsza oferta
        </span>
      )}

      <div
        style={{
          display: m ? 'flex' : 'grid',
          flexDirection: 'column',
          gridTemplateColumns: '48px 1fr 1fr 1fr 1fr 1fr auto',
          alignItems: 'center',
          gap: m ? 16 : 12,
        }}
      >
        <div
          style={{
            width: 36,
            height: 36,
            borderRadius: '50%',
            background: theme.colors.bgSecondary,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 14,
            fontWeight: 700,
            color: theme.colors.textMuted,
            ...(m ? { display: 'none' } : {}),
          }}
        >
          {rank}.
        </div>

        <div>
          <p style={{ fontSize: 15, fontWeight: 600, color: theme.colors.text }}>
            {m && <span style={{ color: theme.colors.textMuted, fontWeight: 400 }}>{rank}. </span>}
            {offer.bank.name}
          </p>
          <p style={{ fontSize: 12, color: theme.colors.textMuted }}>{offer.bank.productName}</p>
        </div>

        <div style={m ? { display: 'flex', justifyContent: 'space-between', width: '100%' } : {}}>
          <div>
            <p style={{ fontSize: 11, color: theme.colors.textMuted, marginBottom: 2 }}>Kwota do spłaty</p>
            <p style={{ fontSize: 14, fontWeight: 600, color: theme.colors.text }}>
              {formatPLN(offer.totalCost)}
            </p>
          </div>
          {m && (
            <div style={{ textAlign: 'right' }}>
              <p style={{ fontSize: 11, color: theme.colors.textMuted, marginBottom: 2 }}>Rata</p>
              <p style={{ fontSize: 18, fontWeight: 700, color: theme.colors.accent }}>
                {formatPLN(offer.monthlyPayment)}
              </p>
            </div>
          )}
        </div>

        {!m && (
          <div>
            <p style={{ fontSize: 11, color: theme.colors.textMuted, marginBottom: 2 }}>Rata</p>
            <p style={{ fontSize: 18, fontWeight: 700, color: theme.colors.accent }}>
              {formatPLN(offer.monthlyPayment)}
            </p>
          </div>
        )}

        <div style={m ? { display: 'flex', justifyContent: 'space-between', width: '100%' } : {}}>
          <div>
            <p style={{ fontSize: 11, color: theme.colors.textMuted, marginBottom: 2 }}>Oprocentowanie</p>
            <p style={{ fontSize: 14, fontWeight: 600, color: theme.colors.text }}>
              {formatPercentDisplay(offer.bank.annualRate * 100)}
            </p>
          </div>
          {m && (
            <div style={{ textAlign: 'right' }}>
              <p style={{ fontSize: 11, color: theme.colors.textMuted, marginBottom: 2 }}>RRSO</p>
              <p style={{ fontSize: 14, fontWeight: 600, color: theme.colors.text }}>
                {formatPercentDisplay(offer.rrso * 100)}
              </p>
            </div>
          )}
        </div>

        {!m && (
          <div>
            <p style={{ fontSize: 11, color: theme.colors.textMuted, marginBottom: 2 }}>RRSO</p>
            <p style={{ fontSize: 14, fontWeight: 600, color: theme.colors.text }}>
              {formatPercentDisplay(offer.rrso * 100)}
            </p>
          </div>
        )}

        <button
          onClick={() => onApply(offer)}
          style={{
            padding: m ? '12px 24px' : '10px 20px',
            background: theme.colors.cta,
            color: theme.colors.ctaText,
            border: 'none',
            borderRadius: theme.borderRadius.sm,
            fontSize: 13,
            fontWeight: 600,
            cursor: 'pointer',
            transition: 'background 0.2s',
            whiteSpace: 'nowrap',
            width: m ? '100%' : 'auto',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.background = theme.colors.ctaHover)}
          onMouseLeave={(e) => (e.currentTarget.style.background = theme.colors.cta)}
        >
          Zapytaj o kredyt
        </button>
      </div>
    </div>
  )
}

import { motion } from 'framer-motion'
import { theme } from '../theme'
import useIsMobile from '../hooks/useIsMobile'
import RangeSlider from './RangeSlider'
import { formatPLN, formatPLNShort, formatPercentDisplay, formatNumber } from '../utils/formatters'
import type { ComputedBankOffer, CalculatorParams } from '../types'

interface Props {
  params: CalculatorParams
  bestOffer: ComputedBankOffer | null
  onAmountChange: (amount: number) => void
  onMonthsChange: (months: number) => void
  onContinue: () => void
}

export default function FinancingCalculator({
  params,
  bestOffer,
  onAmountChange,
  onMonthsChange,
  onContinue,
}: Props) {
  const m = useIsMobile()

  return (
    <div style={{ maxWidth: 700, margin: '0 auto', padding: m ? '0 20px' : 0 }}>
      <div style={{ textAlign: 'center', marginBottom: m ? 32 : 48 }}>
        <h2
          style={{
            fontSize: m ? 24 : 32,
            fontWeight: 700,
            color: theme.colors.text,
            marginBottom: 8,
          }}
        >
          Kalkulator kredytowy
        </h2>
        <p style={{ fontSize: 15, color: theme.colors.textSecondary }}>
          Ustaw parametry kredytu i zobacz swoją ratę
        </p>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        style={{
          background: theme.colors.bg,
          border: `1px solid ${theme.colors.border}`,
          borderRadius: theme.borderRadius.lg,
          padding: m ? 24 : 40,
          boxShadow: theme.colors.cardShadow,
        }}
      >
        <RangeSlider
          label="Kwota kredytu"
          min={10000}
          max={200000}
          step={1000}
          value={params.loanAmount}
          onChange={onAmountChange}
          formatValue={(v) => formatNumber(v)}
          suffix="zł"
        />

        <RangeSlider
          label="Okres spłaty"
          min={3}
          max={120}
          step={1}
          value={params.months}
          onChange={onMonthsChange}
          formatValue={(v) => String(v)}
          suffix="mies."
        />

        {bestOffer && (
          <motion.div
            key={`${params.loanAmount}-${params.months}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            style={{
              marginTop: 32,
              padding: 24,
              background: theme.colors.bgSecondary,
              borderRadius: theme.borderRadius.md,
              border: `1px solid ${theme.colors.border}`,
            }}
          >
            <div style={{ textAlign: 'center', marginBottom: 20 }}>
              <p style={{ fontSize: 13, color: theme.colors.textSecondary, marginBottom: 4 }}>
                Najniższa rata miesięczna od
              </p>
              <p
                style={{
                  fontSize: m ? 36 : 48,
                  fontWeight: 700,
                  color: theme.colors.accent,
                  lineHeight: 1.1,
                }}
              >
                {formatPLN(bestOffer.monthlyPayment)}
              </p>
              <p style={{ fontSize: 13, color: theme.colors.textMuted, marginTop: 4 }}>
                {bestOffer.bank.name} • RRSO {formatPercentDisplay(bestOffer.rrso * 100)}
              </p>
            </div>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: 16,
                paddingTop: 20,
                borderTop: `1px solid ${theme.colors.border}`,
              }}
            >
              <div style={{ textAlign: 'center' }}>
                <p style={{ fontSize: 12, color: theme.colors.textMuted, marginBottom: 4 }}>Kwota kredytu</p>
                <p style={{ fontSize: 15, fontWeight: 600, color: theme.colors.text }}>
                  {formatPLNShort(params.loanAmount)}
                </p>
              </div>
              <div style={{ textAlign: 'center' }}>
                <p style={{ fontSize: 12, color: theme.colors.textMuted, marginBottom: 4 }}>Kwota do spłaty</p>
                <p style={{ fontSize: 15, fontWeight: 600, color: theme.colors.text }}>
                  {formatPLNShort(bestOffer.totalCost)}
                </p>
              </div>
              <div style={{ textAlign: 'center' }}>
                <p style={{ fontSize: 12, color: theme.colors.textMuted, marginBottom: 4 }}>Oprocentowanie</p>
                <p style={{ fontSize: 15, fontWeight: 600, color: theme.colors.text }}>
                  {formatPercentDisplay(bestOffer.bank.annualRate * 100)}
                </p>
              </div>
            </div>
          </motion.div>
        )}

        <button
          onClick={onContinue}
          style={{
            width: '100%',
            marginTop: 24,
            padding: '16px 32px',
            background: theme.colors.cta,
            color: theme.colors.ctaText,
            border: 'none',
            borderRadius: theme.borderRadius.sm,
            fontSize: 16,
            fontWeight: 700,
            cursor: 'pointer',
            transition: 'background 0.2s, transform 0.2s',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = theme.colors.ctaHover
            e.currentTarget.style.transform = 'translateY(-1px)'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = theme.colors.cta
            e.currentTarget.style.transform = 'translateY(0)'
          }}
        >
          PORÓWNAJ OFERTY Z 9 BANKÓW →
        </button>
      </motion.div>
    </div>
  )
}

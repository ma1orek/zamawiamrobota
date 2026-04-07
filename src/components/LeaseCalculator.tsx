import { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import { theme } from '../theme'
import useIsMobile from '../hooks/useIsMobile'
import RangeSlider from './RangeSlider'
import { formatPLN, formatNumber, formatPercentDisplay } from '../utils/formatters'

interface Props {
  onContinue: (params: { amount: number; months: number; buyout: number }) => void
}

export default function LeaseCalculator({ onContinue }: Props) {
  const m = useIsMobile()
  const [amount, setAmount] = useState(100000)
  const [months, setMonths] = useState(36)
  const [buyoutPercent, setBuyoutPercent] = useState(1)

  const calculation = useMemo(() => {
    const implicitRate = 0.065 // szacunkowa stopa leasingu ~6.5% rocznie
    const monthlyRate = implicitRate / 12
    const buyoutValue = amount * (buyoutPercent / 100)
    const financedAmount = amount - buyoutValue * Math.pow(1 + monthlyRate, -months)
    const monthlyPayment = financedAmount * (monthlyRate * Math.pow(1 + monthlyRate, months)) / (Math.pow(1 + monthlyRate, months) - 1)
    const totalCost = monthlyPayment * months + buyoutValue
    const totalInterest = totalCost - amount

    return {
      monthlyPayment,
      totalCost,
      totalInterest,
      buyoutValue,
    }
  }, [amount, months, buyoutPercent])

  return (
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
      <h3 style={{ fontSize: 18, fontWeight: 700, color: theme.colors.text, marginBottom: 24 }}>
        Kalkulator leasingowy
      </h3>

      <RangeSlider
        label="Wartość sprzętu brutto"
        min={10000}
        max={300000}
        step={1000}
        value={amount}
        onChange={setAmount}
        formatValue={(v) => formatNumber(v)}
        suffix="zł"
      />

      <RangeSlider
        label="Okres leasingu"
        min={12}
        max={60}
        step={3}
        value={months}
        onChange={setMonths}
        formatValue={(v) => String(v)}
        suffix="mies."
      />

      <RangeSlider
        label="Wykup końcowy"
        min={1}
        max={30}
        step={1}
        value={buyoutPercent}
        onChange={setBuyoutPercent}
        formatValue={(v) => String(v)}
        suffix="%"
      />

      <div
        style={{
          marginTop: 24,
          padding: 20,
          background: theme.colors.bgSecondary,
          borderRadius: theme.borderRadius.md,
          border: `1px solid ${theme.colors.border}`,
        }}
      >
        <div style={{ textAlign: 'center', marginBottom: 16 }}>
          <p style={{ fontSize: 13, color: theme.colors.textMuted, marginBottom: 4 }}>
            Szacunkowa rata leasingowa netto
          </p>
          <p style={{ fontSize: m ? 32 : 40, fontWeight: 700, color: theme.colors.accent, lineHeight: 1.1 }}>
            {formatPLN(calculation.monthlyPayment)}
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12, paddingTop: 16, borderTop: `1px solid ${theme.colors.border}` }}>
          <div style={{ textAlign: 'center' }}>
            <p style={{ fontSize: 11, color: theme.colors.textMuted, marginBottom: 4 }}>Wartość sprzętu</p>
            <p style={{ fontSize: 14, fontWeight: 600, color: theme.colors.text }}>{formatPLN(amount)}</p>
          </div>
          <div style={{ textAlign: 'center' }}>
            <p style={{ fontSize: 11, color: theme.colors.textMuted, marginBottom: 4 }}>Wykup ({buyoutPercent}%)</p>
            <p style={{ fontSize: 14, fontWeight: 600, color: theme.colors.text }}>{formatPLN(calculation.buyoutValue)}</p>
          </div>
          <div style={{ textAlign: 'center' }}>
            <p style={{ fontSize: 11, color: theme.colors.textMuted, marginBottom: 4 }}>Koszt całkowity</p>
            <p style={{ fontSize: 14, fontWeight: 600, color: theme.colors.text }}>{formatPLN(calculation.totalCost)}</p>
          </div>
        </div>
      </div>

      <p style={{ fontSize: 11, color: theme.colors.textMuted, marginTop: 12, textAlign: 'center' }}>
        Kalkulacja szacunkowa (stopa {formatPercentDisplay(6.5)}). Dokładna oferta po złożeniu wniosku.
      </p>

      <button
        onClick={() => onContinue({ amount, months, buyout: buyoutPercent })}
        style={{
          width: '100%',
          marginTop: 20,
          padding: '16px 32px',
          background: theme.colors.cta,
          color: theme.colors.ctaText,
          border: 'none',
          borderRadius: theme.borderRadius.sm,
          fontSize: 16,
          fontWeight: 700,
          cursor: 'pointer',
          transition: 'background 0.2s',
        }}
        onMouseEnter={(e) => (e.currentTarget.style.background = theme.colors.ctaHover)}
        onMouseLeave={(e) => (e.currentTarget.style.background = theme.colors.cta)}
      >
        WYBIERZ LEASINGODAWCĘ
      </button>
    </motion.div>
  )
}

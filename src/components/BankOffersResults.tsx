import { motion } from 'framer-motion'
import { theme } from '../theme'
import useIsMobile from '../hooks/useIsMobile'
import RangeSlider from './RangeSlider'
import BankOfferCard from './BankOfferCard'
import { formatNumber, formatPLN, formatPercentDisplay } from '../utils/formatters'
import type { ComputedBankOffer, CalculatorParams } from '../types'

interface Props {
  params: CalculatorParams
  offers: ComputedBankOffer[]
  onAmountChange: (amount: number) => void
  onMonthsChange: (months: number) => void
  onApply: (offer: ComputedBankOffer) => void
}

export default function BankOffersResults({
  params,
  offers,
  onAmountChange,
  onMonthsChange,
  onApply,
}: Props) {
  const m = useIsMobile()

  const bestOffer = offers.length > 0 ? offers[0] : null

  return (
    <div style={{ maxWidth: 900, margin: '0 auto', padding: m ? '0 20px' : 0 }}>
      <div style={{ textAlign: 'center', marginBottom: m ? 24 : 40 }}>
        <h2
          style={{
            fontSize: m ? 22 : 28,
            fontWeight: 700,
            color: theme.colors.text,
            marginBottom: 8,
          }}
        >
          Znaleziono: {offers.length} najlepszych ofert
        </h2>
        <p style={{ fontSize: 15, color: theme.colors.textSecondary }}>
          Porównaj i wybierz najlepszą dla siebie
        </p>
      </div>

      <div
        style={{
          background: theme.colors.bgSecondary,
          borderRadius: theme.borderRadius.md,
          padding: m ? 20 : 32,
          marginBottom: 32,
          border: `1px solid ${theme.colors.border}`,
        }}
      >
        <div style={{ display: 'grid', gridTemplateColumns: m ? '1fr' : '1fr 1fr', gap: 24 }}>
          <RangeSlider
            label="Kwota"
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
        </div>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
        <p style={{ fontSize: 13, color: theme.colors.textMuted }}>
          Sortowanie: <strong style={{ color: theme.colors.text }}>Rata rosnąco</strong>
        </p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {offers.map((offer, idx) => (
          <motion.div
            key={offer.bank.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: idx * 0.05 }}
          >
            <BankOfferCard
              offer={offer}
              rank={idx + 1}
              onApply={onApply}
              isBest={idx === 0}
            />
          </motion.div>
        ))}
      </div>

      {bestOffer && (
        <div
          style={{
            marginTop: 32,
            padding: m ? 16 : 24,
            background: theme.colors.bgSecondary,
            borderRadius: theme.borderRadius.md,
            border: `1px solid ${theme.colors.border}`,
            fontSize: 12,
            color: theme.colors.textMuted,
            lineHeight: 1.7,
          }}
        >
          <strong>Przykład reprezentatywny:</strong> Rzeczywista Roczna Stopa Oprocentowania (RRSO) dla
          oferty kredytu gotówkowego wynosi {formatPercentDisplay(bestOffer.rrso * 100)}. Okres
          obowiązywania umowy: {params.months} mies., całkowita kwota pożyczki:{' '}
          {formatPLN(params.loanAmount)}. Całkowity koszt zobowiązania spłacanego w ratach równych
          (annuitetowych): {formatPLN(bestOffer.totalCost - params.loanAmount)}, całkowita kwota do
          zapłaty: {formatPLN(bestOffer.totalCost)}. Spłata następuje w {params.months} ratach równych
          (annuitetowych). Kalkulacja została dokonana na dzień 06 kwietnia 2026 roku na
          reprezentatywnym przykładzie.
        </div>
      )}
    </div>
  )
}

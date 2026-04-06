const plnFormatter = new Intl.NumberFormat('pl-PL', {
  style: 'currency',
  currency: 'PLN',
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
})

const plnFormatterNoDecimals = new Intl.NumberFormat('pl-PL', {
  style: 'currency',
  currency: 'PLN',
  minimumFractionDigits: 0,
  maximumFractionDigits: 0,
})

const numberFormatter = new Intl.NumberFormat('pl-PL', {
  minimumFractionDigits: 0,
  maximumFractionDigits: 0,
})

export function formatPLN(amount: number): string {
  return plnFormatter.format(amount)
}

export function formatPLNShort(amount: number): string {
  return plnFormatterNoDecimals.format(amount)
}

export function formatNumber(n: number): string {
  return numberFormatter.format(n)
}

export function formatPercent(rate: number): string {
  return (rate * 100).toFixed(2).replace('.', ',') + '%'
}

export function formatPercentDisplay(rateAsPercent: number): string {
  return rateAsPercent.toFixed(2).replace('.', ',') + '%'
}

export function formatMonths(months: number): string {
  if (months === 1) return '1 miesiąc'
  if (months >= 2 && months <= 4) return `${months} miesiące`
  return `${months} miesięcy`
}

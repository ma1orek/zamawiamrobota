import type { BankConfig, ComputedBankOffer } from '../types'

/**
 * Annuity (equal installment) formula:
 * P = L * [r(1+r)^n] / [(1+r)^n - 1]
 */
export function calculateMonthlyPayment(
  principal: number,
  annualRate: number,
  months: number
): number {
  if (annualRate === 0) return principal / months
  const r = annualRate / 12
  const factor = Math.pow(1 + r, months)
  return principal * (r * factor) / (factor - 1)
}

/**
 * RRSO (Rzeczywista Roczna Stopa Oprocentowania)
 * Calculated using bisection method to solve the IRR equation:
 * Sum of P_k / (1+x)^(t_k/365) = netDisbursement
 */
export function calculateRRSO(
  netDisbursement: number,
  monthlyPayment: number,
  months: number
): number {
  const presentValue = (annualRate: number): number => {
    let pv = 0
    for (let k = 1; k <= months; k++) {
      const days = k * 30.4375 // average days per month
      pv += monthlyPayment / Math.pow(1 + annualRate, days / 365)
    }
    return pv
  }

  let low = 0
  let high = 5 // 0% to 500%

  for (let i = 0; i < 100; i++) {
    const mid = (low + high) / 2
    const pv = presentValue(mid)
    if (pv > netDisbursement) {
      low = mid
    } else {
      high = mid
    }
  }

  return (low + high) / 2
}

export function computeBankOffer(
  bank: BankConfig,
  loanAmount: number,
  months: number
): ComputedBankOffer | null {
  if (
    months < bank.minMonths ||
    months > bank.maxMonths ||
    loanAmount < bank.minAmount ||
    loanAmount > bank.maxAmount
  ) {
    return null
  }

  const commission = loanAmount * bank.commissionRate
  const monthlyPayment = calculateMonthlyPayment(loanAmount, bank.annualRate, months)
  const totalCost = monthlyPayment * months + commission
  const totalInterest = totalCost - loanAmount - commission
  const netDisbursement = loanAmount - commission
  const rrso = calculateRRSO(
    netDisbursement > 0 ? netDisbursement : loanAmount,
    monthlyPayment,
    months
  )

  return {
    bank,
    monthlyPayment,
    totalCost,
    totalInterest,
    commission,
    rrso,
    loanAmount,
    months,
  }
}

export function computeAllOffers(
  banks: BankConfig[],
  loanAmount: number,
  months: number
): ComputedBankOffer[] {
  return banks
    .map((bank) => computeBankOffer(bank, loanAmount, months))
    .filter((offer): offer is ComputedBankOffer => offer !== null)
    .sort((a, b) => a.monthlyPayment - b.monthlyPayment)
}

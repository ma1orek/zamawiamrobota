import { useMemo, useState } from 'react'
import { banks } from '../data/bankOffers'
import { computeAllOffers } from '../utils/calculations'
import type { CalculatorParams, ComputedBankOffer } from '../types'

export function useFinancingCalculator(initialAmount = 100000, initialMonths = 60) {
  const [params, setParams] = useState<CalculatorParams>({
    loanAmount: initialAmount,
    months: initialMonths,
  })

  const offers = useMemo<ComputedBankOffer[]>(
    () => computeAllOffers(banks, params.loanAmount, params.months),
    [params.loanAmount, params.months]
  )

  const bestOffer = offers.length > 0 ? offers[0] : null

  const setLoanAmount = (amount: number) =>
    setParams((prev) => ({ ...prev, loanAmount: amount }))

  const setMonths = (months: number) =>
    setParams((prev) => ({ ...prev, months }))

  return {
    params,
    setParams,
    setLoanAmount,
    setMonths,
    offers,
    bestOffer,
  }
}

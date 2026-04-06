export interface BankConfig {
  id: string
  name: string
  productName: string
  annualRate: number
  commissionRate: number
  minMonths: number
  maxMonths: number
  minAmount: number
  maxAmount: number
}

export interface ComputedBankOffer {
  bank: BankConfig
  monthlyPayment: number
  totalCost: number
  totalInterest: number
  commission: number
  rrso: number
  loanAmount: number
  months: number
}

export interface CalculatorParams {
  loanAmount: number
  months: number
}

export interface CreditFormData {
  creditPurpose: string
  incomeSource: string
  contractEndDate?: string
  monthlyIncome: number
  monthlyExpenses: number
  hasLatePayments: boolean
  firstName: string
  lastName: string
  phone: string
  email: string
  consentRodo: boolean
  consentBanks: string[]
}

export type PurchaseStep = 1 | 2 | 3 | 4 | 5
export type PaymentMethod = 'transfer' | 'cash' | 'financing' | null

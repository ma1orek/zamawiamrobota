import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { CheckCircle } from 'lucide-react'
import Navbar from '../components/Navbar'
import TrustBar from '../components/TrustBar'
import StepIndicator from '../components/StepIndicator'
import PaymentMethodSelector from '../components/PaymentMethodSelector'
import FinancingCalculator from '../components/FinancingCalculator'
import CreditApplicationForm from '../components/CreditApplicationForm'
import BankOffersResults from '../components/BankOffersResults'
import CreditContactForm from '../components/CreditContactForm'
import SimpleOrderForm from '../components/SimpleOrderForm'
import Footer from '../components/Footer'
import FloatingAgentButton from '../components/FloatingAgentButton'
import { useFinancingCalculator } from '../hooks/useFinancingCalculator'
import { theme } from '../theme'
import useIsMobile from '../hooks/useIsMobile'
import type { PurchaseStep, PaymentMethod, ComputedBankOffer } from '../types'
import type { CreditFormValues } from '../utils/validation'
import type { ContactFormValues } from '../utils/validation'
import {
  trackPageView,
  trackPaymentMethodSelected,
  trackCalculatorUsed,
  trackFormStarted,
  trackFormSubmitted,
  trackOfferViewed,
  trackOfferSelected,
  trackContactFormSubmitted,
} from '../utils/googleSheets'

export default function KupujeRobota() {
  const m = useIsMobile()
  const [step, setStep] = useState<PurchaseStep>(1)
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>(null)
  const [selectedOffer, setSelectedOffer] = useState<ComputedBankOffer | null>(null)
  const [submitted, setSubmitted] = useState(false)
  const { params, setLoanAmount, setMonths, offers, bestOffer } = useFinancingCalculator(100000, 60)

  // Track page view on mount
  useEffect(() => {
    trackPageView('kupuje-robota')
  }, [])

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [step])

  const handlePaymentSelect = (method: PaymentMethod) => {
    setPaymentMethod(method)
    trackPaymentMethodSelected(method || 'unknown')
    if (method === 'financing') {
      setStep(2)
    } else {
      setStep(3)
    }
  }

  const handleCalcContinue = () => {
    trackCalculatorUsed(params.loanAmount, params.months, bestOffer?.monthlyPayment || 0)
    trackFormStarted()
    setStep(3)
  }

  const handleFormSubmit = (data: CreditFormValues) => {
    trackFormSubmitted('wniosek_kredytowy', {
      kwota: params.loanAmount,
      miesiecy: params.months,
      imie: data.firstName,
      nazwisko: data.lastName,
      telefon: data.phone,
      email: data.email,
      pesel: data.pesel ? '***' + data.pesel.slice(-4) : '',
      zatrudnienie: data.employmentType,
      dochod: data.monthlyIncome,
      wydatki: data.monthlyExpenses,
    })
    setStep(4)
  }

  const handleApplyOffer = (offer: ComputedBankOffer) => {
    trackOfferSelected(offer.bank.name, offer.monthlyPayment)
    setSelectedOffer(offer)
    setStep(5)
  }

  const handleContactSubmit = async (data: ContactFormValues) => {
    trackContactFormSubmitted(selectedOffer?.bank.name || '', {
      imie: data.firstName,
      nazwisko: data.lastName,
      telefon: data.phone,
      rata: selectedOffer?.monthlyPayment.toFixed(2),
      kwota: params.loanAmount,
    })
    setSubmitted(true)
  }

  const handleStepClick = (clickedStep: PurchaseStep) => {
    if (clickedStep < step) {
      setStep(clickedStep)
    }
  }

  // Track offers viewed when step 4 loads
  useEffect(() => {
    if (step === 4 && offers.length > 0) {
      trackOfferViewed(offers.length)
    }
  }, [step, offers.length])

  const currentStep: PurchaseStep =
    step === 5 && selectedOffer ? 5 : step === 4 ? 4 : step === 3 ? 3 : step === 2 ? 2 : 1

  return (
    <>
      <Navbar />
      <TrustBar withTopMargin />

      <div style={{ minHeight: '80vh', padding: m ? '24px 0 64px' : '40px 48px 100px' }}>
        <StepIndicator currentStep={currentStep} onStepClick={handleStepClick} />

        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          {step === 1 && <PaymentMethodSelector onSelect={handlePaymentSelect} />}

          {step === 2 && (
            <FinancingCalculator
              params={params}
              bestOffer={bestOffer}
              onAmountChange={setLoanAmount}
              onMonthsChange={setMonths}
              onContinue={handleCalcContinue}
            />
          )}

          {step === 3 && paymentMethod === 'financing' && (
            <CreditApplicationForm
              params={params}
              bestOffer={bestOffer}
              onSubmit={handleFormSubmit}
            />
          )}

          {step === 3 && paymentMethod !== 'financing' && paymentMethod !== null && (
            <SimpleOrderForm
              method={paymentMethod}
              onBack={() => setStep(1)}
            />
          )}

          {step === 4 && (
            <BankOffersResults
              params={params}
              offers={offers}
              onAmountChange={setLoanAmount}
              onMonthsChange={setMonths}
              onApply={handleApplyOffer}
            />
          )}

          {step === 5 && selectedOffer && !submitted && (
            <CreditContactForm
              offer={selectedOffer}
              onSubmit={handleContactSubmit}
              onBack={() => setStep(4)}
            />
          )}

          {step === 5 && submitted && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              style={{
                maxWidth: 600,
                margin: '60px auto',
                textAlign: 'center',
                padding: m ? '40px 20px' : 60,
                background: theme.colors.bg,
                border: `1px solid ${theme.colors.border}`,
                borderRadius: theme.borderRadius.lg,
                boxShadow: theme.colors.cardShadow,
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 20 }}>
                <CheckCircle size={48} color={theme.colors.success} />
              </div>
              <h2 style={{ fontSize: m ? 24 : 32, fontWeight: 700, color: theme.colors.text, marginBottom: 12 }}>
                Dziękujemy!
              </h2>
              <p style={{ fontSize: 16, color: theme.colors.textSecondary, lineHeight: 1.6, marginBottom: 32 }}>
                Twoje zgłoszenie zostało wysłane. Ekspert bankowy skontaktuje się z Tobą w ciągu 5 minut.
              </p>
              <a
                href="/"
                style={{
                  display: 'inline-flex',
                  padding: '14px 28px',
                  background: theme.colors.accent,
                  color: theme.colors.accentText,
                  borderRadius: theme.borderRadius.sm,
                  fontSize: 14,
                  fontWeight: 600,
                }}
              >
                Wróć na stronę główną
              </a>
            </motion.div>
          )}
        </div>
      </div>

      <Footer />
      <FloatingAgentButton />
    </>
  )
}

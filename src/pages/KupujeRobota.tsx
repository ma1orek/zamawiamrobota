import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { CheckCircle } from 'lucide-react'
import Navbar from '../components/Navbar'
import TrustBar from '../components/TrustBar'
import StepIndicator from '../components/StepIndicator'
import PaymentMethodSelector from '../components/PaymentMethodSelector'
import FinancingTabs, { type FinancingTabId } from '../components/FinancingTabs'
import FinancingCalculator from '../components/FinancingCalculator'
import LeaseCalculator from '../components/LeaseCalculator'
import PartnerCard from '../components/PartnerCard'
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
import { partnerConfig, isPartnerConfigured } from '../config/partners'
import {
  trackPageView,
  trackPaymentMethodSelected,
  trackCalculatorUsed,
  trackFormStarted,
  trackFormSubmitted,
  trackOfferViewed,
  trackOfferSelected,
  trackContactFormSubmitted,
  trackEvent,
} from '../utils/googleSheets'

export default function KupujeRobota() {
  const m = useIsMobile()
  const [step, setStep] = useState<PurchaseStep>(1)
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>(null)
  const [financingTab, setFinancingTab] = useState<FinancingTabId>('personal')
  const [selectedOffer, setSelectedOffer] = useState<ComputedBankOffer | null>(null)
  const [submitted, setSubmitted] = useState(false)
  const [leaseParams, setLeaseParams] = useState<{ amount: number; months: number; buyout: number } | null>(null)
  const { params, setLoanAmount, setMonths, offers, bestOffer } = useFinancingCalculator(100000, 60)

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

  const handleTabChange = (tab: FinancingTabId) => {
    setFinancingTab(tab)
    trackEvent('financing_tab_change', { tab })
  }

  const handleCalcContinue = () => {
    trackCalculatorUsed(params.loanAmount, params.months, bestOffer?.monthlyPayment || 0)
    if (financingTab === 'personal') {
      trackFormStarted()
      setStep(3)
    } else {
      // Kredyt firmowy / Leasing -> od razu oferty partnerów
      setStep(4)
    }
  }

  const handleLeaseContinue = (lp: { amount: number; months: number; buyout: number }) => {
    setLeaseParams(lp)
    trackEvent('lease_calculator_used', { kwota: lp.amount, miesiecy: lp.months, wykup: lp.buyout })
    setStep(4)
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

  const handlePartnerApply = (partnerName: string) => {
    trackEvent('partner_apply', { partner: partnerName, tab: financingTab })
    setSubmitted(true)
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

  useEffect(() => {
    if (step === 4 && financingTab === 'personal' && offers.length > 0) {
      trackOfferViewed(offers.length)
    }
  }, [step, financingTab, offers.length])

  const currentStep: PurchaseStep =
    step === 5 ? 5 : step === 4 ? 4 : step === 3 ? 3 : step === 2 ? 2 : 1

  const leasingPartners = [
    {
      key: 'leaselink' as const,
      features: ['Online 24/7', '15 minut', 'Od 500 zł'],
    },
    {
      key: 'simplylease' as const,
      features: ['Decyzja w 5 sek', 'Siemens', 'B2B'],
    },
    {
      key: 'grenke' as const,
      features: ['Leasing sprzętu', 'Elastyczne warunki'],
    },
  ]

  const creditPartners = [
    {
      key: 'santander' as const,
      features: ['eRaty', 'Decyzja online', 'Do 200 000 zł'],
    },
    {
      key: 'alior' as const,
      features: ['Raty online', '15 minut', 'Do 300 000 zł'],
    },
  ]

  return (
    <>
      <Navbar />
      <TrustBar withTopMargin />

      <div style={{ minHeight: '80vh', padding: m ? '24px 0 64px' : '40px 48px 100px' }}>
        <StepIndicator currentStep={currentStep} onStepClick={handleStepClick} />

        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          {/* KROK 1: Wybór metody płatności */}
          {step === 1 && <PaymentMethodSelector onSelect={handlePaymentSelect} />}

          {/* KROK 2: Finansowanie - Zakładki + Kalkulator */}
          {step === 2 && (
            <div style={{ maxWidth: 800, margin: '0 auto', padding: m ? '0 20px' : 0 }}>
              <div style={{ textAlign: 'center', marginBottom: 24 }}>
                <h2 style={{ fontSize: m ? 24 : 32, fontWeight: 700, color: theme.colors.text, marginBottom: 8 }}>
                  Wybierz rodzaj finansowania
                </h2>
              </div>

              <FinancingTabs activeTab={financingTab} onTabChange={handleTabChange} />

              {financingTab === 'personal' && (
                <FinancingCalculator
                  params={params}
                  bestOffer={bestOffer}
                  onAmountChange={setLoanAmount}
                  onMonthsChange={setMonths}
                  onContinue={handleCalcContinue}
                />
              )}

              {financingTab === 'business' && (
                <FinancingCalculator
                  params={params}
                  bestOffer={bestOffer}
                  onAmountChange={setLoanAmount}
                  onMonthsChange={setMonths}
                  onContinue={handleCalcContinue}
                />
              )}

              {financingTab === 'leasing' && (
                <LeaseCalculator onContinue={handleLeaseContinue} />
              )}
            </div>
          )}

          {/* KROK 3: Formularz (tylko dla kredytu osobistego) */}
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

          {/* KROK 4: Oferty */}
          {step === 4 && financingTab === 'personal' && (
            <BankOffersResults
              params={params}
              offers={offers}
              onAmountChange={setLoanAmount}
              onMonthsChange={setMonths}
              onApply={handleApplyOffer}
            />
          )}

          {step === 4 && (financingTab === 'business') && (
            <div style={{ maxWidth: 700, margin: '0 auto', padding: m ? '0 20px' : 0 }}>
              <div style={{ textAlign: 'center', marginBottom: 32 }}>
                <h2 style={{ fontSize: m ? 22 : 28, fontWeight: 700, color: theme.colors.text, marginBottom: 8 }}>
                  Partnerzy kredytowi dla firm
                </h2>
                <p style={{ fontSize: 15, color: theme.colors.textSecondary }}>
                  Wybierz partnera i złóż wniosek online
                </p>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: m ? '1fr' : '1fr 1fr', gap: 16 }}>
                {creditPartners.map((p) => (
                  <PartnerCard
                    key={p.key}
                    name={partnerConfig[p.key].name}
                    description={partnerConfig[p.key].description}
                    features={p.features}
                    configured={isPartnerConfigured(p.key)}
                    onApply={() => handlePartnerApply(partnerConfig[p.key].name)}
                  />
                ))}
              </div>
            </div>
          )}

          {step === 4 && financingTab === 'leasing' && (
            <div style={{ maxWidth: 800, margin: '0 auto', padding: m ? '0 20px' : 0 }}>
              <div style={{ textAlign: 'center', marginBottom: 32 }}>
                <h2 style={{ fontSize: m ? 22 : 28, fontWeight: 700, color: theme.colors.text, marginBottom: 8 }}>
                  Wybierz leasingodawcę
                </h2>
                <p style={{ fontSize: 15, color: theme.colors.textSecondary }}>
                  {leaseParams
                    ? `Kwota: ${leaseParams.amount.toLocaleString('pl-PL')} zł | Okres: ${leaseParams.months} mies. | Wykup: ${leaseParams.buyout}%`
                    : 'Porównaj oferty i złóż wniosek online'}
                </p>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: m ? '1fr' : 'repeat(3, 1fr)', gap: 16 }}>
                {leasingPartners.map((p) => (
                  <PartnerCard
                    key={p.key}
                    name={partnerConfig[p.key].name}
                    description={partnerConfig[p.key].description}
                    features={p.features}
                    configured={isPartnerConfigured(p.key)}
                    onApply={() => handlePartnerApply(partnerConfig[p.key].name)}
                  />
                ))}
              </div>
            </div>
          )}

          {/* KROK 5: Kontakt / Potwierdzenie */}
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
                Twoje zgłoszenie zostało wysłane. Konsultant skontaktuje się z Tobą w ciągu kilku minut.
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

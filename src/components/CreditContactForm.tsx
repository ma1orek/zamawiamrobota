import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { motion } from 'framer-motion'
import { theme } from '../theme'
import useIsMobile from '../hooks/useIsMobile'
import { contactFormSchema, type ContactFormValues } from '../utils/validation'
import { formatPLN } from '../utils/formatters'
import type { ComputedBankOffer } from '../types'

interface Props {
  offer: ComputedBankOffer
  onSubmit: (data: ContactFormValues) => void
  onBack: () => void
}

const inputStyle: React.CSSProperties = {
  width: '100%',
  padding: '14px 16px',
  border: `1px solid ${theme.colors.borderInput}`,
  borderRadius: theme.borderRadius.sm,
  fontSize: 15,
  fontFamily: "'Space Grotesk', sans-serif",
  background: theme.colors.bgInput,
  color: theme.colors.text,
  transition: 'border-color 0.2s',
}

export default function CreditContactForm({ offer, onSubmit, onBack }: Props) {
  const m = useIsMobile()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      phone: '',
      consentAll: false as unknown as true,
    },
  })

  return (
    <div
      style={{
        maxWidth: 900,
        margin: '0 auto',
        padding: m ? '0 20px' : 0,
        display: 'grid',
        gridTemplateColumns: m ? '1fr' : '1fr 340px',
        gap: 32,
        alignItems: 'start',
      }}
    >
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
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
          <h2 style={{ fontSize: m ? 20 : 24, fontWeight: 700, color: theme.colors.text }}>
            Wypełnij formularz
          </h2>
          <div style={{ display: 'flex', alignItems: 'center', gap: 4, color: theme.colors.success, fontSize: 13 }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            </svg>
            Dane chronione
          </div>
        </div>
        <p style={{ fontSize: 14, color: theme.colors.textSecondary, marginBottom: 32 }}>
          Ekspert bankowy oddzwoni z ofertą w 5 minut!
        </p>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div style={{ marginBottom: 16 }}>
            <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: theme.colors.text, marginBottom: 6 }}>
              Imię <span style={{ color: theme.colors.error }}>*</span>
            </label>
            <input
              type="text"
              placeholder="Imię"
              {...register('firstName')}
              style={inputStyle}
              onFocus={(e) => (e.currentTarget.style.borderColor = theme.colors.borderInputFocus)}
              onBlur={(e) => (e.currentTarget.style.borderColor = theme.colors.borderInput)}
            />
            {errors.firstName && (
              <p style={{ fontSize: 12, color: theme.colors.error, marginTop: 4 }}>{errors.firstName.message}</p>
            )}
          </div>

          <div style={{ marginBottom: 16 }}>
            <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: theme.colors.text, marginBottom: 6 }}>
              Nazwisko <span style={{ color: theme.colors.error }}>*</span>
            </label>
            <input
              type="text"
              placeholder="Nazwisko"
              {...register('lastName')}
              style={inputStyle}
              onFocus={(e) => (e.currentTarget.style.borderColor = theme.colors.borderInputFocus)}
              onBlur={(e) => (e.currentTarget.style.borderColor = theme.colors.borderInput)}
            />
            {errors.lastName && (
              <p style={{ fontSize: 12, color: theme.colors.error, marginTop: 4 }}>{errors.lastName.message}</p>
            )}
          </div>

          <div style={{ marginBottom: 24 }}>
            <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: theme.colors.text, marginBottom: 6 }}>
              Numer telefonu <span style={{ color: theme.colors.error }}>*</span>
            </label>
            <div style={{ display: 'flex', gap: 8 }}>
              <div
                style={{
                  padding: '14px 12px',
                  background: theme.colors.bgSecondary,
                  border: `1px solid ${theme.colors.borderInput}`,
                  borderRadius: theme.borderRadius.sm,
                  fontSize: 14,
                  color: theme.colors.textMuted,
                  whiteSpace: 'nowrap',
                }}
              >
                +48
              </div>
              <input
                type="tel"
                placeholder="500 600 700"
                {...register('phone')}
                style={{ ...inputStyle, flex: 1 }}
                onFocus={(e) => (e.currentTarget.style.borderColor = theme.colors.borderInputFocus)}
                onBlur={(e) => (e.currentTarget.style.borderColor = theme.colors.borderInput)}
              />
            </div>
            <p style={{ fontSize: 12, color: theme.colors.textMuted, marginTop: 6 }}>
              Na ten numer zadzwoni ekspert bankowy z ofertą
            </p>
            {errors.phone && (
              <p style={{ fontSize: 12, color: theme.colors.error, marginTop: 4 }}>{errors.phone.message}</p>
            )}
          </div>

          <div style={{ marginBottom: 24 }}>
            <label
              style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: 10,
                cursor: 'pointer',
                padding: '12px 16px',
                background: theme.colors.bgInput,
                border: `1px solid ${theme.colors.borderInput}`,
                borderRadius: theme.borderRadius.sm,
                fontSize: 13,
                color: theme.colors.textSecondary,
                lineHeight: 1.6,
              }}
            >
              <input type="checkbox" {...register('consentAll')} style={{ marginTop: 4, flexShrink: 0 }} />
              <span>
                <strong style={{ color: theme.colors.text }}>Akceptuję wszystkie zgody</strong>
                <br />
                Zgodnie z wymogami RODO, wyrażam zgodę na przetwarzanie danych osobowych w celu
                przedstawienia oferty kredytowej przez {offer.bank.name}.
              </span>
            </label>
            {errors.consentAll && (
              <p style={{ fontSize: 12, color: theme.colors.error, marginTop: 4 }}>{errors.consentAll.message}</p>
            )}
          </div>

          <button
            type="submit"
            style={{
              width: '100%',
              padding: '16px 32px',
              background: theme.colors.cta,
              color: theme.colors.ctaText,
              border: 'none',
              borderRadius: theme.borderRadius.sm,
              fontSize: 16,
              fontWeight: 700,
              cursor: 'pointer',
              transition: 'background 0.2s',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 8,
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = theme.colors.ctaHover)}
            onMouseLeave={(e) => (e.currentTarget.style.background = theme.colors.cta)}
          >
            Zapisz i przejdź dalej
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </button>

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 6,
              marginTop: 16,
              fontSize: 12,
              color: theme.colors.textMuted,
            }}
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke={theme.colors.success} strokeWidth="2.5">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            </svg>
            Dbamy o bezpieczeństwo Twoich danych. Jesteśmy zgodni z RODO.
          </div>
        </form>

        <button
          onClick={onBack}
          style={{
            width: '100%',
            marginTop: 16,
            padding: '12px',
            background: 'none',
            border: `1px solid ${theme.colors.border}`,
            borderRadius: theme.borderRadius.sm,
            fontSize: 13,
            color: theme.colors.textSecondary,
            cursor: 'pointer',
          }}
        >
          ← Wróć do ofert
        </button>
      </motion.div>

      {/* Sidebar */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        style={{
          background: theme.colors.bg,
          border: `1px solid ${theme.colors.border}`,
          borderRadius: theme.borderRadius.lg,
          padding: 24,
          boxShadow: theme.colors.cardShadow,
          position: m ? 'static' : 'sticky',
          top: 100,
          order: m ? -1 : 0,
        }}
      >
        <p style={{ fontSize: 12, color: theme.colors.textMuted, marginBottom: 12 }}>
          Pytasz o ofertę:
        </p>

        <p style={{ fontSize: 16, fontWeight: 700, color: theme.colors.text, marginBottom: 4 }}>
          {offer.bank.productName}
        </p>
        <p style={{ fontSize: 13, color: theme.colors.textSecondary, marginBottom: 20 }}>
          {offer.bank.name}
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 20, paddingBottom: 20, borderBottom: `1px solid ${theme.colors.border}` }}>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span style={{ fontSize: 13, color: theme.colors.textMuted }}>Kwota kredytu:</span>
            <span style={{ fontSize: 13, fontWeight: 600, color: theme.colors.text }}>
              {formatPLN(offer.loanAmount)}
            </span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span style={{ fontSize: 13, color: theme.colors.textMuted }}>Okres spłaty:</span>
            <span style={{ fontSize: 13, fontWeight: 600, color: theme.colors.text }}>
              {offer.months} miesięcy
            </span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span style={{ fontSize: 13, color: theme.colors.textMuted }}>Rata:</span>
            <span style={{ fontSize: 15, fontWeight: 700, color: theme.colors.accent }}>
              {formatPLN(offer.monthlyPayment)}
            </span>
          </div>
        </div>

        <p style={{ fontSize: 14, fontWeight: 600, color: theme.colors.text, marginBottom: 12 }}>
          Ofertę dostaniesz:
        </p>
        {[
          { icon: '✓', text: 'za darmo' },
          { icon: '✓', text: 'nawet w 5 min.' },
          { icon: '✓', text: 'bez zobowiązań' },
        ].map((item) => (
          <div
            key={item.text}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              marginBottom: 8,
              fontSize: 13,
              color: theme.colors.textSecondary,
            }}
          >
            <span style={{ color: theme.colors.success, fontWeight: 700 }}>{item.icon}</span>
            {item.text}
          </div>
        ))}
      </motion.div>
    </div>
  )
}

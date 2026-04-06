import { useState } from 'react'
import { motion } from 'framer-motion'
import { Send, CheckCircle } from 'lucide-react'
import { theme } from '../theme'
import useIsMobile from '../hooks/useIsMobile'
import type { PaymentMethod } from '../types'
import { trackOrderSubmitted } from '../utils/googleSheets'

interface Props {
  method: PaymentMethod
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
  boxSizing: 'border-box',
}

export default function SimpleOrderForm({ method, onBack }: Props) {
  const m = useIsMobile()
  const [submitted, setSubmitted] = useState(false)
  const [sending, setSending] = useState(false)

  const title = method === 'transfer' ? 'Zamówienie z płatnością przelewem' : 'Zamówienie z płatnością gotówką'
  const subtitle = method === 'transfer'
    ? 'Wyślemy Ci dane do przelewu na podany adres e-mail.'
    : 'Skontaktujemy się w celu umówienia odbioru i płatności.'

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setSending(true)
    const form = new FormData(e.currentTarget)

    trackOrderSubmitted(method || 'transfer', {
      imie: form.get('firstName'),
      nazwisko: form.get('lastName'),
      email: form.get('email'),
      telefon: form.get('phone'),
      uwagi: form.get('message'),
    })

    setSending(false)
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        style={{
          maxWidth: 500,
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
        <h2 style={{ fontSize: 24, fontWeight: 700, color: theme.colors.text, marginBottom: 12 }}>
          Zamówienie przyjęte
        </h2>
        <p style={{ fontSize: 15, color: theme.colors.textSecondary, lineHeight: 1.6, marginBottom: 24 }}>
          {method === 'transfer'
            ? 'Dane do przelewu zostaną wysłane na podany adres e-mail w ciągu kilku minut.'
            : 'Skontaktujemy się z Tobą telefonicznie, aby umówić szczegóły odbioru i płatności.'}
        </p>
        <a
          href="/"
          style={{
            display: 'inline-flex',
            padding: '12px 24px',
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
    )
  }

  return (
    <div style={{ maxWidth: 540, margin: '0 auto', padding: m ? '0 20px' : 0 }}>
      <div style={{ textAlign: 'center', marginBottom: m ? 24 : 40 }}>
        <h2 style={{ fontSize: m ? 22 : 28, fontWeight: 700, color: theme.colors.text, marginBottom: 8 }}>
          {title}
        </h2>
        <p style={{ fontSize: 15, color: theme.colors.textSecondary }}>
          {subtitle}
        </p>
      </div>

      <motion.form
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        onSubmit={handleSubmit}
        style={{
          background: theme.colors.bg,
          border: `1px solid ${theme.colors.border}`,
          borderRadius: theme.borderRadius.lg,
          padding: m ? 24 : 36,
          boxShadow: theme.colors.cardShadow,
        }}
      >
        <div style={{ display: 'grid', gridTemplateColumns: m ? '1fr' : '1fr 1fr', gap: 16, marginBottom: 16 }}>
          <div>
            <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: theme.colors.text, marginBottom: 6 }}>
              Imię
            </label>
            <input name="firstName" type="text" required placeholder="Jan" style={inputStyle}
              onFocus={(e) => e.currentTarget.style.borderColor = theme.colors.borderInputFocus}
              onBlur={(e) => e.currentTarget.style.borderColor = theme.colors.borderInput} />
          </div>
          <div>
            <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: theme.colors.text, marginBottom: 6 }}>
              Nazwisko
            </label>
            <input name="lastName" type="text" required placeholder="Kowalski" style={inputStyle}
              onFocus={(e) => e.currentTarget.style.borderColor = theme.colors.borderInputFocus}
              onBlur={(e) => e.currentTarget.style.borderColor = theme.colors.borderInput} />
          </div>
        </div>

        <div style={{ marginBottom: 16 }}>
          <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: theme.colors.text, marginBottom: 6 }}>
            Adres e-mail
          </label>
          <input name="email" type="email" required placeholder="jan@email.pl" style={inputStyle}
            onFocus={(e) => e.currentTarget.style.borderColor = theme.colors.borderInputFocus}
            onBlur={(e) => e.currentTarget.style.borderColor = theme.colors.borderInput} />
        </div>

        <div style={{ marginBottom: 16 }}>
          <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: theme.colors.text, marginBottom: 6 }}>
            Telefon kontaktowy
          </label>
          <input name="phone" type="tel" required placeholder="500 600 700" style={inputStyle}
            onFocus={(e) => e.currentTarget.style.borderColor = theme.colors.borderInputFocus}
            onBlur={(e) => e.currentTarget.style.borderColor = theme.colors.borderInput} />
        </div>

        <div style={{ marginBottom: 24 }}>
          <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: theme.colors.text, marginBottom: 6 }}>
            Uwagi (opcjonalnie)
          </label>
          <textarea
            name="message"
            placeholder="Np. preferowany termin dostawy, pytania..."
            rows={3}
            style={{
              ...inputStyle,
              resize: 'vertical',
              fontFamily: "'Space Grotesk', sans-serif",
            } as React.CSSProperties}
            onFocus={(e) => e.currentTarget.style.borderColor = theme.colors.borderInputFocus}
            onBlur={(e) => e.currentTarget.style.borderColor = theme.colors.borderInput}
          />
        </div>

        <button
          type="submit"
          disabled={sending}
          style={{
            width: '100%',
            padding: '16px 32px',
            background: theme.colors.cta,
            color: theme.colors.ctaText,
            border: 'none',
            borderRadius: theme.borderRadius.sm,
            fontSize: 16,
            fontWeight: 700,
            cursor: sending ? 'wait' : 'pointer',
            opacity: sending ? 0.7 : 1,
            transition: 'background 0.2s',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 8,
          }}
          onMouseEnter={(e) => { if (!sending) e.currentTarget.style.background = theme.colors.ctaHover }}
          onMouseLeave={(e) => { if (!sending) e.currentTarget.style.background = theme.colors.cta }}
        >
          <Send size={18} />
          {sending ? 'Wysyłanie...' : 'Wyślij zamówienie'}
        </button>

        <button
          type="button"
          onClick={onBack}
          style={{
            width: '100%',
            marginTop: 12,
            padding: '12px',
            background: 'none',
            border: `1px solid ${theme.colors.border}`,
            borderRadius: theme.borderRadius.sm,
            fontSize: 13,
            color: theme.colors.textSecondary,
            cursor: 'pointer',
          }}
        >
          Wróć do wyboru płatności
        </button>
      </motion.form>
    </div>
  )
}

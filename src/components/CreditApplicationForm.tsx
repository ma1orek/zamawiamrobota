import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { motion } from 'framer-motion'
import { ChevronDown, ChevronUp, Shield, FileText } from 'lucide-react'
import { theme } from '../theme'
import useIsMobile from '../hooks/useIsMobile'
import { creditApplicationSchema, type CreditFormValues } from '../utils/validation'
import type { CalculatorParams, ComputedBankOffer } from '../types'
import { formatPLN } from '../utils/formatters'

interface Props {
  params: CalculatorParams
  bestOffer: ComputedBankOffer | null
  onSubmit: (data: CreditFormValues) => void
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

const labelStyle: React.CSSProperties = {
  display: 'block',
  fontSize: 13,
  fontWeight: 600,
  color: theme.colors.text,
  marginBottom: 6,
}

const errorStyle: React.CSSProperties = {
  fontSize: 12,
  color: theme.colors.error,
  marginTop: 4,
}

const sectionStyle: React.CSSProperties = {
  marginBottom: 32,
  paddingBottom: 32,
  borderBottom: `1px solid ${theme.colors.border}`,
}

const sectionTitleStyle: React.CSSProperties = {
  fontSize: 16,
  fontWeight: 600,
  color: theme.colors.text,
  marginBottom: 20,
}

const checkboxLabelStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'flex-start',
  gap: 10,
  cursor: 'pointer',
  fontSize: 13,
  color: theme.colors.textSecondary,
  lineHeight: 1.6,
}

const requiredStar: React.CSSProperties = {
  color: theme.colors.error,
  fontWeight: 700,
}

function focusBorder(e: React.FocusEvent<HTMLInputElement | HTMLSelectElement>) {
  e.currentTarget.style.borderColor = theme.colors.borderInputFocus
}

function blurBorder(e: React.FocusEvent<HTMLInputElement | HTMLSelectElement>) {
  e.currentTarget.style.borderColor = theme.colors.borderInput
}

export default function CreditApplicationForm({ params, bestOffer, onSubmit }: Props) {
  const m = useIsMobile()
  const [bigOpen, setBigOpen] = useState(false)
  const [art297Open, setArt297Open] = useState(false)

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<CreditFormValues>({
    resolver: zodResolver(creditApplicationSchema),
    defaultValues: {
      loanAmount: params.loanAmount,
      months: params.months,
      ownContribution: undefined,
      firstName: '',
      lastName: '',
      pesel: '',
      idNumber: '',
      idIssueDate: '',
      idExpiryDate: '',
      phone: '',
      email: '',
      employmentType: undefined,
      monthlyIncome: undefined as unknown as number,
      monthlyExpenses: undefined as unknown as number,
      consentDataProcessing: false as unknown as true,
      consentRegulations: false as unknown as true,
      consentMarketingPhone: false,
      consentMarketingEmail: false,
      consentOffers: false,
      consentBIG: false as unknown as true,
      consentArt297: false as unknown as true,
      consentPhoneContact: false as unknown as true,
    },
  })

  const handleAcceptAllRequired = () => {
    setValue('consentDataProcessing', true, { shouldValidate: true })
    setValue('consentRegulations', true, { shouldValidate: true })
    setValue('consentBIG', true, { shouldValidate: true })
    setValue('consentArt297', true, { shouldValidate: true })
    setValue('consentPhoneContact', true, { shouldValidate: true })
  }

  const monthlyPayment = bestOffer?.monthlyPayment ?? 0
  const totalCost = bestOffer?.totalCost ?? 0

  return (
    <div style={{ maxWidth: 700, margin: '0 auto', padding: m ? '0 20px' : 0 }}>
      <div style={{ textAlign: 'center', marginBottom: m ? 32 : 48 }}>
        <h2
          style={{
            fontSize: m ? 24 : 32,
            fontWeight: 700,
            color: theme.colors.text,
            marginBottom: 8,
          }}
        >
          Wniosek kredytowy
        </h2>
        <p style={{ fontSize: 15, color: theme.colors.textSecondary }}>
          Wypełnij formularz, aby uzyskać decyzję kredytową
        </p>
      </div>

      <motion.form
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        onSubmit={handleSubmit(onSubmit)}
        style={{
          background: theme.colors.bg,
          border: `1px solid ${theme.colors.border}`,
          borderRadius: theme.borderRadius.lg,
          padding: m ? 24 : 40,
          boxShadow: theme.colors.cardShadow,
        }}
      >
        {/* ─── Section 1: Parametry finansowania ─── */}
        <div style={sectionStyle}>
          <h3 style={sectionTitleStyle}>Parametry finansowania</h3>

          {/* Hidden fields to include loanAmount and months in form data */}
          <input type="hidden" {...register('loanAmount', { valueAsNumber: true })} />
          <input type="hidden" {...register('months', { valueAsNumber: true })} />

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: m ? '1fr' : '1fr 1fr',
              gap: 16,
              padding: 16,
              background: theme.colors.bgSecondary,
              borderRadius: theme.borderRadius.sm,
              marginBottom: 16,
            }}
          >
            <div style={{ textAlign: 'center' }}>
              <p style={{ fontSize: 12, color: theme.colors.textMuted, margin: 0 }}>
                Kwota kredytu
              </p>
              <p
                style={{
                  fontSize: 20,
                  fontWeight: 700,
                  color: theme.colors.text,
                  margin: '4px 0 0',
                }}
              >
                {formatPLN(params.loanAmount)}
              </p>
            </div>
            <div style={{ textAlign: 'center' }}>
              <p style={{ fontSize: 12, color: theme.colors.textMuted, margin: 0 }}>
                Okres spłaty
              </p>
              <p
                style={{
                  fontSize: 20,
                  fontWeight: 700,
                  color: theme.colors.text,
                  margin: '4px 0 0',
                }}
              >
                {params.months} miesięcy
              </p>
            </div>
          </div>

          <div style={{ marginBottom: 16 }}>
            <label style={labelStyle}>Udział własny (opcjonalnie)</label>
            <div style={{ position: 'relative' }}>
              <input
                type="number"
                placeholder="np. 5000"
                {...register('ownContribution', { valueAsNumber: true })}
                style={{ ...inputStyle, paddingRight: 40 }}
                onFocus={focusBorder}
                onBlur={blurBorder}
              />
              <span
                style={{
                  position: 'absolute',
                  right: 16,
                  top: '50%',
                  transform: 'translateY(-50%)',
                  color: theme.colors.textMuted,
                  fontSize: 14,
                }}
              >
                zł
              </span>
            </div>
            {errors.ownContribution && (
              <p style={errorStyle}>{errors.ownContribution.message}</p>
            )}
          </div>

          {/* Simulation info box */}
          {bestOffer && (
            <div
              style={{
                padding: 16,
                background: theme.colors.accentLight,
                border: `1px solid ${theme.colors.accent}`,
                borderRadius: theme.borderRadius.sm,
                fontSize: 14,
                color: theme.colors.text,
                lineHeight: 1.7,
              }}
            >
              <div style={{ fontWeight: 600, marginBottom: 4, color: theme.colors.accent }}>
                Przykładowa symulacja
              </div>
              <span style={{ fontWeight: 600 }}>
                Przykładowa rata: {formatPLN(monthlyPayment)}/mies.
              </span>
              {' | '}
              <span>RRSO: ~8,30%</span>
              {' | '}
              <span>Całkowity koszt: {formatPLN(totalCost)}</span>
            </div>
          )}
        </div>

        {/* ─── Section 2: Dane osobowe ─── */}
        <div style={sectionStyle}>
          <h3 style={sectionTitleStyle}>Dane osobowe</h3>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: m ? '1fr' : '1fr 1fr',
              gap: 16,
              marginBottom: 16,
            }}
          >
            <div>
              <label style={labelStyle}>
                Imię <span style={requiredStar}>*</span>
              </label>
              <input
                type="text"
                placeholder="Jan"
                {...register('firstName')}
                style={inputStyle}
                onFocus={focusBorder}
                onBlur={blurBorder}
              />
              {errors.firstName && <p style={errorStyle}>{errors.firstName.message}</p>}
            </div>
            <div>
              <label style={labelStyle}>
                Nazwisko <span style={requiredStar}>*</span>
              </label>
              <input
                type="text"
                placeholder="Kowalski"
                {...register('lastName')}
                style={inputStyle}
                onFocus={focusBorder}
                onBlur={blurBorder}
              />
              {errors.lastName && <p style={errorStyle}>{errors.lastName.message}</p>}
            </div>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: m ? '1fr' : '1fr 1fr',
              gap: 16,
              marginBottom: 16,
            }}
          >
            <div>
              <label style={labelStyle}>
                PESEL <span style={requiredStar}>*</span>
              </label>
              <input
                type="text"
                placeholder="12345678901"
                maxLength={11}
                {...register('pesel')}
                style={inputStyle}
                onFocus={focusBorder}
                onBlur={blurBorder}
              />
              {errors.pesel && <p style={errorStyle}>{errors.pesel.message}</p>}
            </div>
            <div>
              <label style={labelStyle}>
                Numer dowodu osobistego <span style={requiredStar}>*</span>
              </label>
              <input
                type="text"
                placeholder="ABC123456"
                maxLength={9}
                {...register('idNumber')}
                style={{ ...inputStyle, textTransform: 'uppercase' }}
                onFocus={focusBorder}
                onBlur={blurBorder}
              />
              {errors.idNumber && <p style={errorStyle}>{errors.idNumber.message}</p>}
            </div>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: m ? '1fr' : '1fr 1fr',
              gap: 16,
              marginBottom: 16,
            }}
          >
            <div>
              <label style={labelStyle}>
                Data wydania dokumentu <span style={requiredStar}>*</span>
              </label>
              <input
                type="date"
                {...register('idIssueDate')}
                style={inputStyle}
                onFocus={focusBorder}
                onBlur={blurBorder}
              />
              {errors.idIssueDate && <p style={errorStyle}>{errors.idIssueDate.message}</p>}
            </div>
            <div>
              <label style={labelStyle}>
                Data ważności dokumentu <span style={requiredStar}>*</span>
              </label>
              <input
                type="date"
                {...register('idExpiryDate')}
                style={inputStyle}
                onFocus={focusBorder}
                onBlur={blurBorder}
              />
              {errors.idExpiryDate && (
                <p style={errorStyle}>{errors.idExpiryDate.message}</p>
              )}
            </div>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: m ? '1fr' : '1fr 1fr',
              gap: 16,
            }}
          >
            <div>
              <label style={labelStyle}>
                Telefon kontaktowy <span style={requiredStar}>*</span>
              </label>
              <div style={{ position: 'relative' }}>
                <span
                  style={{
                    position: 'absolute',
                    left: 16,
                    top: '50%',
                    transform: 'translateY(-50%)',
                    color: theme.colors.textMuted,
                    fontSize: 14,
                    fontWeight: 500,
                  }}
                >
                  +48
                </span>
                <input
                  type="tel"
                  placeholder="500 600 700"
                  {...register('phone')}
                  style={{ ...inputStyle, paddingLeft: 52 }}
                  onFocus={focusBorder}
                  onBlur={blurBorder}
                />
              </div>
              {errors.phone && <p style={errorStyle}>{errors.phone.message}</p>}
            </div>
            <div>
              <label style={labelStyle}>
                Adres e-mail <span style={requiredStar}>*</span>
              </label>
              <input
                type="email"
                placeholder="jan@email.pl"
                {...register('email')}
                style={inputStyle}
                onFocus={focusBorder}
                onBlur={blurBorder}
              />
              {errors.email && <p style={errorStyle}>{errors.email.message}</p>}
            </div>
          </div>
        </div>

        {/* ─── Section 3: Zatrudnienie ─── */}
        <div style={sectionStyle}>
          <h3 style={sectionTitleStyle}>Zatrudnienie</h3>

          <div style={{ marginBottom: 16 }}>
            <label style={labelStyle}>
              Rodzaj umowy <span style={requiredStar}>*</span>
            </label>
            <select
              {...register('employmentType')}
              style={{ ...inputStyle, cursor: 'pointer' }}
              onFocus={focusBorder}
              onBlur={blurBorder}
            >
              <option value="">Wybierz...</option>
              <option value="umowa_o_prace">Umowa o pracę</option>
              <option value="umowa_zlecenie">Umowa zlecenie</option>
              <option value="umowa_o_dzielo">Umowa o dzieło</option>
              <option value="jdg">Jednoosobowa działalność gospodarcza</option>
              <option value="inne">Inne</option>
            </select>
            {errors.employmentType && (
              <p style={errorStyle}>{errors.employmentType.message}</p>
            )}
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: m ? '1fr' : '1fr 1fr',
              gap: 16,
            }}
          >
            <div>
              <label style={labelStyle}>
                Dochód miesięczny netto <span style={requiredStar}>*</span>
              </label>
              <div style={{ position: 'relative' }}>
                <input
                  type="number"
                  placeholder="np. 5000"
                  {...register('monthlyIncome', { valueAsNumber: true })}
                  style={{ ...inputStyle, paddingRight: 40 }}
                  onFocus={focusBorder}
                  onBlur={blurBorder}
                />
                <span
                  style={{
                    position: 'absolute',
                    right: 16,
                    top: '50%',
                    transform: 'translateY(-50%)',
                    color: theme.colors.textMuted,
                    fontSize: 14,
                  }}
                >
                  zł
                </span>
              </div>
              {errors.monthlyIncome && (
                <p style={errorStyle}>{errors.monthlyIncome.message}</p>
              )}
            </div>
            <div>
              <label style={labelStyle}>
                Wydatki miesięczne <span style={requiredStar}>*</span>
              </label>
              <div style={{ position: 'relative' }}>
                <input
                  type="number"
                  placeholder="np. 2000"
                  {...register('monthlyExpenses', { valueAsNumber: true })}
                  style={{ ...inputStyle, paddingRight: 40 }}
                  onFocus={focusBorder}
                  onBlur={blurBorder}
                />
                <span
                  style={{
                    position: 'absolute',
                    right: 16,
                    top: '50%',
                    transform: 'translateY(-50%)',
                    color: theme.colors.textMuted,
                    fontSize: 14,
                  }}
                >
                  zł
                </span>
              </div>
              {errors.monthlyExpenses && (
                <p style={errorStyle}>{errors.monthlyExpenses.message}</p>
              )}
            </div>
          </div>
        </div>

        {/* ─── Section 4: Zgody prawne ─── */}
        <div style={sectionStyle}>
          <h3 style={sectionTitleStyle}>Zgody prawne</h3>

          <button
            type="button"
            onClick={handleAcceptAllRequired}
            style={{
              width: '100%',
              padding: '14px 16px',
              background: theme.colors.accentLight,
              border: `1px solid ${theme.colors.accent}`,
              borderRadius: theme.borderRadius.sm,
              cursor: 'pointer',
              fontSize: 14,
              fontWeight: 600,
              color: theme.colors.accent,
              marginBottom: 20,
              fontFamily: "'Space Grotesk', sans-serif",
            }}
          >
            Zaakceptuj wszystkie wymagane zgody
          </button>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {/* Consent 1: Data processing */}
            <div>
              <label style={checkboxLabelStyle}>
                <input
                  type="checkbox"
                  {...register('consentDataProcessing')}
                  style={{ marginTop: 4, flexShrink: 0 }}
                />
                <span>
                  Potwierdzam zapoznanie się z Informacją administratora danych osobowych.{' '}
                  <strong style={requiredStar}>*</strong>
                </span>
              </label>
              {errors.consentDataProcessing && (
                <p style={errorStyle}>{errors.consentDataProcessing.message}</p>
              )}
            </div>

            {/* Consent 2: Regulations */}
            <div>
              <label style={checkboxLabelStyle}>
                <input
                  type="checkbox"
                  {...register('consentRegulations')}
                  style={{ marginTop: 4, flexShrink: 0 }}
                />
                <span>
                  Akceptuję Regulamin świadczenia drogą elektroniczną umów o produkty
                  kredytowe.{' '}
                  <strong style={requiredStar}>*</strong>
                </span>
              </label>
              {errors.consentRegulations && (
                <p style={errorStyle}>{errors.consentRegulations.message}</p>
              )}
            </div>

            {/* Consent 3: Marketing phone (optional) */}
            <div>
              <label style={checkboxLabelStyle}>
                <input
                  type="checkbox"
                  {...register('consentMarketingPhone')}
                  style={{ marginTop: 4, flexShrink: 0 }}
                />
                <span>Zgoda na marketing telefoniczny</span>
              </label>
            </div>

            {/* Consent 4: Marketing email (optional) */}
            <div>
              <label style={checkboxLabelStyle}>
                <input
                  type="checkbox"
                  {...register('consentMarketingEmail')}
                  style={{ marginTop: 4, flexShrink: 0 }}
                />
                <span>Zgoda na marketing elektroniczny</span>
              </label>
            </div>

            {/* Consent 5: Offers (optional) */}
            <div>
              <label style={checkboxLabelStyle}>
                <input
                  type="checkbox"
                  {...register('consentOffers')}
                  style={{ marginTop: 4, flexShrink: 0 }}
                />
                <span>Zgoda na otrzymywanie ofert</span>
              </label>
            </div>
          </div>
        </div>

        {/* ─── Section 5: Autoryzacja BIG/BIK ─── */}
        <div style={sectionStyle}>
          <button
            type="button"
            onClick={() => setBigOpen(!bigOpen)}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              width: '100%',
              padding: 0,
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              fontFamily: "'Space Grotesk', sans-serif",
            }}
          >
            <h3
              style={{
                ...sectionTitleStyle,
                marginBottom: 0,
                display: 'flex',
                alignItems: 'center',
                gap: 8,
              }}
            >
              <FileText size={18} color={theme.colors.text} />
              Autoryzacja BIG/BIK
              <span style={{ ...requiredStar, fontSize: 14 }}>*</span>
            </h3>
            {bigOpen ? (
              <ChevronUp size={20} color={theme.colors.textSecondary} />
            ) : (
              <ChevronDown size={20} color={theme.colors.textSecondary} />
            )}
          </button>

          <div
            style={{
              maxHeight: bigOpen ? 600 : 0,
              overflow: 'hidden',
              transition: 'max-height 0.35s ease',
              marginTop: bigOpen ? 16 : 0,
            }}
          >
            <div
              style={{
                padding: 16,
                background: theme.colors.bgSecondary,
                borderRadius: theme.borderRadius.sm,
                border: `1px solid ${theme.colors.border}`,
              }}
            >
              <label style={{ ...checkboxLabelStyle, fontSize: 12.5 }}>
                <input
                  type="checkbox"
                  {...register('consentBIG')}
                  style={{ marginTop: 4, flexShrink: 0 }}
                />
                <span>
                  Na podstawie art. 24 ust. 1 ustawy z dnia 9 kwietnia 2010 roku o
                  udostępnianiu informacji gospodarczych i wymianie danych gospodarczych
                  upoważniam zamawiamrobota.pl sp. z o.o., z siedzibą w Warszawie do wystąpienia do
                  biur informacji gospodarczej o ujawnienie informacji gospodarczych
                  dotyczących moich zobowiązań. W szczególności informacji w Krajowym Rejestrze
                  Długów Biuro Informacji Gospodarczej S.A. z siedzibą we Wrocławiu, Rejestrze
                  Dłużników ERIF Biuro Informacji Gospodarczej z siedzibą w Warszawie oraz za
                  pośrednictwem Biura Informacji Kredytowej S.A. z siedzibą w Warszawie w
                  Biurze Informacji Gospodarczej InfoMonitor S.A. z siedzibą w Warszawie.{' '}
                  <strong style={requiredStar}>*</strong>
                </span>
              </label>
            </div>
          </div>
          {errors.consentBIG && <p style={errorStyle}>{errors.consentBIG.message}</p>}
        </div>

        {/* ─── Section 6: Oświadczenie art. 297 KK ─── */}
        <div style={sectionStyle}>
          <button
            type="button"
            onClick={() => setArt297Open(!art297Open)}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              width: '100%',
              padding: 0,
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              fontFamily: "'Space Grotesk', sans-serif",
            }}
          >
            <h3
              style={{
                ...sectionTitleStyle,
                marginBottom: 0,
                display: 'flex',
                alignItems: 'center',
                gap: 8,
              }}
            >
              <FileText size={18} color={theme.colors.text} />
              Oświadczenie art. 297 KK
              <span style={{ ...requiredStar, fontSize: 14 }}>*</span>
            </h3>
            {art297Open ? (
              <ChevronUp size={20} color={theme.colors.textSecondary} />
            ) : (
              <ChevronDown size={20} color={theme.colors.textSecondary} />
            )}
          </button>

          <div
            style={{
              maxHeight: art297Open ? 800 : 0,
              overflow: 'hidden',
              transition: 'max-height 0.35s ease',
              marginTop: art297Open ? 16 : 0,
            }}
          >
            <div
              style={{
                padding: 16,
                background: theme.colors.bgSecondary,
                borderRadius: theme.borderRadius.sm,
                border: `1px solid ${theme.colors.border}`,
              }}
            >
              <label style={{ ...checkboxLabelStyle, fontSize: 12.5 }}>
                <input
                  type="checkbox"
                  {...register('consentArt297')}
                  style={{ marginTop: 4, flexShrink: 0 }}
                />
                <span>
                  Poinformowany o treści art. 297 &sect; 1 Kodeksu karnego w brzmieniu:
                  &ldquo;Kto, w celu uzyskania (&hellip;) kredytu, pożyczki pieniężnej,
                  (&hellip;) przedkłada podrobiony, przerobiony, poświadczający nieprawdę albo
                  nierzetelny dokument (&hellip;) podlega karze pozbawienia wolności od 3
                  miesięcy do lat 5&rdquo;, oświadczam, że:
                  <br />
                  &ndash; nie zalegam ze zobowiązaniami publicznoprawnymi,
                  <br />
                  &ndash; nie posiadam opóźnień w spłacie zobowiązań zasądzonych przez sąd ani
                  zobowiązań będących przedmiotem postępowania sądowego,
                  <br />
                  &ndash; na dzień złożenia niniejszego Wniosku nie ogłosiłem upadłości ani nie
                  złożyłem wniosku o jej ogłoszenie,
                  <br />
                  &ndash; mój dochód nie jest zajęty w postępowaniu sądowym, administracyjnym,
                  <br />
                  &ndash; mój pracodawca / firma nie znajduje się w likwidacji / upadłości,
                  <br />
                  &ndash; nie pozostaję w okresie próbnym lub w okresie wypowiedzenia.{' '}
                  <strong style={requiredStar}>*</strong>
                </span>
              </label>
            </div>
          </div>
          {errors.consentArt297 && (
            <p style={errorStyle}>{errors.consentArt297.message}</p>
          )}
        </div>

        {/* ─── Section 7: Zgoda na kontakt ─── */}
        <div style={{ marginBottom: 32 }}>
          <h3 style={sectionTitleStyle}>Zgoda na kontakt</h3>
          <div>
            <label style={checkboxLabelStyle}>
              <input
                type="checkbox"
                {...register('consentPhoneContact')}
                style={{ marginTop: 4, flexShrink: 0 }}
              />
              <span>
                Wyrażam zgodę na kontakt telefoniczny Banku, na numer telefonu podany we
                wniosku, w celu zaproponowania mi warunków oferty kredytowej.{' '}
                <strong style={requiredStar}>*</strong>
              </span>
            </label>
            {errors.consentPhoneContact && (
              <p style={errorStyle}>{errors.consentPhoneContact.message}</p>
            )}
          </div>
        </div>

        {/* ─── Submit ─── */}
        <button
          type="submit"
          style={{
            width: '100%',
            padding: '18px 32px',
            background: theme.colors.cta,
            color: theme.colors.ctaText,
            border: 'none',
            borderRadius: theme.borderRadius.sm,
            fontSize: 16,
            fontWeight: 700,
            cursor: 'pointer',
            transition: 'background 0.2s, transform 0.2s',
            fontFamily: "'Space Grotesk', sans-serif",
            letterSpacing: '0.5px',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = theme.colors.ctaHover
            e.currentTarget.style.transform = 'translateY(-1px)'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = theme.colors.cta
            e.currentTarget.style.transform = 'translateY(0)'
          }}
        >
          ZŁÓŻ WNIOSEK KREDYTOWY
        </button>

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 8,
            marginTop: 16,
            fontSize: 12,
            color: theme.colors.textMuted,
          }}
        >
          <Shield size={14} color={theme.colors.success} />
          <span>Dane chronione | Zgodne z RODO</span>
        </div>
      </motion.form>
    </div>
  )
}

import { Bot } from 'lucide-react'
import { theme } from '../theme'
import useIsMobile from '../hooks/useIsMobile'

export default function Footer() {
  const m = useIsMobile()

  return (
    <footer
      style={{
        background: theme.colors.bgSecondary,
        borderTop: `1px solid ${theme.colors.border}`,
        padding: m ? '48px 20px' : '64px 48px',
      }}
    >
      <div
        style={{
          maxWidth: theme.spacing.maxWidth,
          margin: '0 auto',
          display: 'flex',
          flexDirection: m ? 'column' : 'row',
          justifyContent: 'space-between',
          gap: 32,
        }}
      >
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 18, fontWeight: 700, color: theme.colors.text, marginBottom: 8 }}>
            <Bot size={20} color={theme.colors.accent} />
            <span>zamawiam</span><span style={{ color: theme.colors.accent }}>robota</span>
          </div>
          <p style={{ fontSize: 13, color: theme.colors.textMuted, maxWidth: 300, lineHeight: 1.6 }}>
            Porównywarka kredytów na zakup robotów humanoidalnych. Porównaj oferty z 9 banków i znajdź najlepsze finansowanie.
          </p>
        </div>

        <div style={{ display: 'flex', gap: m ? 40 : 80 }}>
          <div>
            <h4 style={{ fontSize: 13, fontWeight: 600, color: theme.colors.text, marginBottom: 12, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Produkt
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {['Unitree G1', 'Specyfikacja', 'Galeria'].map((item) => (
                <span key={item} style={{ fontSize: 13, color: theme.colors.textSecondary, cursor: 'pointer' }}>
                  {item}
                </span>
              ))}
            </div>
          </div>
          <div>
            <h4 style={{ fontSize: 13, fontWeight: 600, color: theme.colors.text, marginBottom: 12, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Finansowanie
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {['Kalkulator', 'Porównanie ofert', 'FAQ'].map((item) => (
                <span key={item} style={{ fontSize: 13, color: theme.colors.textSecondary, cursor: 'pointer' }}>
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div
        style={{
          maxWidth: theme.spacing.maxWidth,
          margin: '0 auto',
          borderTop: `1px solid ${theme.colors.border}`,
          marginTop: 48,
          paddingTop: 24,
          display: 'flex',
          flexDirection: m ? 'column' : 'row',
          justifyContent: 'space-between',
          gap: 16,
        }}
      >
        <p style={{ fontSize: 12, color: theme.colors.textMuted }}>
          &copy; 2026 zamawiamrobota.pl. Wszelkie prawa zastrzeżone.
        </p>
        <div style={{ display: 'flex', gap: 24 }}>
          {['Regulamin', 'Polityka prywatności', 'Ustawienia prywatności'].map((item) => (
            <span key={item} style={{ fontSize: 12, color: theme.colors.textMuted, cursor: 'pointer' }}>
              {item}
            </span>
          ))}
        </div>
      </div>

      <div
        style={{
          maxWidth: theme.spacing.maxWidth,
          margin: '24px auto 0',
          fontSize: 11,
          color: theme.colors.textMuted,
          lineHeight: 1.6,
        }}
      >
        Przedstawione informacje pokazują jedynie informacje o produktach dostępnych w poszczególnych instytucjach finansowych; nie są więc ofertą w rozumieniu art. 66 kc. Nie jesteśmy kredytodawcami, więc nie mamy wpływu na to, czy dostaniesz kredyt i na jakich warunkach — może to zależeć od wielu czynników, w tym od oceny Twojej zdolności kredytowej.
      </div>
    </footer>
  )
}

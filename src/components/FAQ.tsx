import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { theme } from '../theme'
import useIsMobile from '../hooks/useIsMobile'

const faqItems = [
  {
    question: 'Czy porównanie kredytów jest bezpłatne?',
    answer:
      'Tak, porównanie ofert kredytowych jest całkowicie bezpłatne. Nie pobieramy żadnych opłat za korzystanie z kalkulatora ani za wysłanie zgłoszenia do banku.',
  },
  {
    question: 'Jak działa porównywanie ofert?',
    answer:
      'Wpisujesz kwotę kredytu i okres spłaty, a nasz system wylicza raty, RRSO i całkowity koszt kredytu dla 9 banków. Możesz porównać oferty i wybrać najkorzystniejszą.',
  },
  {
    question: 'Czy mogę kupić robota na raty bez wkładu własnego?',
    answer:
      'Tak, kredyt gotówkowy nie wymaga wkładu własnego. Finansujesz 100% ceny robota, a kwotę spłacasz w wygodnych miesięcznych ratach.',
  },
  {
    question: 'Jakie dokumenty będą potrzebne?',
    answer:
      'Najczęściej wystarczy dowód osobisty oraz zaświadczenie o dochodach (lub wyciąg z konta). Dokładna lista dokumentów zależy od wybranego banku.',
  },
  {
    question: 'Co z bezpieczeństwem moich danych?',
    answer:
      'Twoje dane są chronione zgodnie z RODO. Przekazujemy je wyłącznie do instytucji finansowych, na które wyrazisz zgodę. Nigdy nie pytamy o PESEL ani dane karty kredytowej.',
  },
  {
    question: 'Czy od razu dostaję decyzję kredytową?',
    answer:
      'Wstępna decyzja kredytowa jest zazwyczaj wydawana w ciągu kilkunastu minut od złożenia wniosku. Ostateczna decyzja może potrwać do kilku dni roboczych.',
  },
]

export default function FAQ() {
  const m = useIsMobile()
  const [openIdx, setOpenIdx] = useState<number | null>(null)

  return (
    <section
      id="faq"
      style={{
        padding: m ? '64px 20px' : '100px 48px',
      }}
    >
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <h2
          style={{
            fontSize: m ? 28 : 40,
            fontWeight: 700,
            color: theme.colors.text,
            letterSpacing: '-0.02em',
            marginBottom: 12,
            textAlign: 'center',
          }}
        >
          Najczęściej zadawane pytania
        </h2>
        <p
          style={{
            fontSize: 16,
            color: theme.colors.textSecondary,
            textAlign: 'center',
            marginBottom: m ? 32 : 48,
          }}
        >
          Znajdź odpowiedzi na najważniejsze pytania
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {faqItems.map((item, idx) => {
            const isOpen = openIdx === idx

            return (
              <div
                key={idx}
                style={{
                  border: `1px solid ${isOpen ? theme.colors.accent : theme.colors.border}`,
                  borderRadius: theme.borderRadius.md,
                  overflow: 'hidden',
                  transition: 'border-color 0.2s',
                }}
              >
                <button
                  onClick={() => setOpenIdx(isOpen ? null : idx)}
                  style={{
                    width: '100%',
                    padding: m ? '16px 20px' : '20px 24px',
                    background: isOpen ? theme.colors.accentLight : theme.colors.bg,
                    border: 'none',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: 12,
                    textAlign: 'left',
                    transition: 'background 0.2s',
                  }}
                >
                  <span
                    style={{
                      fontSize: m ? 15 : 16,
                      fontWeight: 600,
                      color: theme.colors.text,
                    }}
                  >
                    {item.question}
                  </span>
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke={theme.colors.textMuted}
                    strokeWidth="2"
                    style={{
                      flexShrink: 0,
                      transition: 'transform 0.3s',
                      transform: isOpen ? 'rotate(180deg)' : 'rotate(0)',
                    }}
                  >
                    <path d="M6 9l6 6 6-6" />
                  </svg>
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                      style={{ overflow: 'hidden' }}
                    >
                      <p
                        style={{
                          padding: m ? '0 20px 16px' : '0 24px 20px',
                          fontSize: 14,
                          color: theme.colors.textSecondary,
                          lineHeight: 1.7,
                        }}
                      >
                        {item.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

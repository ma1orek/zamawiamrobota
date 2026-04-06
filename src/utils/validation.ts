import { z } from 'zod'

export const creditApplicationSchema = z.object({
  loanAmount: z
    .number({ error: 'Podaj kwotę kredytu' })
    .min(10000, 'Minimalna kwota to 10 000 zł')
    .max(300000, 'Maksymalna kwota to 300 000 zł'),

  ownContribution: z
    .number({ error: 'Podaj kwotę' })
    .min(0, 'Kwota nie może być ujemna')
    .optional(),

  months: z
    .number({ error: 'Podaj liczbę miesięcy' })
    .min(6, 'Minimalny okres to 6 miesięcy')
    .max(120, 'Maksymalny okres to 120 miesięcy'),

  firstName: z.string().min(2, 'Imię jest wymagane').max(50, 'Imię jest za długie'),
  lastName: z.string().min(2, 'Nazwisko jest wymagane').max(50, 'Nazwisko jest za długie'),

  pesel: z
    .string()
    .min(1, 'PESEL jest wymagany')
    .regex(/^\d{11}$/, 'PESEL musi składać się z 11 cyfr'),

  idNumber: z
    .string()
    .min(1, 'Numer dowodu jest wymagany')
    .regex(/^[A-Z]{3}\d{6}$/, 'Podaj prawidłowy numer dowodu (np. ABC123456)'),

  idIssueDate: z.string().min(1, 'Podaj datę wydania dokumentu'),
  idExpiryDate: z.string().min(1, 'Podaj datę ważności dokumentu'),

  phone: z
    .string()
    .min(9, 'Podaj numer telefonu')
    .regex(/^\+?48?\s?\d{3}\s?\d{3}\s?\d{3}$|^\d{9}$/, 'Podaj prawidłowy numer telefonu'),

  email: z.string().email('Podaj prawidłowy adres e-mail'),

  employmentType: z.enum(
    ['umowa_o_prace', 'umowa_zlecenie', 'umowa_o_dzielo', 'jdg', 'inne'],
    { error: 'Wybierz rodzaj umowy' }
  ),

  monthlyIncome: z
    .number({ error: 'Podaj kwotę dochodu' })
    .min(0, 'Kwota nie może być ujemna'),

  monthlyExpenses: z
    .number({ error: 'Podaj kwotę wydatków' })
    .min(0, 'Kwota nie może być ujemna'),

  consentDataProcessing: z.literal(true, 'Zgoda na przetwarzanie danych jest wymagana'),
  consentRegulations: z.literal(true, 'Akceptacja regulaminu jest wymagana'),
  consentMarketingPhone: z.boolean().optional(),
  consentMarketingEmail: z.boolean().optional(),
  consentOffers: z.boolean().optional(),
  consentBIG: z.literal(true, 'Autoryzacja BIG jest wymagana'),
  consentArt297: z.literal(true, 'Oświadczenie art. 297 KK jest wymagane'),
  consentPhoneContact: z.literal(true, 'Zgoda na kontakt telefoniczny jest wymagana'),
})

export type CreditFormValues = z.infer<typeof creditApplicationSchema>

export const contactFormSchema = z.object({
  firstName: z.string().min(2, 'Imię jest wymagane'),
  lastName: z.string().min(2, 'Nazwisko jest wymagane'),
  phone: z
    .string()
    .min(9, 'Podaj numer telefonu')
    .regex(/^\+?48?\s?\d{3}\s?\d{3}\s?\d{3}$|^\d{9}$/, 'Podaj prawidłowy numer telefonu'),
  consentAll: z.literal(true, 'Zaakceptuj zgody'),
})

export type ContactFormValues = z.infer<typeof contactFormSchema>

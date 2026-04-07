import { partnerConfig, isPartnerConfigured } from '../config/partners'
import { trackEvent } from '../utils/googleSheets'

export interface AliorRequest {
  amount: number
  months: number
  firstName: string
  lastName: string
  pesel?: string
  phone: string
  email: string
}

export interface AliorResponse {
  success: boolean
  redirectUrl?: string
  applicationId?: string
  error?: string
}

export async function submitToAlior(data: AliorRequest): Promise<AliorResponse> {
  const config = partnerConfig.alior

  trackEvent('alior_submit', {
    kwota: data.amount,
    miesiecy: data.months,
  })

  if (!isPartnerConfigured('alior')) {
    console.warn('[Alior] API nie skonfigurowane — brak partnerId/apiKey.')
    return {
      success: false,
      error: 'Serwis Alior Bank jest w trakcie konfiguracji. Nasz konsultant skontaktuje się z Tobą.',
    }
  }

  try {
    const response = await fetch(`${config.endpoint}/installments/apply`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Partner-Id': config.partnerId,
        'X-Api-Key': config.apiKey,
      },
      body: JSON.stringify({
        transactionAmount: data.amount,
        numberOfInstallments: data.months,
        customer: {
          firstName: data.firstName,
          lastName: data.lastName,
          pesel: data.pesel,
          phoneNumber: data.phone,
          email: data.email,
        },
      }),
    })

    if (!response.ok) {
      throw new Error(`Alior API error: ${response.status}`)
    }

    const result = await response.json()

    trackEvent('alior_redirect', { applicationId: result.applicationId })

    return {
      success: true,
      redirectUrl: result.applicationUrl,
      applicationId: result.applicationId,
    }
  } catch (error) {
    trackEvent('alior_error', { error: String(error) })
    return {
      success: false,
      error: 'Wystąpił błąd połączenia z Alior Bank. Spróbuj ponownie.',
    }
  }
}

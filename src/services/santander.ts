import { partnerConfig, isPartnerConfigured } from '../config/partners'
import { trackEvent } from '../utils/googleSheets'

export interface SantanderRequest {
  amount: number
  months: number
  firstName: string
  lastName: string
  pesel?: string
  phone: string
  email: string
}

export interface SantanderResponse {
  success: boolean
  applicationId?: string
  status?: 'pending' | 'approved' | 'rejected'
  redirectUrl?: string
  error?: string
}

export async function submitToSantander(data: SantanderRequest): Promise<SantanderResponse> {
  const config = partnerConfig.santander

  trackEvent('santander_submit', {
    kwota: data.amount,
    miesiecy: data.months,
  })

  if (!isPartnerConfigured('santander')) {
    console.warn('[Santander] API nie skonfigurowane — brak shopId/apiKey.')
    return {
      success: false,
      error: 'Serwis Santander eRaty jest w trakcie konfiguracji. Nasz konsultant skontaktuje się z Tobą.',
    }
  }

  try {
    const response = await fetch(`${config.endpoint}/applications`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shop-Id': config.shopId,
        'X-Api-Key': config.apiKey,
      },
      body: JSON.stringify({
        amount: data.amount,
        installments: data.months,
        customer: {
          firstName: data.firstName,
          lastName: data.lastName,
          pesel: data.pesel,
          phone: data.phone,
          email: data.email,
        },
      }),
    })

    if (!response.ok) {
      throw new Error(`Santander API error: ${response.status}`)
    }

    const result = await response.json()

    trackEvent('santander_decision', {
      applicationId: result.applicationId,
      status: result.status,
    })

    return {
      success: true,
      applicationId: result.applicationId,
      status: result.status,
      redirectUrl: result.redirectUrl,
    }
  } catch (error) {
    trackEvent('santander_error', { error: String(error) })
    return {
      success: false,
      error: 'Wystąpił błąd połączenia z Santander. Spróbuj ponownie.',
    }
  }
}

export async function checkSantanderStatus(applicationId: string): Promise<SantanderResponse> {
  const config = partnerConfig.santander

  if (!isPartnerConfigured('santander')) {
    return { success: false, error: 'API nie skonfigurowane' }
  }

  try {
    const response = await fetch(`${config.endpoint}/applications/${applicationId}/status`, {
      headers: {
        'X-Shop-Id': config.shopId,
        'X-Api-Key': config.apiKey,
      },
    })

    const result = await response.json()
    return {
      success: true,
      applicationId,
      status: result.status,
    }
  } catch {
    return { success: false, error: 'Błąd sprawdzania statusu' }
  }
}

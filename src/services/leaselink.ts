import { partnerConfig, isPartnerConfigured } from '../config/partners'
import { trackEvent } from '../utils/googleSheets'

export interface LeaseLinkRequest {
  amount: number
  months: number
  companyName: string
  nip: string
  contactName: string
  phone: string
  email: string
  equipmentDescription: string
}

export interface LeaseLinkResponse {
  success: boolean
  redirectUrl?: string
  applicationId?: string
  error?: string
}

export async function submitToLeaseLink(data: LeaseLinkRequest): Promise<LeaseLinkResponse> {
  const config = partnerConfig.leaselink

  trackEvent('leaselink_submit', {
    kwota: data.amount,
    miesiecy: data.months,
    nip: data.nip,
  })

  if (!isPartnerConfigured('leaselink')) {
    console.warn('[LeaseLink] API nie skonfigurowane — brak API KEY. Dane zapisane w Google Sheets.')
    return {
      success: false,
      error: 'Serwis LeaseLink jest w trakcie konfiguracji. Nasz konsultant skontaktuje się z Tobą.',
    }
  }

  try {
    const response = await fetch(`${config.endpoint}/applications`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Api-Key': config.apiKey,
        'X-External-Id': config.externalId,
      },
      body: JSON.stringify({
        amount: data.amount,
        period: data.months,
        company: {
          name: data.companyName,
          nip: data.nip,
        },
        contact: {
          name: data.contactName,
          phone: data.phone,
          email: data.email,
        },
        equipment: data.equipmentDescription,
      }),
    })

    if (!response.ok) {
      throw new Error(`LeaseLink API error: ${response.status}`)
    }

    const result = await response.json()

    trackEvent('leaselink_success', { applicationId: result.applicationId })

    return {
      success: true,
      redirectUrl: result.redirectUrl || `${config.portalUrl}/application/${result.applicationId}`,
      applicationId: result.applicationId,
    }
  } catch (error) {
    trackEvent('leaselink_error', { error: String(error) })
    return {
      success: false,
      error: 'Wystąpił błąd połączenia z LeaseLink. Spróbuj ponownie.',
    }
  }
}

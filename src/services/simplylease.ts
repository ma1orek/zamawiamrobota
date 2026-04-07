import { partnerConfig, isPartnerConfigured } from '../config/partners'
import { trackEvent } from '../utils/googleSheets'

export interface SimplyLeaseRequest {
  amount: number
  months: number
  companyName: string
  nip: string
  contactName: string
  phone: string
  email: string
}

export interface SimplyLeaseResponse {
  success: boolean
  decision?: 'approved' | 'rejected' | 'pending'
  redirectUrl?: string
  monthlyPayment?: number
  error?: string
}

export async function submitToSimplyLease(data: SimplyLeaseRequest): Promise<SimplyLeaseResponse> {
  const config = partnerConfig.simplylease

  trackEvent('simplylease_submit', {
    kwota: data.amount,
    miesiecy: data.months,
    nip: data.nip,
  })

  if (!isPartnerConfigured('simplylease')) {
    console.warn('[SimplyLease] API nie skonfigurowane — brak CLIENT_ID/TOKEN.')
    return {
      success: false,
      error: 'Serwis SimplyLease jest w trakcie konfiguracji. Nasz konsultant skontaktuje się z Tobą.',
    }
  }

  try {
    const response = await fetch(`${config.endpoint}/lease/apply`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${config.token}`,
        'X-Client-Id': config.clientId,
      },
      body: JSON.stringify({
        orderAmount: data.amount,
        leasingPeriod: data.months,
        company: { name: data.companyName, nip: data.nip },
        contact: { name: data.contactName, phone: data.phone, email: data.email },
      }),
    })

    if (!response.ok) {
      throw new Error(`SimplyLease API error: ${response.status}`)
    }

    const result = await response.json()

    trackEvent('simplylease_decision', { decision: result.decision })

    return {
      success: true,
      decision: result.decision,
      redirectUrl: result.contractUrl,
      monthlyPayment: result.monthlyPayment,
    }
  } catch (error) {
    trackEvent('simplylease_error', { error: String(error) })
    return {
      success: false,
      error: 'Wystąpił błąd połączenia z SimplyLease. Spróbuj ponownie.',
    }
  }
}

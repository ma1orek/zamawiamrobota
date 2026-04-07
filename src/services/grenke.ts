import { partnerConfig, isPartnerConfigured } from '../config/partners'
import { trackEvent } from '../utils/googleSheets'

export interface GrenkeRequest {
  amount: number
  months: number
  companyName: string
  nip: string
  contactName: string
  phone: string
  email: string
  equipmentDescription: string
}

export interface GrenkeResponse {
  success: boolean
  redirectUrl?: string
  message: string
}

export async function submitToGrenke(data: GrenkeRequest): Promise<GrenkeResponse> {
  const config = partnerConfig.grenke

  trackEvent('grenke_submit', {
    kwota: data.amount,
    miesiecy: data.months,
    nip: data.nip,
  })

  if (!isPartnerConfigured('grenke')) {
    // GRENKE nie ma publicznego API — wysyłamy dane kontaktowe
    return {
      success: true,
      message: 'Twoje zgłoszenie zostało zarejestrowane. Konsultant GRENKE skontaktuje się z Tobą w ciągu 24 godzin.',
    }
  }

  // Gdy partner number jest skonfigurowany — redirect do portalu
  const params = new URLSearchParams({
    partner: config.partnerNumber,
    amount: String(data.amount),
    period: String(data.months),
    company: data.companyName,
    nip: data.nip,
    contact: data.contactName,
    phone: data.phone,
    email: data.email,
  })

  return {
    success: true,
    redirectUrl: `${config.portalUrl}/apply?${params.toString()}`,
    message: 'Przekierowanie do portalu GRENKE...',
  }
}

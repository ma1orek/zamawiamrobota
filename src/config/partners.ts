/**
 * Konfiguracja partnerów finansowych.
 * Wklej credentials po podpisaniu umów partnerskich.
 * Gdy pole jest puste (''), serwis działa w trybie demo (tracking + formularz kontaktowy).
 */

export const partnerConfig = {
  leaselink: {
    enabled: true,
    name: 'LeaseLink',
    description: 'Leasing online w 15 minut, 24/7. Całkowicie online.',
    apiKey: '',
    externalId: '',
    endpoint: 'https://portal.leaselink.pl/api/v1',
    portalUrl: 'https://portal.leaselink.pl',
    minAmount: 500,
    maxAmount: 250000,
    minMonths: 12,
    maxMonths: 60,
  },
  simplylease: {
    enabled: true,
    name: 'SimplyLease (Siemens)',
    description: 'Leasing sprzętu z decyzją w 5 sekund. Siemens Financial Services.',
    clientId: '',
    token: '',
    endpoint: 'https://app.simplylease.pl/api',
    portalUrl: 'https://app.simplylease.pl',
    minAmount: 1000,
    maxAmount: 500000,
    minMonths: 12,
    maxMonths: 60,
  },
  grenke: {
    enabled: true,
    name: 'GRENKE',
    description: 'Leasing dla firm. Elastyczne warunki finansowania sprzętu.',
    partnerNumber: '',
    portalUrl: 'https://portal.grenke.net',
    contactEmail: 'info@grenke.pl',
    minAmount: 500,
    maxAmount: 500000,
    minMonths: 12,
    maxMonths: 60,
  },
  santander: {
    enabled: true,
    name: 'Santander Consumer Bank',
    description: 'eRaty — kredyt ratalny online. Decyzja w kilka minut.',
    shopId: '',
    apiKey: '',
    endpoint: 'https://www.eraty.pl/api',
    portalUrl: 'https://www.eraty.pl',
    minAmount: 300,
    maxAmount: 200000,
    minMonths: 3,
    maxMonths: 120,
    annualRate: 0.1199,
  },
  alior: {
    enabled: true,
    name: 'Alior Bank',
    description: 'Raty online — szybki kredyt ratalny z decyzją w 15 minut.',
    partnerId: '',
    apiKey: '',
    endpoint: 'https://developer.aliorbank.pl/api',
    portalUrl: 'https://www.aliorbank.pl',
    minAmount: 300,
    maxAmount: 300000,
    minMonths: 3,
    maxMonths: 120,
    annualRate: 0.0779,
  },
}

export type PartnerKey = keyof typeof partnerConfig

export function isPartnerConfigured(key: PartnerKey): boolean {
  const config = partnerConfig[key]
  if (!config.enabled) return false

  switch (key) {
    case 'leaselink':
      return !!partnerConfig.leaselink.apiKey
    case 'simplylease':
      return !!partnerConfig.simplylease.clientId && !!partnerConfig.simplylease.token
    case 'grenke':
      return !!partnerConfig.grenke.partnerNumber
    case 'santander':
      return !!partnerConfig.santander.shopId && !!partnerConfig.santander.apiKey
    case 'alior':
      return !!partnerConfig.alior.partnerId && !!partnerConfig.alior.apiKey
    default:
      return false
  }
}

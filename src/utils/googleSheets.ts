/**
 * Google Sheets integration via Google Apps Script webhook.
 *
 * SETUP:
 * 1. Stworz Google Sheet (np. "ZamawiamRobota - Funnel")
 * 2. Extensions > Apps Script, wklej:
 *
 * function doPost(e) {
 *   var lock = LockService.getScriptLock();
 *   lock.tryLock(10000);
 *   try {
 *     var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
 *     var data = JSON.parse(e.postData.contents);
 *     var timestamp = new Date().toLocaleString('pl-PL');
 *     var row = [timestamp];
 *     var lastCol = Math.max(sheet.getLastColumn(), 1);
 *     var headers = sheet.getRange(1, 1, 1, lastCol).getValues()[0];
 *     if (!headers[0] || headers[0] === '') {
 *       var keys = Object.keys(data);
 *       var allHeaders = ['Timestamp'].concat(keys);
 *       for (var h = 0; h < allHeaders.length; h++) {
 *         sheet.getRange(1, h + 1).setValue(allHeaders[h]);
 *       }
 *       headers = allHeaders;
 *     } else {
 *       var dataKeys = Object.keys(data);
 *       for (var k = 0; k < dataKeys.length; k++) {
 *         if (headers.indexOf(dataKeys[k]) === -1) {
 *           headers.push(dataKeys[k]);
 *           sheet.getRange(1, headers.length).setValue(dataKeys[k]);
 *         }
 *       }
 *     }
 *     for (var j = 1; j < headers.length; j++) {
 *       var val = data[headers[j]];
 *       row.push(val !== undefined && val !== null ? String(val) : '');
 *     }
 *     sheet.appendRow(row);
 *     return ContentService.createTextOutput(JSON.stringify({status:'ok'}))
 *       .setMimeType(ContentService.MimeType.JSON);
 *   } finally {
 *     lock.releaseLock();
 *   }
 * }
 *
 * 3. Deploy > New deployment > Web app
 *    - Execute as: Me
 *    - Who has access: Anyone
 * 4. Wklej URL ponizej
 */

// WKLEJ SWOJ URL WEBHOOKA TUTAJ:
const GOOGLE_SHEETS_WEBHOOK_URL = 'https://script.google.com/macros/s/AKfycbzPl0i-_TY6XQnj-SmlYiun-jV75w74uHvzldv0Isxc8vZGsIwsFfL0UGpPlPGbE2Az1w/exec'

let sessionId = ''
function getSessionId() {
  if (!sessionId) {
    sessionId = Date.now().toString(36) + Math.random().toString(36).slice(2, 7)
  }
  return sessionId
}

export async function trackEvent(
  event: string,
  data: Record<string, unknown> = {}
): Promise<void> {
  const payload = {
    sesja: getSessionId(),
    etap: event,
    ...data,
    url: window.location.pathname,
    userAgent: navigator.userAgent.slice(0, 80),
  }

  if (!GOOGLE_SHEETS_WEBHOOK_URL) {
    console.log(`[Track] ${event}`, payload)
    return
  }

  try {
    await fetch(GOOGLE_SHEETS_WEBHOOK_URL, {
      method: 'POST',
      mode: 'no-cors',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })
  } catch {
    // silently fail
  }
}

// ---- Gotowe eventy do trackowania na kazdym etapie ----

export function trackPageView(page: string) {
  trackEvent('page_view', { strona: page })
}

export function trackProductClick(robotId: string, robotName: string) {
  trackEvent('product_click', { robotId, robotName })
}

export function trackPaymentMethodSelected(method: string) {
  trackEvent('payment_method', { metoda: method })
}

export function trackCalculatorUsed(amount: number, months: number, bestRate: number) {
  trackEvent('calculator_used', {
    kwota: amount,
    miesiecy: months,
    najlepszaRata: bestRate.toFixed(2),
  })
}

export function trackFormStarted() {
  trackEvent('form_started')
}

export function trackFormSubmitted(formType: string, data: Record<string, unknown>) {
  trackEvent('form_submitted', { typ: formType, ...data })
}

export function trackOfferViewed(offersCount: number) {
  trackEvent('offers_viewed', { iloscOfert: offersCount })
}

export function trackOfferSelected(bankName: string, rate: number) {
  trackEvent('offer_selected', { bank: bankName, rata: rate.toFixed(2) })
}

export function trackContactFormSubmitted(bankName: string, data: Record<string, unknown>) {
  trackEvent('contact_submitted', { bank: bankName, ...data })
}

export function trackOrderSubmitted(method: string, data: Record<string, unknown>) {
  trackEvent('order_submitted', { metoda: method, ...data })
}

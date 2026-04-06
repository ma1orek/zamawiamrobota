// ===========================================================
// TEN PLIK WKLEJ DO GOOGLE APPS SCRIPT (Extensions > Apps Script)
// W Google Sheet -> Extensions -> Apps Script -> wklej CALY ten plik
// Potem: Deploy > New deployment > Web app > Anyone > Deploy
// Skopiuj URL i wklej w src/utils/googleSheets.ts linia 57
// ===========================================================

function doPost(e) {
  var lock = LockService.getScriptLock();
  lock.tryLock(10000);
  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    var data = JSON.parse(e.postData.contents);
    var timestamp = new Date().toLocaleString('pl-PL');
    var row = [timestamp];
    var lastCol = Math.max(sheet.getLastColumn(), 1);
    var headers = sheet.getRange(1, 1, 1, lastCol).getValues()[0];
    if (!headers[0] || headers[0] === '') {
      var keys = Object.keys(data);
      var allHeaders = ['Timestamp'].concat(keys);
      for (var h = 0; h < allHeaders.length; h++) {
        sheet.getRange(1, h + 1).setValue(allHeaders[h]);
      }
      headers = allHeaders;
    } else {
      var dataKeys = Object.keys(data);
      for (var k = 0; k < dataKeys.length; k++) {
        if (headers.indexOf(dataKeys[k]) === -1) {
          headers.push(dataKeys[k]);
          sheet.getRange(1, headers.length).setValue(dataKeys[k]);
        }
      }
    }
    for (var j = 1; j < headers.length; j++) {
      var val = data[headers[j]];
      row.push(val !== undefined && val !== null ? String(val) : '');
    }
    sheet.appendRow(row);
    return ContentService.createTextOutput(JSON.stringify({status:'ok'}))
      .setMimeType(ContentService.MimeType.JSON);
  } finally {
    lock.releaseLock();
  }
}

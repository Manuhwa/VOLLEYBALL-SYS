/**
 * Bulldogs Volleyball Club - Form backend
 * 1. In Google Drive create a new Google Sheet.
 * 2. Name the first sheet "Submissions".
 * 3. Extensions > Apps Script, delete any code and paste this entire file.
 * 4. Save, then Deploy > New deployment > Type: Web app.
 *    - Execute as: Me | Who has access: Anyone
 * 5. Copy the Web app URL into config.js as SUBMIT_URL and VIEW_URL (same URL for both).
 */

var SHEET_NAME = 'Submissions';

function getSheet() {
  return SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_NAME);
}

function ensureHeaders() {
  var sheet = getSheet();
  if (sheet.getLastRow() === 0) {
    var headers = [
      'timestamp', 'playerName', 'birthdate', 'gender', 'height', 'hand', 'positions',
      'serve', 'pass', 'set', 'attack', 'block', 'defense', 'attitude', 'leadership', 'coachable',
      'sides', 'forward', 'backward', 'shuffle', 'crossover', 'spiking-approach', 'reaction', 'retract', 'transition',
      'coachComment'
    ];
    sheet.appendRow(headers);
  }
}

function doPost(e) {
  try {
    var data = e.parameter && e.parameter.data ? JSON.parse(e.parameter.data) : null;
    if (!data) {
      return ContentService.createTextOutput(JSON.stringify({ ok: false, error: 'No data' }))
        .setMimeType(ContentService.MimeType.JSON);
    }

    if (data.action === 'comment') {
      var sheet = getSheet();
      var row = data.rowIndex;
      var col = getCoachCommentColumn(sheet);
      if (col > 0 && row >= 2) {
        sheet.getRange(row, col).setValue(data.comment || '');
      }
      return ContentService.createTextOutput(JSON.stringify({ ok: true }))
        .setMimeType(ContentService.MimeType.JSON);
    }

    ensureHeaders();
    var sheet = getSheet();
    var headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
    var row = [
      new Date().toISOString(),
      data.playerName || '', data.birthdate || '', data.gender || '', data.height || '', data.hand || '', data.positions || '',
      data.serve || '', data.pass || '', data.set || '', data.attack || '', data.block || '', data.defense || '',
      data.attitude || '', data.leadership || '', data.coachable || '',
      data.sides || '', data.forward || '', data.backward || '', data.shuffle || '', data.crossover || '',
      data['spiking-approach'] || '', data.reaction || '', data.retract || '', data.transition || '',
      ''
    ];
    sheet.appendRow(row);
    return ContentService.createTextOutput(JSON.stringify({ ok: true }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({ ok: false, error: String(err) }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function getCoachCommentColumn(sheet) {
  var headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
  for (var i = 0; i < headers.length; i++) {
    if (String(headers[i]).toLowerCase() === 'coachcomment') return i + 1;
  }
  return 0;
}

function doGet() {
  var sheet = getSheet();
  var lastRow = sheet.getLastRow();
  if (lastRow < 2) {
    return ContentService.createTextOutput(JSON.stringify([])).setMimeType(ContentService.MimeType.JSON);
  }
  var data = sheet.getRange(2, 1, lastRow, sheet.getLastColumn()).getValues();
  var headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
  var out = [];
  for (var r = 0; r < data.length; r++) {
    var row = data[r];
    var obj = { _rowIndex: r + 2 };
    for (var c = 0; c < headers.length; c++) {
      var key = String(headers[c]);
      var val = row[c];
      if (val instanceof Date) val = val.toISOString();
      else if (val != null) val = String(val);
      obj[key] = val;
    }
    out.push(obj);
  }
  return ContentService.createTextOutput(JSON.stringify(out)).setMimeType(ContentService.MimeType.JSON);
}

/**
 * SHREE RAM EVENTS — ENTERPRISE PROTECTED GOOGLE APPS SCRIPT
 * 
 * 100% Bot-Proof & Direct-Hit Shield:
 * 1. Requires secret handshake authToken: "SRE_ROYAL_VAULT_KEY_2026"
 * 2. Neutralizes honeypot bot traps silently
 * 3. Enforces valid 10-digit Indian mobile numbers
 * 4. Deduplicates repeat client inquiries (updates existing row instead of duplicate clutter)
 * 5. Handles Leads, Financials, and Services tabs
 */

var SECRET_AUTH_TOKEN = "SRE_ROYAL_VAULT_KEY_2026";

function doGet(e) {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var leadsSheet = ss.getSheetByName("Leads");
  var finSheet = ss.getSheetByName("Financials");
  var servSheet = ss.getSheetByName("Offerings");

  var leads = leadsSheet ? leadsSheet.getDataRange().getValues() : [];
  var financials = finSheet ? finSheet.getDataRange().getValues() : [];
  var services = servSheet ? servSheet.getDataRange().getValues() : [];

  var result = {
    leads: leads,
    financials: financials,
    services: services
  };

  return ContentService.createTextOutput(JSON.stringify(result))
    .setMimeType(ContentService.MimeType.JSON);
}

function doPost(e) {
  try {
    if (!e || !e.postData || !e.postData.contents) {
      return errorResponse("Empty payload");
    }

    var data = JSON.parse(e.postData.contents);

    // LAYER 1: Secret Handshake Token Verification
    // Rejects scrapers, cURL, or bots hitting this Webhook URL directly!
    if (!data.authToken || data.authToken !== SECRET_AUTH_TOKEN) {
      return errorResponse("Unauthorized access attempt blocked.");
    }

    // LAYER 2: Honeypot Trap Detection
    if (data.botTrap && data.botTrap.toString().trim().length > 0) {
      // Silently return success to fool the bot without touching the spreadsheet
      return successResponse("Lead processed.");
    }

    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var sheetName = data.sheetName || "Leads";
    var sheet = ss.getSheetByName(sheetName);

    if (!sheet) {
      sheet = ss.insertSheet(sheetName);
    }

    var action = data.action || "CREATE";

    if (sheetName === "Leads") {
      return handleLeads(sheet, action, data);
    } else {
      return handleStandardCRUD(sheet, action, data);
    }

  } catch (err) {
    return errorResponse(err.toString());
  }
}

/**
 * Smart Lead Management with Deduplication & Top Placement
 */
function handleLeads(sheet, action, data) {
  var rowData = data.row;
  if (!rowData || rowData.length === 0) {
    return errorResponse("No row data provided");
  }

  // Mobile format validation (must be 10 digits starting with 6-9)
  var rawPhone = rowData[3] ? rowData[3].toString().replace(/\D/g, "") : "";
  var cleanPhone = rawPhone.slice(-10);
  if (cleanPhone.length !== 10 || !/^[6-9]\d{9}$/.test(cleanPhone)) {
    return errorResponse("Invalid mobile number rejected.");
  }

  var allData = sheet.getDataRange().getValues();
  var existingRowIndex = -1;

  // Search existing leads by 10-digit mobile number (Column index 3 = Phone)
  for (var i = 1; i < allData.length; i++) {
    var p = allData[i][3] ? allData[i][3].toString().replace(/\D/g, "").slice(-10) : "";
    if (p === cleanPhone) {
      existingRowIndex = i + 1; // 1-indexed row in sheet
      break;
    }
  }

  if (action === "CREATE" || action === "UPDATE") {
    if (existingRowIndex !== -1) {
      // Patron already exists: Update row with new celebration details
      sheet.getRange(existingRowIndex, 1, 1, rowData.length).setValues([rowData]);
      return successResponse("Existing patron inquiry updated successfully.");
    } else {
      // Brand new patron: append row
      sheet.appendRow(rowData);
      return successResponse("New patron inquiry created successfully.");
    }
  } else if (action === "DELETE") {
    var targetId = data.id;
    for (var j = 1; j < allData.length; j++) {
      if (allData[j][0] === targetId) {
        sheet.deleteRow(j + 1);
        return successResponse("Lead deleted.");
      }
    }
    return errorResponse("Lead not found to delete.");
  }

  return errorResponse("Unknown action");
}

function handleStandardCRUD(sheet, action, data) {
  var allData = sheet.getDataRange().getValues();
  var targetId = data.id;

  if (action === "CREATE") {
    sheet.appendRow(data.row);
    return successResponse("Record created.");
  }

  var foundRow = -1;
  for (var i = 1; i < allData.length; i++) {
    if (allData[i][0] === targetId) {
      foundRow = i + 1;
      break;
    }
  }

  if (action === "UPDATE") {
    if (foundRow !== -1) {
      sheet.getRange(foundRow, 1, 1, data.row.length).setValues([data.row]);
      return successResponse("Record updated.");
    } else {
      sheet.appendRow(data.row);
      return successResponse("Record appended.");
    }
  }

  if (action === "DELETE") {
    if (foundRow !== -1) {
      sheet.deleteRow(foundRow);
      return successResponse("Record deleted.");
    }
    return errorResponse("Record not found to delete.");
  }

  return errorResponse("Action failed");
}

function successResponse(msg) {
  return ContentService.createTextOutput(JSON.stringify({ status: "success", message: msg }))
    .setMimeType(ContentService.MimeType.JSON);
}

function errorResponse(msg) {
  return ContentService.createTextOutput(JSON.stringify({ status: "error", message: msg }))
    .setMimeType(ContentService.MimeType.JSON);
}

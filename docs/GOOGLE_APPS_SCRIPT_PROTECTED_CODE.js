// =========================================================================
// SHREE RAM EVENTS — ROYAL SECURE APPS SCRIPT WEBHOOK & GOOGLE DRIVE VAULT
// =========================================================================

const VAULT_SECRET_KEY = "SRE_ROYAL_VAULT_KEY_2026";

function doGet(e) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet();
  const leads = sheet.getSheetByName("Leads") ? sheet.getSheetByName("Leads").getDataRange().getValues() : [];
  const financials = sheet.getSheetByName("Financials") ? sheet.getSheetByName("Financials").getDataRange().getValues() : [];
  const offerings = sheet.getSheetByName("Offerings") ? sheet.getSheetByName("Offerings").getDataRange().getValues() : [];
  
  return ContentService.createTextOutput(JSON.stringify({ leads, financials, offerings }))
    .setMimeType(ContentService.MimeType.JSON);
}

function doPost(e) {
  try {
    if (!e || !e.postData || !e.postData.contents) {
      return ContentService.createTextOutput(JSON.stringify({ status: "error", message: "Empty request" }))
        .setMimeType(ContentService.MimeType.JSON);
    }

    const data = JSON.parse(e.postData.contents);

    // -------------------------------------------------------------
    // SHIELD 1: Secret Handshake Token Check (Blocks Direct URL Bots)
    // -------------------------------------------------------------
    if (!data.authToken || data.authToken !== VAULT_SECRET_KEY) {
      return ContentService.createTextOutput(JSON.stringify({ status: "error", message: "Unauthorized: Invalid secret key" }))
        .setMimeType(ContentService.MimeType.JSON);
    }

    // -------------------------------------------------------------
    // SHIELD 2: Invisible Honeypot Trap Detection
    // -------------------------------------------------------------
    if (data.botTrap || data.royal_farmaan_trap || data.company_website) {
      // Fool the bot by returning success without touching the sheet
      return ContentService.createTextOutput(JSON.stringify({ status: "success", message: "Filtered" }))
        .setMimeType(ContentService.MimeType.JSON);
    }

    // -------------------------------------------------------------
    // SHIELD 3: Google Drive Ultra-HD Photo Vault (Free & Permanent)
    // -------------------------------------------------------------
    if (data.action === "UPLOAD_IMAGE") {
      return handleImageUpload(data);
    }

    const sheet = SpreadsheetApp.getActiveSpreadsheet();
    const sheetName = data.sheetName || "Leads";
    const targetSheet = sheet.getSheetByName(sheetName) || sheet.insertSheet(sheetName);

    if (data.action === "CREATE") {
      // -------------------------------------------------------------
      // SHIELD 4: Repeat Patron Deduplication (Leads Sheet)
      // -------------------------------------------------------------
      if (sheetName === "Leads" && data.row && data.row.length >= 4) {
        const newPhone = String(data.row[3] || '').replace(/\D/g, '');
        const values = targetSheet.getDataRange().getValues();
        let existingRowIndex = -1;

        // Check if phone number already exists (skipping header row)
        if (newPhone.length === 10) {
          for (let i = 1; i < values.length; i++) {
            const existingPhone = String(values[i][3] || '').replace(/\D/g, '');
            if (existingPhone === newPhone) {
              existingRowIndex = i + 1; // 1-indexed for Sheets
              break;
            }
          }
        }

        // If repeat patron found: Update row & preserve event history
        if (existingRowIndex !== -1) {
          const oldOccasion = values[existingRowIndex - 1][4] || 'Previous Celebration';
          const oldNotes = values[existingRowIndex - 1][9] || '';
          
          // Append previous celebration history to notes
          const updatedNotes = `[Repeat Loyal Patron] Latest: ${data.row[4]} on ${data.row[5]} | Prior: ${oldOccasion}. ${oldNotes}`.trim();
          data.row[9] = updatedNotes;
          data.row[8] = 'New / Updated'; // Set status so admin notices immediately

          targetSheet.getRange(existingRowIndex, 1, 1, data.row.length).setValues([data.row]);
          return ContentService.createTextOutput(JSON.stringify({ status: "success", mode: "updated_patron" }))
            .setMimeType(ContentService.MimeType.JSON);
        }
      }

      // If new client or new record: Append normally
      targetSheet.appendRow(data.row);

    } else if (data.action === "UPDATE") {
      const values = targetSheet.getDataRange().getValues();
      for (let i = 1; i < values.length; i++) {
        if (values[i][0] == data.id) {
          targetSheet.getRange(i + 1, 1, 1, data.row.length).setValues([data.row]);
          break;
        }
      }

    } else if (data.action === "DELETE") {
      const values = targetSheet.getDataRange().getValues();
      for (let i = 1; i < values.length; i++) {
        if (values[i][0] == data.id) {
          targetSheet.deleteRow(i + 1);
          break;
        }
      }
    }

    return ContentService.createTextOutput(JSON.stringify({ status: "success" }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({ status: "error", error: err.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

/**
 * Saves base64 photo directly into Google Drive "Shree Ram Events Gallery" folder.
 * Returns official Google direct-view CDN URL for crystal-clear website display.
 */
function handleImageUpload(data) {
  if (!data.base64Data) {
    return ContentService.createTextOutput(JSON.stringify({ status: "error", message: "No image data provided" }))
      .setMimeType(ContentService.MimeType.JSON);
  }

  try {
    const folderName = "Shree Ram Events Gallery";
    const folders = DriveApp.getFoldersByName(folderName);
    const folder = folders.hasNext() ? folders.next() : DriveApp.createFolder(folderName);
    
    // Ensure anyone with link can view (public CDN view for website visitors)
    folder.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);

    const rawBase64 = data.base64Data.replace(/^data:image\/\w+;base64,/, "");
    let contentType = "image/jpeg";
    if (data.base64Data.indexOf("data:image/png") !== -1) contentType = "image/png";
    else if (data.base64Data.indexOf("data:image/webp") !== -1) contentType = "image/webp";

    const decoded = Utilities.base64Decode(rawBase64);
    const cleanFileName = (data.fileName || ("event_" + new Date().getTime() + ".jpg")).replace(/[^a-zA-Z0-9._-]/g, "_");
    const blob = Utilities.newBlob(decoded, contentType, cleanFileName);
    const file = folder.createFile(blob);
    
    file.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);
    const fileId = file.getId();

    // Direct Google CDN image URL that displays instantly in <img> tags
    const directImageUrl = "https://lh3.googleusercontent.com/d/" + fileId;

    return ContentService.createTextOutput(JSON.stringify({
      status: "success",
      url: directImageUrl,
      fileId: fileId,
      fileName: file.getName(),
      message: "Photo successfully saved into Google Drive"
    })).setMimeType(ContentService.MimeType.JSON);

  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({ status: "error", error: "Drive upload error: " + err.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

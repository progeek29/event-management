/**
 * Google Sheets API Service
 * Interacts with deployed Google Apps Script Web App for free database storage.
 */

const SCRIPT_URL = import.meta.env.VITE_GOOGLE_SHEET_API_URL || 
  'https://script.google.com/macros/s/AKfycbw4S0JGau6ALKiwK5V2UobAW5aU0ipRZJrMRUj1vbKidxKmqkJZv0zNU3CKSxtFhgEw/exec';

/**
 * Fetch all data (Leads, Financials, Offerings) from Google Sheets
 */
export async function fetchAllSheetData() {
  if (!SCRIPT_URL) return null;
  try {
    const response = await fetch(SCRIPT_URL, {
      method: 'GET',
      headers: { 'Accept': 'application/json' }
    });
    if (!response.ok) return null;
    return await response.json();
  } catch (err) {
    console.warn('[GoogleSheetsService] Fetch error, falling back to local storage:', err);
    return null;
  }
}

/**
 * Helper to post payload to Google Apps Script
 */
async function postToSheet(payload) {
  if (!SCRIPT_URL) return false;
  try {
    // Note: text/plain avoids CORS preflight OPTIONS check on Google Apps Script
    await fetch(SCRIPT_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'text/plain;charset=utf-8',
      },
      body: JSON.stringify(payload),
      mode: 'no-cors'
    });
    return true;
  } catch (err) {
    console.warn('[GoogleSheetsService] Post error:', err);
    return false;
  }
}

/**
 * Create a new Farmaan Lead in Google Sheets
 */
export async function syncCreateLead(lead) {
  // Defensive verification: Prevent bots or malformed numbers from hitting Google Sheets API
  if (lead._isBot || lead.botTrap || (lead.phone && !/^[6-9]\d{9}$/.test(lead.phone.replace(/\D/g, '')))) {
    console.warn('[Security] Bot or malformed lead rejected prior to Google Sheets post.');
    return false;
  }
  return postToSheet({
    sheetName: 'Leads',
    action: 'CREATE',
    id: lead.id,
    row: [
      lead.id,
      lead.dateSubmitted || new Date().toLocaleString('en-IN'),
      lead.clientName,
      lead.phone,
      lead.occasion,
      lead.eventDate || '',
      lead.guestCount || '',
      lead.city || 'Bhilai / Durg',
      lead.status || 'Farmaan Bestowed',
      lead.notes || ''
    ]
  });
}

/**
 * Update a Farmaan Lead status in Google Sheets
 */
export async function syncUpdateLeadStatus(lead) {
  return postToSheet({
    sheetName: 'Leads',
    action: 'UPDATE',
    id: lead.id,
    row: [
      lead.id,
      lead.dateSubmitted || '',
      lead.clientName,
      lead.phone,
      lead.occasion,
      lead.eventDate || '',
      lead.guestCount || '',
      lead.city || '',
      lead.status,
      lead.notes || ''
    ]
  });
}

/**
 * Delete a Farmaan Lead from Google Sheets
 */
export async function syncDeleteLead(leadId) {
  return postToSheet({
    sheetName: 'Leads',
    action: 'DELETE',
    id: leadId
  });
}

/**
 * Create a new Financial Ledger Record in Google Sheets
 */
export async function syncCreateFinancial(fin) {
  return postToSheet({
    sheetName: 'Financials',
    action: 'CREATE',
    id: fin.id,
    row: [
      fin.id,
      fin.clientName,
      fin.eventName,
      Number(fin.contractValue || 0),
      Number(fin.advancePaid || 0),
      Number(fin.balanceDue || 0),
      Number(fin.decorExpense || 0),
      Number(fin.cateringExpense || 0),
      Number(fin.otherExpense || 0),
      fin.paymentStatus || 'Advance Received'
    ]
  });
}

/**
 * Update a Financial Ledger Record in Google Sheets
 */
export async function syncUpdateFinancial(fin) {
  return postToSheet({
    sheetName: 'Financials',
    action: 'UPDATE',
    id: fin.id,
    row: [
      fin.id,
      fin.clientName,
      fin.eventName,
      Number(fin.contractValue || 0),
      Number(fin.advancePaid || 0),
      Number(fin.balanceDue || 0),
      Number(fin.decorExpense || 0),
      Number(fin.cateringExpense || 0),
      Number(fin.otherExpense || 0),
      fin.paymentStatus || 'Advance Received'
    ]
  });
}

/**
 * Delete a Financial Ledger Record from Google Sheets
 */
export async function syncDeleteFinancial(finId) {
  return postToSheet({
    sheetName: 'Financials',
    action: 'DELETE',
    id: finId
  });
}

/**
 * Update an Offering Card in Google Sheets
 */
export async function syncUpdateOffering(service) {
  return postToSheet({
    sheetName: 'Offerings',
    action: 'UPDATE',
    id: service.id,
    row: [
      service.id,
      service.number,
      service.title,
      service.subtitle,
      service.image,
      service.description || ''
    ]
  });
}

/**
 * Create an Offering Card in Google Sheets
 */
export async function syncCreateOffering(service) {
  return postToSheet({
    sheetName: 'Offerings',
    action: 'CREATE',
    id: service.id,
    row: [
      service.id,
      service.number,
      service.title,
      service.subtitle,
      service.image,
      service.description || ''
    ]
  });
}

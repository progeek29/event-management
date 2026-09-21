# Shree Ram Events — Official Changelog & Release Story

All notable changes and version milestones for the **Shree Ram Events & Royal Hospitality Portal** are documented in this dossier.

## [Version 1.2.2] — 2026-09-21
### 🌟 The Story & Core Highlights:
- **Studio Ultra-HD Google Drive Photo Vault**:
  - *Problem Solved*: Direct photo uploads from phone/computer were only stored in browser `localStorage` and could not fit into Google Sheet cells due to the 50,000 character limit.
  - *Solution*: Integrated direct Google Drive upload via Google Apps Script. Uploads are saved into a private `"Shree Ram Events Gallery"` folder, and official high-speed Google CDN links (`https://lh3.googleusercontent.com/d/...`) are stored in the `Offerings` tab.
  - *Studio Ultra-HD Preservation*: Upgraded image handling to 2.5K/QHD (2560px) at 0.94 studio-grade photographic quality with a zero-touch rule for files under 3MB. Zero blur or pixelation on 4K & Retina displays.
- **Spreadsheet 3-Tab Architecture Complete**:
  - Initialized and populated all three tabs in the Google Spreadsheet: `Leads` (Farmaan Inquiries), `Financials` (Event Ledger & Net Margins), and `Offerings` (Standee Services & Master Stories).
  - Robust dual-key sync support (`data.offerings || data.services`) preventing data desynchronization.

---

## [Version 1.2.1] — 2026-09-20
### 🌟 The Story & Core Highlights:
- **Clean Luxury Masthead (Top Bar & Redundant Numbers Removed)**:
  - *Problem Solved*: The top black micro-announcement bar was cluttering the hero section and exposing an explicit "Admin" lock button directly to wedding patrons.
  - *Solution*: Removed the top micro-line completely. Kept the desktop navigation clean and uncluttered with only Brand Crest, Nav Links, WhatsApp, and Check Date.
- **Hero Vertical Spacing Proportions**:
  - *Problem Solved*: Excessive top padding (`pt-24 sm:pt-28`) and `my-auto` caused a huge dead space gap between the navbar and the "FOUND YOUR PERFECT SOULMATE" badge.
  - *Solution*: Tightened top spacing so the soulmate badge and display headline sit close and gracefully beneath the masthead.
- **Admin Privacy & Zero Credential Leakage**:
  - *Problem Solved*: Admin login modal displayed `Default credentials: ID: admin | Pass: shreeram@1111` and placeholder `e.g. admin or shreeram` in public view.
  - *Solution*: Removed all credential text, updated the username placeholder to standard `Enter admin username`, and sanitized failed login errors to `Invalid Admin ID or Password. Access denied.`
  - *Discreet Admin Access*: Maintained discreet, secure portal entry through the Footer portal link and direct `#admin` URL navigation.

---

## [Version 1.2.0] — 2026-09-20 (Commit: `12e4189`)
### 🌟 The Story & Core Highlights:
- **Dedicated Full-Page Card Editor (No Popups)**:
  - *Problem Solved*: The previous offering editor opened as a cramped popup where Windows OS scrollbars clipped past rounded borders, creating a clunky editing experience.
  - *Solution*: Replaced the popup with a spacious, dedicated 2-column Studio Editor Screen directly inside the Admin portal.
  - *Features*: Top breadcrumb navigation (`← Back to All Cards`), real-time Live Website Card Preview, 1-click photo upload, and structured fields for Poetic Quotes, Architectural Decor, Culinary Harmony, and Royal Protocol.
- **Card Action Clean-up**:
  - Removed confusing `"Explore Story"` label from cards; replaced with a sleek, minimalist circular right arrow (`→`) with smooth hover animation so visitors don't mistake offerings for customer personal blogs.
- **Verified 100% Real Photo Presets**:
  - *Problem Solved*: 3 placeholder `.png` filenames in the preset picker were missing from disk, displaying broken image icons.
  - *Solution*: Replaced all presets with 6 verified, high-resolution authentic event photos (`moments-become-memories.jpg`, `unplanned-moments.jpg`, `laughter-chaos-love.jpg`, `housewarming_event.jpg`, `every-detail-matters.jpg`, `timeless-stories-editorial.jpg`).
- **Comprehensive Bot & Spam Defense**:
  - Integrated 5-tier invisible bot protection: Honeypot trap fields (`website_url_trap`), submission velocity timestamp checks (<1.5s auto-reject), strict Indian 10-digit mobile regex (`^[6-9]\d{9}$`), IP/fingerprint-based client-side rate limiters, and optional Cloudflare Turnstile invisible mode.
- **Google Sheets Secret Handshake**:
  - Added secret bearer token validation (`authToken: 'SRE_ROYAL_VAULT_KEY_2026'`) to prevent direct URL scraping/spamming on the Google Apps Script webhook.

---

## [Version 1.1.0] — 2026-09-19 (Commit: `2990e8f`)
### 🌟 The Story & Core Highlights:
- **Admin Inquiries Patron Dossier**:
  - Added an interactive modal in Admin Leads to inspect the full patron inquiry, requirements, guest estimates, and city details.
- **Header & Typography Polish**:
  - Removed mixed Hindi text in favor of an elegant, English-first luxury aesthetic with Cormorant Garamond and Cinzel typography.
  - Cleaned up intrusive plus (`+`) symbols on buttons and cards for a minimalist high-end look.
- **Synchronized 5 Core Offerings**:
  - Aligned all initial banner offerings with authentic brand standee services (Sacred Promises Mandap, Engagement & Sangeet Gala, Family Reception, Corporate Galas, and Housewarming Pooja).

---

## [Version 1.0.0] — 2026-09-18 (Commits: `89eee96` to `28e96ce`)
### 🌟 The Story & Core Highlights:
- **Foundational Architecture**:
  - Built the bespoke Gold & Ivory wedding and luxury hospitality web application for Shree Ram Events (Bhilai / Raipur / Durg).
- **Core Modules**:
  - **Hero & Heritage Monograph**: Auspicious invocation, brand statistics (500+ Royal Weddings, 10+ Years Pedigree), and direct WhatsApp concierge integration.
  - **Farmaan Inquiries (Leads Engine)**: 2-step booking flow with date availability checker and multi-guest capacity calculators.
  - **Administrative Command Center (Admin Portal)**: PIN-protected dashboard with Leads management, Financial Ledger with Net Margins, and Offerings visual drag-and-drop reordering.
  - **Free Cloud Database**: Automated 2-way sync with Google Sheets (Leads, Financials, Offerings) via serverless Google Apps Script Web App.

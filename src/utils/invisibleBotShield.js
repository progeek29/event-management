/**
 * Shree Ram Events — Multi-Tier Invisible Anti-Bot & Spam Shield
 * 
 * 100% Invisible to human guests (No visual CAPTCHA, No puzzles, Zero UX friction)
 * 
 * Layers:
 * 1. Headless Browser / WebDriver Automation Detection
 * 2. Multi-Decoy Honeypot Evaluation
 * 3. Human Biometrics (Pointer movement, scroll, keypress cadence)
 * 4. Time-Velocity Fingerprinting (Proof of Human Reading & Entry Time)
 * 5. Algorithmic Indian Telecom & Dummy Pattern Blocker
 * 6. Device Rolling Rate-Limiter (Cooldown Protection)
 * 7. Verification Token Generation
 */

export function checkHeadlessEnvironment() {
  if (typeof window === 'undefined') return false;
  // Standard automation detection
  if (navigator.webdriver) return true;
  if (window.document.documentElement.getAttribute('webdriver')) return true;
  if (window.__nightmare || window.callPhantom || window._phantom) return true;
  if (window.__selenium_evaluate || window.__webdriver_evaluate) return true;
  // Chrome headless check
  if (/HeadlessChrome/.test(navigator.userAgent)) return true;
  return false;
}

export function validateIndianMobile(digits) {
  if (!digits || typeof digits !== 'string') {
    return { valid: false, reason: 'Contact number is required.' };
  }
  const clean = digits.replace(/\D/g, '');
  if (clean.length !== 10) {
    return { valid: false, reason: 'Please enter an exact 10-digit mobile number.' };
  }
  if (!/^[6-9]\d{9}$/.test(clean)) {
    return { valid: false, reason: 'Please enter a valid 10-digit Indian mobile number starting with 6, 7, 8, or 9.' };
  }
  // Repetitive identical digits: e.g. 9999999999, 8888888888, 0000000000
  if (/^(\d)\1{9}$/.test(clean)) {
    return { valid: false, reason: 'Please provide an authentic contact line (repetitive numbers cannot be accepted).' };
  }
  // Common fake/dummy sequences
  const dummyNumbers = new Set([
    '9876543210', '1234567890', '0123456789', '8765432109',
    '9898989898', '9191919191', '9090909090', '9876598765',
    '9988776655', '9123456789', '9876501234'
  ]);
  if (dummyNumbers.has(clean)) {
    return { valid: false, reason: 'Please provide an active personal mobile number for confirmation.' };
  }
  return { valid: true };
}

export function checkRateLimit(maxAllowed = 5, windowMs = 60 * 1000) {
  try {
    const key = 'sre_submission_timestamps';
    const now = Date.now();
    const stored = JSON.parse(localStorage.getItem(key) || '[]');
    // Anti-Spam burst: Prevent scripts clicking submit continuously (< 10 seconds)
    if (stored.length > 0) {
      const last = stored[stored.length - 1];
      if (now - last < 10000) {
        return {
          allowed: false,
          cooldownRemainingSec: Math.ceil((10000 - (now - last)) / 1000)
        };
      }
    }
    // Filter timestamps within the rolling window
    const recent = stored.filter((ts) => now - ts < windowMs);
    if (recent.length >= maxAllowed) {
      const oldest = Math.min(...recent);
      const remainingSec = Math.max(1, Math.ceil((windowMs - (now - oldest)) / 1000));
      return {
        allowed: false,
        cooldownRemainingSec: remainingSec
      };
    }
    return { allowed: true };
  } catch {
    return { allowed: true };
  }
}

export function recordSuccessfulSubmission() {
  try {
    const key = 'sre_submission_timestamps';
    const now = Date.now();
    const stored = JSON.parse(localStorage.getItem(key) || '[]');
    const recent = stored.filter((ts) => now - ts < 10 * 60 * 1000);
    recent.push(now);
    localStorage.setItem(key, JSON.stringify(recent));
  } catch {
    // Ignore storage issues
  }
}

export function generateVerificationToken(loadTime) {
  const elapsed = Date.now() - loadTime;
  const rand = Math.random().toString(36).substring(2, 9);
  return `SRE_SEC_${elapsed}_${rand}`;
}

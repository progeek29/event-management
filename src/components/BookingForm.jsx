import React, { useState, useRef, useEffect } from 'react';
import { CheckCircle, ArrowRight, MessageSquare, ChevronDown, Check } from 'lucide-react';
import { BRAND_INFO } from '../data/initialData';
import {
  checkHeadlessEnvironment,
  validateIndianMobile,
  checkRateLimit,
  recordSuccessfulSubmission,
  generateVerificationToken
} from '../utils/invisibleBotShield';

function BookingLuxurySelect({ value, onChange, options }) {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    function handleClickOutside(e) {
      if (ref.current && !ref.current.contains(e.target)) setIsOpen(false);
    }
    if (isOpen) document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  return (
    <div ref={ref} className="relative w-full text-left">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-4 py-3.5 rounded-xl border border-[#C5A880]/40 bg-[#FAF8F5] text-xs text-[#0D1B2A] flex items-center justify-between hover:border-[#8C6B38] focus:outline-none focus:border-[#0D1B2A] transition-colors cursor-pointer shadow-2xs"
      >
        <span>{value}</span>
        <ChevronDown className={`w-3.5 h-3.5 text-[#8C6B38] shrink-0 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute left-0 right-0 top-full mt-1.5 z-50 bg-[#FFFDF9] border border-[#C5A880]/60 rounded-xl shadow-xl py-1.5 animate-in fade-in zoom-in-95 duration-100 max-h-60 overflow-y-auto">
          {options.map((opt) => {
            const isSelected = opt === value;
            return (
              <button
                key={opt}
                type="button"
                onClick={() => {
                  onChange(opt);
                  setIsOpen(false);
                }}
                className={`w-full px-4 py-2.5 text-xs font-sans flex items-center justify-between transition-colors cursor-pointer text-left ${
                  isSelected ? 'bg-[#FAF4E6] text-[#8C6B38] font-semibold' : 'text-[#0D1B2A] hover:bg-[#FAF4E6]/60'
                }`}
              >
                <span>{opt}</span>
                {isSelected && <Check className="w-3.5 h-3.5 text-[#8C6B38]" />}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default function BookingForm({ onLeadCreated, initialOccasion = '' }) {
  const [formData, setFormData] = useState({
    clientName: '',
    phone: '',
    occasion: initialOccasion || 'Wedding Ceremonies',
    eventDate: '',
    guestCount: '300 - 600 Guests',
    botTrap: '',
    decoyCompany: ''
  });

  const formLoadTime = useRef(Date.now());
  const humanInteractions = useRef({
    mouseMoves: 0,
    touches: 0,
    keystrokes: 0
  });

  useEffect(() => {
    const handleMove = () => { humanInteractions.current.mouseMoves += 1; };
    const handleTouch = () => { humanInteractions.current.touches += 1; };
    const handleKey = () => { humanInteractions.current.keystrokes += 1; };

    window.addEventListener('mousemove', handleMove, { passive: true });
    window.addEventListener('touchstart', handleTouch, { passive: true });
    window.addEventListener('keydown', handleKey, { passive: true });

    return () => {
      window.removeEventListener('mousemove', handleMove);
      window.removeEventListener('touchstart', handleTouch);
      window.removeEventListener('keydown', handleKey);
    };
  }, []);

  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const occasions = [
    'Wedding Ceremonies',
    'Engagement & Receptions',
    'Catering & Royal Feasts',
    'Corporate & Theme Parties',
    'Housewarming & Religious Events',
    'Grand Birthday Soirées',
    'Other Bespoke Celebration'
  ];

  const guestCountOptions = [
    '50 - 150 Guests (Intimate)',
    '150 - 300 Guests (Medium)',
    '300 - 600 Guests (Grand)',
    '600 - 1,200+ Guests (Imperial Royal)'
  ];

  const handlePhoneChange = (e) => {
    let raw = e.target.value.replace(/\D/g, '');
    if (raw.startsWith('91') && raw.length > 10) raw = raw.slice(2);
    else if (raw.startsWith('0') && raw.length > 10) raw = raw.slice(1);
    raw = raw.slice(0, 10);
    setFormData((prev) => ({ ...prev, phone: raw }));
    if (raw.length === 10) setErrorMsg('');
  };

  const handlePhoneKeyDown = (e) => {
    if (['Backspace', 'Delete', 'ArrowLeft', 'ArrowRight', 'Tab', 'Enter', 'Home', 'End'].includes(e.key)) return;
    if ((e.ctrlKey || e.metaKey) && ['a', 'c', 'v', 'x', 'z'].includes(e.key.toLowerCase())) return;
    if (e.key === ' ' || e.code === 'Space') {
      e.preventDefault();
      return;
    }
    if (!/^\d$/.test(e.key)) {
      e.preventDefault();
      return;
    }
    const input = e.target;
    const hasSelection = input.selectionStart !== input.selectionEnd;
    if (formData.phone.length >= 10 && !hasSelection) {
      e.preventDefault();
    }
  };

  const handlePhonePaste = (e) => {
    e.preventDefault();
    const pasteText = (e.clipboardData || window.clipboardData).getData('text') || '';
    let raw = pasteText.replace(/\D/g, '');
    if (raw.startsWith('91') && raw.length > 10) raw = raw.slice(2);
    else if (raw.startsWith('0') && raw.length > 10) raw = raw.slice(1);
    raw = raw.slice(0, 10);
    setFormData((prev) => ({ ...prev, phone: raw }));
    if (raw.length === 10) setErrorMsg('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Layer 1: Dual Invisible Honeypot Trap
    if ((formData.botTrap && formData.botTrap.trim().length > 0) ||
        (formData.decoyCompany && formData.decoyCompany.trim().length > 0)) {
      console.warn('[Security] Bot honeypot triggered. Silent neutral.');
      setSubmitted(true);
      return;
    }

    // Layer 2: Headless Browser / Automation WebDriver Detection
    if (checkHeadlessEnvironment()) {
      console.warn('[Security] Automated WebDriver environment detected.');
      setSubmitted(true);
      return;
    }

    // Layer 3: True Human Biometrics / Organic Interaction Check
    const totalInteractions = humanInteractions.current.mouseMoves +
                              humanInteractions.current.touches +
                              humanInteractions.current.keystrokes;
    if (totalInteractions < 2) {
      console.warn('[Security] Zero organic user interaction detected.');
      setSubmitted(true);
      return;
    }

    // Layer 4: Human Reading & Typing Velocity Gate (Minimum 2.2s)
    if (Date.now() - formLoadTime.current < 2200) {
      setErrorMsg('Please take a moment to review your celebration details before submitting.');
      return;
    }

    // Layer 5: Rolling Device Cooldown Rate-Limiter (Max 2 per 5 minutes)
    const rateCheck = checkRateLimit(2, 5 * 60 * 1000);
    if (!rateCheck.allowed) {
      setErrorMsg(`Your consultation request has already been registered. Our concierge is reviewing your request. Please wait ${rateCheck.cooldownRemainingSec}s before sending another.`);
      return;
    }

    // Layer 6: Required Fields check
    if (!formData.clientName.trim() || !formData.phone.trim() || !formData.eventDate) {
      setErrorMsg('Kindly provide your Full Name, Contact Number, and Tentative Event Date.');
      return;
    }

    // Layer 7: Strict Indian Telecom & Dummy Pattern Blocker
    const phoneCheck = validateIndianMobile(formData.phone);
    if (!phoneCheck.valid) {
      setErrorMsg(phoneCheck.reason);
      return;
    }

    // Record submission for device rate limiter
    recordSuccessfulSubmission();

    const now = new Date();
    const formattedDateSubmitted = now.toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });

    const newLead = {
      id: `SRE-${now.getFullYear()}-${Math.floor(100 + Math.random() * 900)}`,
      dateSubmitted: formattedDateSubmitted,
      timestamp: now.getTime(),
      clientName: formData.clientName.trim(),
      phone: formData.phone.trim(),
      occasion: formData.occasion,
      eventDate: formData.eventDate,
      guestCount: formData.guestCount,
      status: 'New',
      notes: 'Submitted through website frictionless royal inquiry card.',
      securityToken: generateVerificationToken(formLoadTime.current)
    };

    onLeadCreated(newLead);
    setSubmitted(true);
    setErrorMsg('');
  };

  const resetForm = () => {
    setFormData({
      clientName: '',
      phone: '',
      occasion: 'Wedding Ceremonies',
      eventDate: '',
      guestCount: '300 - 600 Guests',
    });
    setSubmitted(false);
  };

  return (
    <section id="inquire" className="py-24 sm:py-32 bg-[#FAF8F5] border-t border-[#C5A880]/20 relative w-full">
      <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-12">
          <span className="text-xs font-sans tracking-[0.25em] uppercase text-[#8C6B38] font-semibold block mb-3">
            Private Consultation
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl text-[#0D1B2A] font-normal tracking-tight mb-4">
            Reserve Your <span className="italic text-[#8C6B38]">Celebration</span>
          </h2>
          <div className="w-16 h-[1.5px] bg-[#C5A880] mx-auto mb-4" />
          <p className="font-sans text-xs sm:text-sm text-[#5A6472] font-light max-w-md mx-auto leading-relaxed">
            Share your tentative celebration plans below. Our founders will personally reach out within 24 hours to begin tailoring your bespoke experience.
          </p>
        </div>

        {/* 4-Field Royal Light Card */}
        <div className="bg-white border border-[#C5A880]/40 rounded-3xl p-8 sm:p-12 shadow-xl relative overflow-hidden text-[#0D1B2A]">
          
          {submitted ? (
            <div className="text-center py-10 space-y-6">
              <div className="w-16 h-16 rounded-full bg-[#FAF8F5] border border-[#C5A880] flex items-center justify-center mx-auto text-[#8C6B38] shadow-sm">
                <CheckCircle className="w-8 h-8" />
              </div>
              <div>
                <h3 className="font-serif text-2xl sm:text-3xl text-[#0D1B2A] mb-2 font-medium">
                  Inquiry Received with Honor
                </h3>
                <p className="text-xs sm:text-sm text-[#5A6472] max-w-md mx-auto leading-relaxed">
                  Thank you, <span className="text-[#0D1B2A] font-semibold">{formData.clientName}</span>. Your inquiry for <span className="text-[#8C6B38] font-medium">{formData.occasion}</span> on <span className="font-semibold">{formData.eventDate}</span> has been privately logged. Our founders will contact you shortly at <span className="font-semibold text-[#0D1B2A]">{formData.phone}</span>.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
                <a
                  href={`https://wa.me/${BRAND_INFO.contacts[0].whatsapp}?text=Hello%20Shree%20Ram%20Events,%20I%20just%20submitted%20an%20inquiry%20for%20${encodeURIComponent(formData.occasion)}%20on%20${formData.eventDate}.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-7 py-3 rounded-full text-xs font-sans tracking-wider uppercase font-semibold bg-[#0D1B2A] text-white hover:bg-[#1B3B2F] transition-all shadow-md"
                >
                  <MessageSquare className="w-4 h-4 text-[#C5A880]" />
                  Continue on WhatsApp
                </a>
                <button
                  onClick={resetForm}
                  className="text-xs font-sans tracking-wider uppercase text-[#8C6B38] hover:text-[#0D1B2A] underline underline-offset-4 cursor-pointer"
                >
                  Submit Another Inquiry
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              
              {errorMsg && (
                <div className="p-3 text-xs text-[#9B2C2C] bg-[#FFF5F5] border border-[#FEB2B2] rounded-xl text-center font-medium">
                  {errorMsg}
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* 1. Occasion Field */}
                <div>
                  <label className="block text-[11px] font-sans uppercase tracking-[0.16em] text-[#8C6B38] font-semibold mb-2">
                    1. Occasion / Experience
                  </label>
                  <BookingLuxurySelect
                    value={formData.occasion}
                    onChange={(val) => setFormData({ ...formData, occasion: val })}
                    options={occasions}
                  />
                </div>

                {/* 2. Tentative Date Field */}
                <div>
                  <label className="block text-[11px] font-sans uppercase tracking-[0.16em] text-[#8C6B38] font-semibold mb-2">
                    2. Tentative Date
                  </label>
                  <input
                    type="date"
                    value={formData.eventDate}
                    onChange={(e) => setFormData({ ...formData, eventDate: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-[#C5A880]/40 bg-[#FAF8F5] text-xs text-[#0D1B2A] focus:outline-none focus:border-[#0D1B2A] transition-colors"
                    required
                  />
                </div>

                {/* 3. Estimated Guest Count Field */}
                <div>
                  <label className="block text-[11px] font-sans uppercase tracking-[0.16em] text-[#8C6B38] font-semibold mb-2">
                    3. Estimated Guest Count
                  </label>
                  <BookingLuxurySelect
                    value={formData.guestCount}
                    onChange={(val) => setFormData({ ...formData, guestCount: val })}
                    options={guestCountOptions}
                  />
                </div>

                {/* 4. Full Name & Contact Number Fields */}
                <div>
                  <label className="block text-[11px] font-sans uppercase tracking-[0.16em] text-[#8C6B38] font-semibold mb-2">
                    4. Contact Details
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <input
                      type="text"
                      placeholder="Your Full Name"
                      value={formData.clientName}
                      onChange={(e) => setFormData({ ...formData, clientName: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-[#C5A880]/40 bg-[#FAF8F5] text-xs text-[#0D1B2A] placeholder-[#8E98A5] focus:outline-none focus:border-[#0D1B2A] transition-colors"
                      required
                    />
                    <div>
                      <input
                        type="tel"
                        inputMode="numeric"
                        pattern="[0-9]{10}"
                        minLength={10}
                        maxLength={10}
                        placeholder="9826142216"
                        value={formData.phone}
                        onChange={handlePhoneChange}
                        onKeyDown={handlePhoneKeyDown}
                        onPaste={handlePhonePaste}
                        className="w-full px-4 py-3 rounded-xl border border-[#C5A880]/40 bg-[#FAF8F5] text-xs text-[#0D1B2A] placeholder-[#8E98A5] focus:outline-none focus:border-[#0D1B2A] transition-colors tracking-widest font-medium"
                        required
                      />
                    </div>
                  </div>
                </div>

              </div>

              {/* Anti-Bot Honeypot Multi-Trap (Invisible to humans, triggers on automated bot scripts) */}
              <div style={{ display: 'none', position: 'absolute', left: '-9999px', opacity: 0 }} aria-hidden="true">
                <input
                  type="text"
                  name="bespoke_booking_trap"
                  tabIndex={-1}
                  autoComplete="off"
                  value={formData.botTrap || ''}
                  onChange={(e) => setFormData({ ...formData, botTrap: e.target.value })}
                />
                <input
                  type="text"
                  name="company_website"
                  tabIndex={-1}
                  autoComplete="off"
                  value={formData.decoyCompany || ''}
                  onChange={(e) => setFormData({ ...formData, decoyCompany: e.target.value })}
                />
              </div>

              {/* Submit Button */}
              <div className="pt-4">
                <button
                  type="submit"
                  className="w-full py-4 rounded-full text-xs font-sans tracking-[0.2em] uppercase font-bold bg-[#0D1B2A] text-[#FAF8F5] hover:bg-[#1B3B2F] transition-all duration-300 shadow-xl flex items-center justify-center gap-3 cursor-pointer"
                >
                  <span>Request Bespoke Consultation</span>
                  <ArrowRight className="w-4 h-4 text-[#C5A880]" />
                </button>
              </div>

            </form>
          )}

        </div>

      </div>
    </section>
  );
}

import React, { useState, useEffect, useRef } from 'react';
import { Send, Award, Sparkles, MessageSquare, AlertCircle } from 'lucide-react';
import { BRAND_INFO } from '../data/initialData';
import CustomSelect from './CustomSelect';
import CustomDatePicker from './CustomDatePicker';

export default function DateInquirySection({ onLeadCreated, selectedOccasion = '' }) {
  const [formData, setFormData] = useState({
    clientName: '',
    phone: '',
    occasion: selectedOccasion || 'Royal Wedding & Mandap Setup',
    eventDate: '',
    guestCount: '300 - 600 Guests (Grand Royal Banquet)',
    city: 'Bhilai / Durg',
    customNotes: '',
    botTrap: '' // Anti-bot honeypot
  });

  // Anti-bot time-gate: records when component rendered
  const formLoadTime = useRef(Date.now());
  const phoneInputRef = useRef(null);

  useEffect(() => {
    if (selectedOccasion) {
      setFormData((prev) => ({ ...prev, occasion: selectedOccasion }));
    }
  }, [selectedOccasion]);

  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const occasions = [
    'Royal Wedding & Mandap Setup',
    'Engagement & Sangeet Gala',
    'Catering & 5-Star Royal Feasts',
    'Corporate & Theme Galas',
    'Housewarming & Spiritual Ceremonies',
    'Other Bespoke Royal Celebration'
  ];

  const effectiveOccasions = formData.occasion && !occasions.includes(formData.occasion)
    ? [formData.occasion, ...occasions]
    : occasions;

  const guestCounts = [
    '50 - 150 Guests (Intimate Family Gathering)',
    '150 - 300 Guests (Classic Celebration)',
    '300 - 600 Guests (Grand Royal Banquet)',
    '600 - 1,500+ Guests (Sprawling Lawn Gala)'
  ];

  const cities = [
    'Bhilai / Durg',
    'Raipur',
    'Rajnandgaon / Bilaspur',
    'Other Chhattisgarh Destination'
  ];

  // Phone sanitization & change handler
  const handlePhoneChange = (e) => {
    let rawDigits = e.target.value.replace(/\D/g, '');
    // If pasted with country code 91 or trunk prefix 0
    if (rawDigits.startsWith('91') && rawDigits.length > 10) {
      rawDigits = rawDigits.slice(2);
    } else if (rawDigits.startsWith('0') && rawDigits.length > 10) {
      rawDigits = rawDigits.slice(1);
    }
    rawDigits = rawDigits.slice(0, 10);
    setFormData((prev) => ({ ...prev, phone: rawDigits }));
    if (rawDigits.length === 10) {
      setErrorMsg('');
    }
  };

  // Block keypress if already 10 digits or non-numeric
  const handlePhoneKeyDown = (e) => {
    // Allowed control keys
    if (['Backspace', 'Delete', 'ArrowLeft', 'ArrowRight', 'Tab', 'Enter', 'Home', 'End'].includes(e.key)) return;
    if ((e.ctrlKey || e.metaKey) && ['a', 'c', 'v', 'x', 'z'].includes(e.key.toLowerCase())) return;
    
    // Disallow spaces strictly
    if (e.key === ' ' || e.code === 'Space') {
      e.preventDefault();
      return;
    }

    // Disallow non-digit characters
    if (!/^\d$/.test(e.key)) {
      e.preventDefault();
      return;
    }

    // Disallow typing past 10 digits
    const input = e.target;
    const hasSelection = input.selectionStart !== input.selectionEnd;
    if (formData.phone.length >= 10 && !hasSelection) {
      e.preventDefault();
    }
  };

  // Intercept paste to clean & clamp to 10 digits max
  const handlePhonePaste = (e) => {
    e.preventDefault();
    const pasteText = (e.clipboardData || window.clipboardData).getData('text') || '';
    let cleaned = pasteText.replace(/\D/g, '');
    if (cleaned.startsWith('91') && cleaned.length > 10) {
      cleaned = cleaned.slice(2);
    } else if (cleaned.startsWith('0') && cleaned.length > 10) {
      cleaned = cleaned.slice(1);
    }
    cleaned = cleaned.slice(0, 10);
    setFormData((prev) => ({ ...prev, phone: cleaned }));
    if (cleaned.length === 10) {
      setErrorMsg('');
    }
  };

  // Indian phone number validation: exactly 10 digits starting with 6-9
  const validatePhone = (digits) => {
    if (!digits || digits.length !== 10) return false;
    if (!/^[6-9]\d{9}$/.test(digits)) return false;
    // Check for repetitive/dummy numbers like 9999999999 or 0000000000
    if (/^(\d)\1{9}$/.test(digits)) return false;
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // 1. Anti-Bot Honeypot check: If the invisible field was filled, silently discard
    if (formData.botTrap && formData.botTrap.trim().length > 0) {
      console.warn('Bot submission blocked via honeypot trap.');
      setSubmitted(true);
      return;
    }

    // 2. Anti-Bot Time-Gate check: Reject if submitted within less than 2 seconds
    if (Date.now() - formLoadTime.current < 2000) {
      setErrorMsg('Please take a moment to review your details before submitting.');
      return;
    }

    // 3. Required Fields check
    if (!formData.clientName.trim() || !formData.phone.trim() || !formData.eventDate) {
      setErrorMsg('Kindly provide the Patron Name, Contact Line, and Auspicious Celebration Date.');
      return;
    }

    // 4. Strict Phone Validation (strictly reject less than 10 digits or more than 10 digits)
    if (!formData.phone || formData.phone.length < 10) {
      setErrorMsg('Phone number must be exactly 10 digits. Numbers with less than 10 digits cannot be accepted.');
      if (phoneInputRef.current) phoneInputRef.current.focus();
      return;
    }
    if (formData.phone.length !== 10) {
      setErrorMsg('Please enter an exact 10-digit mobile number.');
      if (phoneInputRef.current) phoneInputRef.current.focus();
      return;
    }
    if (!validatePhone(formData.phone)) {
      setErrorMsg('Please enter a valid 10-digit Indian mobile number starting with 6, 7, 8, or 9 (dummy/repetitive numbers not accepted).');
      if (phoneInputRef.current) phoneInputRef.current.focus();
      return;
    }

    // 5. Human-readable inquiry timestamp ("kab inquiry aayi thi")
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
      city: formData.city,
      status: 'Farmaan Bestowed',
      notes: formData.customNotes || 'Submitted via Royal Celebration Farmaan.'
    };

    if (onLeadCreated) {
      onLeadCreated(newLead);
    }
    setSubmitted(true);
    setErrorMsg('');
  };

  const handleWhatsAppSend = () => {
    const text = encodeURIComponent(
      `*ROYAL FARMAAN RESERVATION*\n\n` +
      `• *Patron:* ${formData.clientName}\n` +
      `• *Phone:* ${formData.phone}\n` +
      `• *Occasion:* ${formData.occasion}\n` +
      `• *Auspicious Date:* ${formData.eventDate}\n` +
      `• *Assembly:* ${formData.guestCount}\n` +
      `• *Venue City:* ${formData.city}`
    );
    window.open(`https://wa.me/${BRAND_INFO.contacts[0].whatsapp}?text=${text}`, '_blank');
  };

  return (
    <section id="inquire" className="site-section bg-[#FAF7F2] text-[#1C1A18] border-t border-[#8C7355]/20">
      <div className="site-container">

        {/* The Masterpiece: High-GSM Gold & Ivory Farmaan Card */}
        <div className="w-full max-w-3xl mx-auto bg-[#FFFDF9] border border-[#C9A86A]/50 rounded-2xl p-6 sm:p-12 shadow-[0_20px_60px_-15px_rgba(201,168,106,0.18)] relative box-border">

          {/* Traditional Gold Filigree Corner Accents */}
          <div className="absolute top-3 left-3 w-4 h-4 border-t-2 border-l-2 border-[#C9A86A]/60" />
          <div className="absolute top-3 right-3 w-4 h-4 border-t-2 border-r-2 border-[#C9A86A]/60" />
          <div className="absolute bottom-3 left-3 w-4 h-4 border-b-2 border-l-2 border-[#C9A86A]/60" />
          <div className="absolute bottom-3 right-3 w-4 h-4 border-b-2 border-r-2 border-[#C9A86A]/60" />

          {/* Card Header — Farmaan Style */}
          <div className="text-center max-w-xl mx-auto mb-8 pt-2">
            
            <div className="inline-flex items-center gap-2 text-[#C9A86A] text-[10px] font-sans tracking-[0.3em] uppercase font-semibold mb-3">
              <Sparkles className="w-3 h-3 text-[#C9A86A]" />
              <span>Private Consultation & Date Availability</span>
              <Sparkles className="w-3 h-3 text-[#C9A86A]" />
            </div>

            <div className="my-3 flex flex-col items-center">
              {/* Monogram Seal */}
              <div className="w-13 h-13 border border-[#C9A86A]/70 rounded-full flex items-center justify-center font-serif text-xl italic text-[#C9A86A] bg-[#FFFBF0] shadow-[0_4px_16px_rgba(201,168,106,0.15)]">
                SR
              </div>
              <span className="font-serif text-base tracking-[0.25em] text-[#1A1A1A] font-normal uppercase mt-3">
                SHREE RAM
              </span>
              <span className="text-[9px] uppercase tracking-[0.28em] text-[#8A7E6D] mt-0.5">
                Weddings, Royal Decor & 5-Star Catering · Bhilai
              </span>
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#1A1A1A] font-normal tracking-tight mt-4 mb-2">
              Royal Celebration <span className="italic text-[#C9A86A]">Farmaan</span>
            </h2>

            {/* Delicate Hairline Divider with Diamond Center */}
            <div className="flex items-center justify-center gap-3 my-4">
              <div className="h-px w-14 bg-[#E9DCC0]" />
              <div className="w-1.5 h-1.5 rotate-45 border border-[#C9A86A]" />
              <div className="h-px w-14 bg-[#E9DCC0]" />
            </div>

            {/* User's Favorite Line */}
            <p className="font-serif text-base sm:text-lg italic text-[#2D2823] leading-relaxed max-w-lg mx-auto">
              “Whether an expansive starlit lawn or a grand banquet hall — we transform your chosen venue with majestic mandap architecture, 5-star Awadhi royal catering, and flawless on-ground execution.”
            </p>
          </div>

          {submitted ? (
            /* Auspicious Confirmation Card */
            <div className="text-center py-8 px-4 space-y-6">
              <div className="w-18 h-18 rounded-full bg-[#FFFBF0] border border-[#C9A86A] flex items-center justify-center mx-auto text-[#C9A86A] shadow-md">
                <Award className="w-9 h-9" />
              </div>

              <div className="space-y-3 max-w-lg mx-auto">
                <span className="text-[10px] font-sans uppercase tracking-[0.28em] text-[#C9A86A] font-semibold">
                  Royal Farmaan Sealed
                </span>
                <h3 className="font-serif text-3xl sm:text-4xl text-[#1A1A1A] font-normal">
                  Bestowed with Highest Honor
                </h3>

                <div className="flex items-center justify-center gap-3 my-3">
                  <div className="h-px w-12 bg-[#E9DCC0]" />
                  <div className="w-1.5 h-1.5 rotate-45 border border-[#C9A86A]" />
                  <div className="h-px w-12 bg-[#E9DCC0]" />
                </div>

                <p className="font-serif text-base sm:text-lg text-[#4A443C] leading-relaxed">
                  Honored <span className="font-semibold text-[#1A1A1A]">{formData.clientName}</span>, your reservation for <span className="text-[#C9A86A] font-semibold">{formData.occasion}</span> on <span className="font-semibold text-[#1A1A1A]">{formData.eventDate}</span> in <span className="font-semibold text-[#1A1A1A]">{formData.city}</span> has been sealed in our private register.
                </p>
                <p className="font-sans text-xs text-[#7A7266] leading-relaxed">
                  Our founders Vishal Pratap Singh, Amitab Verma & Chhatrapal will personally reach out to your Highness at <span className="font-semibold text-[#1A1A1A]">{formData.phone}</span> within 24 hours.
                </p>
              </div>

              <div className="pt-6 flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md mx-auto">
                <button
                  type="button"
                  onClick={handleWhatsAppSend}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-md text-[11px] font-sans tracking-[0.22em] uppercase font-semibold bg-[#1B3B2F] text-[#FAF7F2] hover:bg-[#255241] transition-all shadow-md cursor-pointer"
                >
                  <MessageSquare className="w-4 h-4 text-[#C9A86A]" />
                  <span>Connect on WhatsApp Now</span>
                </button>
              </div>
            </div>
          ) : (
            /* Royal Farmaan Input Form with Custom Dropdowns */
            <form onSubmit={handleSubmit} className="space-y-6 text-left">
              
              {errorMsg && (
                <div className="p-3 text-xs text-[#9B2C2C] bg-[#FFF8F8] border border-[#FEB2B2] rounded-md text-center font-sans font-medium">
                  {errorMsg}
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
                
                {/* 1. Auspicious Celebration */}
                <div>
                  <label className="block text-[10.5px] font-sans uppercase tracking-[0.22em] text-[#8A7E6D] font-medium mb-2">
                    1. Auspicious Celebration
                  </label>
                  <CustomSelect
                    value={formData.occasion}
                    onChange={(val) => setFormData({ ...formData, occasion: val })}
                    options={effectiveOccasions}
                  />
                </div>

                {/* 2. Auspicious Date */}
                <div>
                  <label className="block text-[10.5px] font-sans uppercase tracking-[0.22em] text-[#8A7E6D] font-medium mb-2">
                    2. Auspicious Date
                  </label>
                  <CustomDatePicker
                    value={formData.eventDate}
                    onChange={(dateStr) => {
                      setFormData((prev) => ({ ...prev, eventDate: dateStr }));
                      setErrorMsg('');
                    }}
                  />
                </div>

                {/* 3. Noble Patron / Host Name */}
                <div>
                  <label className="block text-[10.5px] font-sans uppercase tracking-[0.22em] text-[#8A7E6D] font-medium mb-2">
                    3. Host / Patron Full Name
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Khurana Family"
                    value={formData.clientName}
                    onChange={(e) => setFormData({ ...formData, clientName: e.target.value })}
                    className="w-full px-4 py-3.5 sm:py-4 rounded-md border border-[#E9DCC0] bg-[#FFFEF9] text-[15px] font-sans text-[#1A1A1A] placeholder:text-[#C7BEAF] outline-none focus:border-[#C9A86A] focus:ring-1 focus:ring-[#C9A86A]/20 transition-all shadow-2xs"
                    required
                  />
                </div>

                {/* 4. Contact Line & WhatsApp */}
                <div>
                  <label className="block text-[10.5px] font-sans uppercase tracking-[0.22em] text-[#8A7E6D] font-medium mb-2">
                    4. Direct WhatsApp / Phone Line
                  </label>
                  <input
                    ref={phoneInputRef}
                    type="tel"
                    inputMode="numeric"
                    pattern="[0-9]{10}"
                    minLength={10}
                    maxLength={10}
                    autoComplete="tel-national"
                    placeholder="9826142216"
                    value={formData.phone}
                    onChange={handlePhoneChange}
                    onKeyDown={handlePhoneKeyDown}
                    onPaste={handlePhonePaste}
                    className="w-full px-4 py-3.5 sm:py-4 rounded-md border border-[#E9DCC0] bg-[#FFFEF9] text-[15px] font-sans text-[#1A1A1A] placeholder:text-[#C7BEAF] outline-none focus:border-[#C9A86A] focus:ring-1 focus:ring-[#C9A86A]/20 transition-all tracking-widest font-medium shadow-2xs"
                    required
                  />
                </div>

                {/* 5. Assembly Size */}
                <div>
                  <label className="block text-[10.5px] font-sans uppercase tracking-[0.22em] text-[#8A7E6D] font-medium mb-2">
                    5. Estimated Assembly
                  </label>
                  <CustomSelect
                    value={formData.guestCount}
                    onChange={(val) => setFormData({ ...formData, guestCount: val })}
                    options={guestCounts}
                  />
                </div>

                {/* 6. City / Venue Location */}
                <div>
                  <label className="block text-[10.5px] font-sans uppercase tracking-[0.22em] text-[#8A7E6D] font-medium mb-2">
                    6. Celebration City / Venue
                  </label>
                  <CustomSelect
                    value={formData.city}
                    onChange={(val) => setFormData({ ...formData, city: val })}
                    options={cities}
                  />
                </div>

              </div>

              {/* Custom Celebration Vision / Notes */}
              <div>
                <label className="block text-[10.5px] font-sans uppercase tracking-[0.22em] text-[#8A7E6D] font-medium mb-2">
                  Special Vision or Specific Requirements (Bespoke Themes, Live Counters, Royal Entries)
                </label>
                <textarea
                  rows={3}
                  placeholder="Describe your venue vision, pure-ghee Awadhi menu desires, or any specific family traditions..."
                  value={formData.customNotes}
                  onChange={(e) => setFormData({ ...formData, customNotes: e.target.value })}
                  className="w-full px-4 py-3.5 rounded-md border border-[#E9DCC0] bg-[#FFFEF9] text-[15px] font-serif text-[#1A1A1A] placeholder:text-[#C7BEAF] outline-none focus:border-[#C9A86A] focus:ring-1 focus:ring-[#C9A86A]/20 transition-all resize-none shadow-2xs"
                />
              </div>

              {/* Anti-Bot Honeypot Trap (Invisible to humans, triggers on automated bot scripts) */}
              <div style={{ display: 'none', position: 'absolute', left: '-9999px', opacity: 0 }} aria-hidden="true">
                <input
                  type="text"
                  name="royal_farmaan_trap"
                  tabIndex={-1}
                  autoComplete="off"
                  value={formData.botTrap || ''}
                  onChange={(e) => setFormData({ ...formData, botTrap: e.target.value })}
                />
              </div>

              {/* Seal & Bestow Button */}
              <div className="pt-4 text-center">
                <button
                  type="submit"
                  className="w-full py-4 px-8 rounded-md text-xs font-sans tracking-[0.26em] uppercase font-semibold bg-[#1A1A1A] text-[#FFFEF9] hover:bg-[#B89657] hover:text-white transition-all duration-300 shadow-[0_10px_30px_-15px_rgba(26,26,26,0.35)] flex items-center justify-center gap-3 cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5 text-[#C9A86A]" />
                  <span>Seal & Bestow Royal Farmaan</span>
                </button>
                
                <div className="mt-4 text-xs text-[#8A7E6D] font-light text-center">
                  Bespoke celebration management tailored with highest honor, personal warmth, and flawless execution.
                </div>
              </div>

            </form>
          )}

        </div>

      </div>
    </section>
  );
}

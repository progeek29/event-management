import React, { useState } from 'react';
import { CheckCircle, ArrowRight, MessageSquare } from 'lucide-react';
import { BRAND_INFO } from '../data/initialData';

export default function BookingForm({ onLeadCreated, initialOccasion = '' }) {
  const [formData, setFormData] = useState({
    clientName: '',
    phone: '',
    occasion: initialOccasion || 'Wedding Ceremonies',
    eventDate: '',
    guestCount: '300 - 600 Guests',
  });

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
    if (!formData.clientName.trim() || !formData.phone.trim() || !formData.eventDate) {
      setErrorMsg('Kindly provide your Full Name, Contact Number, and Tentative Event Date.');
      return;
    }

    if (formData.phone.length !== 10) {
      setErrorMsg('Please enter an exact 10-digit mobile number. Numbers with less than 10 digits cannot be accepted.');
      return;
    }

    if (!/^[6-9]\d{9}$/.test(formData.phone)) {
      setErrorMsg('Please enter a valid 10-digit Indian mobile number starting with 6, 7, 8, or 9.');
      return;
    }

    const newLead = {
      id: `SRE-${new Date().getFullYear()}-${String(Math.floor(100 + Math.random() * 900))}`,
      dateSubmitted: new Date().toISOString().replace('T', ' ').substring(0, 16),
      clientName: formData.clientName.trim(),
      phone: formData.phone.trim(),
      occasion: formData.occasion,
      eventDate: formData.eventDate,
      guestCount: formData.guestCount,
      status: 'New',
      notes: 'Submitted through website frictionless royal inquiry card.'
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
                  <select
                    value={formData.occasion}
                    onChange={(e) => setFormData({ ...formData, occasion: e.target.value })}
                    className="w-full px-4 py-3.5 rounded-xl border border-[#C5A880]/40 bg-[#FAF8F5] text-xs text-[#0D1B2A] focus:outline-none focus:border-[#0D1B2A] transition-colors"
                  >
                    {occasions.map((occ) => (
                      <option key={occ} value={occ} className="bg-white text-[#0D1B2A]">{occ}</option>
                    ))}
                  </select>
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
                  <select
                    value={formData.guestCount}
                    onChange={(e) => setFormData({ ...formData, guestCount: e.target.value })}
                    className="w-full px-4 py-3.5 rounded-xl border border-[#C5A880]/40 bg-[#FAF8F5] text-xs text-[#0D1B2A] focus:outline-none focus:border-[#0D1B2A] transition-colors"
                  >
                    {guestCountOptions.map((opt) => (
                      <option key={opt} value={opt} className="bg-white text-[#0D1B2A]">{opt}</option>
                    ))}
                  </select>
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

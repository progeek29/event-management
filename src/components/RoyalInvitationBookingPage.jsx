import React, { useState } from 'react';
import { ArrowLeft, CheckCircle2, MessageSquare, Send, Award, Sparkles } from 'lucide-react';
import { BRAND_INFO } from '../data/initialData';


export default function RoyalInvitationBookingPage({ initialOccasion = '', onBack, onLeadCreated }) {
  const [formData, setFormData] = useState({
    clientName: '',
    phone: '',
    occasion: initialOccasion || 'Wedding Ceremonies',
    eventDate: '',
    guestCount: '300 - 600 Guests (Grand Royal)',
    city: 'Bhilai / Durg',
    customNotes: ''
  });

  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const occasions = [
    'Wedding Ceremonies (विवाह एवं मंडप)',
    'Engagement & Sangeet (सगाई एवं संगीत)',
    'Catering & Royal Feasts (शाही कैटरिंग)',
    'Corporate & Theme Galas (कॉर्पोरेट उत्सव)',
    'Housewarming & Religious Puja (गृह प्रवेश व धार्मिक अनुष्ठान)',
    'Other Bespoke Royal Celebration'
  ];

  const guestCounts = [
    '50 - 150 Guests (Intimate Heritage)',
    '150 - 300 Guests (Prestige Gathering)',
    '300 - 600 Guests (Grand Royal)',
    '600 - 1,500+ Guests (Imperial Aristocracy)'
  ];

  const cities = [
    'Bhilai / Durg',
    'Raipur',
    'Rajnandgaon / Bilaspur',
    'Other Chhattisgarh Destination'
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.clientName.trim() || !formData.phone.trim() || !formData.eventDate) {
      setErrorMsg('Kindly bestow the Patron Name, Contact Line, and Auspicious Celebration Date.');
      return;
    }

    const newLead = {
      id: `SRE-${new Date().getFullYear()}-${Math.floor(100 + Math.random() * 900)}`,
      dateSubmitted: new Date().toISOString().replace('T', ' ').substring(0, 16),
      clientName: formData.clientName.trim(),
      phone: formData.phone.trim(),
      occasion: formData.occasion,
      eventDate: formData.eventDate,
      guestCount: formData.guestCount,
      city: formData.city,
      status: 'Farmaan Bestowed',
      notes: formData.customNotes || 'Submitted via Royal Wedding Card Booking Experience.'
    };

    if (onLeadCreated) {
      onLeadCreated(newLead);
    }
    setSubmitted(true);
    setErrorMsg('');
  };

  return (
    <div className="w-full min-h-screen bg-[#FAF8F5] text-[#0D1B2A] flex flex-col items-center justify-between py-10 px-4 sm:px-6 relative selection:bg-[#C5A880]">
      
      {/* Top Navigation Micro Bar */}
      <div className="w-full max-w-4xl flex items-center justify-between mb-8 pb-4 border-b border-[#C5A880]/30">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 text-xs font-sans uppercase tracking-[0.2em] text-[#0D1B2A] hover:text-[#8C6B38] font-bold cursor-pointer transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Return to Homepage</span>
        </button>

        <div className="flex items-center gap-2">
          <span className="font-serif text-sm tracking-wider text-[#8C6B38] font-semibold">
            {BRAND_INFO.sacredInvocation}
          </span>
        </div>

        <a
          href={`tel:${BRAND_INFO.contacts[0].phone}`}
          className="text-xs font-sans tracking-wider text-[#8C6B38] hover:text-[#0D1B2A] font-semibold hidden sm:inline"
        >
          Concierge: {BRAND_INFO.contacts[0].phoneDisplay}
        </a>
      </div>

      {/* The Masterpiece: High-GSM Indian Wedding Card / Royal Farmaan */}
      <div className="w-full max-w-3xl bg-[#FFFDF9] rounded-3xl border-4 border-[#C5A880]/50 shadow-2xl p-6 sm:p-14 relative overflow-hidden my-auto">
        
        {/* Ornate Gold Border & Filigree Accents */}
        <div className="absolute inset-3 border border-[#C5A880]/30 rounded-2xl pointer-events-none" />
        <div className="absolute top-5 left-5 w-6 h-6 border-t-2 border-l-2 border-[#8C6B38]" />
        <div className="absolute top-5 right-5 w-6 h-6 border-t-2 border-r-2 border-[#8C6B38]" />
        <div className="absolute bottom-5 left-5 w-6 h-6 border-b-2 border-l-2 border-[#8C6B38]" />
        <div className="absolute bottom-5 right-5 w-6 h-6 border-b-2 border-r-2 border-[#8C6B38]" />

        {/* Card Header — Wedding Invitation Style */}
        <div className="text-center max-w-xl mx-auto mb-10 pt-2">
          <div className="inline-flex items-center gap-2 text-[#8C6B38] text-xs font-sans tracking-[0.28em] uppercase font-bold mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>॥ श्री गणेशाय नमः ॥</span>
            <Sparkles className="w-3.5 h-3.5" />
          </div>

          <div className="my-4 flex flex-col items-center">
            <div className="w-12 h-12 border border-[#C5A880]/60 rounded-full flex items-center justify-center font-['Cormorant_Garamond'] text-xl italic text-[#8C6B38] shadow-[0_0_15px_rgba(197,168,128,0.2)] bg-[#FAF8F5]">
              SR
            </div>
            <span className="font-['Cormorant_Garamond'] text-base tracking-[0.25em] text-[#0D1B2A] font-bold mt-2">
              SHREE RAM
            </span>
            <span className="text-[8.5px] uppercase tracking-[0.25em] text-[#8E98A5]">
              Atelier & Estates · Bhilai
            </span>
          </div>

          <h1 className="font-serif text-3xl sm:text-5xl text-[#0D1B2A] font-normal tracking-tight mt-3 mb-2">
            Royal Celebration <span className="italic text-[#8C6B38]">Farmaan</span>
          </h1>

          <p className="font-sans text-xs sm:text-sm text-[#5A6472] font-light leading-relaxed max-w-md mx-auto">
            With the sacred blessings of the divine, we welcome your auspicious occasion into our atelier. Kindly bestow your celebration details below.
          </p>
        </div>

        {submitted ? (
          /* Auspicious Confirmation Card */
          <div className="text-center py-8 px-4 space-y-6 animate-in fade-in duration-300">
            <div className="w-20 h-20 rounded-full bg-[#FAF8F5] border-2 border-[#C5A880] flex items-center justify-center mx-auto text-[#8C6B38] shadow-lg">
              <Award className="w-10 h-10" />
            </div>

            <div className="space-y-2">
              <span className="text-xs font-sans uppercase tracking-[0.25em] text-[#8C6B38] font-bold">
                Auspicious Farmaan Accepted
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl text-[#0D1B2A]">
                Farmaan Bestowed with Honor
              </h2>
              <div className="w-16 h-[1.5px] bg-[#C5A880] mx-auto my-3" />
              <p className="font-sans text-sm text-[#5A6472] max-w-md mx-auto leading-relaxed">
                Honored <span className="font-semibold text-[#0D1B2A]">{formData.clientName}</span>, your royal reservation for <span className="text-[#8C6B38] font-semibold">{formData.occasion}</span> on <span className="font-semibold text-[#0D1B2A]">{formData.eventDate}</span> in <span className="font-semibold text-[#0D1B2A]">{formData.city}</span> has been sealed in our private register.
              </p>
              <p className="font-sans text-xs text-[#718096]">
                Our master directors Vishal Pratap Singh, Amitab Verma & Chhatrapal will personally contact your Highness at <span className="font-semibold text-[#0D1B2A]">{formData.phone}</span> within 24 hours.
              </p>
            </div>

            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href={`https://wa.me/${BRAND_INFO.contacts[0].whatsapp}?text=Pranam%20Shree%20Ram%20Events,%20I%20have%20submitted%20a%20Royal%20Farmaan%20for%20${encodeURIComponent(formData.occasion)}%20on%20${formData.eventDate}%20for%20${formData.guestCount}.`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full text-xs font-sans tracking-[0.18em] uppercase font-bold bg-[#1B3B2F] text-white hover:bg-[#255241] transition-all shadow-lg"
              >
                <MessageSquare className="w-4 h-4 text-[#C5A880]" />
                <span>Instant WhatsApp Confirmation</span>
              </a>

              <button
                onClick={onBack}
                className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-3.5 rounded-full text-xs font-sans tracking-[0.18em] uppercase font-semibold border border-[#C5A880] text-[#0D1B2A] hover:bg-[#C5A880]/15 transition-all cursor-pointer"
              >
                <span>Back to Portals</span>
              </button>
            </div>
          </div>
        ) : (
          /* Royal Wedding Card Input Form */
          <form onSubmit={handleSubmit} className="space-y-6 text-left">
            
            {errorMsg && (
              <div className="p-3 text-xs text-[#9B2C2C] bg-[#FFF5F5] border border-[#FEB2B2] rounded-xl text-center font-medium">
                {errorMsg}
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* 1. Auspicious Occasion */}
              <div>
                <label className="block text-[11px] font-sans uppercase tracking-[0.18em] text-[#8C6B38] font-bold mb-2">
                  1. Auspicious Celebration
                </label>
                <select
                  value={formData.occasion}
                  onChange={(e) => setFormData({ ...formData, occasion: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-[#C5A880]/60 bg-[#FAF8F5] text-xs text-[#0D1B2A] font-medium focus:outline-none focus:border-[#0D1B2A] transition-colors"
                >
                  {occasions.map((occ) => (
                    <option key={occ} value={occ}>{occ}</option>
                  ))}
                </select>
              </div>

              {/* 2. Auspicious Date */}
              <div>
                <label className="block text-[11px] font-sans uppercase tracking-[0.18em] text-[#8C6B38] font-bold mb-2">
                  2. Auspicious Date (मुहूर्त तारीख)
                </label>
                <input
                  type="date"
                  value={formData.eventDate}
                  onChange={(e) => setFormData({ ...formData, eventDate: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-[#C5A880]/60 bg-[#FAF8F5] text-xs text-[#0D1B2A] font-medium focus:outline-none focus:border-[#0D1B2A] transition-colors"
                  required
                />
              </div>

              {/* 3. Noble Patron / Host Name */}
              <div>
                <label className="block text-[11px] font-sans uppercase tracking-[0.18em] text-[#8C6B38] font-bold mb-2">
                  3. Host / Patron Full Name (यजमान का नाम)
                </label>
                <input
                  type="text"
                  placeholder="e.g. Thakur Vishal Singh & Family"
                  value={formData.clientName}
                  onChange={(e) => setFormData({ ...formData, clientName: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-[#C5A880]/60 bg-[#FAF8F5] text-xs text-[#0D1B2A] placeholder-[#8E98A5] font-medium focus:outline-none focus:border-[#0D1B2A] transition-colors"
                  required
                />
              </div>

              {/* 4. Contact Line & WhatsApp */}
              <div>
                <label className="block text-[11px] font-sans uppercase tracking-[0.18em] text-[#8C6B38] font-bold mb-2">
                  4. Direct WhatsApp / Phone Line
                </label>
                <input
                  type="tel"
                  placeholder="+91 70003 42216"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-[#C5A880]/60 bg-[#FAF8F5] text-xs text-[#0D1B2A] placeholder-[#8E98A5] font-medium focus:outline-none focus:border-[#0D1B2A] transition-colors"
                  required
                />
              </div>

              {/* 5. Assembly Size */}
              <div>
                <label className="block text-[11px] font-sans uppercase tracking-[0.18em] text-[#8C6B38] font-bold mb-2">
                  5. Estimated Assembly (अतिथि संख्या)
                </label>
                <select
                  value={formData.guestCount}
                  onChange={(e) => setFormData({ ...formData, guestCount: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-[#C5A880]/60 bg-[#FAF8F5] text-xs text-[#0D1B2A] font-medium focus:outline-none focus:border-[#0D1B2A] transition-colors"
                >
                  {guestCounts.map((g) => (
                    <option key={g} value={g}>{g}</option>
                  ))}
                </select>
              </div>

              {/* 6. City / Venue Location */}
              <div>
                <label className="block text-[11px] font-sans uppercase tracking-[0.18em] text-[#8C6B38] font-bold mb-2">
                  6. Celebration City / Venue
                </label>
                <select
                  value={formData.city}
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-[#C5A880]/60 bg-[#FAF8F5] text-xs text-[#0D1B2A] font-medium focus:outline-none focus:border-[#0D1B2A] transition-colors"
                >
                  {cities.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>

            </div>

            {/* Custom Celebration Vision / Notes */}
            <div>
              <label className="block text-[11px] font-sans uppercase tracking-[0.18em] text-[#8C6B38] font-bold mb-2">
                Special Vision or Specific Requirements (Bespoke Themes, Live Counters, Celebrity Entries)
              </label>
              <textarea
                rows={3}
                placeholder="Describe any dream setup, pure-ghee Awadhi menu desires, or thematic mandap architecture..."
                value={formData.customNotes}
                onChange={(e) => setFormData({ ...formData, customNotes: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl border border-[#C5A880]/60 bg-[#FAF8F5] text-xs text-[#0D1B2A] placeholder-[#8E98A5] focus:outline-none focus:border-[#0D1B2A] transition-colors resize-none"
              />
            </div>

            {/* Seal & Bestow Button */}
            <div className="pt-4 text-center">
              <button
                type="submit"
                className="w-full py-4 rounded-full text-xs font-sans tracking-[0.24em] uppercase font-bold bg-[#0D1B2A] text-[#FAF8F5] hover:bg-[#1B3B2F] transition-all duration-300 shadow-xl flex items-center justify-center gap-3 cursor-pointer"
              >
                <Send className="w-4 h-4 text-[#C5A880]" />
                <span>Seal & Bestow Royal Farmaan / शाही आमंत्रण दर्ज करें</span>
              </button>
              
              <div className="flex items-center justify-center gap-2 mt-4 text-[11px] text-[#718096]">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#8C6B38]" />
                <span>100% Confidential. Directly delivered to the private desks of Vishal Pratap Singh, Amitab Verma & Chhatrapal.</span>
              </div>
            </div>

          </form>
        )}

      </div>

      {/* Footer Credo */}
      <div className="text-center mt-8 text-xs font-sans text-[#8E98A5] tracking-widest uppercase">
        <span>Shree Ram Events & Catering Atelier · Bhilai, Chhattisgarh</span>
      </div>

    </div>
  );
}

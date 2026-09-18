import React, { useState } from 'react';
import { ArrowLeft, CheckCircle2, MessageSquare, ShieldCheck, Sparkles, X, ChevronRight } from 'lucide-react';
import { BRAND_INFO } from '../data/initialData';

export default function ServiceDetailPage({ service, onBack, onNavigateToReservation, onLeadCreated }) {
  const [showPricingModal, setShowPricingModal] = useState(false);
  const [modalForm, setModalForm] = useState({ clientName: '', phone: '', eventDate: '' });
  const [priceUnlocked, setPriceUnlocked] = useState(false);

  if (!service) return null;

  const handlePricingSubmit = (e) => {
    e.preventDefault();
    if (!modalForm.clientName || !modalForm.phone) return;

    if (onLeadCreated) {
      onLeadCreated({
        id: `SRE-${new Date().getFullYear()}-${Math.floor(100 + Math.random() * 900)}`,
        dateSubmitted: new Date().toISOString().replace('T', ' ').substring(0, 16),
        clientName: modalForm.clientName,
        phone: modalForm.phone,
        occasion: service.title,
        eventDate: modalForm.eventDate || 'To Be Decided',
        guestCount: 'Bespoke Package Request',
        status: 'Pricing Requested',
        notes: `User unlocked deep quotation for ${service.title}`
      });
    }
    setPriceUnlocked(true);
  };

  const packageTiers = [
    {
      name: "Heritage Grand",
      subtitle: "Classic Royal Elegance",
      investment: "₹3.5 Lakhs — ₹6.5 Lakhs",
      highlights: [
        "Designer Entry Arch & Royal Carpeting",
        "25ft High-Density Fresh Flower Stage",
        "Curated Ambient Lighting & Sound",
        "Dedicated Hospitality Captain"
      ]
    },
    {
      name: "Imperial Palace",
      subtitle: "Monumental Luxury & Celebrity Entry",
      popular: true,
      investment: "₹7.5 Lakhs — ₹15 Lakhs",
      highlights: [
        "40ft Mughal Arch Pavilion / Carved Glass Mandap",
        "Celebrity Bride & Groom Hydraulic Revolving Entry",
        "Intelligent Concert-Grade Moving Heads & Cold Pyro FX",
        "Artisanal Live Counters & Uniformed Hospitality Stewards"
      ]
    },
    {
      name: "Kohinoor Bespoke",
      subtitle: "Tailored for Prestigious Aristocracy",
      investment: "Custom Royal Farmaan",
      highlights: [
        "Complete 360° Theme Architecture & Floral Sculptures",
        "Acoustic Symphony & Classical Live Instruments",
        "Multi-Station Global Cuisine & Master Chef Awadhi Banquets",
        "End-to-End VIP Concierge & Guest Experience Fleet"
      ]
    }
  ];

  return (
    <div className="w-full min-h-screen bg-[#FAF8F5] text-[#0D1B2A] flex flex-col">
      
      {/* Top Header Micro Bar */}
      <div className="bg-[#0D1B2A] text-[#C5A880] py-2.5 px-4 text-xs font-sans tracking-[0.2em] uppercase border-b border-[#C5A880]/20 flex items-center justify-between">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 text-[#EFE6D8] hover:text-[#C5A880] transition-colors cursor-pointer font-medium"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to All Collections</span>
        </button>
        <span className="font-serif text-sm tracking-widest hidden sm:inline">{BRAND_INFO.sacredInvocation}</span>
        <span className="text-[11px] text-[#C5A880]/90">Bhilai · Raipur · Durg</span>
      </div>

      {/* Cinematic Hero Banner for this Service */}
      <div className="relative h-[50vh] min-h-[380px] w-full bg-[#0D1B2A] overflow-hidden">
        <img
          src={service.image}
          alt={service.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0D1B2A] via-[#0D1B2A]/50 to-transparent" />
        
        {/* Floating Content */}
        <div className="absolute bottom-10 left-0 right-0 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center sm:text-left flex flex-col sm:flex-row items-center sm:items-end justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#0D1B2A]/90 border border-[#C5A880]/50 text-[#C5A880] text-xs font-sans tracking-[0.2em] uppercase mb-3">
              <span>Plate #{service.number}</span>
              <span>•</span>
              <span>{service.subtitle}</span>
            </div>
            <h1 className="font-serif text-4xl sm:text-6xl text-[#FAF8F5] font-normal tracking-tight">
              {service.title}
            </h1>
            {service.titleHi && (
              <p className="font-sans text-base sm:text-lg text-[#C5A880] mt-1 font-medium">
                {service.titleHi}
              </p>
            )}
          </div>

          <div className="flex items-center gap-3">
            <a
              href={`https://wa.me/${BRAND_INFO.contacts[0].whatsapp}?text=Hello%20Shree%20Ram%20Events,%20I%20am%20interested%20in%20${encodeURIComponent(service.title)}.`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-full text-xs font-sans tracking-wider uppercase bg-[#1B3B2F] text-[#FAF8F5] hover:bg-[#255241] transition-all shadow-md"
            >
              <MessageSquare className="w-4 h-4 text-[#C5A880]" />
              <span>WhatsApp Concierge</span>
            </a>
            <button
              onClick={() => onNavigateToReservation(service.title)}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-xs font-sans tracking-[0.18em] uppercase font-bold bg-[#C5A880] text-[#0D1B2A] hover:bg-[#FAF8F5] transition-all shadow-lg cursor-pointer"
            >
              <span>Reserve on Farmaan</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Luxury Paper Spread */}
      <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 -mt-8 relative z-10 flex-1">
        
        {/* High-GSM Parchment Card */}
        <div className="bg-[#FFFDF9] border border-[#C5A880]/40 rounded-3xl p-8 sm:p-14 shadow-2xl space-y-12">
          
          {/* Section 1: Editorial Overview */}
          <div className="border-b border-[#C5A880]/20 pb-10">
            <span className="text-xs font-sans tracking-[0.24em] uppercase text-[#8C6B38] font-semibold block mb-2">
              Atelier Philosophy & Execution
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#0D1B2A] mb-4">
              {service.subtitle}
            </h2>
            <p className="font-sans text-sm sm:text-base text-[#4A5568] leading-relaxed font-light mb-4">
              {service.description}
            </p>
            {service.descriptionHi && (
              <p className="font-sans text-sm sm:text-base text-[#718096] leading-relaxed italic">
                {service.descriptionHi}
              </p>
            )}
          </div>

          {/* Section 2: Signature Architectural Inclusions */}
          <div className="border-b border-[#C5A880]/20 pb-10">
            <span className="text-xs font-sans tracking-[0.24em] uppercase text-[#8C6B38] font-semibold block mb-6">
              Bespoke Elements Included in this Experience
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {service.features.map((feat, idx) => (
                <div key={idx} className="p-4 rounded-2xl bg-[#FAF8F5] border border-[#C5A880]/30 flex items-start gap-3 shadow-xs">
                  <CheckCircle2 className="w-5 h-5 text-[#8C6B38] flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="text-xs sm:text-sm text-[#0D1B2A] font-semibold block">{feat}</span>
                    {service.featuresHi && service.featuresHi[idx] && (
                      <span className="text-xs text-[#8C6B38] block mt-0.5 font-normal">{service.featuresHi[idx]}</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Section 3: Package Tiers & Pricing Breakdown */}
          <div>
            <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
              <div>
                <span className="text-xs font-sans tracking-[0.24em] uppercase text-[#8C6B38] font-semibold block mb-1">
                  Curated Investment Packages
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl text-[#0D1B2A]">
                  Select Your Celebration Scale
                </h3>
              </div>
              <button
                onClick={() => setShowPricingModal(true)}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-[#C5A880] text-xs font-sans tracking-wider uppercase text-[#0D1B2A] hover:bg-[#C5A880]/15 transition-all cursor-pointer font-semibold"
              >
                <Sparkles className="w-4 h-4 text-[#8C6B38]" />
                <span>Request Custom Quote / Deep Details</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {packageTiers.map((tier, idx) => (
                <div
                  key={idx}
                  className={`p-6 rounded-2xl flex flex-col justify-between transition-all duration-300 ${
                    tier.popular
                      ? 'bg-[#0D1B2A] text-white shadow-xl border-2 border-[#C5A880]'
                      : 'bg-[#FAF8F5] text-[#0D1B2A] border border-[#C5A880]/35 hover:shadow-md'
                  }`}
                >
                  <div>
                    {tier.popular && (
                      <span className="text-[9px] font-sans uppercase tracking-[0.2em] px-2.5 py-0.5 rounded-full bg-[#C5A880] text-[#0D1B2A] font-bold inline-block mb-3">
                        Most Requested
                      </span>
                    )}
                    <h4 className="font-serif text-xl sm:text-2xl font-bold mb-1">{tier.name}</h4>
                    <p className={`text-xs mb-4 ${tier.popular ? 'text-[#C5A880]' : 'text-[#718096]'}`}>
                      {tier.subtitle}
                    </p>
                    <div className="my-3 py-2 border-y border-[#C5A880]/30">
                      <span className={`text-xs uppercase tracking-wider block font-sans ${tier.popular ? 'text-[#C5A880]/80' : 'text-[#8C6B38]'}`}>
                        Investment Range
                      </span>
                      <span className="font-serif text-lg font-bold">{tier.investment}</span>
                    </div>
                    <ul className="space-y-2.5 my-4 text-xs">
                      {tier.highlights.map((h, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <CheckCircle2 className={`w-3.5 h-3.5 flex-shrink-0 mt-0.5 ${tier.popular ? 'text-[#C5A880]' : 'text-[#8C6B38]'}`} />
                          <span className={tier.popular ? 'text-[#FAF8F5]/90' : 'text-[#4A5568]'}>{h}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <button
                    onClick={() => onNavigateToReservation(`${service.title} (${tier.name})`)}
                    className={`w-full py-2.5 rounded-full text-xs font-sans tracking-wider uppercase font-semibold transition-all mt-4 cursor-pointer ${
                      tier.popular
                        ? 'bg-[#C5A880] text-[#0D1B2A] hover:bg-white'
                        : 'border border-[#0D1B2A] text-[#0D1B2A] hover:bg-[#0D1B2A] hover:text-white'
                    }`}
                  >
                    Select {tier.name}
                  </button>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>

      {/* Pop-up Modal to View Pricing / Deep Details (Appears ONLY when user clicks to see pricing) */}
      {showPricingModal && (
        <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-[#0D1B2A]/80 backdrop-blur-sm animate-in fade-in">
          <div className="bg-[#FAF8F5] border border-[#C5A880]/60 rounded-3xl max-w-lg w-full p-8 shadow-2xl relative text-[#0D1B2A]">
            
            <button
              onClick={() => { setShowPricingModal(false); setPriceUnlocked(false); }}
              className="absolute top-4 right-4 w-9 h-9 rounded-full bg-[#0D1B2A] text-white flex items-center justify-center hover:bg-[#1B3B2F] cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            {!priceUnlocked ? (
              <div>
                <div className="text-center mb-6">
                  <div className="w-12 h-12 rounded-full bg-[#C5A880]/20 border border-[#C5A880] flex items-center justify-center mx-auto text-[#8C6B38] mb-3">
                    <ShieldCheck className="w-6 h-6" />
                  </div>
                  <h3 className="font-serif text-2xl sm:text-3xl text-[#0D1B2A]">
                    Unlock Deep Quotation
                  </h3>
                  <p className="text-xs text-[#718096] mt-1">
                    Enter your contact line to view the customized catalog & rate breakdown for <span className="font-semibold text-[#8C6B38]">{service.title}</span>.
                  </p>
                </div>

                <form onSubmit={handlePricingSubmit} className="space-y-4">
                  <div>
                    <label className="block text-[11px] font-sans uppercase tracking-wider text-[#8C6B38] font-semibold mb-1">
                      Your Full Name
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Maharani / Thakur Saheb"
                      value={modalForm.clientName}
                      onChange={(e) => setModalForm({ ...modalForm, clientName: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-[#C5A880]/50 bg-white text-xs text-[#0D1B2A] focus:outline-none focus:border-[#0D1B2A]"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-sans uppercase tracking-wider text-[#8C6B38] font-semibold mb-1">
                      WhatsApp / Mobile Number
                    </label>
                    <input
                      type="tel"
                      placeholder="+91 98765 43210"
                      value={modalForm.phone}
                      onChange={(e) => setModalForm({ ...modalForm, phone: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-[#C5A880]/50 bg-white text-xs text-[#0D1B2A] focus:outline-none focus:border-[#0D1B2A]"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-sans uppercase tracking-wider text-[#8C6B38] font-semibold mb-1">
                      Tentative Date
                    </label>
                    <input
                      type="date"
                      value={modalForm.eventDate}
                      onChange={(e) => setModalForm({ ...modalForm, eventDate: e.target.value })}
                      className="w-full px-4 py-2 rounded-xl border border-[#C5A880]/50 bg-white text-xs text-[#0D1B2A] focus:outline-none focus:border-[#0D1B2A]"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 rounded-full text-xs font-sans tracking-[0.2em] uppercase font-bold bg-[#0D1B2A] text-white hover:bg-[#1B3B2F] transition-all cursor-pointer shadow-lg mt-2"
                  >
                    View Complete Price Guide
                  </button>
                </form>
              </div>
            ) : (
              <div className="text-center py-6 space-y-4">
                <div className="w-14 h-14 rounded-full bg-green-100 border border-green-500 flex items-center justify-center mx-auto text-green-700">
                  <CheckCircle2 className="w-7 h-7" />
                </div>
                <h3 className="font-serif text-2xl text-[#0D1B2A]">
                  Estimate Guide Unlocked
                </h3>
                <div className="p-4 rounded-xl bg-white border border-[#C5A880]/40 text-left text-xs space-y-2">
                  <div className="flex justify-between border-b pb-1.5">
                    <span className="text-[#718096]">Service:</span>
                    <span className="font-semibold">{service.title}</span>
                  </div>
                  <div className="flex justify-between border-b pb-1.5">
                    <span className="text-[#718096]">Base Stage & Mandap Setup:</span>
                    <span className="font-semibold">Starting ₹2.50 Lakhs</span>
                  </div>
                  <div className="flex justify-between border-b pb-1.5">
                    <span className="text-[#718096]">Catering (Awadhi + Chaat Live):</span>
                    <span className="font-semibold">₹750 - ₹1,450 / Plate</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#718096]">Full Ceremony Production:</span>
                    <span className="font-semibold text-[#8C6B38]">₹5.50 - ₹14 Lakhs</span>
                  </div>
                </div>
                <p className="text-xs text-[#718096]">
                  A formal PDF quotation has been queued for your WhatsApp line ({modalForm.phone}).
                </p>
                <div className="flex gap-3 justify-center pt-2">
                  <a
                    href={`https://wa.me/${BRAND_INFO.contacts[0].whatsapp}?text=Hello,%20I%20just%20unlocked%20pricing%20for%20${encodeURIComponent(service.title)}.`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-sans uppercase font-bold bg-[#1B3B2F] text-white"
                  >
                    <MessageSquare className="w-4 h-4" />
                    Open in WhatsApp
                  </a>
                  <button
                    onClick={() => { setShowPricingModal(false); onNavigateToReservation(service.title); }}
                    className="px-5 py-2.5 rounded-full text-xs font-sans uppercase font-bold bg-[#C5A880] text-[#0D1B2A]"
                  >
                    Confirm Farmaan
                  </button>
                </div>
              </div>
            )}

          </div>
        </div>
      )}

    </div>
  );
}

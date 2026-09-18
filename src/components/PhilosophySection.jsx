import React from 'react';
import { Heart, Phone, MessageSquare } from 'lucide-react';
import { BRAND_INFO } from '../data/initialData';

const FOUNDER_DETAILS = [
  {
    initials: 'VP',
    speciality: 'Mandap Scenography & Royal Decor'
  },
  {
    initials: 'AV',
    speciality: 'Awadhi Banquets & 5-Star Feasts'
  },
  {
    initials: 'CP',
    speciality: 'Vedic Muhurat & Guest Concierge'
  }
];

export default function PhilosophySection() {
  return (
    <section id="philosophy" className="site-section bg-[#F4EFEA] border-t border-[#8C7355]/20">

      <div className="site-container text-center">

        {/* Sacred Heart Monogram */}
        <div className="inline-flex items-center justify-center w-11 h-11 rounded-full bg-white border border-[#8C7355]/30 mb-4 shadow-2xs mx-auto">
          <Heart className="w-5 h-5 text-[#8C7355] fill-[#8C7355]/20" />
        </div>

        <span className="text-[10px] uppercase tracking-[0.28em] text-[#8C7355] font-semibold block mb-2">
          Our Guiding Conviction
        </span>

        {/* Display Statement */}
        <h2 className="font-display text-2xl sm:text-4xl lg:text-5xl text-[#1C1A18] font-normal tracking-tight leading-[1.2] mb-4 max-w-3xl mx-auto">
          "A wedding is not an event to be managed. <br />
          <span className="font-serif italic font-light text-[#8C7355]">It is a sacred covenant to be revered."</span>
        </h2>

        <div className="section-divider mb-4" />

        <p className="section-desc mb-8 max-w-2xl mx-auto text-sm sm:text-base text-[#706860]">
          We shoulder every logistical, architectural, and hospitality detail so you and your family can immerse completely in the sacred rituals.
        </p>

        {/* 3 Spacious, Prestigious Founder Concierge Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto text-left">
          {BRAND_INFO.contacts.map((director, idx) => (
            <div
              key={idx}
              className="p-6 sm:p-7 rounded-2xl bg-white border border-[#8C7355]/25 shadow-xs hover:shadow-xl hover:border-[#8C7355] transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                {/* Monogram Badge + Role */}
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-full border border-[#8C7355]/40 flex items-center justify-center font-serif text-sm font-medium text-[#8C7355] bg-[#FAF7F2] group-hover:bg-[#8C7355] group-hover:text-white transition-colors">
                    {FOUNDER_DETAILS[idx]?.initials || 'SR'}
                  </div>
                  <span className="text-[9px] uppercase tracking-[0.22em] text-[#8C7355] font-semibold px-2.5 py-1 rounded-full bg-[#FAF7F2] border border-[#8C7355]/20">
                    Direct Founder
                  </span>
                </div>

                <span className="text-[10px] uppercase tracking-[0.2em] text-[#706860] font-medium block mb-1">
                  {director.role}
                </span>

                <h4 className="font-serif text-2xl text-[#1C1A18] font-normal mb-1.5 group-hover:text-[#8C7355] transition-colors">
                  {director.name}
                </h4>

                <p className="text-xs text-[#8C7355] font-medium mb-6">
                  {FOUNDER_DETAILS[idx]?.speciality}
                </p>
              </div>

              {/* Action Buttons: Call & WhatsApp */}
              <div className="pt-4 border-t border-[#8C7355]/15 space-y-2.5">
                <a
                  href={`tel:${director.phone}`}
                  className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl border border-[#8C7355]/20 bg-[#FAF7F2] text-xs text-[#1C1A18] hover:bg-[#8C7355] hover:text-white hover:border-[#8C7355] transition-all font-medium"
                >
                  <span className="flex items-center gap-2">
                    <Phone className="w-3.5 h-3.5 text-[#8C7355] group-hover:text-white" />
                    <span>Call Direct</span>
                  </span>
                  <span className="font-mono text-[11px] opacity-90">{director.phoneDisplay}</span>
                </a>

                <a
                  href={`https://wa.me/${director.whatsapp}?text=Hello%20${encodeURIComponent(director.name)},%20I%20am%20inquiring%20about%20our%20upcoming%20wedding%20celebration.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 px-3.5 py-2.5 rounded-xl bg-[#1C1A18] text-[#FAF7F2] hover:bg-[#8C7355] text-xs font-medium tracking-wider transition-all shadow-xs"
                >
                  <MessageSquare className="w-3.5 h-3.5 text-[#C5A880]" />
                  <span>Chat on WhatsApp</span>
                </a>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

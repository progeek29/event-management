import React from 'react';
import { Heart, Phone, MessageSquare } from 'lucide-react';
import { BRAND_INFO } from '../data/initialData';

export default function PhilosophySection() {
  return (
    <section id="philosophy" className="site-section bg-[#F4EFEA] border-t border-[#8C7355]/20">

      <div className="site-container text-center">

        {/* Sacred Heart Monogram */}
        <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-white border border-[#8C7355]/30 mb-6 shadow-2xs mx-auto">
          <Heart className="w-5 h-5 text-[#8C7355] fill-[#8C7355]/20" />
        </div>

        <span className="text-[10px] uppercase tracking-[0.3em] text-[#8C7355] font-semibold block mb-3">
          Our Guiding Conviction
        </span>

        {/* Display Statement */}
        <h2 className="font-display text-2xl sm:text-4xl lg:text-5xl text-[#1C1A18] font-normal tracking-tight leading-[1.2] mb-6 max-w-3xl mx-auto">
          "A wedding is not an event to be managed. <br />
          <span className="font-serif italic font-light text-[#8C7355]">It is a sacred covenant to be revered."</span>
        </h2>

        <div className="section-divider mb-6" />

        <p className="section-desc max-w-2xl mx-auto">
          We shoulder every logistical, architectural, and hospitality detail so you and your family can immerse completely in the sacred rituals.
        </p>

        {/* 3 Symmetrical Founder Stewardship Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl mx-auto mt-10 sm:mt-14">
          {BRAND_INFO.contacts.map((director, idx) => (
            <div
              key={idx}
              className="p-5 sm:p-6 rounded-2xl bg-white border border-[#8C7355]/25 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col items-center justify-between text-center box-border"
            >
              <div className="w-full max-w-full flex flex-col items-center">
                {/* 1. Name: responsive font, wraps to second line, zero overflow */}
                <h4 className="font-serif text-lg sm:text-xl text-[#1C1A18] font-medium leading-snug break-words max-w-full mb-3.5">
                  {director.name}
                </h4>

                {/* 2. Title/Role: 12-16px vertical gap */}
                <span className="text-[10px] uppercase tracking-[0.22em] text-[#8C7355] font-semibold block max-w-full break-words mb-3.5">
                  {director.role}
                </span>

                {/* 3. Phone: 12-16px vertical gap */}
                <a
                  href={`tel:${director.phone}`}
                  className="inline-flex items-center justify-center gap-1.5 text-xs text-[#5C554E] hover:text-[#1C1A18] transition-colors mb-3.5"
                >
                  <Phone className="w-3.5 h-3.5 text-[#8C7355]" />
                  <span>{director.phoneDisplay}</span>
                </a>

                {/* 4. WhatsApp link: 12-16px vertical gap */}
                <a
                  href={`https://wa.me/${director.whatsapp}?text=Hello%20${encodeURIComponent(director.name)},%20I%20am%20inquiring%20about%20a%20wedding.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-1.5 text-xs font-medium text-[#8C7355] hover:text-[#1C1A18] transition-colors"
                >
                  <MessageSquare className="w-3.5 h-3.5 text-[#8C7355]" />
                  <span>WhatsApp</span>
                </a>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

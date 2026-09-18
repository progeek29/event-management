import React from 'react';
import { ArrowRight, MessageSquare, Calendar } from 'lucide-react';
import { BRAND_INFO } from '../data/initialData';

export default function Hero({ onNavigateToReservation }) {
  return (
    <section className="relative w-full min-h-[92vh] flex flex-col justify-between overflow-hidden pt-32 pb-12 bg-[#FAF7F2]">

      {/* Editorial Daylight Photo Background with Gentle Luminance */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-25 pointer-events-none select-none scale-[1.02] transition-transform duration-1000"
        style={{ backgroundImage: `url('/events/moments-become-memories.jpg')` }}
      />

      {/* Soft Light Vignette */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#FAF7F2]/95 via-[#FAF7F2]/70 to-[#FAF7F2] pointer-events-none" />

      {/* Main Centered Editorial Content */}
      <div className="site-container relative z-10 flex-1 flex flex-col items-center justify-center text-center my-auto">

        {/* Subtle Diamond Soulmate Tag */}
        <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full border border-[#8C7355]/30 bg-white/85 backdrop-blur-xs mb-6 shadow-2xs">
          <span className="text-[#8C7355] text-xs">❖</span>
          <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.28em] text-[#706860] font-semibold">
            Found your perfect soulmate?
          </span>
          <span className="text-[#8C7355] text-xs">❖</span>
        </div>

        {/* High-End Editorial Display Headline */}
        <h1 className="font-display text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-normal text-[#1C1A18] tracking-tight leading-[1.08] mb-5">
          The moments that <br />
          <span className="font-serif italic font-light text-[#8C7355]">become memories.</span>
        </h1>

        {/* Minimalist, Poetic Description */}
        <p className="font-sans text-sm sm:text-base md:text-lg text-[#5C554E] font-light max-w-xl leading-relaxed mb-7 mx-auto">
          Marriage is a sacred covenant. We craft serene destination weddings with architectural mandaps, starlit lawns, and 5-star royal catering.
        </p>

        {/* Minimalist Attribute Line with Diamond Separators */}
        <div className="flex items-center justify-center gap-2.5 sm:gap-4 mb-8 text-[10px] sm:text-[11px] uppercase tracking-[0.24em] text-[#8C7355] font-medium">
          <span>Candid</span>
          <span className="text-[#8C7355]/40 text-[9px]">❖</span>
          <span>Cinematic</span>
          <span className="text-[#8C7355]/40 text-[9px]">❖</span>
          <span>Emotional</span>
          <span className="text-[#8C7355]/40 text-[9px]">❖</span>
          <span>Sacred</span>
        </div>

        {/* Symmetrical CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-3.5 items-center justify-center w-full sm:w-auto">
          <button
            onClick={() => onNavigateToReservation && onNavigateToReservation()}
            className="w-full sm:w-auto btn-pill-dark"
          >
            <Calendar className="w-3.5 h-3.5 text-[#C5A880]" />
            <span>Check Auspicious Date</span>
            <ArrowRight className="w-3.5 h-3.5 text-[#C5A880]" />
          </button>

          <a
            href={`https://wa.me/${BRAND_INFO.contacts[0].whatsapp}?text=Hello%20Shree%20Ram%20Events,%20I%20would%20like%20to%20check%20our%20wedding%20date.`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto btn-pill-outline bg-white/80"
          >
            <MessageSquare className="w-3.5 h-3.5 text-[#8C7355]" />
            <span>DM "WEDDING" to Inquire</span>
          </a>
        </div>

      </div>

      {/* Symmetrical Understated Metric Ribbon */}
      <div className="relative z-10 w-full px-4 pt-6 border-t border-[#8C7355]/20 flex flex-wrap justify-center items-center gap-3 sm:gap-6 text-[10px] sm:text-[11px] uppercase tracking-[0.22em] text-[#706860]">
        <span>500+ Ceremonies</span>
        <span className="text-[#8C7355]/40 hidden sm:inline text-[9px]">❖</span>
        <span>Destination Mandap</span>
        <span className="text-[#8C7355]/40 hidden sm:inline text-[9px]">❖</span>
        <span>40,000 Sq.Ft Lawns</span>
        <span className="text-[#8C7355]/40 hidden sm:inline text-[9px]">❖</span>
        <span>Royal Awadhi Feasts</span>
        <span className="text-[#8C7355]/40 hidden sm:inline text-[9px]">❖</span>
        <span>Zero-Stress Hosting</span>
      </div>

    </section>
  );
}

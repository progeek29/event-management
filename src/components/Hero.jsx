import React from 'react';
import { ArrowRight, Calendar } from 'lucide-react';
import { BRAND_INFO } from '../data/initialData';

export default function Hero({ onNavigateToReservation }) {
  return (
    <section className="relative w-full flex flex-col justify-between overflow-hidden pt-4 sm:pt-6 pb-6 sm:pb-8 bg-[#FAF7F2]">

      {/* Editorial Daylight Photo Background with Gentle Luminance */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-25 pointer-events-none select-none scale-[1.02] transition-transform duration-1000"
        style={{ backgroundImage: `url('/events/moments-become-memories.jpg')` }}
      />

      {/* Soft Light Vignette */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#FAF7F2]/95 via-[#FAF7F2]/70 to-[#FAF7F2] pointer-events-none" />

      {/* Main Centered Editorial Content */}
      <div className="site-container relative z-10 flex-1 flex flex-col items-center justify-center text-center my-3 sm:my-5">

        {/* Subtle Diamond Soulmate Tag */}
        <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full border border-[#8C7355]/30 bg-white/85 backdrop-blur-xs mb-5 shadow-2xs">
          <span className="text-[#8C7355] text-xs">❖</span>
          <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.28em] text-[#706860] font-semibold">
            Found your perfect soulmate
          </span>
          <span className="text-[#8C7355] text-xs">❖</span>
        </div>

        {/* High-End Editorial Display Headline */}
        <h1 className="font-display text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-normal text-[#1C1A18] tracking-tight leading-[1.08] mb-4">
          The moments that <br />
          <span className="font-serif italic font-light text-[#8C7355]">become memories.</span>
        </h1>

        {/* Minimalist, Poetic Description */}
        <p className="font-sans text-sm sm:text-base md:text-lg text-[#5C554E] font-light max-w-xl leading-relaxed mb-6 mx-auto">
          Marriage is a sacred covenant. We craft regal wedding celebrations with architectural royal mandaps, exquisite banquets, and 5-star royal catering.
        </p>

        {/* Bespoke Silk Ivory & Gold Foil Royal CTA */}
        <div className="flex flex-col items-center justify-center w-full">
          <button
            onClick={() => onNavigateToReservation && onNavigateToReservation()}
            className="group px-7 sm:px-9 py-3 sm:py-3.5 rounded-full border border-[#C5A880] bg-[#FFFDF9]/95 hover:bg-[#FAF4E6] text-[#2C241B] text-xs uppercase tracking-[0.22em] font-medium inline-flex items-center justify-center gap-2.5 transition-all duration-300 shadow-[0_4px_20px_-4px_rgba(197,168,128,0.28)] hover:shadow-[0_8px_25px_-4px_rgba(197,168,128,0.45)] hover:scale-[1.01] cursor-pointer"
          >
            <Calendar className="w-3.5 h-3.5 text-[#A68352]" />
            <span>Check Auspicious Date</span>
            <ArrowRight className="w-3.5 h-3.5 text-[#A68352] transition-transform duration-300 group-hover:translate-x-1" />
          </button>

          {/* Subtle Direct Conversation Link */}
          <div className="mt-3 sm:mt-3.5 flex items-center justify-center text-center">
            <a
              href={`https://wa.me/${BRAND_INFO.contacts[0].whatsapp}?text=Hello%20Shree%20Ram%20Events,%20I%20would%20like%20to%20check%20our%20wedding%20date.`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#8C7355] hover:text-[#2C241B] font-light text-[11px] sm:text-xs tracking-wide transition-colors underline-offset-4 hover:underline cursor-pointer"
            >
              Prefer a direct conversation?
            </a>
          </div>
        </div>

      </div>

      {/* Symmetrical Understated Metric Ribbon — No Thin Line */}
      <div className="relative z-10 w-full px-4 pt-4 mt-2 flex flex-wrap justify-center items-center gap-3 sm:gap-6 text-[10px] sm:text-[11px] uppercase tracking-[0.22em] text-[#706860]">
        <span>500+ Ceremonies</span>
        <span className="text-[#8C7355]/40 hidden sm:inline text-[9px]">❖</span>
        <span>Royal Mandap Decor</span>
        <span className="text-[#8C7355]/40 hidden sm:inline text-[9px]">❖</span>
        <span>Royal Awadhi Feasts</span>
        <span className="text-[#8C7355]/40 hidden sm:inline text-[9px]">❖</span>
        <span>Zero-Stress Hosting</span>
      </div>

    </section>
  );
}

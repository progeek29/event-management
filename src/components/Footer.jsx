import React from 'react';
import { Phone, Lock, ArrowUp, MessageSquare, Calendar } from 'lucide-react';
import InstagramIcon from './InstagramIcon';
import { BRAND_INFO } from '../data/initialData';

export default function Footer({ onOpenAdmin, onNavigateToReservation }) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#1C1A18] text-[#FAF7F2] border-t border-[#8C7355]/30 pt-16 sm:pt-20 pb-12 relative overflow-hidden w-full font-sans">
      
      {/* Subtle Warm Background Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[250px] bg-[#C5A880]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="site-container relative z-10">

        {/* High-Converting "Get a Quote / Call or WhatsApp" Action Hub */}
        <div className="max-w-3xl mx-auto rounded-3xl bg-[#25221F] border border-[#8C7355]/35 p-7 sm:p-10 text-center shadow-2xl mb-14">
          
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-[#8C7355]/40 bg-[#1C1A18] text-[9.5px] uppercase tracking-[0.24em] text-[#C5A880] mb-4">
            <span className="text-[#C5A880]">❖</span>
            <span>Bespoke Consultation & Instant Quote</span>
            <span className="text-[#C5A880]">❖</span>
          </div>

          <h3 className="font-serif text-2xl sm:text-3xl lg:text-4xl text-[#FAF7F2] font-normal mb-3">
            Ready to Plan Your Sacred Union?
          </h3>

          <p className="text-xs sm:text-sm text-[#A39688] font-light max-w-lg mx-auto mb-7 leading-relaxed">
            Speak directly with our founding directors. Get auspicious date availability, bespoke mandap themes, and authentic catering quotes in minutes.
          </p>

          {/* Eye-Candy Action Buttons: Call Now + WhatsApp + Check Date */}
          <div className="flex flex-wrap items-center justify-center gap-3.5">
            
            <a
              href={`tel:${BRAND_INFO.contacts[0].phone}`}
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-[#FAF7F2] text-[#1C1A18] hover:bg-[#C5A880] hover:text-white transition-all text-xs font-semibold uppercase tracking-[0.16em] shadow-md cursor-pointer"
            >
              <Phone className="w-3.5 h-3.5 text-[#8C7355]" />
              <span>Call: {BRAND_INFO.contacts[0].phoneDisplay}</span>
            </a>

            <a
              href={`https://wa.me/${BRAND_INFO.contacts[0].whatsapp}?text=Hello%20Shree%20Ram%20Events,%20I%20would%20like%20to%20get%20a%20quote%20for%20our%20wedding%20celebration.`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-[#25D366] text-white hover:bg-[#20bd5a] transition-all text-xs font-semibold uppercase tracking-[0.16em] shadow-md"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>Chat on WhatsApp</span>
            </a>

            <button
              onClick={() => {
                if (onNavigateToReservation) {
                  onNavigateToReservation();
                } else {
                  const el = document.getElementById('inquire');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full border border-[#8C7355]/60 text-[#C5A880] hover:bg-[#8C7355]/20 hover:text-white transition-all text-xs font-medium uppercase tracking-[0.16em] cursor-pointer"
            >
              <Calendar className="w-3.5 h-3.5 text-[#C5A880]" />
              <span>Check Auspicious Date</span>
            </button>

          </div>

          <div className="pt-5 mt-6 border-t border-[#8C7355]/15 flex flex-wrap items-center justify-center gap-4 text-[11px] text-[#A39688]">
            <span>Founder Managed: Vishal Pratap Singh · Amitab Verma · Chhatrapal</span>
            <span>•</span>
            <span>Bhilai & Raipur, Chhattisgarh</span>
          </div>

        </div>

        {/* Spacious, Elegant Brand Identity Header */}
        <div className="flex flex-col items-center text-center space-y-4 pb-10 border-b border-[#8C7355]/20">
          
          <div className="w-12 h-12 border border-[#8C7355]/60 rounded-full flex items-center justify-center font-serif text-xl italic text-[#C5A880] shadow-lg bg-[#2A2622]">
            SR
          </div>

          <div className="space-y-1">
            <span className="font-serif text-2xl sm:text-3xl font-light tracking-[0.25em] text-[#FAF7F2] block">
              SHREE RAM
            </span>
            <span className="text-[9px] uppercase tracking-[0.32em] text-[#C5A880] block">
              Atelier & Destination Weddings · Chhattisgarh
            </span>
          </div>

          {/* Quick Clean Navigation Strip */}
          <nav className="flex flex-wrap items-center justify-center gap-6 sm:gap-8 pt-2 text-xs uppercase tracking-[0.2em] text-[#FAF7F2]/75">
            <a href="#moments" className="hover:text-[#C5A880] transition-colors">Stories</a>
            <a href="#venues" className="hover:text-[#C5A880] transition-colors">Venues</a>
            <a href="#culinary" className="hover:text-[#C5A880] transition-colors">Feasts</a>
            <a href="#philosophy" className="hover:text-[#C5A880] transition-colors">Philosophy</a>
            <a href="#inquire" className="hover:text-[#C5A880] transition-colors">Inquire</a>
            <a
              href={BRAND_INFO.instagram.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-[#C5A880] hover:text-white transition-colors lowercase tracking-normal"
            >
              <InstagramIcon className="w-3.5 h-3.5" />
              <span>{BRAND_INFO.instagram.handle}</span>
            </a>
          </nav>

        </div>

        {/* Bottom Bar: Reverence Invocation & Admin */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-[#A39688]">
          <div className="flex items-center gap-2 font-serif text-sm text-[#C5A880]">
            <span>{BRAND_INFO.sacredInvocation}</span>
            <span>•</span>
            <span className="text-xs font-sans text-[#A39688]">
              Crafted with reverence for sacred unions · All Rights Reserved
            </span>
          </div>

          <div className="flex items-center gap-5">
            <button
              onClick={onOpenAdmin}
              className="flex items-center gap-1 text-[#A39688] hover:text-[#C5A880] transition-colors cursor-pointer text-[10px] uppercase tracking-wider"
              title="Confidential Admin Dashboard"
            >
              <Lock className="w-3 h-3 text-[#C5A880]" />
              <span>Admin Vault</span>
            </button>
            
            <button
              onClick={scrollToTop}
              className="w-8 h-8 rounded-full border border-[#8C7355]/40 flex items-center justify-center text-[#C5A880] hover:bg-[#8C7355] hover:text-white transition-colors cursor-pointer"
              title="Return to top"
            >
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
}

import React from 'react';
import { Sparkles, ArrowRight, ShieldCheck, MessageSquare } from 'lucide-react';
import { BRAND_INFO } from '../data/initialData';

export default function ReservationCalloutBanner({ onNavigateToReservation }) {
  return (
    <section id="inquire" className="py-24 sm:py-32 bg-[#FAF7F2] relative w-full border-t border-[#8C7355]/20 font-sans">
      <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Luxury Indian Wedding Card Preview Banner */}
        <div className="bg-white border border-[#8C7355]/40 rounded-3xl p-8 sm:p-14 shadow-lg relative overflow-hidden text-center text-[#221F1C]">
          
          {/* Subtle Corner Accents */}
          <div className="absolute top-4 left-4 w-4 h-4 border-t border-l border-[#8C7355]" />
          <div className="absolute top-4 right-4 w-4 h-4 border-t border-r border-[#8C7355]" />
          <div className="absolute bottom-4 left-4 w-4 h-4 border-b border-l border-[#8C7355]" />
          <div className="absolute bottom-4 right-4 w-4 h-4 border-b border-r border-[#8C7355]" />

          {/* Sacred Tag */}
          <div className="inline-flex items-center gap-2 text-[10px] sm:text-xs uppercase tracking-[0.24em] text-[#8C7355] font-semibold mb-3">
            <Sparkles className="w-3.5 h-3.5 text-[#8C7355]" />
            <span>Private Atelier Consultation · Auspicious Muhurat</span>
            <Sparkles className="w-3.5 h-3.5 text-[#8C7355]" />
          </div>

          <h2 className="font-display text-3xl sm:text-5xl text-[#221F1C] font-normal tracking-tight mb-4">
            Reserve Your <span className="font-serif italic font-light text-[#8C7355]">Sacred Celebration</span>
          </h2>

          <div className="w-16 h-[1.5px] bg-[#8C7355]/50 mx-auto mb-6" />

          <p className="text-xs sm:text-base text-[#5C554E] font-light max-w-xl mx-auto leading-relaxed mb-8">
            Experience bespoke event architecture crafted with aristocratic dignity. Open our dedicated Royal Farmaan to bestow your celebration dates, auspicious muhurats, and hospitality desires.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => onNavigateToReservation()}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-full text-xs tracking-[0.18em] uppercase font-medium bg-[#221F1C] text-[#FAF7F2] hover:bg-[#8C7355] transition-all duration-300 shadow-md cursor-pointer"
            >
              <span>Open Royal Farmaan Invitation Card</span>
              <ArrowRight className="w-4 h-4 text-[#C5A880]" />
            </button>

            <a
              href={`https://wa.me/${BRAND_INFO.contacts[0].whatsapp}?text=Hello%20Shree%20Ram%20Events,%20I%20would%20like%20to%20inquire%20about%20a%20wedding.`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-4 rounded-full text-xs tracking-[0.16em] uppercase font-medium border border-[#8C7355]/50 text-[#221F1C] hover:bg-[#FAF7F2] transition-all"
            >
              <MessageSquare className="w-4 h-4 text-[#8C7355]" />
              <span>DM on WhatsApp</span>
            </a>
          </div>

          {/* Micro trust markers */}
          <div className="mt-8 pt-6 border-t border-[#8C7355]/15 flex flex-wrap items-center justify-center gap-6 text-[11px] text-[#706860]">
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-[#8C7355]" />
              <span>100% Confidential</span>
            </div>
            <span>•</span>
            <span>Personally Managed by Founders</span>
            <span>•</span>
            <span>Bhilai · Raipur · Chhattisgarh</span>
          </div>

        </div>

      </div>
    </section>
  );
}

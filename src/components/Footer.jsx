import React from 'react';
import { Phone, Lock, ArrowUp } from 'lucide-react';
import InstagramIcon from './InstagramIcon';
import { BRAND_INFO } from '../data/initialData';

export default function Footer({ onOpenAdmin }) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#1C1A18] text-[#FAF7F2] border-t border-[#8C7355]/25 pt-16 pb-10 relative overflow-hidden w-full font-sans">
      <div className="site-container">

        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-[#8C7355]/20">

          {/* Brand Monogram & Philosophy */}
          <div className="md:col-span-5 space-y-3 flex flex-col items-start">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 border border-[#8C7355]/50 rounded-full flex items-center justify-center font-serif text-lg italic text-[#C5A880] shadow-md bg-[#2A2622]">
                SR
              </div>
              <div className="flex flex-col">
                <span className="font-serif text-xl font-light tracking-[0.2em] text-[#FAF7F2] leading-none">
                  SHREE RAM
                </span>
                <span className="text-[8.5px] uppercase tracking-[0.28em] text-[#C5A880] mt-1">
                  Atelier & Destination Weddings · Bhilai
                </span>
              </div>
            </div>
            <p className="text-xs text-[#A39688] font-light leading-relaxed max-w-sm pt-2">
              Based in Bhilai, Chhattisgarh. Creating unforgettable sacred wedding celebrations, royal mandap architectures, and 5-star culinary banquets with serenity and devotion.
            </p>
          </div>

          {/* Quick Navigation */}
          <div className="md:col-span-3 space-y-3">
            <span className="text-[11px] tracking-[0.24em] uppercase text-[#C5A880] block mb-3 font-semibold">
              Portals & Ateliers
            </span>
            <ul className="space-y-2 text-xs tracking-wider text-[#FAF7F2]/80">
              <li>
                <a href="#moments" className="hover:text-[#C5A880] transition-colors">Sacred Stories</a>
              </li>
              <li>
                <a href="#venues" className="hover:text-[#C5A880] transition-colors">Venues & Lawns</a>
              </li>
              <li>
                <a href="#culinary" className="hover:text-[#C5A880] transition-colors">Culinary Feasts</a>
              </li>
              <li>
                <a href="#philosophy" className="hover:text-[#C5A880] transition-colors">Our Conviction</a>
              </li>
              <li>
                <a href="#inquire" className="hover:text-[#C5A880] transition-colors">Check Auspicious Date</a>
              </li>
            </ul>
          </div>

          {/* Direct Concierge Contact */}
          <div className="md:col-span-4 space-y-3">
            <span className="text-[11px] tracking-[0.24em] uppercase text-[#C5A880] block mb-3 font-semibold">
              Founder Contact Lines
            </span>
            <div className="space-y-2 text-xs text-[#FAF7F2]/90">
              {BRAND_INFO.contacts.map((contact, idx) => (
                <div key={idx} className="flex items-center justify-between py-1 border-b border-[#8C7355]/15">
                  <span className="text-[#FAF7F2] font-medium">{contact.name}</span>
                  <a
                    href={`tel:${contact.phone}`}
                    className="text-[#C5A880] hover:text-white transition-colors flex items-center gap-1.5"
                  >
                    <Phone className="w-3 h-3" />
                    <span>{contact.phoneDisplay}</span>
                  </a>
                </div>
              ))}
            </div>

            <div className="pt-2 flex items-center gap-4 text-xs">
              <a
                href={BRAND_INFO.instagram.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-[#C5A880] hover:text-white transition-colors"
              >
                <InstagramIcon className="w-4 h-4" />
                <span>{BRAND_INFO.instagram.handle}</span>
              </a>
            </div>
          </div>

        </div>

        {/* Bottom Bar with Sacred Invocation */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-[#A39688]">
          <div className="flex items-center gap-2 font-serif text-sm text-[#C5A880]">
            <span>{BRAND_INFO.sacredInvocation}</span>
            <span>•</span>
            <span className="text-xs font-sans text-[#A39688]">Made with reverence for sacred unions</span>
          </div>

          <div className="flex items-center gap-6">
            <button
              type="button"
              onClick={onOpenAdmin}
              className="flex items-center gap-1 text-[#A39688] hover:text-[#C5A880] transition-colors cursor-pointer text-[10px] uppercase tracking-wider font-medium"
              title="Open Admin Portal"
            >
              <Lock className="w-3 h-3 text-[#C5A880]" />
              <span>Admin Portal</span>
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

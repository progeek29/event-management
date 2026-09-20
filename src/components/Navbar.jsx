import React, { useState, useEffect } from 'react';
import { Phone, Lock, Menu, X, MessageSquare } from 'lucide-react';
import { BRAND_INFO } from '../data/initialData';

export default function Navbar({ onOpenAdmin, onNavigateToReservation }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Stories', href: '#moments' },
    { label: 'Feasts', href: '#culinary' },
    { label: 'Philosophy', href: '#philosophy' },
    { label: 'Inquire', href: '#inquire' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-500 w-full font-sans">
      {/* Main Masthead Navigation */}
      <nav
        className={`w-full transition-all duration-500 ${isScrolled
            ? 'bg-white/95 backdrop-blur-md py-2.5 sm:py-3.5 border-b border-[#8C7355]/20 shadow-xs'
            : 'bg-[#FAF7F2]/90 backdrop-blur-sm py-3 sm:py-4 border-b border-[#8C7355]/15'
          }`}
      >
        <div className="site-container flex items-center justify-between">

          {/* Brand Wordmark with Crest */}
          <a href="#" className="flex items-center gap-2.5 sm:gap-3.5 group shrink-0">
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full border border-[#8C7355]/50 flex items-center justify-center font-serif text-base sm:text-lg italic text-[#8C7355] bg-white group-hover:bg-[#8C7355] group-hover:text-white transition-all shadow-2xs shrink-0">
              SR
            </div>
            <div className="flex flex-col">
              <span className="font-serif text-lg sm:text-2xl font-light tracking-[0.16em] sm:tracking-[0.2em] text-[#1C1A18] group-hover:text-[#8C7355] transition-colors leading-none">
                SHREE RAM
              </span>
              <span className="hidden sm:block text-[8.5px] sm:text-[9.5px] uppercase tracking-[0.24em] text-[#706860] mt-1 whitespace-nowrap">
                Royal Celebrations · Bhilai
              </span>
              <span className="sm:hidden text-[7.5px] uppercase tracking-[0.2em] text-[#8C7355] mt-0.5 font-medium whitespace-nowrap">
                Royal Celebrations · Bhilai
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center gap-8 lg:gap-10">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-xs uppercase tracking-[0.24em] text-[#4A443E] hover:text-[#8C7355] transition-colors font-medium relative py-1"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Right Actions */}
          <div className="hidden md:flex items-center gap-4">
            <a
              href={`https://wa.me/${BRAND_INFO.contacts[0].whatsapp}?text=Hello%20Shree%20Ram%20Events,%20I%20would%20like%20to%20check%20our%20wedding%20date%20availability.`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#8C7355]/40 text-[#1C1A18] hover:bg-[#8C7355]/10 text-xs font-medium tracking-wider transition-all"
            >
              <MessageSquare className="w-3.5 h-3.5 text-[#8C7355]" />
              <span>WhatsApp</span>
            </a>

            <button
              onClick={() => onNavigateToReservation()}
              className="px-6 py-2.5 rounded-full bg-[#1C1A18] text-[#FAF7F2] text-xs uppercase tracking-[0.2em] font-semibold hover:bg-[#8C7355] transition-all cursor-pointer shadow-xs active:scale-95"
            >
              Check Date
            </button>
          </div>

          {/* Mobile Menu Button — Clean & Spacious */}
          <div className="flex md:hidden items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-[#1C1A18] hover:text-[#8C7355] focus:outline-none cursor-pointer rounded-lg active:scale-95 transition-all"
              aria-label="Toggle navigation"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>

        {/* Mobile Dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-[#FAF7F2] border-b border-[#8C7355]/25 px-6 py-6 space-y-4 shadow-xl animate-in fade-in duration-200">
            <div className="flex flex-col space-y-3">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-xs uppercase tracking-[0.22em] text-[#1C1A18] hover:text-[#8C7355] py-2 border-b border-[#8C7355]/15 font-medium"
                >
                  {link.label}
                </a>
              ))}
            </div>

            <div className="pt-2 flex flex-col gap-3">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onNavigateToReservation();
                }}
                className="w-full py-3 rounded-full bg-[#1C1A18] text-white text-xs uppercase tracking-widest font-semibold text-center cursor-pointer hover:bg-[#8C7355] transition-all"
              >
                Check Auspicious Date / Farmaan
              </button>

              <a
                href={`https://wa.me/${BRAND_INFO.contacts[0].whatsapp}?text=Hello%20Shree%20Ram%20Events,%20I%20would%20like%20to%20check%20availability.`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 rounded-full border border-[#8C7355]/40 text-[#1C1A18] text-xs font-medium tracking-wider flex items-center justify-center gap-2"
              >
                <MessageSquare className="w-3.5 h-3.5 text-[#8C7355]" />
                <span>DM on WhatsApp</span>
              </a>

              <div className="pt-2 flex items-center justify-between text-xs text-[#706860]">
                <a href={`tel:${BRAND_INFO.contacts[0].phone}`} className="flex items-center gap-1.5 text-[#1C1A18]">
                  <Phone className="w-3 h-3 text-[#8C7355]" />
                  <span>{BRAND_INFO.contacts[0].phoneDisplay}</span>
                </a>
                <button
                  type="button"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenAdmin();
                  }}
                  className="flex items-center gap-1.5 text-[#A39688] hover:text-[#C5A880] cursor-pointer"
                  title="Open Admin Portal"
                >
                  <Lock className="w-3 h-3 text-[#8C7355]" />
                  <span>Admin Portal</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}

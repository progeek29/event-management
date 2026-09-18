import React from 'react';
import { MessageSquare } from 'lucide-react';
import { BRAND_INFO } from '../data/initialData';

const FEAST_HIGHLIGHTS = [
  {
    title: 'Pure-Ghee Traditional Sweets',
    titleHi: 'शुद्ध देशी घी की शाही मिठाइयाँ',
    desc: 'Artisanal Bilona cow-ghee confections, saffron Ghevar & warm Gulab Jamun.',
    tag: 'Artisanal Sweets'
  },
  {
    title: 'Live Banarasi Chaat Bazaar',
    titleHi: 'लाइव बनारसी चाट स्ट्रीट',
    desc: 'Crisp Palak Patta & clay-kulhad Tamatar chaat bursting with authentic aromas.',
    tag: 'Interactive Counters'
  },
  {
    title: 'The Awadhi Shahi Dawat',
    titleHi: 'शाही अवधी दस्तरख़्वान',
    desc: 'Slow charcoal dum biryanis, overnight Dal Bukhara & fresh tandoor breads.',
    tag: '5-Star Royal Banquet'
  },
  {
    title: 'Global Interactive Counters',
    titleHi: 'ग्लोबल वोक एवं कॉन्टिनेंटल बार्स',
    desc: 'Wood-fired sourdough pizzas, live oriental noodle bowls & artisanal mocktails.',
    tag: 'World Flavors'
  }
];

export default function CulinarySection({ onNavigateToReservation }) {
  return (
    <section id="culinary" className="site-section bg-[#F4EFEA] text-[#1C1A18] border-t border-[#8C7355]/20">

      <div className="site-container">

        {/* Symmetrical Centered Header */}
        <div className="section-header-centered">
          <div className="section-tag border-[#8C7355]/30 bg-white/80 text-[#8C7355]">
            <span className="text-[#8C7355] text-xs">❖</span>
            <span>The Royal Culinary Banquet</span>
            <span className="text-[#8C7355] text-xs">❖</span>
          </div>

          <h2 className="section-title text-[#1C1A18]">
            Food Is the Soul of <br />
            <span className="font-serif italic font-light text-[#8C7355]">Indian Wedding Hospitality</span>
          </h2>

          <div className="section-divider bg-[#8C7355]" />

          <p className="section-desc text-[#706860]">
            Seasoned Awadhi ustaads, pure-ghee heritage confections, and theatrical live food counters.
          </p>
        </div>

        {/* 2-Column Split: Image on Left + 4 Concise Cards on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 items-center">

          {/* Left Column: Fixed Aspect Ratio Visual Frame */}
          <div className="lg:col-span-6">
            <div className="relative rounded-3xl overflow-hidden border border-[#8C7355]/25 shadow-xl bg-white h-[440px] sm:h-[480px]">
              <img
                src="https://images.unsplash.com/photo-1555244162-803834f70033?q=80&w=1200&auto=format&fit=crop"
                alt="Royal Awadhi banquet feast"
                className="w-full h-full object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

              <div className="absolute bottom-6 left-6 right-6 text-white p-5 rounded-2xl bg-black/70 backdrop-blur-md border border-white/20">
                <span className="text-[9px] uppercase tracking-[0.24em] text-[#C5A880] font-semibold block mb-1">
                  100% Hygiene Audited · Shuddh Desi Ghee
                </span>
                <h4 className="font-serif text-xl text-[#FAF7F2] font-normal">
                  "The taste that lingers long after the celebrations end."
                </h4>
              </div>
            </div>
          </div>

          {/* Right Column: 4 Minimalist Offering Cards */}
          <div className="lg:col-span-6 space-y-3.5">
            {FEAST_HIGHLIGHTS.map((item, idx) => (
              <div
                key={idx}
                className="p-5 rounded-2xl bg-white border border-[#8C7355]/20 hover:border-[#8C7355]/60 transition-all duration-300 shadow-2xs text-left group"
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-[9px] uppercase tracking-[0.22em] text-[#8C7355] font-semibold">
                    {item.tag}
                  </span>
                  <span className="text-xs font-mono text-[#8C7355]/50">
                    0{idx + 1}
                  </span>
                </div>

                <h4 className="font-serif text-lg text-[#1C1A18] font-normal mb-0.5 group-hover:text-[#8C7355] transition-colors">
                  {item.title}
                </h4>
                {item.titleHi && (
                  <p className="text-xs text-[#8C7355] font-medium mb-1.5">
                    {item.titleHi}
                  </p>
                )}

                <p className="text-xs text-[#6E665E] font-light leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}

            {/* Action Buttons */}
            <div className="pt-3 flex flex-col sm:flex-row items-center gap-3">
              <button
                onClick={() => onNavigateToReservation && onNavigateToReservation('Catering & Royal Feasts')}
                className="btn-pill-dark w-full sm:w-auto cursor-pointer"
              >
                <span>Customize Wedding Menu</span>
              </button>

              <a
                href={`https://wa.me/${BRAND_INFO.contacts[1].whatsapp}?text=Hello%20Amitab%20ji,%20I%20would%20like%20to%20discuss%20catering%20for%20our%20wedding.`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-pill-outline w-full sm:w-auto bg-white/80"
              >
                <MessageSquare className="w-3.5 h-3.5 text-[#8C7355]" />
                <span>Chat with Culinary Lead</span>
              </a>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}

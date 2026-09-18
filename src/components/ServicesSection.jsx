import React from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';

export default function ServicesSection({ services, onOpenServicePage }) {
  return (
    <section id="services" className="w-full bg-[#FAF7F2] py-24 sm:py-32 px-4 sm:px-8 md:px-12 border-t border-[#8C7355]/20 font-sans">
      <div className="max-w-7xl mx-auto">

        {/* Header Block — Elite Minimalist Editorial */}
        <div className="mb-16 sm:mb-20 text-center md:text-left flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-[#8C7355]/25 bg-white/60 mb-3">
              <Sparkles className="w-3 h-3 text-[#8C7355]" />
              <span className="text-[10px] uppercase tracking-[0.25em] text-[#706860] font-semibold">
                Curated Collections • शाही संकलन
              </span>
            </div>
            <h2 className="font-display text-3xl sm:text-5xl lg:text-6xl font-normal text-[#221F1C] tracking-tight leading-tight">
              Bespoke Destination <br />
              <span className="font-serif italic font-light text-[#8C7355]">Wedding Architecture</span>
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-[#706860] font-light max-w-md leading-relaxed">
            Everything you need for an unforgettable celebration under one roof — spacious venues, royal mandaps, five-star catering, and zero-stress on-ground management.
          </p>
        </div>

        {/* Clean, Non-Cluttered Grid ("No Khichdi") */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((item, index) => (
            <div
              key={item.id}
              onClick={() => onOpenServicePage && onOpenServicePage(item)}
              className="group bg-white rounded-2xl p-4 border border-[#8C7355]/20 hover:border-[#8C7355]/60 shadow-xs hover:shadow-xl transition-all duration-400 cursor-pointer flex flex-col justify-between"
            >
              {/* Image Container with Subtle Zoom */}
              <div className="w-full aspect-[4/3] rounded-xl overflow-hidden relative bg-[#F4EFEA] flex-shrink-0">
                <span className="absolute top-3 left-3 z-10 bg-[#221F1C]/80 text-[#FAF7F2] font-mono text-[9px] px-2.5 py-1 rounded-full backdrop-blur-xs tracking-widest uppercase font-medium">
                  {item.number ? `Plate #${item.number}` : `0${index + 1}`}
                </span>
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-600 ease-out"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-60 group-hover:opacity-30 transition-opacity" />
              </div>

              {/* Text Meta */}
              <div className="pt-5 pb-2 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-serif text-2xl text-[#221F1C] font-normal tracking-wide group-hover:text-[#8C7355] transition-colors leading-snug">
                    {item.title}
                  </h3>
                  {item.titleHi && (
                    <span className="text-[11px] font-sans text-[#8C7355] font-medium block mt-0.5">
                      {item.titleHi}
                    </span>
                  )}
                  <p className="text-xs text-[#706860] font-light mt-2 line-clamp-2 leading-relaxed">
                    {item.subtitle || item.description}
                  </p>
                </div>

                {/* Features Pill Summary */}
                <div className="pt-4 mt-3 border-t border-[#8C7355]/15 flex items-center justify-between text-[11px] uppercase tracking-[0.16em] font-medium text-[#8C7355] group-hover:text-[#221F1C] transition-colors">
                  <span>Explore Atelier</span>
                  <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1.5 transition-transform" />
                </div>
              </div>

            </div>
          ))}
        </div>

        {/* Destination Venue Features Callout (Inspired by destinationweddingvenue.co) */}
        <div className="mt-16 sm:mt-24 p-8 sm:p-12 rounded-3xl bg-[#F4EFEA] border border-[#8C7355]/25 shadow-xs">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 divide-y md:divide-y-0 md:divide-x divide-[#8C7355]/20">

            <div className="pt-4 md:pt-0 md:pr-6">
              <span className="font-serif text-3xl sm:text-4xl text-[#221F1C] font-normal block mb-1">
                3+
              </span>
              <h4 className="font-serif text-lg text-[#8C7355] font-medium mb-1">
                Luxury Banquet Halls
              </h4>
              <p className="text-xs text-[#706860] font-light leading-relaxed">
                Opulent indoor grand ballrooms with crystal chandeliers & acoustic clarity.
              </p>
            </div>

            <div className="pt-4 md:pt-0 md:px-6">
              <span className="font-serif text-3xl sm:text-4xl text-[#221F1C] font-normal block mb-1">
                40,000+
              </span>
              <h4 className="font-serif text-lg text-[#8C7355] font-medium mb-1">
                Sq.Ft Lush Green Lawns
              </h4>
              <p className="text-xs text-[#706860] font-light leading-relaxed">
                Expansive open-air grounds under starry skies for grand pheras and receptions.
              </p>
            </div>

            <div className="pt-4 md:pt-0 md:px-6">
              <span className="font-serif text-3xl sm:text-4xl text-[#221F1C] font-normal block mb-1">
                100%
              </span>
              <h4 className="font-serif text-lg text-[#8C7355] font-medium mb-1">
                Pure Awadhi Feasts
              </h4>
              <p className="text-xs text-[#706860] font-light leading-relaxed">
                Live Banarasi chaat street, traditional pure-ghee mithai & continental bars.
              </p>
            </div>

            <div className="pt-4 md:pt-0 md:pl-6">
              <span className="font-serif text-3xl sm:text-4xl text-[#221F1C] font-normal block mb-1">
                Zero
              </span>
              <h4 className="font-serif text-lg text-[#8C7355] font-medium mb-1">
                Hosting Stress
              </h4>
              <p className="text-xs text-[#706860] font-light leading-relaxed">
                Dedicated captains manage guest hospitality, logistics, and ritual timing.
              </p>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}

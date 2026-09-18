import React from 'react';
import { Phone, MessageSquare, Heart } from 'lucide-react';
import { BRAND_INFO } from '../data/initialData';

export default function AboutSection() {
  return (
    <section id="about" className="py-24 sm:py-32 bg-[#FAF7F2] border-t border-[#8C7355]/20 relative w-full font-sans">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Editorial Split Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Visual with Mughal Arch silhouette */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              <div className="rounded-2xl overflow-hidden border border-[#8C7355]/30 shadow-lg bg-[#221F1C]">
                <img
                  src="/events/laughter-chaos-love.jpg"
                  alt="Family warmth and laughter at wedding"
                  className="w-full h-[460px] object-cover hover:scale-103 transition-transform duration-700"
                />
              </div>
              
              {/* Floating Heritage Badge */}
              <div className="absolute -bottom-6 -right-3 sm:right-4 bg-white border border-[#8C7355]/40 text-[#221F1C] p-5 rounded-2xl shadow-xl max-w-[240px]">
                <span className="font-serif text-3xl font-bold text-[#8C7355] block">10+ Years</span>
                <span className="text-[10px] tracking-wider uppercase text-[#706860] font-medium leading-tight block mt-1">
                  Crafting Sacred Memories across Bhilai, Raipur & Chhattisgarh
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Editorial Narrative & Team */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-[#8C7355]/25 bg-white/60 mb-3 w-fit">
              <Heart className="w-3 h-3 text-[#8C7355] fill-[#8C7355]/20" />
              <span className="text-[10px] tracking-[0.24em] uppercase text-[#706860] font-semibold">
                Our Sacred Philosophy
              </span>
            </div>

            <h2 className="font-display text-3xl sm:text-5xl text-[#221F1C] font-normal tracking-tight mb-5 leading-tight">
              Where Sacred Vows Meet <br />
              <span className="font-serif italic font-light text-[#8C7355]">Flawless Hospitality</span>
            </h2>

            <div className="w-16 h-[1.5px] bg-[#8C7355]/50 mb-6" />

            <p className="text-sm sm:text-base text-[#5C554E] font-light leading-relaxed mb-5">
              We believe a wedding is not a chaotic checklist of vendor tasks — it is the most sacred covenant two human beings will ever make. It is the laughter of parents holding back tears, the spontaneous twirl of a bride in her lehenga, and the fragrance of marigold and pure ghee filling the air.
            </p>

            <p className="text-sm sm:text-base text-[#5C554E] font-light leading-relaxed mb-8">
              Based in Bhilai and orchestrating grand celebrations across Chhattisgarh, <strong className="text-[#221F1C] font-medium">Shree Ram Events</strong> is stewarded personally by Vishal Pratap Singh, Amitab Verma, and Chhatrapal. We take away all hosting anxiety so your family can simply immerse in love.
            </p>

            {/* The 3 Leadership Contact Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-[#8C7355]/20">
              {BRAND_INFO.contacts.map((director, idx) => (
                <div key={idx} className="p-4 rounded-xl border border-[#8C7355]/25 bg-white hover:border-[#8C7355] transition-all shadow-2xs">
                  <span className="text-[9px] tracking-[0.2em] uppercase text-[#8C7355] block mb-1 font-semibold">
                    {director.role}
                  </span>
                  <h4 className="font-serif text-base text-[#221F1C] font-semibold mb-2">
                    {director.name}
                  </h4>
                  <div className="flex flex-col gap-1.5 text-xs text-[#706860]">
                    <a
                      href={`tel:${director.phone}`}
                      className="inline-flex items-center gap-1.5 hover:text-[#221F1C] transition-colors"
                    >
                      <Phone className="w-3 h-3 text-[#8C7355]" />
                      <span>{director.phoneDisplay}</span>
                    </a>
                    <a
                      href={`https://wa.me/${director.whatsapp}?text=Hello%20${encodeURIComponent(director.name)},%20I%20am%20inquiring%20about%20a%20wedding.`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 hover:text-[#221F1C] transition-colors text-[11px] text-[#8C7355] font-medium"
                    >
                      <MessageSquare className="w-3 h-3 text-[#8C7355]" />
                      <span>Chat on WhatsApp</span>
                    </a>
                  </div>
                </div>
              ))}
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}

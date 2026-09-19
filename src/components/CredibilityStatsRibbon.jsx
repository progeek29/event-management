import React from 'react';

export default function CredibilityStatsRibbon() {
  return (
    <section className="w-full bg-[#FAF7F2] py-4 sm:py-6">
      <div className="site-container">
        {/* Symmetrical Luxury Stats Ribbon */}
        <div className="bg-white border border-[#8C7355]/22 rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-[0_4px_25px_rgba(28,26,24,0.03)]">

          {/* Featured Venue Transformation Quote */}
          <div className="text-center max-w-3xl mx-auto mb-6 sm:mb-8 pb-5 sm:pb-6 border-b border-[#8C7355]/20">
            <div className="inline-flex items-center gap-2 text-[10px] sm:text-[11px] uppercase tracking-[0.26em] text-[#8C7355] font-semibold mb-2.5">
              <span>❖</span>
              <span>Your Chosen Venue · Any Lawn Or Banquet</span>
              <span>❖</span>
            </div>
            
            <p className="font-serif text-base sm:text-xl lg:text-[22px] italic text-[#1C1A18] leading-relaxed font-normal">
              “Whether an expansive starlit lawn or a grand banquet hall — we transform your chosen venue with majestic mandap architecture, 5-star Awadhi royal catering, and flawless on-ground execution.”
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 text-center divide-y sm:divide-y-0 sm:divide-x divide-[#8C7355]/20">

            {/* Metric 1: Royal Celebrations Managed */}
            <div className="pt-3 sm:pt-0 sm:pr-4">
              <span className="font-display text-3xl sm:text-4xl lg:text-5xl text-[#1C1A18] block mb-1">
                500+
              </span>
              <h4 className="text-[10px] sm:text-[11px] uppercase tracking-[0.2em] text-[#8C7355] font-semibold mb-1">
                Royal Celebrations
              </h4>
              <p className="text-xs text-[#706860] font-light">
                Bespoke weddings & milestone soirées.
              </p>
            </div>

            {/* Metric 2: Guest Capacity */}
            <div className="pt-3 sm:pt-0 sm:px-4">
              <span className="font-display text-3xl sm:text-4xl lg:text-5xl text-[#1C1A18] block mb-1">
                2,000+
              </span>
              <h4 className="text-[10px] sm:text-[11px] uppercase tracking-[0.2em] text-[#8C7355] font-semibold mb-1">
                Guest Banquet Capacity
              </h4>
              <p className="text-xs text-[#706860] font-light">
                Grand starlit lawns & royal feast halls.
              </p>
            </div>

            {/* Metric 3: Real Pedigree (3-4 Years) */}
            <div className="pt-3 sm:pt-0 sm:px-4">
              <span className="font-display text-3xl sm:text-4xl lg:text-5xl text-[#1C1A18] block mb-1">
                4+
              </span>
              <h4 className="text-[10px] sm:text-[11px] uppercase tracking-[0.2em] text-[#8C7355] font-semibold mb-1">
                Years Proven Pedigree
              </h4>
              <p className="text-xs text-[#706860] font-light">
                Years of flawless on-ground event mastery.
              </p>
            </div>

            {/* Metric 4: 100% Zero-Stress Hosting */}
            <div className="pt-3 sm:pt-0 sm:pl-4">
              <span className="font-display text-3xl sm:text-4xl lg:text-5xl text-[#1C1A18] block mb-1">
                100%
              </span>
              <h4 className="text-[10px] sm:text-[11px] uppercase tracking-[0.2em] text-[#8C7355] font-semibold mb-1">
                Zero-Stress Hosting
              </h4>
              <p className="text-xs text-[#706860] font-light">
                Personal founder supervision throughout.
              </p>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}

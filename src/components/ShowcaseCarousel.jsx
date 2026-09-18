import React, { useState, useRef } from 'react';
import { ChevronLeft, ChevronRight, MapPin, Users, Sparkles, X, ArrowUpRight, MessageSquare } from 'lucide-react';
import { SHOWCASE_PORTFOLIO, BRAND_INFO } from '../data/initialData';

export default function ShowcaseCarousel({ onSelectOccasion }) {
  const scrollContainerRef = useRef(null);
  const [selectedFilter, setSelectedFilter] = useState('All');
  const [activeItem, setActiveItem] = useState(null);

  const categories = ['All', 'Weddings', 'Engagement', 'Parties', 'Corporate', 'Catering'];

  const filteredItems = selectedFilter === 'All' 
    ? SHOWCASE_PORTFOLIO 
    : SHOWCASE_PORTFOLIO.filter(item => item.category.toLowerCase() === selectedFilter.toLowerCase());

  const scroll = (direction) => {
    if (scrollContainerRef.current) {
      const scrollAmount = direction === 'left' ? -420 : 420;
      scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  const handleInquireFromModal = (themeTitle) => {
    setActiveItem(null);
    if (onSelectOccasion) {
      onSelectOccasion(themeTitle);
    }
    const elem = document.getElementById('inquire');
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="portfolio" className="py-24 sm:py-32 bg-[#FAF7F2] border-t border-[#8C7355]/20 relative overflow-hidden w-full font-sans">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Header & Carousel Controls */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
          <div>
            <div className="flex items-center gap-2 mb-2.5">
              <span className="text-[10px] tracking-[0.26em] uppercase text-[#8C7355] font-semibold">
                Volume I — Curated Archives
              </span>
              <span className="text-[#8C7355]/40">•</span>
              <span className="text-[10px] tracking-[0.2em] uppercase text-[#706860]">
                Past Celebrations
              </span>
            </div>
            <h2 className="font-display text-3xl sm:text-5xl lg:text-6xl text-[#221F1C] font-normal tracking-tight">
              Selected Celebrations & <span className="font-serif italic font-light text-[#8C7355]">Estates</span>
            </h2>
          </div>

          {/* Carousel Control Arrows */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => scroll('left')}
              className="w-11 h-11 rounded-full border border-[#8C7355]/40 flex items-center justify-center text-[#221F1C] hover:bg-[#221F1C] hover:text-white transition-all cursor-pointer shadow-2xs"
              aria-label="Scroll left"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => scroll('right')}
              className="w-11 h-11 rounded-full border border-[#8C7355]/40 flex items-center justify-center text-[#221F1C] hover:bg-[#221F1C] hover:text-white transition-all cursor-pointer shadow-2xs"
              aria-label="Scroll right"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Category Filters */}
        <div className="flex items-center gap-2.5 overflow-x-auto no-scrollbar pb-6 mb-4 text-xs tracking-[0.16em] uppercase">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedFilter(cat)}
              className={`px-5 py-2 rounded-full transition-all cursor-pointer whitespace-nowrap font-medium ${
                selectedFilter === cat
                  ? 'bg-[#221F1C] text-[#FAF7F2] shadow-xs'
                  : 'text-[#706860] border border-[#8C7355]/30 hover:border-[#221F1C] bg-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Horizontal Carousel Track */}
        <div 
          ref={scrollContainerRef}
          className="flex gap-7 overflow-x-auto no-scrollbar pb-8 snap-x snap-mandatory scroll-smooth"
        >
          {filteredItems.map((item, idx) => (
            <div
              key={item.id}
              onClick={() => setActiveItem(item)}
              className="min-w-[320px] sm:min-w-[400px] lg:min-w-[440px] flex-shrink-0 snap-start rounded-2xl overflow-hidden bg-white border border-[#8C7355]/20 shadow-xs group transition-all duration-400 hover:border-[#8C7355] hover:shadow-xl cursor-pointer flex flex-col justify-between"
            >
              {/* Image Container with Editorial Plate Number */}
              <div className="relative h-64 sm:h-72 w-full overflow-hidden bg-[#221F1C]">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60" />
                
                {/* Plate Index Number */}
                <div className="absolute top-3 left-3">
                  <span className="text-[9px] font-mono tracking-widest text-white bg-[#221F1C]/80 backdrop-blur-xs px-2.5 py-1 rounded-full border border-white/20 shadow-xs">
                    PLATE {String(idx + 1).padStart(2, '0')}
                  </span>
                </div>

                {/* Category Pill */}
                <div className="absolute top-3 right-3">
                  <span className="text-[9px] tracking-[0.18em] uppercase text-white bg-[#221F1C]/75 backdrop-blur-xs px-3 py-1 rounded-full border border-white/20">
                    {item.category}
                  </span>
                </div>
              </div>

              {/* Card Details */}
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-serif text-2xl text-[#221F1C] font-normal tracking-tight mb-2 group-hover:text-[#8C7355] transition-colors">
                    {item.title}
                  </h3>
                  
                  <p className="text-xs sm:text-sm text-[#706860] font-light leading-relaxed mb-5 line-clamp-2">
                    {item.details}
                  </p>
                </div>

                {/* Metadata Tags */}
                <div className="pt-4 border-t border-[#8C7355]/15 flex flex-wrap items-center gap-2 text-[11px] text-[#706860]">
                  <span className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-[#FAF7F2] border border-[#8C7355]/20">
                    <MapPin className="w-3 h-3 text-[#8C7355]" />
                    {item.location}
                  </span>
                  
                  <span className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-[#FAF7F2] border border-[#8C7355]/20">
                    <Sparkles className="w-3 h-3 text-[#8C7355]" />
                    {item.theme}
                  </span>

                  <span className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-[#FAF7F2] border border-[#8C7355]/20">
                    <Users className="w-3 h-3 text-[#8C7355]" />
                    {item.guestSize}
                  </span>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>

      {/* High-Resolution Lightbox Modal */}
      {activeItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md">
          <div className="bg-[#FAF7F2] border border-[#8C7355]/40 rounded-3xl max-w-2xl w-full overflow-hidden shadow-2xl relative flex flex-col text-[#221F1C] max-h-[90vh]">
            
            {/* Close Button */}
            <button
              onClick={() => setActiveItem(null)}
              className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-[#221F1C] text-white hover:bg-[#8C7355] flex items-center justify-center transition-colors shadow-md cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Image */}
            <div className="relative h-64 sm:h-80 w-full overflow-hidden bg-[#221F1C] flex-shrink-0">
              <img
                src={activeItem.image}
                alt={activeItem.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-6">
                <span className="text-[10px] uppercase tracking-widest px-3 py-1 rounded-full bg-white/90 text-[#221F1C] font-semibold">
                  {activeItem.category}
                </span>
              </div>
            </div>

            {/* Modal Content */}
            <div className="p-6 sm:p-8 overflow-y-auto">
              <h3 className="font-serif text-2xl sm:text-3xl text-[#221F1C] font-normal leading-snug mb-2">
                {activeItem.title}
              </h3>
              
              <div className="flex flex-wrap items-center gap-3 text-xs text-[#8C7355] mb-4">
                <span>{activeItem.location}</span>
                <span>•</span>
                <span>{activeItem.theme}</span>
                <span>•</span>
                <span>{activeItem.guestSize}</span>
              </div>

              <div className="w-12 h-[1px] bg-[#8C7355]/40 mb-4" />

              <p className="text-xs sm:text-sm text-[#5C554E] font-light leading-relaxed mb-6">
                {activeItem.details}
              </p>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 items-center justify-between pt-4 border-t border-[#8C7355]/20">
                <button
                  onClick={() => handleInquireFromModal(activeItem.title)}
                  className="w-full sm:w-auto px-6 py-3 rounded-full bg-[#221F1C] text-[#FAF7F2] text-xs uppercase tracking-widest font-medium hover:bg-[#8C7355] transition-all cursor-pointer flex items-center justify-center gap-2"
                >
                  <span>Inquire for Similar Setup</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-[#C5A880]" />
                </button>

                <a
                  href={`https://wa.me/${BRAND_INFO.contacts[0].whatsapp}?text=Hello%20Shree%20Ram%20Events,%20I%20am%20interested%20in%20${encodeURIComponent(activeItem.title)}.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto px-5 py-3 rounded-full border border-[#8C7355]/40 text-[#221F1C] text-xs font-medium tracking-wider hover:bg-white transition-all flex items-center justify-center gap-2"
                >
                  <MessageSquare className="w-3.5 h-3.5 text-[#8C7355]" />
                  <span>DM on WhatsApp</span>
                </a>
              </div>
            </div>

          </div>
        </div>
      )}

    </section>
  );
}

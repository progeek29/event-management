import React from 'react';
import { ArrowRight } from 'lucide-react';

const VENUES = [
  {
    id: 'venue-1',
    title: 'The Royal Mandap Pavilion',
    titleHi: 'शाही नक्काशीदार मंडप',
    subtitle: 'Sacred Vows Under Floral Canopies',
    image: 'https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=1200&auto=format&fit=crop',
    capacity: 'Up to 2,000 Guests',
    desc: 'Hand-carved pillars, revolving varmala stage & Vedic muhurat captains.'
  },
  {
    id: 'venue-2',
    title: '40,000+ Sq.Ft Emerald Lawns',
    titleHi: 'विशाल हरा-भरा लैंडस्केप लॉन',
    subtitle: 'Under Open Starlit Skies',
    image: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=1200&auto=format&fit=crop',
    capacity: 'Grand Receptions',
    desc: 'Lush manicured landscapes, royal baraat avenue & starlit banquets.'
  },
  {
    id: 'venue-3',
    title: 'The Poolside & Courtyard Atelier',
    titleHi: 'पूलसाइड हल्दी व मेहंदी वेन्यू',
    subtitle: 'Sun-Drenched Celebrations',
    image: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=1200&auto=format&fit=crop',
    capacity: 'Intimate Soirées',
    desc: 'Marigold Haldi gazebos, bohemian lounges & fairy-lit cocktail evenings.'
  }
];

export default function VenuesSection({ onNavigateToReservation, onOpenServicePage }) {
  return (
    <section id="venues" className="site-section bg-[#F4EFEA] border-t border-[#8C7355]/20">

      <div className="site-container">

        {/* Symmetrical Centered Header */}
        <div className="section-header-centered">
          <div className="section-tag">
            <span className="text-[#8C7355] text-xs">❖</span>
            <span>Destination Wedding Estates</span>
            <span className="text-[#8C7355] text-xs">❖</span>
          </div>

          <h2 className="section-title">
            Everything You Need In A <br />
            <span className="font-serif italic font-light text-[#8C7355]">Destination Wedding Venue</span>
          </h2>

          <div className="section-divider" />

          <p className="section-desc">
            Spacious, serene, and effortless. Where royal mandap architecture meets acoustic perfection and warm hospitality.
          </p>
        </div>

        {/* 3 Symmetrical Luxury Cards */}
        <div className="grid-cards-3">
          {VENUES.map((venue) => (
            <div
              key={venue.id}
              className="luxury-card group cursor-pointer"
              onClick={() => {
                if (onOpenServicePage) {
                  onOpenServicePage({
                    id: venue.id,
                    number: "01",
                    title: venue.title,
                    titleHi: venue.titleHi,
                    subtitle: venue.subtitle,
                    description: `${venue.title} - ${venue.desc}`,
                    image: venue.image,
                    features: [venue.desc, venue.capacity]
                  });
                } else if (onNavigateToReservation) {
                  onNavigateToReservation(venue.title);
                }
              }}
            >
              <div>
                <div className="card-media">
                  <img
                    src={venue.image}
                    alt={venue.title}
                    loading="lazy"
                  />
                  <div className="absolute top-3 left-3">
                    <span className="text-[9px] uppercase tracking-[0.2em] px-3 py-1 rounded-full bg-white/95 text-[#1C1A18] font-semibold backdrop-blur-xs shadow-xs">
                      {venue.capacity}
                    </span>
                  </div>
                </div>

                <div className="card-body">
                  <span className="card-tag">{venue.subtitle}</span>
                  <h3 className="card-title">{venue.title}</h3>
                  <p className="card-text">{venue.desc}</p>
                </div>
              </div>

              {/* Tucked Card Footer — Arrow Stays Safely Inside */}
              <div className="card-footer">
                <button
                  type="button"
                  className="card-action-link"
                >
                  <span>Explore Atelier</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#8C7355]" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Symmetrical Stats Ribbon */}
        <div className="stats-ribbon">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 text-center divide-y sm:divide-y-0 sm:divide-x divide-[#8C7355]/20">

            <div className="pt-3 sm:pt-0 sm:pr-4">
              <span className="font-display text-3xl sm:text-4xl text-[#1C1A18] block mb-1">
                125+
              </span>
              <h4 className="text-[10px] uppercase tracking-[0.2em] text-[#8C7355] font-semibold mb-1">
                Luxury Rooms
              </h4>
              <p className="text-xs text-[#706860] font-light">
                Zero travel fatigue for families.
              </p>
            </div>

            <div className="pt-3 sm:pt-0 sm:px-4">
              <span className="font-display text-3xl sm:text-4xl text-[#1C1A18] block mb-1">
                2,000+
              </span>
              <h4 className="text-[10px] uppercase tracking-[0.2em] text-[#8C7355] font-semibold mb-1">
                Guest Capacity
              </h4>
              <p className="text-xs text-[#706860] font-light">
                Grand starlit lawns & AC banquet halls.
              </p>
            </div>

            <div className="pt-3 sm:pt-0 sm:px-4">
              <span className="font-display text-3xl sm:text-4xl text-[#1C1A18] block mb-1">
                10+
              </span>
              <h4 className="text-[10px] uppercase tracking-[0.2em] text-[#8C7355] font-semibold mb-1">
                Years Pedigree
              </h4>
              <p className="text-xs text-[#706860] font-light">
                Over a decade of flawless weddings.
              </p>
            </div>

            <div className="pt-3 sm:pt-0 sm:pl-4">
              <span className="font-display text-3xl sm:text-4xl text-[#1C1A18] block mb-1">
                100%
              </span>
              <h4 className="text-[10px] uppercase tracking-[0.2em] text-[#8C7355] font-semibold mb-1">
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

import React, { useState } from 'react';
import { MessageSquare, ArrowRight, X, Calendar } from 'lucide-react';
import { BRAND_INFO } from '../data/initialData';
import housewarmingImg from '../assets/housewarming_event.jpg';

const PHOTO_STORIES = [
  {
    id: 'story-1',
    theme: 'Sacred Promises',
    title: 'The Moments That Become Memories',
    caption: 'Walking hand in hand into forever under fresh floral canopies.',
    image: '/events/moments-become-memories.jpg',
    dialogue: 'Walking into forever through hand-crafted floral chandeliers. When the world falls quiet, only your sacred covenant remains.'
  },
  {
    id: 'story-2',
    theme: 'Unscripted Magic',
    title: 'The Moments You Never Planned',
    caption: 'Spontaneous bridal twirls, stolen glances, and pure euphoria.',
    image: '/events/unplanned-moments.jpg',
    dialogue: 'The greatest memories are never rehearsed. A spontaneous spin in your lehenga and the unscripted joy between rituals.'
  },
  {
    id: 'story-3',
    theme: 'Living Celebration',
    title: 'The Laughter. The Chaos. The People.',
    caption: 'Flower showers, proud parents, and family love that echoes forever.',
    image: '/events/laughter-chaos-love.jpg',
    dialogue: 'Surrounded by the ones who watched you grow. Joyous applause, tears of pride, and blessings raining down like starlight.'
  },
  {
    id: 'story-4',
    theme: 'Corporate Galas',
    title: 'Executive Summits & Brand Galas',
    caption: 'Immaculate staging, synchronized acoustics, and gourmet banquet hospitality.',
    image: 'https://images.unsplash.com/photo-1511578314322-379afb476865?q=80&w=1200&auto=format&fit=crop',
    dialogue: 'From high-level executive summits to grand corporate anniversary galas in Bhilai, Raipur, and Durg — immaculate staging, synchronized acoustics, and seamless 5-star hospitality.'
  },
  {
    id: 'story-5',
    theme: 'Housewarming Party',
    title: 'Warmth of a Sacred Abode',
    caption: 'Traditional havan setups, auspicious floral doorways, and heartfelt family feasts.',
    image: '/events/housewarming_event.jpg',
    dialogue: 'Blessing your new residence with sacred Vedic rituals, fragrant marigold torans, intimate courtyard seating, and pure celebratory dining.'
  },
  {
    id: 'story-6',
    theme: 'Cinematic Films',
    title: 'Timeless Stories & Emotional Films',
    caption: 'Candid wedding cinematography, aerial drone telecast, and royal heirloom albums.',
    image: '/events/timeless-stories-editorial.jpg',
    dialogue: 'Preserving every tear, whisper, and joyous laugh in 4K cinematic grandeur that will outlive generations.'
  }
];

export default function EditorialStorySection({ services = [], onNavigateToReservation }) {
  const [activeStory, setActiveStory] = useState(null);

  // Map live admin services to the 6 editorial photo stories
  const displayStories = PHOTO_STORIES.map((defaultStory, index) => {
    const srv = services && services[index];
    if (!srv) return defaultStory;
    return {
      ...defaultStory,
      title: srv.title || defaultStory.title,
      theme: srv.subtitle || defaultStory.theme,
      caption: srv.description || defaultStory.caption,
      image: srv.image || defaultStory.image
    };
  });

  const handleWhatsApp = (title) => {
    const text = encodeURIComponent(
      `Hello Shree Ram Events, I was touched by "${title}". I would like to check wedding date availability.`
    );
    window.open(`https://wa.me/${BRAND_INFO.contacts[0].whatsapp}?text=${text}`, '_blank');
  };

  return (
    <section id="moments" className="site-section bg-[#FAF7F2] border-t border-[#8C7355]/20">

      <div className="site-container">

        {/* Symmetrical Centered Header */}
        <div className="section-header-centered">
          <div className="section-tag">
            <span className="text-[#8C7355] text-xs">❖</span>
            <span>The Sacred Monograph</span>
            <span className="text-[#8C7355] text-xs">❖</span>
          </div>

          <h2 className="section-title">
            Marriage Is a Sacred Union. <br />
            <span className="font-serif italic font-light text-[#8C7355]">Cherished Moments of Union.</span>
          </h2>

          <div className="section-divider" />

          <p className="section-desc">
            A wedding is not a chaotic checklist. It is the single most precious milestone of two souls and two families.
          </p>
        </div>

        {/* Row 1: 3 Symmetrical Cards */}
        <div className="grid-cards-3 mb-8">
          {displayStories.slice(0, 3).map((story) => (
            <div
              key={story.id}
              onClick={() => setActiveStory(story)}
              className="luxury-card cursor-pointer group"
            >
              <div>
                <div className="card-media">
                  <img
                    src={story.image}
                    alt={story.title}
                    loading="lazy"
                    onError={(e) => {
                      e.currentTarget.src = housewarmingImg;
                    }}
                  />
                  <div className="absolute top-3 left-3">
                    <span className="text-[9px] uppercase tracking-[0.2em] px-3 py-1 rounded-full bg-white/95 text-[#1C1A18] font-semibold backdrop-blur-xs shadow-xs">
                      {story.theme}
                    </span>
                  </div>
                </div>

                <div className="card-body">
                  <span className="card-tag">{story.theme}</span>
                  <h3 className="card-title">{story.title}</h3>
                  <p className="card-text">{story.caption}</p>
                </div>
              </div>

              {/* Tucked Card Footer — Arrow Stays Safely Inside */}
              <div className="card-footer">
                <button
                  type="button"
                  className="card-action-link"
                >
                  <span>Explore Story</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#8C7355]" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Row 2: 3 Symmetrical Cards */}
        <div className="grid-cards-3">
          {displayStories.slice(3, 6).map((story) => (
            <div
              key={story.id}
              onClick={() => setActiveStory(story)}
              className="luxury-card cursor-pointer group"
            >
              <div>
                <div className="card-media">
                  <img
                    src={story.image}
                    alt={story.title}
                    loading="lazy"
                    onError={(e) => {
                      if (story.id === 'story-5') e.currentTarget.src = housewarmingImg;
                    }}
                  />
                  <div className="absolute top-3 left-3">
                    <span className="text-[9px] uppercase tracking-[0.2em] px-3 py-1 rounded-full bg-white/95 text-[#1C1A18] font-semibold backdrop-blur-xs shadow-xs">
                      {story.theme}
                    </span>
                  </div>
                </div>

                <div className="card-body">
                  <span className="card-tag">{story.theme}</span>
                  <h3 className="card-title">{story.title}</h3>
                  <p className="card-text">{story.caption}</p>
                </div>
              </div>

              {/* Tucked Card Footer — Arrow Stays Safely Inside */}
              <div className="card-footer">
                <button
                  type="button"
                  className="card-action-link"
                >
                  <span>Explore Story</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#8C7355]" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Centered Symmetrical Date Checker Banner */}
        <div className="date-checker-banner">
          <div>
            <span className="text-[10px] uppercase tracking-[0.24em] text-[#8C7355] font-semibold block mb-1">
              Auspicious Dates & Estate Availability
            </span>
            <h4 className="font-display text-xl sm:text-2xl text-[#1C1A18] font-normal">
              Found your perfect soulmate? Let's check your date.
            </h4>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
            <button
              onClick={() => onNavigateToReservation && onNavigateToReservation()}
              className="w-full sm:w-auto btn-pill-dark"
            >
              <Calendar className="w-3.5 h-3.5 text-[#C5A880]" />
              <span>Reserve Date</span>
            </button>
            <a
              href={`https://wa.me/${BRAND_INFO.contacts[0].whatsapp}?text=Hello%20Shree%20Ram%20Events,%20I%20would%20like%20to%20check%20our%20wedding%20date.`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto btn-pill-outline bg-white"
            >
              <MessageSquare className="w-3.5 h-3.5 text-[#8C7355]" />
              <span>WhatsApp</span>
            </a>
          </div>
        </div>

      </div>

      {/* Symmetrical Modal for Full Story */}
      {activeStory && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
          <div className="bg-[#FAF7F2] border border-[#8C7355]/40 rounded-3xl max-w-xl w-full overflow-hidden shadow-2xl relative flex flex-col text-[#1C1A18] animate-in zoom-in-95 duration-200">

            <button
              onClick={() => setActiveStory(null)}
              className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-[#1C1A18] text-white hover:bg-[#8C7355] flex items-center justify-center transition-colors shadow-md cursor-pointer"
              title="Close"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="relative w-full aspect-[16/10] overflow-hidden bg-[#1C1A18] flex-shrink-0">
              <img
                src={activeStory.image}
                alt={activeStory.title}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.currentTarget.src = housewarmingImg;
                }}
              />
              <div className="absolute top-4 left-4">
                <span className="text-[10px] uppercase tracking-[0.22em] px-3.5 py-1 rounded-full bg-white/95 text-[#1C1A18] font-semibold">
                  {activeStory.theme}
                </span>
              </div>
            </div>

            <div className="p-6 sm:p-8">
              <span className="text-[10px] uppercase tracking-[0.24em] text-[#8C7355] font-semibold block mb-1">
                {activeStory.theme}
              </span>
              <h3 className="font-display text-2xl text-[#1C1A18] font-normal leading-snug mb-3">
                {activeStory.title}
              </h3>

              <div className="w-10 h-[1.5px] bg-[#8C7355] mb-4" />

              <p className="font-sans text-xs sm:text-sm text-[#5C554E] font-light leading-relaxed mb-6">
                {activeStory.dialogue}
              </p>

              <div className="flex flex-col sm:flex-row gap-3 items-center justify-between pt-4 border-t border-[#8C7355]/20">
                <button
                  onClick={() => {
                    const title = activeStory.title;
                    setActiveStory(null);
                    if (onNavigateToReservation) onNavigateToReservation(title);
                  }}
                  className="w-full sm:w-auto btn-pill-dark"
                >
                  <Calendar className="w-3.5 h-3.5 text-[#C5A880]" />
                  <span>Check Auspicious Date</span>
                </button>

                <button
                  onClick={() => handleWhatsApp(activeStory.title)}
                  className="w-full sm:w-auto btn-pill-outline"
                >
                  <MessageSquare className="w-3.5 h-3.5 text-[#8C7355]" />
                  <span>DM on WhatsApp</span>
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

    </section>
  );
}

function story_theme_safe(theme) {
  return theme || 'Sacred Celebration';
}

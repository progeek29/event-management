import React, { useState } from 'react';
import { MessageSquare, ArrowRight, X, Calendar, Sparkles, Utensils, Crown, MapPin, Users, CheckCircle2 } from 'lucide-react';
import { BRAND_INFO } from '../data/initialData';
import housewarmingImg from '../assets/housewarming_event.jpg';

const STORY_METADATA = {
  'story-1': {
    occasion: 'Royal Wedding & Mandap Setup',
    tagline: 'The Sacred Covenant & Eternal Pheras',
    narrative: 'A wedding is not a mere event; it is an immortal covenant between two souls and two families. Under bespoke hand-crafted floral canopies, the sacred fire bears witness to your seven sacred vows, bathed in the fragrance of fresh jasmine and the soft radiance of heritage brass lamps.',
    decor: 'Bespoke hand-carved mandap with cascading mogra canopies, antique brass lamps, and floral couple pathways.',
    culinary: 'Royal Awadhi Dastarkhwan, signature shahi paneer, slow-simmered dal makhani, and live dessert counters in pure desi ghee.',
    hospitality: 'Silver platter attar greeting, dedicated family concierge, and synchronized varmala mist & cold pyros.',
    guestCapacity: '300 to 2,000+ Guests',
    duration: 'Full Day & Evening Celebration'
  },
  'story-2': {
    occasion: 'Engagement & Sangeet Gala',
    tagline: 'Pre-Wedding Euphoria & Unscripted Joy',
    narrative: 'The greatest wedding memories are never rehearsed. From spontaneous bridal twirls in shimmering lehengas to cousins dancing until midnight, we engineer an electrifying amphitheater of joy, music, and celebration.',
    decor: 'Concert-grade P2.5 LED backdrop, kinetic beam lighting, mirror dance floors, and themed photo-op installations.',
    culinary: 'Live Banarasi chaat street, gourmet wood-fired pizza counters, artisan mocktail bar, and fusion appetizers.',
    hospitality: 'Choreographed sangeet run-of-show, backstage artist management, and professional audio-visual engineering.',
    guestCapacity: '150 to 800+ Guests',
    duration: 'High-Energy Evening Soirée'
  },
  'story-3': {
    occasion: 'Royal Wedding & Mandap Setup',
    tagline: 'Family Ties, Grand Receptions & Timeless Laughter',
    narrative: 'Weddings are reunions of heart and heritage. From proud tears of parents to flower showers raining down like starlight, we orchestrate hospitality so seamless that the hosts celebrate like royalty without a second of stress.',
    decor: 'Grand royal reception stage, imperial velvet seating lounge, crystal chandeliers, and monumental floral entrance gates.',
    culinary: 'Lavish multi-regional grand buffet featuring live tandoor, authentic regional delicacies, and royal mithai platters.',
    hospitality: 'VIP guest logistics desks, luggage assistance, personalized room hampers, and full guest concierge.',
    guestCapacity: '500 to 3,000+ Guests',
    duration: 'Grand Reception Evening'
  },
  'story-4': {
    occasion: 'Corporate & Theme Galas',
    tagline: 'Executive Summits & Prestigious Brand Galas',
    narrative: 'When steel industry pioneers, executive delegations, and brand leaders assemble in Chhattisgarh, precision and stature are non-negotiable. We deliver flawless acoustic clarity, commanding stage aesthetics, and five-star culinary hospitality.',
    decor: 'Immaculate executive stage architecture, digital podiums, synchronized acoustics, and branded networking lounges.',
    culinary: 'Five-star executive seated dinners, continental lunch buffets, live artisan coffee bar, and gourmet high-tea.',
    hospitality: 'Delegate check-in registration desks, green room VIP logistics, and professional teleprompter management.',
    guestCapacity: '100 to 1,500+ Delegates',
    duration: 'Full-Day Summit & Evening Gala'
  },
  'story-5': {
    occasion: 'Housewarming & Spiritual Ceremonies',
    tagline: 'Warmth of a Sacred Abode & Vedic Griha Pravesh',
    narrative: 'Entering a new home is one of life’s most auspicious blessings. We transform your private residence into a sanctuary of purity and warmth with sacred Vedic havan arrangements, aromatic marigold torans, traditional rangolis, and celebratory family feasts.',
    decor: 'Sacred brass havan kund setup, fragrant mango leaf & marigold entrance doorways, and intimate courtyard seating.',
    culinary: 'Satvik royal festive feast prepared in 100% pure desi ghee, festive prashad, traditional Chhattisgarhi and North Indian delicacies.',
    hospitality: 'Courtyard shamiana draping, footwear management, and customized brass/silver auspicious gift packing.',
    guestCapacity: '50 to 500+ Honored Relatives',
    duration: 'Morning Vedic Rituals & Festive Lunch'
  }
};

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
  }
];

export default function EditorialStorySection({ services = [], onNavigateToReservation }) {
  const [activeStory, setActiveStory] = useState(null);

  // Dynamic cards from Admin panel, fallback to default 5 stories if empty
  const displayStories = (services && services.length > 0) ? services : PHOTO_STORIES;

  const handleOpenStory = (story) => {
    const defaultMeta = STORY_METADATA[story.id] || {};
    const meta = {
      occasion: story.occasion || defaultMeta.occasion || story.title || 'Royal Wedding & Mandap Setup',
      tagline: story.tagline || defaultMeta.tagline || story.theme || story.subtitle || 'Curated Bespoke Celebration',
      narrative: story.narrative || story.dialogue || story.description || story.caption || defaultMeta.narrative || 'A monumental celebration orchestrated with pedigree, elegance, and five-star hospitality across Chhattisgarh.',
      decor: story.decor || defaultMeta.decor || 'Signature customized floral mandap, heritage ambient illumination, and bespoke venue staging.',
      culinary: story.culinary || defaultMeta.culinary || 'Authentic Awadhi and live street banquet preparations crafted with pure ingredients and culinary artistry.',
      hospitality: story.hospitality || defaultMeta.hospitality || 'Dedicated on-ground operations directors and seamless end-to-end guest coordination.',
      guestCapacity: story.guestCapacity || defaultMeta.guestCapacity || '150 to 1,500+ Guests',
      duration: story.duration || defaultMeta.duration || 'Tailored Event Schedule'
    };

    setActiveStory({
      ...story,
      meta
    });
  };

  const handleBookExperience = (story) => {
    const targetOccasion = story.meta?.occasion || story.title || 'Royal Wedding & Mandap Setup';
    setActiveStory(null);
    if (onNavigateToReservation) {
      onNavigateToReservation(targetOccasion);
    }
  };

  const handleWhatsApp = (story) => {
    const text = encodeURIComponent(
      `Hello Shree Ram Events, I am exploring your story "${story.title}" (${story.theme || 'Curated Celebration'}). I would like to check available dates and discuss planning a similar experience for our family.`
    );
    window.open(`https://wa.me/${BRAND_INFO.contacts[0].whatsapp}?text=${text}`, '_blank');
  };

  const row1Stories = displayStories.slice(0, 3);
  const row2Stories = displayStories.slice(3);

  const renderStoryCard = (story, idx) => {
    const themeText = story.theme || story.subtitle || 'Sacred Union';
    const captionText = story.caption || story.description || '';
    const cardKey = story.id || `story-${idx}`;

    return (
      <div
        key={cardKey}
        onClick={() => handleOpenStory(story)}
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
              <span className="text-[9px] uppercase tracking-[0.2em] px-3 py-1 rounded-full bg-white text-[#1C1A18] font-semibold shadow-xs border border-[#8C7355]/20">
                {themeText}
              </span>
            </div>
          </div>

          <div className="card-body">
            <span className="card-tag">{themeText}</span>
            <h3 className="card-title">{story.title}</h3>
            <p className="card-text">{captionText}</p>
          </div>
        </div>

        {/* Tucked Card Footer — Minimalist Arrow Only */}
        <div className="card-footer flex items-center justify-end">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              handleOpenStory(story);
            }}
            className="w-8 h-8 rounded-full bg-[#FAF7F2] border border-[#8C7355]/30 flex items-center justify-center text-[#8C7355] group-hover:bg-[#1C1A18] group-hover:border-[#1C1A18] group-hover:text-[#FAF7F2] transition-all duration-300 shadow-2xs cursor-pointer"
            title="View Details"
          >
            <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-0.5" />
          </button>
        </div>
      </div>
    );
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

        {/* Row 1: Up to 3 Symmetrical Cards */}
        {row1Stories.length > 0 && (
          <div className={`grid-cards-3 ${row2Stories.length > 0 ? 'mb-8' : ''}`}>
            {row1Stories.map((story, idx) => renderStoryCard(story, idx))}
          </div>
        )}

        {/* Row 2: Remaining Symmetrical Cards */}
        {row2Stories.length > 0 && (
          <div className={row2Stories.length === 2 ? "grid-cards-2" : "grid-cards-3"}>
            {row2Stories.map((story, idx) => renderStoryCard(story, idx + 3))}
          </div>
        )}

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

      {/* Luxury Editorial Story Dossier Modal */}
      {activeStory && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md animate-in fade-in duration-200 overflow-y-auto"
          onClick={() => setActiveStory(null)}
        >
          <div 
            className="bg-[#FAF7F2] border border-[#8C7355]/40 rounded-3xl max-w-2xl w-full overflow-hidden shadow-2xl relative flex flex-col text-[#1C1A18] my-auto animate-in zoom-in-95 duration-200 max-h-[92vh] flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >

            {/* Close Button */}
            <button
              onClick={() => setActiveStory(null)}
              className="absolute top-4 right-4 z-30 w-10 h-10 rounded-full bg-[#1C1A18]/85 hover:bg-[#8C7355] text-white flex items-center justify-center transition-colors shadow-lg cursor-pointer border border-white/20"
              title="Close Story"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Scrollable Container */}
            <div className="overflow-y-auto">

              {/* Hero Photo with Vignette & Badge */}
              <div className="relative w-full aspect-[16/9] sm:aspect-[21/10] overflow-hidden bg-[#1C1A18] flex-shrink-0">
                <img
                  src={activeStory.image}
                  alt={activeStory.title}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.currentTarget.src = housewarmingImg;
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1C1A18]/90 via-[#1C1A18]/30 to-transparent" />
                
                <div className="absolute bottom-4 left-5 right-5 flex items-end justify-between">
                  <div>
                    <span className="text-[10px] uppercase tracking-[0.24em] px-3.5 py-1 rounded-full bg-[#C5A880] text-[#1C1A18] font-bold shadow-md inline-block mb-1.5">
                      {activeStory.theme || activeStory.subtitle || 'Royal Monograph'}
                    </span>
                    <h3 className="font-display text-xl sm:text-2xl text-[#FAF7F2] font-normal leading-snug drop-shadow-sm">
                      {activeStory.title}
                    </h3>
                  </div>
                </div>
              </div>

              {/* Dossier Content Body */}
              <div className="p-6 sm:p-8 space-y-6">

                {/* Subtitle / Poetic Quote */}
                <div className="border-l-2 border-[#8C7355] pl-4 py-0.5">
                  <p className="font-serif italic text-base sm:text-lg text-[#8C7355] leading-snug">
                    "{activeStory.meta?.tagline || activeStory.caption}"
                  </p>
                </div>

                {/* Narrative Description */}
                <p className="font-sans text-xs sm:text-sm text-[#4A443C] font-light leading-relaxed">
                  {activeStory.meta?.narrative || activeStory.dialogue}
                </p>

                {/* Curated Experience Highlights */}
                <div className="bg-[#FFFFFF] border border-[#8C7355]/20 rounded-2xl p-4 sm:p-5 space-y-3.5 shadow-2xs">
                  <div className="flex items-center gap-2 text-[#8C7355] text-xs font-semibold tracking-wider uppercase font-sans">
                    <Crown className="w-3.5 h-3.5" />
                    <span>Curated Experience Elements</span>
                  </div>

                  <div className="grid grid-cols-1 gap-3 pt-1 text-xs">
                    <div className="flex items-start gap-2.5">
                      <Sparkles className="w-4 h-4 text-[#C5A880] shrink-0 mt-0.5" />
                      <div>
                        <span className="font-semibold text-[#1C1A18]">Architectural Decor: </span>
                        <span className="text-[#5C554E]">{activeStory.meta?.decor}</span>
                      </div>
                    </div>

                    <div className="flex items-start gap-2.5">
                      <Utensils className="w-4 h-4 text-[#C5A880] shrink-0 mt-0.5" />
                      <div>
                        <span className="font-semibold text-[#1C1A18]">Culinary Harmony: </span>
                        <span className="text-[#5C554E]">{activeStory.meta?.culinary}</span>
                      </div>
                    </div>

                    <div className="flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-[#C5A880] shrink-0 mt-0.5" />
                      <div>
                        <span className="font-semibold text-[#1C1A18]">Royal Protocol: </span>
                        <span className="text-[#5C554E]">{activeStory.meta?.hospitality}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Celebration Logistics Info Strip */}
                <div className="grid grid-cols-2 gap-3 text-xs bg-[#FAF7F2] p-3 rounded-xl border border-[#8C7355]/15">
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-[#8C7355] shrink-0" />
                    <div>
                      <span className="block text-[9.5px] uppercase tracking-wider text-[#8C7355] font-semibold">Capacity</span>
                      <span className="font-medium text-[#1C1A18] text-[11.5px]">{activeStory.meta?.guestCapacity}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-[#8C7355] shrink-0" />
                    <div>
                      <span className="block text-[9.5px] uppercase tracking-wider text-[#8C7355] font-semibold">Service Area</span>
                      <span className="font-medium text-[#1C1A18] text-[11.5px]">Bhilai, Raipur, Durg & CG</span>
                    </div>
                  </div>
                </div>

                {/* Action CTA Bar */}
                <div className="pt-2 flex flex-col sm:flex-row gap-3 items-center justify-between border-t border-[#8C7355]/20">
                  <button
                    type="button"
                    onClick={() => handleBookExperience(activeStory)}
                    className="w-full sm:flex-1 py-3.5 px-6 rounded-full text-xs font-sans tracking-[0.18em] uppercase font-semibold bg-[#1C1A18] text-[#FAF7F2] hover:bg-[#8C7355] transition-all flex items-center justify-center gap-2 shadow-md cursor-pointer"
                  >
                    <Calendar className="w-3.5 h-3.5 text-[#C5A880]" />
                    <span>Plan This Celebration</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleWhatsApp(activeStory)}
                    className="w-full sm:w-auto py-3.5 px-6 rounded-full text-xs font-sans tracking-[0.18em] uppercase font-semibold bg-white border border-[#8C7355]/40 text-[#1C1A18] hover:bg-[#8C7355]/10 transition-all flex items-center justify-center gap-2 shadow-2xs cursor-pointer"
                  >
                    <MessageSquare className="w-3.5 h-3.5 text-[#8C7355]" />
                    <span>DM on WhatsApp</span>
                  </button>
                </div>

              </div>

            </div>

          </div>
        </div>
      )}

    </section>
  );
}

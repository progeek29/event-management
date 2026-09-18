import React from 'react';

/**
 * Authentic Shree Ram Events Logo matching the official standee banner:
 * - Stylized sweeping "SR" calligraphy signature
 * - "RAM EVENTS" in refined capital typography
 * - Lord Rama's Golden Bow & Arrow (Dhanush) on the right
 * - "Catering • Event Planning • Decoration" in elegant cursive script
 * - "Based in Bhilai, Chhattisgarh"
 */
export default function BrandLogo({ 
  variant = "full", // "full" | "horizontal" | "compact" | "icon"
  size = "md",      // "sm" | "md" | "lg" | "xl"
  className = "" 
}) {
  if (variant === "icon") {
    return (
      <svg 
        viewBox="0 0 120 120" 
        className={`inline-block ${className}`}
        style={{ width: size === 'sm' ? 36 : size === 'lg' ? 64 : 48, height: size === 'sm' ? 36 : size === 'lg' ? 64 : 48 }}
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Ornate Gold Circular Seal */}
        <circle cx="60" cy="60" r="56" stroke="url(#goldGrad)" strokeWidth="2" strokeDasharray="3 2" />
        <circle cx="60" cy="60" r="51" stroke="url(#goldGrad)" strokeWidth="1" strokeOpacity="0.6" />
        
        {/* Stylized SR Monogram with Bow Accent */}
        <path
          d="M32 78 C30 52 50 34 68 34 C82 34 88 44 80 54 C72 64 42 66 52 82 C58 90 74 88 84 76"
          stroke="url(#goldGrad)"
          strokeWidth="3.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {/* Lord Rama Bow Curve */}
        <path
          d="M74 30 Q92 58 74 86"
          stroke="url(#goldGrad)"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
        {/* Arrow through bow */}
        <path
          d="M62 58 L98 58 M92 53 L98 58 L92 63"
          stroke="url(#goldGrad)"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        <defs>
          <linearGradient id="goldGrad" x1="0" y1="0" x2="120" y2="120" gradientUnits="userSpaceOnUse">
            <stop stopColor="#F5E5C9" />
            <stop offset="0.3" stopColor="#D4AF37" />
            <stop offset="0.7" stopColor="#DFBE6C" />
            <stop offset="1" stopColor="#9B7826" />
          </linearGradient>
        </defs>
      </svg>
    );
  }

  // Full & Horizontal Variants matching the banner standee
  return (
    <div className={`flex flex-col items-center text-center select-none ${className}`}>
      <svg 
        viewBox="0 0 420 180" 
        className="w-full max-w-[280px] sm:max-w-[340px] md:max-w-[400px] h-auto drop-shadow-md"
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="goldShine" x1="0" y1="0" x2="420" y2="180" gradientUnits="userSpaceOnUse">
            <stop stopColor="#FFF2D6" />
            <stop offset="0.25" stopColor="#E2C172" />
            <stop offset="0.5" stopColor="#D4AF37" />
            <stop offset="0.75" stopColor="#F5E5C9" />
            <stop offset="1" stopColor="#A8812E" />
          </linearGradient>
          <filter id="goldGlow" x="-10%" y="-10%" width="120%" height="120%">
            <feDropShadow dx="0" dy="1" stdDeviation="1.5" floodColor="#D4AF37" floodOpacity="0.4"/>
          </filter>
        </defs>

        {/* 1. The Sweeping Calligraphic "SR" Signature */}
        <g filter="url(#goldGlow)">
          {/* Main S Flourish */}
          <path
            d="M35 110 C25 65 65 32 110 32 C135 32 148 48 135 68 C120 86 65 88 85 118 C98 135 130 130 148 112"
            stroke="url(#goldShine)"
            strokeWidth="5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {/* R Loop & Leg */}
          <path
            d="M138 60 C155 42 185 45 188 64 C190 82 165 92 145 92"
            stroke="url(#goldShine)"
            strokeWidth="4"
            strokeLinecap="round"
          />
          <path
            d="M165 88 Q185 115 205 132"
            stroke="url(#goldShine)"
            strokeWidth="4.5"
            strokeLinecap="round"
          />
        </g>

        {/* 2. "RAM" and "EVENTS" Typography */}
        <g fill="url(#goldShine)">
          <text 
            x="220" 
            y="72" 
            fontFamily="'Cinzel', Georgia, serif" 
            fontSize="32" 
            fontWeight="700" 
            letterSpacing="6"
          >
            RAM
          </text>
          <text 
            x="220" 
            y="104" 
            fontFamily="'Cinzel', Georgia, serif" 
            fontSize="22" 
            fontWeight="600" 
            letterSpacing="7"
          >
            EVENTS
          </text>
        </g>

        {/* 3. Lord Rama's Bow & Arrow (Dhanush) on Right Side */}
        <g stroke="url(#goldShine)" filter="url(#goldGlow)">
          {/* Ornate Curving Bow */}
          <path
            d="M335 36 C358 58 368 85 362 108 C358 122 344 136 335 142"
            strokeWidth="3.5"
            strokeLinecap="round"
          />
          {/* Bow String */}
          <line x1="335" y1="36" x2="335" y2="142" strokeWidth="1.2" strokeDasharray="2 1" strokeOpacity="0.8" />
          
          {/* Arrow */}
          <line x1="310" y1="88" x2="395" y2="88" strokeWidth="2.5" strokeLinecap="round" />
          {/* Arrowhead */}
          <path d="M385 82 L396 88 L385 94 Z" fill="url(#goldShine)" />
          {/* Arrow Fletching */}
          <path d="M312 83 L318 88 L312 93" strokeWidth="2" strokeLinecap="round" />
        </g>

        {/* 4. Elegant Script Subtext: "Catering • Event Planning • Decoration" */}
        <text 
          x="210" 
          y="152" 
          fontFamily="'Playfair Display', Georgia, serif" 
          fontStyle="italic"
          fontSize="15" 
          fill="url(#goldShine)" 
          textAnchor="middle"
          letterSpacing="1"
        >
          Catering  •  Event Planning  •  Decoration
        </text>

        {/* Fine Accent Rule below script */}
        <line x1="60" y1="168" x2="360" y2="168" stroke="url(#goldShine)" strokeWidth="1" strokeOpacity="0.5" />
        <circle cx="210" cy="168" r="2.5" fill="url(#goldShine)" />
      </svg>
      
      {/* Based in Tag */}
      <div className="text-[10px] sm:text-[11px] font-sans tracking-[0.26em] uppercase text-[#DFBE6C]/90 mt-1 font-medium">
        Based in Bhilai, Chhattisgarh
      </div>
    </div>
  );
}

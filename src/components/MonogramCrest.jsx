import React from 'react';

export default function MonogramCrest({ size = 38, className = "" }) {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 100 100" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Outer Fine Ring */}
      <circle cx="50" cy="50" r="46" stroke="currentColor" strokeWidth="1" strokeOpacity="0.4" />
      
      {/* Dotted Inner Ring */}
      <circle cx="50" cy="50" r="42" stroke="currentColor" strokeWidth="0.75" strokeDasharray="2 3" strokeOpacity="0.6" />
      
      {/* Subtle Royal Top Arch / Fleur Motif */}
      <path 
        d="M50 14 C48 18, 44 20, 44 23 C44 25, 47 26, 50 24 C53 26, 56 25, 56 23 C56 20, 52 18, 50 14 Z" 
        fill="currentColor" 
        fillOpacity="0.8" 
      />

      {/* Intertwined Serif Monogram: S & R */}
      <text 
        x="42" 
        y="62" 
        fontFamily="'Cormorant Garamond', Georgia, serif" 
        fontSize="34" 
        fontStyle="italic"
        fontWeight="500" 
        fill="currentColor" 
        textAnchor="middle"
      >
        S
      </text>

      <text 
        x="58" 
        y="66" 
        fontFamily="'Cormorant Garamond', Georgia, serif" 
        fontSize="34" 
        fontWeight="600" 
        fill="currentColor" 
        textAnchor="middle"
      >
        R
      </text>

      {/* Delicate Bottom Laurel Tie */}
      <path 
        d="M38 78 Q50 83 62 78" 
        stroke="currentColor" 
        strokeWidth="1" 
        strokeLinecap="round" 
        strokeOpacity="0.5" 
      />
      <circle cx="50" cy="80.5" r="1.5" fill="currentColor" fillOpacity="0.7" />
    </svg>
  );
}

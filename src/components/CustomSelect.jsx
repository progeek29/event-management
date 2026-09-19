import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, Check } from 'lucide-react';

export default function CustomSelect({
  value,
  onChange,
  options = [],
  placeholder = 'Select an option',
  className = ''
}) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    function handleKeyDown(event) {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  const handleSelect = (option) => {
    onChange(option);
    setIsOpen(false);
  };

  return (
    <div ref={dropdownRef} className={`relative w-full text-left ${className}`}>
      {/* Custom Button Trigger */}
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="w-full px-4 py-3.5 sm:py-4 rounded-md border border-[#E9DCC0] bg-[#FFFEF9] text-[15px] font-serif text-[#1A1A1A] flex items-center justify-between gap-3 transition-all cursor-pointer hover:border-[#C9A86A] focus:outline-none focus:border-[#C9A86A] focus:ring-1 focus:ring-[#C9A86A]/20 shadow-2xs"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        <span className={`truncate ${!value ? 'text-[#A39688]' : 'text-[#1A1A1A]'}`}>
          {value || placeholder}
        </span>
        <ChevronDown
          className={`w-4 h-4 shrink-0 transition-transform duration-200 text-[#8C7355] ${
            isOpen ? 'rotate-180 text-[#C9A86A]' : ''
          }`}
        />
      </button>

      {/* Floating Custom Menu Panel */}
      {isOpen && (
        <div className="absolute left-0 right-0 top-full mt-1.5 z-50 bg-[#FFFDF9] border border-[#C9A86A]/45 rounded-lg shadow-[0_12px_36px_-8px_rgba(28,26,24,0.15)] py-1.5 max-h-64 overflow-y-auto text-left">
          {options.map((option) => {
            const isSelected = value === option;
            return (
              <div
                key={option}
                onClick={() => handleSelect(option)}
                className={`px-4 py-2.5 sm:py-3 text-sm sm:text-[14.5px] font-serif flex items-center justify-between gap-3 cursor-pointer transition-colors ${
                  isSelected
                    ? 'bg-[#FAF4E8] text-[#8C7355] font-medium'
                    : 'text-[#2D2823] hover:bg-[#F9F5EE] hover:text-[#8C7355]'
                }`}
                role="option"
                aria-selected={isSelected}
              >
                <span className="truncate">{option}</span>
                {isSelected && (
                  <Check className="w-3.5 h-3.5 text-[#8C7355] shrink-0" />
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

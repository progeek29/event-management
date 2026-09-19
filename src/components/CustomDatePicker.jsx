import React, { useState, useRef, useEffect } from 'react';
import { Calendar, ChevronLeft, ChevronRight, Sparkles, ChevronDown } from 'lucide-react';

const MONTH_NAMES = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

const DAYS_OF_WEEK = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

export default function CustomDatePicker({
  value, // string 'YYYY-MM-DD'
  onChange,
  placeholder = '',
  className = ''
}) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef(null);

  // Parse initial selected date or fallback to today
  const selectedDateObj = value ? new Date(value + 'T00:00:00') : null;
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // Month navigation view state
  const [viewYear, setViewYear] = useState(
    selectedDateObj ? selectedDateObj.getFullYear() : today.getFullYear()
  );
  const [viewMonth, setViewMonth] = useState(
    selectedDateObj ? selectedDateObj.getMonth() : today.getMonth()
  );

  // Sync view when value prop changes
  useEffect(() => {
    if (value) {
      const d = new Date(value + 'T00:00:00');
      if (!isNaN(d.getTime())) {
        setViewYear(d.getFullYear());
        setViewMonth(d.getMonth());
      }
    }
  }, [value]);

  // Click outside listener
  useEffect(() => {
    function handleClickOutside(event) {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
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

  // Calendar calculations
  const firstDayOfMonth = new Date(viewYear, viewMonth, 1).getDay();
  const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();

  const handlePrevMonth = (e) => {
    e.stopPropagation();
    if (viewMonth === 0) {
      setViewMonth(11);
      setViewYear((prev) => prev - 1);
    } else {
      setViewMonth((prev) => prev - 1);
    }
  };

  const handleNextMonth = (e) => {
    e.stopPropagation();
    if (viewMonth === 11) {
      setViewMonth(0);
      setViewYear((prev) => prev + 1);
    } else {
      setViewMonth((prev) => prev + 1);
    }
  };

  const handleSelectDay = (day) => {
    const formattedMonth = String(viewMonth + 1).padStart(2, '0');
    const formattedDay = String(day).padStart(2, '0');
    const isoDateString = `${viewYear}-${formattedMonth}-${formattedDay}`;
    onChange(isoDateString);
    setIsOpen(false);
  };

  // Format display date: "24 Nov 2026"
  const formatDisplay = (isoStr) => {
    if (!isoStr) return '';
    const d = new Date(isoStr + 'T00:00:00');
    if (isNaN(d.getTime())) return isoStr;
    const day = d.getDate();
    const month = MONTH_NAMES[d.getMonth()].slice(0, 3);
    const year = d.getFullYear();
    return `${day} ${month} ${year}`;
  };

  // Quick season shortcuts
  const currentYear = today.getFullYear();
  const seasonShortcuts = [
    { label: 'Nov ' + currentYear, year: currentYear, month: 10, day: 21 },
    { label: 'Dec ' + currentYear, year: currentYear, month: 11, day: 12 },
    { label: 'Jan ' + (currentYear + 1), year: currentYear + 1, month: 0, day: 22 },
    { label: 'Feb ' + (currentYear + 1), year: currentYear + 1, month: 1, day: 16 }
  ];

  return (
    <div ref={containerRef} className={`relative w-full text-left font-sans ${className}`}>
      {/* Input Trigger Button */}
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="w-full h-[52px] sm:h-[56px] px-4 rounded-md border border-[#E9DCC0] bg-[#FFFEF9] text-[15px] font-sans text-[#1A1A1A] flex items-center justify-between gap-3 transition-all cursor-pointer hover:border-[#C9A86A] focus:outline-none focus:border-[#C9A86A] focus:ring-1 focus:ring-[#C9A86A]/20 shadow-2xs group"
        aria-haspopup="dialog"
        aria-expanded={isOpen}
      >
        <div className="flex items-center gap-3 truncate">
          <Calendar className="w-4.5 h-4.5 text-[#C9A86A] shrink-0 group-hover:scale-110 transition-transform" />
          {value ? (
            <span className="truncate text-[#1A1A1A] font-medium font-sans text-[14.5px] tracking-wide">
              {formatDisplay(value)}
            </span>
          ) : (
            <span className="truncate text-[#8A7E6D] font-sans text-[14px] font-normal">
              {placeholder || 'Select Auspicious Date'}
            </span>
          )}
        </div>
        <div className="flex items-center gap-2 shrink-0">
          {value && (
            <span
              onClick={(e) => {
                e.stopPropagation();
                onChange('');
              }}
              className="text-xs text-[#8A7E6D] hover:text-[#C9A86A] transition-colors p-1"
              title="Clear date"
            >
              ✕
            </span>
          )}
          <ChevronDown
            className={`w-4 h-4 text-[#8C7355] transition-transform duration-200 shrink-0 ${
              isOpen ? 'rotate-180 text-[#C9A86A]' : ''
            }`}
          />
        </div>
      </button>

      {/* Floating Gold & Ivory Calendar Popover */}
      {isOpen && (
        <div
          className="absolute left-0 right-0 sm:right-auto sm:w-80 mt-2 z-50 bg-[#FFFDF9] border border-[#C9A86A]/60 rounded-xl p-4 shadow-[0_20px_50px_-10px_rgba(201,168,106,0.25)] animate-in fade-in zoom-in-95 duration-150"
          style={{ minWidth: '290px' }}
        >
          {/* Header Month / Year Navigation */}
          <div className="flex items-center justify-between mb-3 pb-2.5 border-b border-[#E9DCC0]">
            <button
              type="button"
              onClick={handlePrevMonth}
              className="p-1.5 rounded-full hover:bg-[#FAF4E6] text-[#8C7355] hover:text-[#1A1A1A] transition-colors cursor-pointer"
              aria-label="Previous month"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            <div className="text-center">
              <span className="font-serif text-base text-[#1A1A1A] font-semibold tracking-wide">
                {MONTH_NAMES[viewMonth]} {viewYear}
              </span>
            </div>

            <button
              type="button"
              onClick={handleNextMonth}
              className="p-1.5 rounded-full hover:bg-[#FAF4E6] text-[#8C7355] hover:text-[#1A1A1A] transition-colors cursor-pointer"
              aria-label="Next month"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Days of Week Header */}
          <div className="grid grid-cols-7 gap-1 text-center mb-1.5">
            {DAYS_OF_WEEK.map((d) => (
              <span
                key={d}
                className="text-[11px] font-sans uppercase tracking-wider text-[#8A7E6D] font-semibold py-1"
              >
                {d}
              </span>
            ))}
          </div>

          {/* Calendar Days Grid */}
          <div className="grid grid-cols-7 gap-1 text-center">
            {/* Empty slots for previous month offset */}
            {Array.from({ length: firstDayOfMonth }).map((_, i) => (
              <div key={`empty-${i}`} className="w-8 h-8" />
            ))}

            {/* Current month days */}
            {Array.from({ length: daysInMonth }).map((_, i) => {
              const day = i + 1;
              const dateToCheck = new Date(viewYear, viewMonth, day);
              dateToCheck.setHours(0, 0, 0, 0);

              const isPast = dateToCheck < today;
              const isToday = dateToCheck.getTime() === today.getTime();

              const formattedMonth = String(viewMonth + 1).padStart(2, '0');
              const formattedDay = String(day).padStart(2, '0');
              const thisIsoStr = `${viewYear}-${formattedMonth}-${formattedDay}`;
              const isSelected = value === thisIsoStr;

              return (
                <button
                  key={`day-${day}`}
                  type="button"
                  disabled={isPast}
                  onClick={() => handleSelectDay(day)}
                  className={`w-8 h-8 mx-auto rounded-full text-xs font-sans font-medium flex items-center justify-center transition-all cursor-pointer relative ${
                    isSelected
                      ? 'bg-[#1A1A1A] text-[#FFFDF9] font-bold shadow-md scale-105 border border-[#C9A86A]'
                      : isPast
                      ? 'text-[#D5CCC0] cursor-not-allowed line-through'
                      : isToday
                      ? 'border border-[#C9A86A] text-[#1A1A1A] font-semibold bg-[#FAF4E6]'
                      : 'text-[#1A1A1A] hover:bg-[#FAF4E6] hover:text-[#C9A86A]'
                  }`}
                >
                  {day}
                  {isSelected && (
                    <span className="absolute -bottom-0.5 w-1 h-1 rounded-full bg-[#C9A86A]" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Auspicious Season Shortcuts */}
          <div className="mt-3.5 pt-2.5 border-t border-[#E9DCC0]">
            <div className="flex items-center gap-1.5 text-[10px] font-sans uppercase tracking-[0.2em] text-[#8A7E6D] mb-1.5 font-medium">
              <Sparkles className="w-2.5 h-2.5 text-[#C9A86A]" />
              <span>Auspicious Wedding Seasons</span>
            </div>

            <div className="grid grid-cols-4 gap-1">
              {seasonShortcuts.map((sc) => (
                <button
                  key={sc.label}
                  type="button"
                  onClick={() => {
                    setViewYear(sc.year);
                    setViewMonth(sc.month);
                    handleSelectDay(sc.day);
                  }}
                  className="px-1.5 py-1 text-[10px] font-sans tracking-tight text-[#4A443C] bg-[#FAF7F2] hover:bg-[#FAF4E6] hover:text-[#8C7355] border border-[#E9DCC0] rounded text-center transition-colors cursor-pointer"
                >
                  {sc.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

import React, { useState } from 'react';
import { Calendar, MessageSquare, ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';
import { BRAND_INFO } from '../data/initialData';

export default function DateInquirySection({ onNavigateToReservation, onLeadCreated }) {
  const [form, setForm] = useState({
    name: '',
    phone: '',
    date: '',
    occasion: 'Destination Wedding & Mandap',
    notes: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.phone) return;

    if (onLeadCreated) {
      onLeadCreated({
        id: `SRE-${new Date().getFullYear()}-${Math.floor(100 + Math.random() * 900)}`,
        dateSubmitted: new Date().toISOString().replace('T', ' ').substring(0, 16),
        clientName: form.name,
        phone: form.phone,
        occasion: form.occasion,
        eventDate: form.date || 'To Be Finalized',
        guestCount: 'Bespoke Consultation',
        status: 'Date Checked',
        notes: form.notes || 'Inquired via Date Checker'
      });
    }

    setSubmitted(true);
  };

  const handleWhatsAppSend = () => {
    const text = encodeURIComponent(
      `Hello Shree Ram Events, my name is ${form.name || 'a patron'}. I would like to check date availability for ${form.date || 'an upcoming date'} (${form.occasion}).`
    );
    window.open(`https://wa.me/${BRAND_INFO.contacts[0].whatsapp}?text=${text}`, '_blank');
  };

  return (
    <section id="inquire" className="site-section bg-[#FAF7F2] text-[#1C1A18] border-t border-[#8C7355]/20">

      <div className="site-container">

        {/* Strictly Centered Form Container */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 lg:p-12 border border-[#8C7355]/25 shadow-xl max-w-2xl mx-auto text-left relative overflow-hidden">

          {/* Centered Form Header */}
          <div className="section-header-centered mb-8">
            <div className="section-tag border-[#8C7355]/30 bg-[#FAF7F2] text-[#706860]">
              <span className="text-[#8C7355] text-xs">❖</span>
              <span>Private Consultation</span>
              <span className="text-[#8C7355] text-xs">❖</span>
            </div>

            <h2 className="section-title text-center text-[#1C1A18]">
              Found your perfect soulmate? <br />
              <span className="font-serif italic font-light text-[#8C7355]">Now check your date.</span>
            </h2>

            <div className="section-divider bg-[#8C7355]" />

            <p className="section-desc text-center text-[#706860]">
              Bestow your wedding date. Our founders will personally check estate availability.
            </p>
          </div>

          {submitted ? (
            <div className="p-8 text-center bg-[#F4EFEA] rounded-2xl border border-[#8C7355]/30 shadow-xs">
              <Sparkles className="w-8 h-8 text-[#8C7355] mx-auto mb-3" />
              <h3 className="font-serif text-2xl text-[#1C1A18] font-normal mb-2">
                Thank You, {form.name}
              </h3>
              <p className="text-xs sm:text-sm text-[#5C554E] font-light max-w-md mx-auto mb-6">
                Your celebration inquiry has been personally received. We will connect with you shortly with auspicious date availability.
              </p>
              <button
                onClick={handleWhatsAppSend}
                className="btn-pill-dark inline-flex items-center gap-2 cursor-pointer"
              >
                <MessageSquare className="w-3.5 h-3.5 text-[#C5A880]" />
                <span>Connect on WhatsApp Now</span>
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="w-full max-w-full space-y-5 box-border">

              {/* Row 1: Name & Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 w-full min-w-0 box-border">
                <div className="flex flex-col w-full min-w-0 box-border">
                  <label className="block text-[10px] uppercase tracking-[0.22em] text-[#706860] font-semibold mb-2">
                    Couple / Patron Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Aditi & Siddharth"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full max-w-full min-w-0 block box-border px-4 py-3.5 sm:py-4 rounded-xl border border-[#8C7355]/25 bg-[#FAF7F2] text-sm text-[#1C1A18] focus:outline-none focus:border-[#8C7355] transition-colors"
                  />
                </div>

                <div className="flex flex-col w-full min-w-0 box-border">
                  <label className="block text-[10px] uppercase tracking-[0.22em] text-[#706860] font-semibold mb-2">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+91 98261 XXXXX"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    className="w-full max-w-full min-w-0 block box-border px-4 py-3.5 sm:py-4 rounded-xl border border-[#8C7355]/25 bg-[#FAF7F2] text-sm text-[#1C1A18] focus:outline-none focus:border-[#8C7355] transition-colors"
                  />
                </div>
              </div>

              {/* Row 2: Date & Type */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 w-full min-w-0 box-border">
                <div className="flex flex-col w-full min-w-0 box-border">
                  <label className="block text-[10px] uppercase tracking-[0.22em] text-[#706860] font-semibold mb-2">
                    Celebration Date
                  </label>
                  <input
                    type="date"
                    value={form.date}
                    onChange={(e) => setForm({ ...form, date: e.target.value })}
                    className="w-full max-w-full min-w-0 block box-border px-4 py-3.5 sm:py-4 rounded-xl border border-[#8C7355]/25 bg-[#FAF7F2] text-sm text-[#1C1A18] focus:outline-none focus:border-[#8C7355] transition-colors"
                  />
                </div>

                <div className="flex flex-col w-full min-w-0 box-border">
                  <label className="block text-[10px] uppercase tracking-[0.22em] text-[#706860] font-semibold mb-2">
                    Celebration Type
                  </label>
                  <select
                    value={form.occasion}
                    onChange={(e) => setForm({ ...form, occasion: e.target.value })}
                    className="w-full max-w-full min-w-0 block box-border px-4 py-3.5 sm:py-4 rounded-xl border border-[#8C7355]/25 bg-[#FAF7F2] text-sm text-[#1C1A18] focus:outline-none focus:border-[#8C7355] transition-colors cursor-pointer"
                  >
                    <option>Destination Wedding & Mandap</option>
                    <option>Engagement & Sangeet Gala</option>
                    <option>Royal Catering & Banquets</option>
                    <option>Sprawling Lawn Celebration</option>
                    <option>Griha Pravesh & Sacred Rituals</option>
                  </select>
                </div>
              </div>

              {/* Row 3: Guest Count & Notes */}
              <div className="w-full min-w-0 box-border flex flex-col">
                <label className="block text-[10px] uppercase tracking-[0.22em] text-[#706860] font-semibold mb-2">
                  Estimated Guests & Special Desires (Optional)
                </label>
                <textarea
                  rows={2}
                  placeholder="Estimated guest count, preferred venue or culinary desires..."
                  value={form.notes}
                  onChange={(e) => setForm({ ...form, notes: e.target.value })}
                  className="w-full max-w-full min-w-0 block box-border px-4 py-3.5 rounded-xl border border-[#8C7355]/25 bg-[#FAF7F2] text-sm text-[#1C1A18] focus:outline-none focus:border-[#8C7355] transition-colors resize-none"
                />
              </div>

              {/* Action Buttons: 24px+ margin */}
              <div className="pt-6 sm:pt-7 flex flex-col sm:flex-row items-center justify-center gap-3.5 w-full box-border">
                <button
                  type="submit"
                  className="btn-pill-dark w-full sm:w-auto cursor-pointer inline-flex items-center justify-center gap-2"
                >
                  <Calendar className="w-3.5 h-3.5 text-[#C5A880]" />
                  <span>Check Availability</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#C5A880]" />
                </button>

                <button
                  type="button"
                  onClick={handleWhatsAppSend}
                  className="btn-pill-outline w-full sm:w-auto bg-white/80 inline-flex items-center justify-center gap-2"
                >
                  <MessageSquare className="w-3.5 h-3.5 text-[#8C7355]" />
                  <span>DM on WhatsApp</span>
                </button>
              </div>

              {onNavigateToReservation && (
                <div className="text-center pt-2">
                  <button
                    type="button"
                    onClick={() => onNavigateToReservation(form.occasion)}
                    className="text-xs text-[#8C7355] hover:text-[#1C1A18] transition-colors underline underline-offset-4 cursor-pointer"
                  >
                    Or Open Dedicated Royal Farmaan Invitation Card →
                  </button>
                </div>
              )}

            </form>
          )}

          {/* Micro Trust markers */}
          <div className="mt-8 pt-5 border-t border-[#8C7355]/15 flex flex-wrap items-center justify-center gap-4 text-[11px] text-[#706860]">
            <div className="flex items-center gap-1.5 text-[#8C7355]">
              <ShieldCheck className="w-3.5 h-3.5 text-[#8C7355]" />
              <span>100% Confidential</span>
            </div>
            <span>•</span>
            <span>Managed by Founders</span>
            <span>•</span>
            <span>Bhilai · Raipur · Durg</span>
          </div>

        </div>

      </div>
    </section>
  );
}

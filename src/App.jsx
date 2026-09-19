import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import EditorialStorySection from './components/EditorialStorySection';
import CredibilityStatsRibbon from './components/CredibilityStatsRibbon';
import CulinarySection from './components/CulinarySection';
import PhilosophySection from './components/PhilosophySection';
import DateInquirySection from './components/DateInquirySection';
import Footer from './components/Footer';
import AdminLeadsModal from './components/AdminLeadsModal';
import ServiceDetailPage from './components/ServiceDetailPage';

import { INITIAL_LEADS, INITIAL_FINANCIALS, BANNER_SERVICES } from './data/initialData';
import {
  fetchAllSheetData,
  syncCreateLead,
  syncUpdateLeadStatus,
  syncDeleteLead,
  syncCreateFinancial,
  syncUpdateFinancial,
  syncDeleteFinancial,
  syncUpdateOffering,
  syncCreateOffering
} from './services/googleSheetsService';

export default function App() {
  // Multi-page routing view state: 'home' | 'service-detail' | 'admin'
  const [currentView, setCurrentView] = useState('home');
  const [selectedService, setSelectedService] = useState(null);
  const [reservationOccasion, setReservationOccasion] = useState('');

  // Sync URL hash with currentView ('#admin' opens admin portal page directly)
  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash.replace('#', '');
      if (hash === 'admin') {
        setCurrentView('admin');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else if (hash === '' && currentView === 'admin') {
        setCurrentView('home');
      }
    };
    handleHash();
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, [currentView]);

  // Customizable Services state
  const [services, setServices] = useState(() => {
    try {
      const saved = localStorage.getItem('sre_services_data');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
      return BANNER_SERVICES;
    } catch {
      return BANNER_SERVICES;
    }
  });

  // Persistent confidential leads state (ONLY accessible by Admin after PIN login)
  const [leads, setLeads] = useState(() => {
    try {
      const saved = localStorage.getItem('sre_leads');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
      return INITIAL_LEADS;
    } catch {
      return INITIAL_LEADS;
    }
  });

  // Persistent confidential event finance ledger (ONLY accessible by Admin after PIN login)
  const [financials, setFinancials] = useState(() => {
    try {
      const saved = localStorage.getItem('sre_financials');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
      return INITIAL_FINANCIALS;
    } catch {
      return INITIAL_FINANCIALS;
    }
  });

  // Sync to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('sre_services_data', JSON.stringify(services));
    } catch (e) {
      console.error(e);
    }
  }, [services]);

  useEffect(() => {
    try {
      localStorage.setItem('sre_leads', JSON.stringify(leads));
    } catch (e) {
      console.error(e);
    }
  }, [leads]);

  useEffect(() => {
    try {
      localStorage.setItem('sre_financials', JSON.stringify(financials));
    } catch (e) {
      console.error(e);
    }
  }, [financials]);

  // Initial load: Fetch remote data from Google Sheets if available
  useEffect(() => {
    async function loadSheetData() {
      try {
        const data = await fetchAllSheetData();
        if (!data) return;

        if (Array.isArray(data.leads) && data.leads.length > 1) {
          const remoteLeads = data.leads.slice(1).map((row) => ({
            id: row[0],
            dateSubmitted: row[1],
            clientName: row[2],
            phone: String(row[3]),
            occasion: row[4],
            eventDate: row[5],
            guestCount: row[6],
            city: row[7],
            status: row[8],
            notes: row[9]
          })).filter((l) => l.id && l.clientName);
          if (remoteLeads.length > 0) setLeads(remoteLeads);
        }

        if (Array.isArray(data.financials) && data.financials.length > 1) {
          const remoteFin = data.financials.slice(1).map((row) => ({
            id: row[0],
            clientName: row[1],
            eventName: row[2],
            contractValue: Number(row[3]) || 0,
            advancePaid: Number(row[4]) || 0,
            balanceDue: Number(row[5]) || 0,
            decorExpense: Number(row[6]) || 0,
            cateringExpense: Number(row[7]) || 0,
            otherExpense: Number(row[8]) || 0,
            paymentStatus: row[9] || 'Advance Received'
          })).filter((f) => f.id && f.clientName);
          if (remoteFin.length > 0) setFinancials(remoteFin);
        }

        if (Array.isArray(data.offerings) && data.offerings.length > 1) {
          const remoteOff = data.offerings.slice(1).map((row) => ({
            id: row[0],
            number: row[1],
            title: row[2],
            subtitle: row[3],
            image: row[4],
            description: row[5]
          })).filter((o) => o.id && o.title);
          if (remoteOff.length > 0) setServices(remoteOff);
        }
      } catch (err) {
        console.warn('[App] Could not load from Google Sheets:', err);
      }
    }
    loadSheetData();
  }, []);

  // Lead handling (Local State + Google Sheets Sync)
  const handleLeadCreated = (newLead) => {
    setLeads((prev) => [newLead, ...prev]);
    syncCreateLead(newLead);
  };

  const handleUpdateStatus = (leadId, newStatus) => {
    setLeads((prev) => {
      const updated = prev.map((lead) => (lead.id === leadId ? { ...lead, status: newStatus } : lead));
      const target = updated.find((l) => l.id === leadId);
      if (target) syncUpdateLeadStatus(target);
      return updated;
    });
  };

  const handleDeleteLead = (leadId) => {
    setLeads((prev) => prev.filter((lead) => lead.id !== leadId));
    syncDeleteLead(leadId);
  };

  // Financial record handling (Full CRUD + Google Sheets Sync)
  const handleAddFinancialRecord = (newFinRecord) => {
    setFinancials((prev) => [newFinRecord, ...prev]);
    syncCreateFinancial(newFinRecord);
  };

  const handleUpdateFinancialRecord = (updatedRecord) => {
    setFinancials((prev) =>
      prev.map((rec) => (rec.id === updatedRecord.id ? updatedRecord : rec))
    );
    syncUpdateFinancial(updatedRecord);
  };

  const handleDeleteFinancialRecord = (recordId) => {
    setFinancials((prev) => prev.filter((rec) => rec.id !== recordId));
    syncDeleteFinancial(recordId);
  };

  // Admin service update handling (Google Sheets Sync)
  const handleUpdateService = (updatedService) => {
    setServices((prev) =>
      prev.map((s) => (s.id === updatedService.id ? updatedService : s))
    );
    syncUpdateOffering(updatedService);
  };

  const handleAddService = (newService) => {
    setServices((prev) => [...prev, newService]);
    syncCreateOffering(newService);
  };

  // Navigation handlers
  const navigateToAdmin = () => {
    setCurrentView('admin');
    window.location.hash = 'admin';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateToReservation = (occasion = '') => {
    if (occasion) {
      setReservationOccasion(occasion);
    }
    if (currentView !== 'home') {
      setCurrentView('home');
      if (window.location.hash === '#admin') {
        window.history.pushState('', document.title, window.location.pathname + window.location.search);
      }
      setTimeout(() => {
        const el = document.getElementById('inquire');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 80);
    } else {
      const el = document.getElementById('inquire');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const navigateToServiceDetail = (service) => {
    setSelectedService(service);
    setCurrentView('service-detail');
    if (window.location.hash === '#admin') {
      window.history.pushState('', document.title, window.location.pathname + window.location.search);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateToHome = () => {
    setCurrentView('home');
    if (window.location.hash === '#admin') {
      window.history.pushState('', document.title, window.location.pathname + window.location.search);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="w-full min-h-screen bg-[#FAF7F2] text-[#1C1A18] selection:bg-[#C5A880] selection:text-[#1C1A18] flex flex-col overflow-x-hidden font-sans">

      {/* 1. VIEW: Dedicated Service Detail Page */}
      {currentView === 'service-detail' && selectedService && (
        <ServiceDetailPage
          service={selectedService}
          onBack={navigateToHome}
          onNavigateToReservation={navigateToReservation}
          onLeadCreated={handleLeadCreated}
        />
      )}

      {/* 2. VIEW: Dedicated Admin Portal Page (Opens as a New Standalone Page, Not a Popup Modal) */}
      {currentView === 'admin' && (
        <AdminLeadsModal
          isOpen={true}
          onClose={navigateToHome}
          leads={leads}
          onUpdateStatus={handleUpdateStatus}
          onDeleteLead={handleDeleteLead}
          financials={financials}
          onAddFinancialRecord={handleAddFinancialRecord}
          onUpdateFinancialRecord={handleUpdateFinancialRecord}
          onDeleteFinancialRecord={handleDeleteFinancialRecord}
          services={services}
          onUpdateService={handleUpdateService}
          onAddService={handleAddService}
        />
      )}

      {/* 3. VIEW: High-Fashion Imperial Master Experience (Homepage) */}
      {currentView === 'home' && (
        <>
          {/* Light Glassmorphic Sticky Header */}
          <Navbar
            onOpenAdmin={navigateToAdmin}
            onNavigateToReservation={() => navigateToReservation()}
          />

          {/* Main Authentic Shree Ram Events Flow */}
          <main className="w-full flex-1 flex flex-col pt-14 sm:pt-16">

            {/* I. High-End Editorial Hero */}
            <Hero
              onNavigateToReservation={navigateToReservation}
            />

            {/* II. The 5 Photographic Stories — Sacred Union */}
            <div id="moments">
              <EditorialStorySection
                onNavigateToReservation={navigateToReservation}
              />
            </div>

            {/* III. Symmetrical Credibility & Pedigree Ribbon */}
            <CredibilityStatsRibbon />

            {/* IV. The Royal Culinary Banquet — Five-Star Awadhi & Banarasi Feasts */}
            <div id="culinary">
              <CulinarySection
                onNavigateToReservation={navigateToReservation}
              />
            </div>

            {/* V. Our Guiding Conviction — "Marriage is a sacred covenant" */}
            <div id="philosophy">
              <PhilosophySection />
            </div>

            {/* VI. Auspicious Date Checker & Royal Celebration Farmaan */}
            <div id="inquire">
              <DateInquirySection
                selectedOccasion={reservationOccasion}
                onNavigateToReservation={navigateToReservation}
                onLeadCreated={handleLeadCreated}
              />
            </div>

          </main>

          {/* Minimalist Masthead Footer */}
          <Footer
            onOpenAdmin={navigateToAdmin}
          />
        </>
      )}
    </div>
  );
}

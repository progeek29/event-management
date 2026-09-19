import React, { useState, useRef, useEffect } from 'react';
import { 
  X, Lock, Download, Phone, MessageSquare, 
  Trash2, Plus, Eye, EyeOff, Search, Sparkles, Calendar, Clock, CheckCircle2,
  ChevronDown, Check, ArrowLeft
} from 'lucide-react';
import * as XLSX from 'xlsx';

// Bespoke Gold & Ivory Filter Dropdown (Replaces native <select>)
function AdminFilterDropdown({ statusFilter, setStatusFilter, totalCount }) {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    function handleClickOutside(e) {
      if (ref.current && !ref.current.contains(e.target)) setIsOpen(false);
    }
    if (isOpen) document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  const options = [
    { label: `All Inquiries (${totalCount})`, value: 'All' },
    { label: 'Farmaan Bestowed', value: 'Farmaan Bestowed' },
    { label: 'Founder Contacted', value: 'Founder Contacted' },
    { label: 'Date Confirmed', value: 'Date Confirmed' },
    { label: 'Completed', value: 'Completed' }
  ];

  const currentLabel = options.find(o => o.value === statusFilter)?.label || statusFilter;

  return (
    <div ref={ref} className="relative inline-block text-left">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="px-3.5 py-1.5 rounded-md border border-[#E9DCC0] bg-[#FAF7F2] text-xs font-sans text-[#1A1A1A] flex items-center gap-2 cursor-pointer hover:border-[#C9A86A] focus:outline-none transition-all shadow-2xs"
      >
        <span className="font-medium">{currentLabel}</span>
        <ChevronDown className={`w-3.5 h-3.5 text-[#8A7E6D] transition-transform duration-200 ${isOpen ? 'rotate-180 text-[#C9A86A]' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute right-0 top-full mt-1.5 z-50 w-52 bg-[#FFFDF9] border border-[#C9A86A]/60 rounded-xl shadow-[0_12px_36px_-8px_rgba(201,168,106,0.25)] py-1.5 animate-in fade-in zoom-in-95 duration-100 text-left">
          {options.map((opt) => {
            const isSelected = statusFilter === opt.value;
            return (
              <button
                key={opt.value}
                type="button"
                onClick={() => {
                  setStatusFilter(opt.value);
                  setIsOpen(false);
                }}
                className={`w-full px-3.5 py-2 text-xs font-sans flex items-center justify-between transition-colors cursor-pointer text-left ${
                  isSelected ? 'bg-[#FAF4E6] text-[#8C6B28] font-semibold' : 'text-[#1A1A1A] hover:bg-[#FAF4E6]/60'
                }`}
              >
                <span>{opt.label}</span>
                {isSelected && <Check className="w-3.5 h-3.5 text-[#8C6B28]" />}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

// Bespoke Gold & Ivory Status Badge Dropdown (Replaces native <select> in rows)
function AdminRowStatusDropdown({ currentStatus, onSelectStatus }) {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    function handleClickOutside(e) {
      if (ref.current && !ref.current.contains(e.target)) setIsOpen(false);
    }
    if (isOpen) document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  const statuses = [
    { label: 'Farmaan Bestowed', bg: 'bg-[#FFFBF0]', text: 'text-[#8C6B28]', border: 'border-[#E2D1A6]', dot: 'bg-[#8C6B28]' },
    { label: 'Founder Contacted', bg: 'bg-[#FEF6E9]', text: 'text-[#A26214]', border: 'border-[#E8C28A]', dot: 'bg-[#A26214]' },
    { label: 'Date Confirmed', bg: 'bg-[#EBF7EE]', text: 'text-[#1D6F42]', border: 'border-[#A7DFBA]', dot: 'bg-[#1D6F42]' },
    { label: 'Completed', bg: 'bg-[#F0F4F8]', text: 'text-[#2B5278]', border: 'border-[#B4CEE5]', dot: 'bg-[#2B5278]' }
  ];

  const current = statuses.find(s => s.label === currentStatus) || statuses[0];

  return (
    <div ref={ref} className="relative inline-block text-left">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`px-3 py-1 rounded-full text-[11px] font-sans font-semibold border flex items-center gap-1.5 cursor-pointer transition-all shadow-2xs hover:scale-102 ${current.bg} ${current.text} ${current.border}`}
      >
        <span className={`w-1.5 h-1.5 rounded-full ${current.dot}`} />
        <span>{current.label}</span>
        <ChevronDown className={`w-3 h-3 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute left-0 top-full mt-1.5 z-50 w-48 bg-[#FFFDF9] border border-[#C9A86A]/60 rounded-xl shadow-[0_12px_36px_-8px_rgba(201,168,106,0.25)] py-1.5 animate-in fade-in zoom-in-95 duration-100 text-left">
          {statuses.map((st) => {
            const isSelected = (currentStatus || 'Farmaan Bestowed') === st.label;
            return (
              <button
                key={st.label}
                type="button"
                onClick={() => {
                  onSelectStatus(st.label);
                  setIsOpen(false);
                }}
                className={`w-full px-3.5 py-2 text-[11px] font-sans flex items-center justify-between transition-colors cursor-pointer text-left ${
                  isSelected ? 'bg-[#FAF4E6] font-semibold text-[#1A1A1A]' : 'text-[#4A443C] hover:bg-[#FAF4E6]/60'
                }`}
              >
                <div className="flex items-center gap-2">
                  <span className={`w-2 h-2 rounded-full ${st.dot}`} />
                  <span>{st.label}</span>
                </div>
                {isSelected && <Check className="w-3.5 h-3.5 text-[#C9A86A]" />}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default function AdminLeadsModal({ 
  isOpen, 
  onClose, 
  leads = [], 
  onUpdateStatus, 
  onDeleteLead, 
  financials = [],
  onAddFinancialRecord,
  services = [],
  onUpdateService
}) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [adminId, setAdminId] = useState('');
  const [adminPassword, setAdminPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [authError, setAuthError] = useState('');
  
  const [activeTab, setActiveTab] = useState('leads'); // 'leads' | 'financials' | 'content'
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  
  // New financial form modal state
  const [showAddFinance, setShowAddFinance] = useState(false);
  const [newFin, setNewFin] = useState({
    clientName: '',
    eventName: '',
    contractValue: '',
    advancePaid: '',
    decorExpense: '',
    cateringExpense: '',
    paymentStatus: 'Advance Received'
  });

  if (!isOpen) return null;

  const handleLogin = (e) => {
    e.preventDefault();
    const cleanId = adminId.trim().toLowerCase();
    const cleanPass = adminPassword.trim();

    // Accepted Admin ID: 'admin' or 'shreeram'
    // Accepted Admin Password: 'shreeram@1111', 'admin1111', '1111', 'admin123'
    const isIdValid = cleanId === 'admin' || cleanId === 'shreeram';
    const isPassValid = 
      cleanPass === 'shreeram@1111' || 
      cleanPass === 'admin1111' || 
      cleanPass === '1111' || 
      cleanPass === 'admin123';

    if (isIdValid && isPassValid) {
      setIsAuthenticated(true);
      setAuthError('');
      setAdminId('');
      setAdminPassword('');
    } else {
      setAuthError('Invalid Admin ID or Password. Default: ID "admin", Pass "shreeram@1111"');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setAdminId('');
    setAdminPassword('');
    onClose();
  };

  const exportLeadsToExcel = () => {
    const cleanData = leads.map(lead => ({
      'Lead / Farmaan ID': lead.id,
      'Inquiry Received At (Kab Inquiry Aayi)': lead.dateSubmitted,
      'Patron Full Name': lead.clientName,
      'Contact Phone': lead.phone,
      'Celebration Occasion': lead.occasion,
      'Auspicious Date': lead.eventDate,
      'Guest Assembly Size': lead.guestCount,
      'Venue / City': lead.city || 'Bhilai / Durg',
      'Status': lead.status,
      'Patron Vision & Notes': lead.notes || ''
    }));

    const worksheet = XLSX.utils.json_to_sheet(cleanData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Farmaan Inquiries');
    XLSX.writeFile(workbook, `ShreeRamEvents_Farmaan_Inquiries_${new Date().toISOString().slice(0, 10)}.xlsx`);
  };

  const exportFinanceToExcel = () => {
    const cleanData = financials.map(fin => ({
      'Record ID': fin.id,
      'Client Name': fin.clientName,
      'Event Name': fin.eventName,
      'Contract Value (INR)': fin.contractValue,
      'Advance Paid (INR)': fin.advancePaid,
      'Balance Due (INR)': fin.balanceDue,
      'Decor Outlay (INR)': fin.decorExpense,
      'Catering Outlay (INR)': fin.cateringExpense,
      'Est Net Margin (INR)': fin.contractValue - (fin.decorExpense + fin.cateringExpense + (fin.otherExpense || 0)),
      'Status': fin.paymentStatus
    }));

    const worksheet = XLSX.utils.json_to_sheet(cleanData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Financial Ledger');
    XLSX.writeFile(workbook, `ShreeRamEvents_Finance_${new Date().toISOString().slice(0, 10)}.xlsx`);
  };

  const handleCreateFinance = (e) => {
    e.preventDefault();
    const contract = Number(newFin.contractValue) || 0;
    const advance = Number(newFin.advancePaid) || 0;
    const decor = Number(newFin.decorExpense) || 0;
    const catering = Number(newFin.cateringExpense) || 0;

    const record = {
      id: `FIN-${Date.now().toString().slice(-4)}`,
      clientName: newFin.clientName,
      eventName: newFin.eventName,
      contractValue: contract,
      advancePaid: advance,
      balanceDue: Math.max(0, contract - advance),
      decorExpense: decor,
      cateringExpense: catering,
      otherExpense: 0,
      paymentStatus: newFin.paymentStatus
    };

    onAddFinancialRecord(record);
    setShowAddFinance(false);
    setNewFin({
      clientName: '',
      eventName: '',
      contractValue: '',
      advancePaid: '',
      decorExpense: '',
      cateringExpense: '',
      paymentStatus: 'Advance Received'
    });
  };

  // Filter leads based on search term and status filter
  const filteredLeads = leads.filter(lead => {
    const matchSearch = 
      (lead.clientName || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (lead.phone || '').includes(searchTerm) ||
      (lead.occasion || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (lead.city || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (lead.id || '').toLowerCase().includes(searchTerm.toLowerCase());
    
    if (statusFilter === 'All') return matchSearch;
    return matchSearch && lead.status === statusFilter;
  });

  // Financial calculations
  const totalRevenue = financials.reduce((acc, f) => acc + (Number(f.contractValue) || 0), 0);
  const totalAdvance = financials.reduce((acc, f) => acc + (Number(f.advancePaid) || 0), 0);
  const totalBalanceDue = financials.reduce((acc, f) => acc + (Number(f.balanceDue) || 0), 0);
  const totalExpenses = financials.reduce((acc, f) => acc + (Number(f.decorExpense) || 0) + (Number(f.cateringExpense) || 0) + (Number(f.otherExpense) || 0), 0);
  const totalNetMargin = totalRevenue - totalExpenses;

  return (
    <div className="w-full min-h-screen bg-[#FAF7F2] text-[#1A1A1A] flex flex-col font-sans selection:bg-[#C9A86A]/20">
      <div className="w-full flex-1 flex flex-col">
        
        {/* Top Header — Dedicated Page Navigation Bar */}
        <header className="sticky top-0 z-40 bg-[#1A1A1A] px-4 sm:px-8 py-3.5 border-b border-[#C9A86A]/40 flex items-center justify-between text-[#FAF7F2] shadow-md">
          <div className="flex items-center gap-3 sm:gap-5">
            <button
              type="button"
              onClick={onClose}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md border border-[#C9A86A]/50 bg-white/5 hover:bg-white/10 text-xs font-sans text-[#C9A86A] hover:text-[#FAF7F2] transition-all cursor-pointer tracking-wider uppercase font-medium"
              title="Return to Public Website"
            >
              <ArrowLeft className="w-3.5 h-3.5 text-[#C9A86A]" />
              <span>← Back to Website</span>
            </button>

            <div className="h-5 w-px bg-[#C9A86A]/30 hidden sm:block" />

            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-[#FAF7F2] border border-[#C9A86A] flex items-center justify-center text-[#C9A86A] font-serif font-bold text-sm shadow-xs">
                SR
              </div>
              <div>
                <h1 className="font-serif text-base sm:text-lg text-[#FAF7F2] tracking-wide flex items-center gap-2 m-0 p-0 font-normal">
                  <span>Shree Ram Events</span>
                  <span className="text-[#C9A86A] text-[11px] font-sans tracking-[0.2em] uppercase font-light hidden md:inline">• Admin Master Portal</span>
                </h1>
                <span className="text-[10px] font-sans tracking-[0.22em] uppercase text-[#C9A86A] font-medium hidden sm:block">
                  Royal Farmaan Inquiries & Private Registry
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {isAuthenticated ? (
              <button
                onClick={handleLogout}
                className="text-xs font-sans tracking-wider uppercase text-[#C9A86A] hover:text-[#FAF7F2] px-3.5 py-1.5 rounded-lg border border-[#C9A86A]/40 hover:bg-white/10 transition-all cursor-pointer font-medium"
              >
                Exit / Log Out
              </button>
            ) : (
              <button
                onClick={onClose}
                className="text-xs font-sans tracking-wider uppercase text-[#A39688] hover:text-[#FAF7F2] px-3 py-1.5 rounded-md hover:bg-white/5 transition-colors cursor-pointer"
              >
                Exit to Website
              </button>
            )}
          </div>
        </header>

        {/* Content Area */}
        {!isAuthenticated ? (
          /* Dedicated Standalone Admin Portal Authentication Screen */
          <div className="flex-1 flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#FAF7F2] via-[#F5EFE6] to-[#FAF7F2] min-h-[calc(100vh-65px)]">
            <div className="w-full max-w-md bg-[#FFFDF9] border border-[#C9A86A]/50 rounded-2xl p-8 sm:p-11 shadow-[0_20px_60px_-15px_rgba(201,168,106,0.22)] relative text-center">
              
              {/* Gold Filigree Corner Accents */}
              <div className="absolute top-3 left-3 w-3 h-3 border-t-2 border-l-2 border-[#C9A86A]/60" />
              <div className="absolute top-3 right-3 w-3 h-3 border-t-2 border-r-2 border-[#C9A86A]/60" />
              <div className="absolute bottom-3 left-3 w-3 h-3 border-b-2 border-l-2 border-[#C9A86A]/60" />
              <div className="absolute bottom-3 right-3 w-3 h-3 border-b-2 border-r-2 border-[#C9A86A]/60" />

              {/* Crest */}
              <div className="w-16 h-16 rounded-full bg-[#FAF7F2] text-[#C9A86A] border border-[#C9A86A]/70 flex items-center justify-center mx-auto mb-4 shadow-sm">
                <Lock className="w-7 h-7 text-[#C9A86A]" />
              </div>

              <span className="text-[10px] font-sans uppercase tracking-[0.28em] text-[#C9A86A] font-semibold block mb-1">
                Founder Master Vault
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl text-[#1A1A1A] font-normal mb-2">
                Admin Authentication
              </h2>
              <div className="w-12 h-px bg-[#C9A86A]/40 mx-auto mb-3" />
              <p className="text-xs text-[#7A7266] leading-relaxed mb-6 font-light">
                Confidential access for founders to review incoming Farmaan inquiries, client WhatsApp details, and event dates.
              </p>

              <form onSubmit={handleLogin} className="w-full space-y-4 text-left">
                {/* Admin ID Field */}
                <div>
                  <label className="block text-[10.5px] font-sans uppercase tracking-[0.2em] text-[#8A7E6D] font-medium mb-1.5">
                    Admin ID / Username
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. admin or shreeram"
                    value={adminId}
                    onChange={(e) => setAdminId(e.target.value)}
                    className="w-full px-4 py-3 rounded-md border border-[#E9DCC0] bg-[#FFFDF9] text-sm text-[#1A1A1A] placeholder:text-[#C7BEAF] focus:outline-none focus:border-[#C9A86A] focus:ring-1 focus:ring-[#C9A86A]/20 transition-all font-medium"
                    autoFocus
                    required
                  />
                </div>

                {/* Password Field with Show/Hide Toggle */}
                <div>
                  <label className="block text-[10.5px] font-sans uppercase tracking-[0.2em] text-[#8A7E6D] font-medium mb-1.5">
                    Admin Password
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Enter admin password"
                      value={adminPassword}
                      onChange={(e) => setAdminPassword(e.target.value)}
                      className="w-full px-4 py-3 pr-11 rounded-md border border-[#E9DCC0] bg-[#FFFDF9] text-sm text-[#1A1A1A] placeholder:text-[#C7BEAF] focus:outline-none focus:border-[#C9A86A] focus:ring-1 focus:ring-[#C9A86A]/20 transition-all font-medium"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-[#8A7E6D] hover:text-[#1A1A1A] p-1 cursor-pointer"
                      aria-label={showPassword ? 'Hide password' : 'Show password'}
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                {authError && (
                  <div className="p-2.5 rounded-md bg-[#FFF5F5] border border-[#FEB2B2] text-xs text-[#9B2C2C] font-medium text-center">
                    {authError}
                  </div>
                )}

                <button
                  type="submit"
                  className="w-full py-3.5 rounded-md bg-[#1A1A1A] text-[#FFFDF9] font-semibold text-xs font-sans tracking-[0.24em] uppercase hover:bg-[#B89657] hover:text-white transition-all shadow-md cursor-pointer"
                >
                  Authenticate & Enter Vault
                </button>

                <div className="text-center pt-2">
                  <span className="text-[10.5px] text-[#8A7E6D] font-mono block">
                    Default credentials: ID: <strong className="text-[#1A1A1A] font-semibold">admin</strong> | Pass: <strong className="text-[#1A1A1A] font-semibold">shreeram@1111</strong>
                  </span>
                </div>
              </form>
            </div>

            {/* Link to go back to website */}
            <div className="mt-6 text-center">
              <a
                href="/"
                onClick={(e) => {
                  e.preventDefault();
                  if (onClose) onClose();
                  else window.location.href = '/';
                }}
                className="text-xs font-sans text-[#8A7E6D] hover:text-[#1A1A1A] transition-colors inline-flex items-center gap-1.5 cursor-pointer underline underline-offset-4"
              >
                <span>← Return to Public Website</span>
              </a>
            </div>
          </div>
        ) : (
          /* Authenticated Dashboard */
          <div className="flex-1 flex flex-col overflow-hidden bg-[#FAF7F2]">
            
            {/* Tabs & Controls */}
            <div className="bg-[#FFFDF9] border-b border-[#E9DCC0] px-6 py-3.5 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setActiveTab('leads')}
                  className={`px-4 py-2 rounded-lg text-xs font-sans tracking-wider uppercase transition-all cursor-pointer ${
                    activeTab === 'leads'
                      ? 'bg-[#1A1A1A] text-[#FFFDF9] font-semibold shadow-xs'
                      : 'text-[#4A443C] border border-[#E9DCC0] hover:border-[#C9A86A] bg-[#FAF7F2]'
                  }`}
                >
                  Farmaan Inquiries ({leads.length})
                </button>
                <button
                  onClick={() => setActiveTab('financials')}
                  className={`px-4 py-2 rounded-lg text-xs font-sans tracking-wider uppercase transition-all cursor-pointer ${
                    activeTab === 'financials'
                      ? 'bg-[#1A1A1A] text-[#FFFDF9] font-semibold shadow-xs'
                      : 'text-[#4A443C] border border-[#E9DCC0] hover:border-[#C9A86A] bg-[#FAF7F2]'
                  }`}
                >
                  Finance Ledger ({financials.length})
                </button>
                <button
                  onClick={() => setActiveTab('content')}
                  className={`px-4 py-2 rounded-lg text-xs font-sans tracking-wider uppercase transition-all cursor-pointer ${
                    activeTab === 'content'
                      ? 'bg-[#1A1A1A] text-[#FFFDF9] font-semibold shadow-xs'
                      : 'text-[#4A443C] border border-[#E9DCC0] hover:border-[#C9A86A] bg-[#FAF7F2]'
                  }`}
                >
                  Photos & Offerings ({services.length})
                </button>
              </div>

              <div className="flex items-center gap-3">
                {activeTab === 'leads' ? (
                  <button
                    onClick={exportLeadsToExcel}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-[#C9A86A] bg-[#FFFBF0] text-xs font-sans font-semibold text-[#8C7355] hover:bg-[#C9A86A] hover:text-white transition-all cursor-pointer shadow-2xs"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Export Inquiries (Excel)</span>
                  </button>
                ) : (
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setShowAddFinance(true)}
                      className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-[#1A1A1A] text-[#FFFDF9] text-xs font-sans tracking-wider uppercase font-semibold hover:bg-[#B89657] transition-all cursor-pointer shadow-xs"
                    >
                      <Plus className="w-3.5 h-3.5 text-[#C9A86A]" />
                      <span>Add Ledger Entry</span>
                    </button>
                    <button
                      onClick={exportFinanceToExcel}
                      className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg border border-[#C9A86A] bg-[#FFFBF0] text-xs font-sans font-semibold text-[#8C7355] hover:bg-[#C9A86A] hover:text-white transition-colors cursor-pointer"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Export Finance (Excel)</span>
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Tab 1: Leads View (Farmaan Inquiries in Gold & Ivory) */}
            {activeTab === 'leads' && (
              <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
                
                {/* Search & Filter Ribbon */}
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-[#FFFDF9] p-3 rounded-xl border border-[#E9DCC0]">
                  <div className="relative flex-1">
                    <Search className="w-4 h-4 text-[#8A7E6D] absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      placeholder="Search inquiries by patron name, phone, occasion or city..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-9 pr-4 py-2 rounded-md border border-[#E9DCC0] bg-[#FAF7F2] text-xs font-sans text-[#1A1A1A] placeholder:text-[#A39688] focus:outline-none focus:border-[#C9A86A]"
                    />
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <span className="text-[10px] font-sans uppercase tracking-wider text-[#8A7E6D] font-semibold">
                      Filter:
                    </span>
                    <AdminFilterDropdown
                      statusFilter={statusFilter}
                      setStatusFilter={setStatusFilter}
                      totalCount={leads.length}
                    />
                  </div>
                </div>

                {filteredLeads.length === 0 ? (
                  <div className="text-center py-16 bg-[#FFFDF9] rounded-xl border border-[#E9DCC0] text-[#7A7266]">
                    <Sparkles className="w-8 h-8 text-[#C9A86A] mx-auto mb-2 opacity-60" />
                    <p className="font-serif text-lg text-[#1A1A1A] font-medium">No Farmaan Inquiries Found</p>
                    <p className="text-xs text-[#8A7E6D] mt-1">
                      {searchTerm ? 'Try adjusting your search criteria.' : 'Client submissions will appear here automatically.'}
                    </p>
                  </div>
                ) : (
                  <div className="overflow-x-auto border border-[#E9DCC0] rounded-xl bg-[#FFFDF9] shadow-sm">
                    <table className="w-full text-left border-collapse text-xs">
                      <thead>
                        <tr className="bg-[#FAF4E6] text-[#1A1A1A] border-b border-[#E9DCC0]">
                          <th className="py-3 px-3.5 font-sans tracking-wider uppercase font-semibold">Ref ID</th>
                          <th className="py-3 px-3.5 font-sans tracking-wider uppercase font-semibold">Host / Patron Name</th>
                          <th className="py-3 px-3.5 font-sans tracking-wider uppercase font-semibold">Contact & Quick Connect</th>
                          <th className="py-3 px-3.5 font-sans tracking-wider uppercase font-semibold">Auspicious Date</th>
                          <th className="py-3 px-3.5 font-sans tracking-wider uppercase font-semibold">Occasion & Assembly</th>
                          <th className="py-3 px-3.5 font-sans tracking-wider uppercase font-semibold">Venue City</th>
                          <th className="py-3 px-3.5 font-sans tracking-wider uppercase font-semibold">Inquiry Received ("Kab Aayi")</th>
                          <th className="py-3 px-3.5 font-sans tracking-wider uppercase font-semibold">Status</th>
                          <th className="py-3 px-3.5 font-sans tracking-wider uppercase font-semibold text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[#E9DCC0]/70 text-[#2D2823]">
                        {filteredLeads.map((lead) => {
                          const cleanPhone = (lead.phone || '').replace(/[^0-9]/g, '');
                          return (
                            <tr key={lead.id} className="hover:bg-[#FAF4E6]/60 transition-colors">
                              {/* Ref ID */}
                              <td className="py-3.5 px-3.5 font-mono text-[11px] text-[#8C7355] font-semibold whitespace-nowrap">
                                {lead.id}
                              </td>

                              {/* Patron Name & Special Notes */}
                              <td className="py-3.5 px-3.5">
                                <div className="font-serif text-sm font-semibold text-[#1A1A1A]">
                                  {lead.clientName}
                                </div>
                                {lead.notes && (
                                  <div className="text-[11px] text-[#7A7266] line-clamp-1 max-w-xs mt-0.5" title={lead.notes}>
                                    "{lead.notes}"
                                  </div>
                                )}
                              </td>

                              {/* Contact & WhatsApp / Call Buttons */}
                              <td className="py-3.5 px-3.5 whitespace-nowrap">
                                <div className="flex items-center gap-2">
                                  <span className="font-medium text-[#1A1A1A] font-sans text-xs tracking-wider">{lead.phone}</span>
                                  <a
                                    href={`tel:${cleanPhone}`}
                                    className="p-1.5 rounded-full text-[#8C7355] hover:bg-[#FAF4E6] hover:text-[#1A1A1A] transition-colors"
                                    title="Call Patron"
                                  >
                                    <Phone className="w-3.5 h-3.5" />
                                  </a>
                                  <a
                                    href={`https://wa.me/${cleanPhone}?text=Pranam%20${encodeURIComponent(lead.clientName)},%20this%20is%20Vishal%20Pratap%20Singh%20from%20Shree%20Ram%20Events%20regarding%20your%20Royal%20Farmaan%20reservation.`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="p-1.5 rounded-full text-[#255241] hover:bg-[#EBF7EE] transition-colors"
                                    title="Connect on WhatsApp"
                                  >
                                    <MessageSquare className="w-3.5 h-3.5 text-[#1D6F42]" />
                                  </a>
                                </div>
                              </td>

                              {/* Auspicious Date */}
                              <td className="py-3.5 px-3.5 whitespace-nowrap">
                                <div className="inline-flex items-center gap-1.5 font-sans text-xs font-medium text-[#1A1A1A] bg-[#FFFDF9] px-2.5 py-1 rounded border border-[#E9DCC0]">
                                  <Calendar className="w-3 h-3 text-[#C9A86A]" />
                                  <span>{lead.eventDate || 'To be finalized'}</span>
                                </div>
                              </td>

                              {/* Occasion & Assembly */}
                              <td className="py-3.5 px-3.5">
                                <div className="font-serif text-[13px] text-[#1A1A1A]">
                                  {lead.occasion}
                                </div>
                                <div className="text-[10.5px] text-[#8A7E6D] font-sans mt-0.5">
                                  {lead.guestCount}
                                </div>
                              </td>

                              {/* Venue City */}
                              <td className="py-3.5 px-3.5 whitespace-nowrap text-xs text-[#4A443C]">
                                {lead.city || 'Bhilai / Durg'}
                              </td>

                              {/* Inquiry Received Timestamp ("Kab Inquiry Aayi") */}
                              <td className="py-3.5 px-3.5 whitespace-nowrap">
                                <div className="inline-flex items-center gap-1 text-[11px] text-[#5C554E] font-sans font-normal">
                                  <Clock className="w-3 h-3 text-[#8A7E6D]" />
                                  <span>{lead.dateSubmitted}</span>
                                </div>
                              </td>

                              {/* Status Dropdown (Custom Gold & Ivory Badge) */}
                              <td className="py-3.5 px-3.5 whitespace-nowrap">
                                <AdminRowStatusDropdown
                                  currentStatus={lead.status || 'Farmaan Bestowed'}
                                  onSelectStatus={(newStatus) => onUpdateStatus && onUpdateStatus(lead.id, newStatus)}
                                />
                              </td>

                              {/* Actions */}
                              <td className="py-3.5 px-3.5 text-right whitespace-nowrap">
                                <button
                                  onClick={() => {
                                    if (window.confirm(`Are you sure you want to remove inquiry for ${lead.clientName}?`)) {
                                      onDeleteLead && onDeleteLead(lead.id);
                                    }
                                  }}
                                  className="p-1.5 text-[#A39688] hover:text-[#9B2C2C] hover:bg-[#FFF5F5] rounded-md transition-colors cursor-pointer"
                                  title="Delete Inquiry"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            )}

            {/* Tab 2: Private Financials Ledger View (Gold & Ivory) */}
            {activeTab === 'financials' && (
              <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
                
                {/* Financial Metric Overview Cards */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="bg-[#FFFDF9] border border-[#E9DCC0] rounded-xl p-4 shadow-2xs">
                    <span className="text-[10px] font-sans uppercase tracking-[0.2em] text-[#8A7E6D] block mb-1 font-semibold">
                      Total Booked Value
                    </span>
                    <span className="font-serif text-2xl text-[#1A1A1A] font-bold">
                      ₹{totalRevenue.toLocaleString('en-IN')}
                    </span>
                  </div>

                  <div className="bg-[#FFFDF9] border border-[#E9DCC0] rounded-xl p-4 shadow-2xs">
                    <span className="text-[10px] font-sans uppercase tracking-[0.2em] text-[#255241] block mb-1 font-semibold">
                      Advances Received
                    </span>
                    <span className="font-serif text-2xl text-[#255241] font-bold">
                      ₹{totalAdvance.toLocaleString('en-IN')}
                    </span>
                  </div>

                  <div className="bg-[#FFFDF9] border border-[#E9DCC0] rounded-xl p-4 shadow-2xs">
                    <span className="text-[10px] font-sans uppercase tracking-[0.2em] text-[#A26214] block mb-1 font-semibold">
                      Balance Outstanding
                    </span>
                    <span className="font-serif text-2xl text-[#A26214] font-bold">
                      ₹{totalBalanceDue.toLocaleString('en-IN')}
                    </span>
                  </div>

                  <div className="bg-[#FFFDF9] border border-[#E9DCC0] rounded-xl p-4 shadow-2xs">
                    <span className="text-[10px] font-sans uppercase tracking-[0.2em] text-[#8C7355] block mb-1 font-semibold">
                      Estimated Net Margin
                    </span>
                    <span className="font-serif text-2xl text-[#8C7355] font-bold">
                      ₹{totalNetMargin.toLocaleString('en-IN')}
                    </span>
                  </div>
                </div>

                {/* Financial Ledger Table */}
                <div className="overflow-x-auto border border-[#E9DCC0] rounded-xl bg-[#FFFDF9] shadow-sm">
                  <table className="w-full text-left border-collapse text-xs">
                    <thead>
                      <tr className="bg-[#FAF4E6] text-[#1A1A1A] border-b border-[#E9DCC0]">
                        <th className="py-3 px-4 font-sans tracking-wider uppercase font-semibold">Event & Client</th>
                        <th className="py-3 px-4 font-sans tracking-wider uppercase font-semibold">Contract Value</th>
                        <th className="py-3 px-4 font-sans tracking-wider uppercase font-semibold">Advance Paid</th>
                        <th className="py-3 px-4 font-sans tracking-wider uppercase font-semibold">Balance Due</th>
                        <th className="py-3 px-4 font-sans tracking-wider uppercase font-semibold">Vendor Outlays (Decor/Food)</th>
                        <th className="py-3 px-4 font-sans tracking-wider uppercase font-semibold">Est Net Margin</th>
                        <th className="py-3 px-4 font-sans tracking-wider uppercase font-semibold">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#E9DCC0]/70 text-[#2D2823]">
                      {financials.map((fin) => {
                        const net = fin.contractValue - (fin.decorExpense + fin.cateringExpense + (fin.otherExpense || 0));
                        return (
                          <tr key={fin.id} className="hover:bg-[#FAF4E6]/60 transition-colors">
                            <td className="py-3 px-4">
                              <div className="font-serif font-medium text-[#1A1A1A] text-[13px]">{fin.eventName}</div>
                              <div className="text-[11px] text-[#8A7E6D]">{fin.clientName}</div>
                            </td>
                            <td className="py-3 px-4 font-mono font-medium text-[#1A1A1A]">
                              ₹{fin.contractValue.toLocaleString('en-IN')}
                            </td>
                            <td className="py-3 px-4 font-mono text-[#255241] font-medium">
                              ₹{fin.advancePaid.toLocaleString('en-IN')}
                            </td>
                            <td className="py-3 px-4 font-mono text-[#A26214] font-medium">
                              ₹{fin.balanceDue.toLocaleString('en-IN')}
                            </td>
                            <td className="py-3 px-4 text-[11px] text-[#7A7266]">
                              <div>Decor: ₹{fin.decorExpense.toLocaleString('en-IN')}</div>
                              <div>Catering: ₹{fin.cateringExpense.toLocaleString('en-IN')}</div>
                            </td>
                            <td className="py-3 px-4 font-mono font-semibold text-[#8C7355]">
                              ₹{net.toLocaleString('en-IN')}
                            </td>
                            <td className="py-3 px-4">
                              <span className="px-2.5 py-1 rounded-full text-[10.5px] font-sans font-medium bg-[#FAF4E6] border border-[#E9DCC0] text-[#8C7355]">
                                {fin.paymentStatus}
                              </span>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* TAB 3: Photos & Services Management */}
            {activeTab === 'content' && (
              <div className="p-4 sm:p-6 space-y-6 overflow-y-auto">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-serif text-xl text-[#1A1A1A]">
                      Website Photos & Services Manager
                    </h4>
                    <p className="text-xs text-[#7A7266]">
                      Admin controls to update photos, titles, and banner visuals across all royal offerings.
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {services.map((srv) => (
                    <div key={srv.id} className="p-4 rounded-xl bg-[#FFFDF9] border border-[#E9DCC0] shadow-2xs flex flex-col justify-between gap-4">
                      <div className="flex gap-4">
                        <img
                          src={srv.image}
                          alt={srv.title}
                          className="w-24 h-24 object-cover rounded-lg border border-[#E9DCC0] flex-shrink-0"
                        />
                        <div className="flex-1 min-w-0">
                          <span className="text-[10px] font-sans uppercase tracking-wider text-[#C9A86A] font-bold">
                            Offering #{srv.number} · {srv.id}
                          </span>
                          <h5 className="font-serif text-base font-bold text-[#1A1A1A] truncate">
                            {srv.title}
                          </h5>
                          <p className="text-xs text-[#7A7266] truncate">
                            {srv.subtitle}
                          </p>
                        </div>
                      </div>

                      <div className="space-y-2 pt-2 border-t border-[#E9DCC0] text-xs">
                        <div>
                          <label className="block text-[10px] uppercase font-bold text-[#8A7E6D] mb-1">
                            Photo URL / Path
                          </label>
                          <input
                            type="text"
                            value={srv.image}
                            onChange={(e) => {
                              if (onUpdateService) {
                                onUpdateService({ ...srv, image: e.target.value });
                              }
                            }}
                            className="w-full px-3 py-1.5 rounded border border-[#E9DCC0] bg-[#FAF7F2] text-xs font-mono text-[#1A1A1A]"
                          />
                        </div>

                        <div>
                          <label className="block text-[10px] uppercase font-bold text-[#8A7E6D] mb-1">
                            English Title
                          </label>
                          <input
                            type="text"
                            value={srv.title}
                            onChange={(e) => {
                              if (onUpdateService) {
                                onUpdateService({ ...srv, title: e.target.value });
                              }
                            }}
                            className="w-full px-3 py-1.5 rounded border border-[#E9DCC0] bg-[#FAF7F2] text-xs font-medium text-[#1A1A1A]"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>
        )}

        {/* Modal: Add New Financial Record */}
        {showAddFinance && (
          <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-[#1A1A1A]/70 backdrop-blur-xs">
            <div className="bg-[#FFFDF9] border border-[#C9A86A] rounded-2xl max-w-lg w-full p-6 shadow-2xl">
              <div className="flex items-center justify-between pb-4 border-b border-[#E9DCC0] mb-4">
                <h4 className="font-serif text-xl text-[#1A1A1A]">Add Event Ledger Entry</h4>
                <button onClick={() => setShowAddFinance(false)} className="text-[#8A7E6D] hover:text-[#1A1A1A] cursor-pointer">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleCreateFinance} className="space-y-3.5 text-xs">
                <div>
                  <label className="block uppercase tracking-wider text-[#8A7E6D] font-semibold mb-1">Client Name</label>
                  <input
                    type="text"
                    required
                    value={newFin.clientName}
                    onChange={(e) => setNewFin({ ...newFin, clientName: e.target.value })}
                    className="w-full px-3 py-2 border border-[#E9DCC0] rounded-md bg-[#FAF7F2]"
                  />
                </div>
                <div>
                  <label className="block uppercase tracking-wider text-[#8A7E6D] font-semibold mb-1">Event Name</label>
                  <input
                    type="text"
                    required
                    value={newFin.eventName}
                    onChange={(e) => setNewFin({ ...newFin, eventName: e.target.value })}
                    className="w-full px-3 py-2 border border-[#E9DCC0] rounded-md bg-[#FAF7F2]"
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block uppercase tracking-wider text-[#8A7E6D] font-semibold mb-1">Contract Total (₹)</label>
                    <input
                      type="number"
                      required
                      value={newFin.contractValue}
                      onChange={(e) => setNewFin({ ...newFin, contractValue: e.target.value })}
                      className="w-full px-3 py-2 border border-[#E9DCC0] rounded-md bg-[#FAF7F2]"
                    />
                  </div>
                  <div>
                    <label className="block uppercase tracking-wider text-[#8A7E6D] font-semibold mb-1">Advance Paid (₹)</label>
                    <input
                      type="number"
                      value={newFin.advancePaid}
                      onChange={(e) => setNewFin({ ...newFin, advancePaid: e.target.value })}
                      className="w-full px-3 py-2 border border-[#E9DCC0] rounded-md bg-[#FAF7F2]"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block uppercase tracking-wider text-[#8A7E6D] font-semibold mb-1">Decor Cost (₹)</label>
                    <input
                      type="number"
                      value={newFin.decorExpense}
                      onChange={(e) => setNewFin({ ...newFin, decorExpense: e.target.value })}
                      className="w-full px-3 py-2 border border-[#E9DCC0] rounded-md bg-[#FAF7F2]"
                    />
                  </div>
                  <div>
                    <label className="block uppercase tracking-wider text-[#8A7E6D] font-semibold mb-1">Catering Cost (₹)</label>
                    <input
                      type="number"
                      value={newFin.cateringExpense}
                      onChange={(e) => setNewFin({ ...newFin, cateringExpense: e.target.value })}
                      className="w-full px-3 py-2 border border-[#E9DCC0] rounded-md bg-[#FAF7F2]"
                    />
                  </div>
                </div>

                <div className="pt-3 flex justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setShowAddFinance(false)}
                    className="px-4 py-2 border border-[#E9DCC0] rounded-md text-[#7A7266] cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 bg-[#1A1A1A] text-white font-semibold rounded-md hover:bg-[#B89657] cursor-pointer"
                  >
                    Save Ledger Entry
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Dedicated Admin Portal Footer */}
        <footer className="bg-[#1A1A1A] text-[#8A7E6D] text-[11px] font-sans py-4 px-6 text-center border-t border-[#C9A86A]/30 mt-auto">
          Shree Ram Events Confidential Administration · Bhilai / Raipur / Durg · Protected Founder Master Vault
        </footer>

      </div>
    </div>
  );
}

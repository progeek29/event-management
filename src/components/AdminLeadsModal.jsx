import React, { useState, useRef, useEffect } from 'react';
import { 
  X, Lock, Download, Phone, MessageSquare, 
  Trash2, Plus, Eye, EyeOff, Search, Sparkles, Calendar, Clock, CheckCircle2,
  ChevronDown, Check, ArrowLeft, ArrowRight, Edit3, ImagePlus,
  GripVertical, ArrowUp, ArrowDown, Upload
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

// Bespoke Gold & Ivory Custom Select (Eliminates all native <select> tags)
function LuxuryCustomSelect({ value, onChange, options }) {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    function handleClickOutside(e) {
      if (ref.current && !ref.current.contains(e.target)) setIsOpen(false);
    }
    if (isOpen) document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  const selectedOpt = options.find(o => (typeof o === 'string' ? o : o.value) === value) || options[0];
  const selectedLabel = typeof selectedOpt === 'string' ? selectedOpt : (selectedOpt.label || selectedOpt.value);

  return (
    <div ref={ref} className="relative w-full text-left">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-3.5 py-2.5 rounded-md border border-[#E9DCC0] bg-[#FAF7F2] text-xs font-medium text-[#1A1A1A] flex items-center justify-between hover:border-[#C9A86A] focus:outline-none focus:border-[#C9A86A] transition-all cursor-pointer shadow-2xs"
      >
        <span className="truncate">{selectedLabel}</span>
        <ChevronDown className={`w-3.5 h-3.5 text-[#8A7E6D] shrink-0 transition-transform duration-200 ${isOpen ? 'rotate-180 text-[#C9A86A]' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute left-0 right-0 top-full mt-1.5 z-50 bg-[#FFFDF9] border border-[#C9A86A]/70 rounded-xl shadow-[0_12px_36px_-8px_rgba(201,168,106,0.25)] py-1.5 animate-in fade-in zoom-in-95 duration-100 text-left">
          {options.map((opt) => {
            const optVal = typeof opt === 'string' ? opt : opt.value;
            const optLabel = typeof opt === 'string' ? opt : opt.label;
            const isSelected = optVal === value;
            return (
              <button
                key={optVal}
                type="button"
                onClick={() => {
                  onChange(optVal);
                  setIsOpen(false);
                }}
                className={`w-full px-3.5 py-2 text-xs font-sans flex items-center justify-between transition-colors cursor-pointer text-left ${
                  isSelected ? 'bg-[#FAF4E6] text-[#8C6B28] font-semibold' : 'text-[#1A1A1A] hover:bg-[#FAF4E6]/60'
                }`}
              >
                <span>{optLabel}</span>
                {isSelected && <Check className="w-3.5 h-3.5 text-[#8C6B28]" />}
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
  onUpdateFinancialRecord,
  onDeleteFinancialRecord,
  services = [],
  onUpdateService,
  onAddService,
  onDeleteService,
  onReorderServices
}) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [adminId, setAdminId] = useState('');
  const [adminPassword, setAdminPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [authError, setAuthError] = useState('');
  
  const [activeTab, setActiveTab] = useState('leads'); // 'leads' | 'financials' | 'content'
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [viewingLead, setViewingLead] = useState(null);
  
  // Financial CRUD State
  const [finSearchTerm, setFinSearchTerm] = useState('');
  const [showAddFinance, setShowAddFinance] = useState(false);
  const [editingFinRecord, setEditingFinRecord] = useState(null);
  const [newFin, setNewFin] = useState({
    clientName: '',
    eventName: '',
    contractValue: '',
    advancePaid: '',
    decorExpense: '',
    cateringExpense: '',
    otherExpense: '',
    paymentStatus: 'Advance Received'
  });

  // Offerings CRUD + Drag & Drop + Edit state
  const [offeringViewMode, setOfferingViewMode] = useState('list'); // 'list' | 'add' | 'edit'
  const [showAddService, setShowAddService] = useState(false);
  const [editingService, setEditingService] = useState(null);
  const [draggedServiceIndex, setDraggedServiceIndex] = useState(null);
  const [dragOverServiceIndex, setDragOverServiceIndex] = useState(null);
  const [newServiceData, setNewServiceData] = useState({
    title: '',
    subtitle: '',
    image: '/events/moments-become-memories.jpg',
    description: '',
    tagline: '',
    decor: '',
    culinary: '',
    hospitality: '',
    guestCapacity: '300 to 1,500+ Guests',
    occasion: 'Royal Wedding & Mandap Setup'
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
      setAuthError('Invalid Admin ID or Password. Access denied.');
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
      'Inquiry Received At': lead.dateSubmitted,
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
      'Other Outlay (INR)': fin.otherExpense || 0,
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
    const other = Number(newFin.otherExpense) || 0;

    const record = {
      id: `FIN-${Date.now().toString().slice(-4)}`,
      clientName: newFin.clientName,
      eventName: newFin.eventName,
      contractValue: contract,
      advancePaid: advance,
      balanceDue: Math.max(0, contract - advance),
      decorExpense: decor,
      cateringExpense: catering,
      otherExpense: other,
      paymentStatus: newFin.paymentStatus
    };

    if (onAddFinancialRecord) {
      onAddFinancialRecord(record);
    }
    setShowAddFinance(false);
    setNewFin({
      clientName: '',
      eventName: '',
      contractValue: '',
      advancePaid: '',
      decorExpense: '',
      cateringExpense: '',
      otherExpense: '',
      paymentStatus: 'Advance Received'
    });
  };

  const handleUpdateFinance = (e) => {
    e.preventDefault();
    if (!editingFinRecord) return;

    const contract = Number(editingFinRecord.contractValue) || 0;
    const advance = Number(editingFinRecord.advancePaid) || 0;
    const decor = Number(editingFinRecord.decorExpense) || 0;
    const catering = Number(editingFinRecord.cateringExpense) || 0;
    const other = Number(editingFinRecord.otherExpense) || 0;

    const updated = {
      ...editingFinRecord,
      contractValue: contract,
      advancePaid: advance,
      balanceDue: Math.max(0, contract - advance),
      decorExpense: decor,
      cateringExpense: catering,
      otherExpense: other
    };

    if (onUpdateFinancialRecord) {
      onUpdateFinancialRecord(updated);
    }
    setEditingFinRecord(null);
  };

  const handleCreateServiceSubmit = (e) => {
    e.preventDefault();
    if (!newServiceData.title.trim()) return;
    const newSrv = {
      id: `story-${Date.now().toString().slice(-4)}`,
      number: String(services.length + 1).padStart(2, '0'),
      title: newServiceData.title,
      subtitle: newServiceData.subtitle || 'Royal Gathering',
      theme: newServiceData.subtitle || 'Royal Gathering',
      image: newServiceData.image || '/events/housewarming_event.jpg',
      caption: newServiceData.description || 'Curated royal hospitality and production by Shree Ram Events.',
      description: newServiceData.description || 'Curated royal hospitality and production by Shree Ram Events.',
      dialogue: newServiceData.description || 'Curated royal hospitality and production by Shree Ram Events.',
      tagline: newServiceData.tagline || newServiceData.subtitle || 'Curated Bespoke Celebration',
      decor: newServiceData.decor || 'Signature customized mandap & ambient illumination.',
      culinary: newServiceData.culinary || 'Authentic regional live banquet preparations in pure desi ghee.',
      hospitality: newServiceData.hospitality || 'Dedicated on-ground operations directors and full guest coordination.',
      guestCapacity: newServiceData.guestCapacity || '300 to 1,500+ Guests',
      occasion: newServiceData.occasion || 'Royal Wedding & Mandap Setup'
    };
    if (onAddService) {
      onAddService(newSrv);
    }
    setShowAddService(false);
    setOfferingViewMode('list');
    setNewServiceData({
      title: '',
      subtitle: '',
      image: '/events/moments-become-memories.jpg',
      description: '',
      tagline: '',
      decor: '',
      culinary: '',
      hospitality: '',
      guestCapacity: '300 to 1,500+ Guests',
      occasion: 'Royal Wedding & Mandap Setup'
    });
  };

  // Drag and Drop handlers for Website Offerings
  const handleDragStart = (e, index) => {
    setDraggedServiceIndex(index);
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/plain', String(index));
  };

  const handleDragOver = (e, index) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    if (dragOverServiceIndex !== index) {
      setDragOverServiceIndex(index);
    }
  };

  const handleDrop = (e, targetIndex) => {
    e.preventDefault();
    if (draggedServiceIndex === null || draggedServiceIndex === targetIndex) {
      setDraggedServiceIndex(null);
      setDragOverServiceIndex(null);
      return;
    }

    const reordered = [...services];
    const [movedItem] = reordered.splice(draggedServiceIndex, 1);
    reordered.splice(targetIndex, 0, movedItem);

    const updated = reordered.map((item, idx) => ({
      ...item,
      number: String(idx + 1).padStart(2, '0')
    }));

    if (onReorderServices) {
      onReorderServices(updated);
    }

    setDraggedServiceIndex(null);
    setDragOverServiceIndex(null);
  };

  const handleDragEnd = () => {
    setDraggedServiceIndex(null);
    setDragOverServiceIndex(null);
  };

  const handleMoveService = (fromIndex, toIndex) => {
    if (toIndex < 0 || toIndex >= services.length) return;
    const reordered = [...services];
    const [movedItem] = reordered.splice(fromIndex, 1);
    reordered.splice(toIndex, 0, movedItem);

    const updated = reordered.map((item, idx) => ({
      ...item,
      number: String(idx + 1).padStart(2, '0')
    }));

    if (onReorderServices) {
      onReorderServices(updated);
    }
  };

  const handleDeleteOffering = (srv) => {
    if (window.confirm(`Are you sure you want to delete offering "${srv.title}"? This will immediately remove it from the live website.`)) {
      if (onDeleteService) {
        onDeleteService(srv.id);
      }
    }
  };

  const handleSaveEditedService = (e) => {
    e.preventDefault();
    if (!editingService) return;
    const updated = {
      ...editingService,
      theme: editingService.subtitle || editingService.theme || 'Royal Gathering',
      subtitle: editingService.subtitle || editingService.theme || 'Royal Gathering',
      caption: editingService.description || editingService.caption || '',
      description: editingService.description || editingService.caption || '',
      dialogue: editingService.dialogue || editingService.description || editingService.caption || '',
      tagline: editingService.tagline || editingService.subtitle || 'Curated Bespoke Celebration',
      decor: editingService.decor || 'Signature customized mandap & ambient illumination.',
      culinary: editingService.culinary || 'Authentic regional live banquet preparations in pure desi ghee.',
      hospitality: editingService.hospitality || 'Dedicated on-ground operations directors and full guest coordination.',
      guestCapacity: editingService.guestCapacity || '300 to 1,500+ Guests',
      occasion: editingService.occasion || 'Royal Wedding & Mandap Setup'
    };
    if (onUpdateService) {
      onUpdateService(updated);
    }
    setEditingService(null);
    setOfferingViewMode('list');
  };

  const handleImageFileChange = (e, isEditing = false) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (uploadEvent) => {
      const dataUrl = uploadEvent.target.result;
      if (isEditing) {
        setEditingService((prev) => ({ ...prev, image: dataUrl }));
      } else {
        setNewServiceData((prev) => ({ ...prev, image: dataUrl }));
      }
    };
    reader.readAsDataURL(file);
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
  const totalRevenue = (financials || []).reduce((acc, f) => acc + (Number(f.contractValue) || 0), 0);
  const totalAdvance = (financials || []).reduce((acc, f) => acc + (Number(f.advancePaid) || 0), 0);
  const totalBalanceDue = (financials || []).reduce((acc, f) => acc + (Number(f.balanceDue) || 0), 0);
  const totalExpenses = (financials || []).reduce((acc, f) => acc + (Number(f.decorExpense) || 0) + (Number(f.cateringExpense) || 0) + (Number(f.otherExpense) || 0), 0);
  const totalNetMargin = totalRevenue - totalExpenses;

  // Filter financial ledger records
  const filteredFinancials = (financials || []).filter((f) => {
    if (!finSearchTerm) return true;
    const term = finSearchTerm.toLowerCase();
    return (
      (f.clientName || '').toLowerCase().includes(term) ||
      (f.eventName || '').toLowerCase().includes(term) ||
      (f.paymentStatus || '').toLowerCase().includes(term) ||
      (f.id || '').toLowerCase().includes(term)
    );
  });

  return (
    <div className="w-full min-h-screen bg-[#FAF7F2] text-[#1A1A1A] flex flex-col font-sans selection:bg-[#C9A86A]/20">
      <div className="w-full flex-1 flex flex-col">
        
        {/* Top Header — Dedicated Page Navigation Bar */}
        <header className="sticky top-0 z-40 bg-[#1A1A1A] px-4 sm:px-8 py-3.5 border-b border-[#C9A86A]/40 flex items-center justify-between text-[#FAF7F2] shadow-md">
          <div className="flex items-center gap-3 sm:gap-4">
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

          <div className="flex items-center gap-3">
            {isAuthenticated ? (
              <button
                onClick={handleLogout}
                className="text-xs font-sans tracking-wider uppercase text-[#C9A86A] hover:text-[#FAF7F2] px-3.5 py-1.5 rounded-lg border border-[#C9A86A]/40 hover:bg-white/10 transition-all cursor-pointer font-medium"
              >
                Logout
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
                    placeholder="Enter admin username"
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
                          <th className="py-3 px-3.5 font-sans tracking-wider uppercase font-semibold">Inquiry Received</th>
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

                              {/* Patron Name & Special Notes - Click to view full description modal */}
                              <td className="py-3.5 px-3.5">
                                <button
                                  type="button"
                                  onClick={() => setViewingLead(lead)}
                                  className="text-left group cursor-pointer"
                                  title="Click to view full inquiry vision and description"
                                >
                                  <div className="font-serif text-sm font-semibold text-[#1A1A1A] group-hover:text-[#8C6B28] transition-colors flex items-center gap-1.5 flex-wrap">
                                    <span>{lead.clientName}</span>
                                    {lead.repeatClient && (
                                      <span className="text-[9px] font-sans px-1.5 py-0.5 rounded bg-[#FFFBF0] text-[#8C6B28] border border-[#E2D1A6] font-semibold tracking-wider uppercase">
                                        Loyal Patron
                                      </span>
                                    )}
                                    <Eye className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 text-[#C9A86A] transition-opacity" />
                                  </div>
                                  {lead.notes && (
                                    <div className="text-[11px] text-[#7A7266] line-clamp-1 max-w-xs mt-0.5 group-hover:text-[#5A5246] transition-colors">
                                      "{lead.notes}"
                                    </div>
                                  )}
                                </button>
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

                              {/* Inquiry Received Timestamp */}
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
                                <div className="inline-flex items-center gap-1">
                                  <button
                                    type="button"
                                    onClick={() => setViewingLead(lead)}
                                    className="p-1.5 text-[#8C6B28] hover:text-[#1A1A1A] hover:bg-[#FAF4E6] rounded-md transition-colors cursor-pointer"
                                    title="View Full Farmaan Description"
                                  >
                                    <Eye className="w-4 h-4" />
                                  </button>
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
                                </div>
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

            {/* Tab 2: Private Financials Ledger View (Full CRUD) */}
            {activeTab === 'financials' && (
              <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
                
                {/* Financial Ledger Toolbar */}
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 bg-[#FFFDF9] border border-[#E9DCC0] p-4 rounded-xl shadow-2xs">
                  <div>
                    <h3 className="font-serif text-lg sm:text-xl text-[#1A1A1A] flex items-center gap-2 m-0">
                      <span>Event Financial Ledger (Hisaab-Kitab)</span>
                      <span className="text-[10.5px] font-sans px-2 py-0.5 rounded-full bg-[#FAF4E6] text-[#8C6B28] border border-[#E2D1A6] font-semibold">
                        {financials.length} Events
                      </span>
                    </h3>
                    <p className="text-xs text-[#7A7266] m-0 mt-0.5">
                      Track client contracts, advance tokens, vendor expenses (Decor & Food), balance dues, and real profit margins.
                    </p>
                  </div>

                  <div className="flex flex-wrap items-center gap-2.5">
                    {/* Search in Ledger */}
                    <div className="relative">
                      <Search className="w-3.5 h-3.5 text-[#8A7E6D] absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        placeholder="Search event or client..."
                        value={finSearchTerm}
                        onChange={(e) => setFinSearchTerm(e.target.value)}
                        className="pl-8 pr-3 py-1.5 text-xs bg-[#FAF7F2] border border-[#E9DCC0] rounded-lg text-[#1A1A1A] placeholder-[#8A7E6D] focus:outline-none focus:border-[#C9A86A] w-48 sm:w-56 transition-all"
                      />
                    </div>

                    {/* Download Excel */}
                    <button
                      type="button"
                      onClick={exportFinanceToExcel}
                      className="px-3 py-1.5 rounded-lg border border-[#E9DCC0] bg-[#FAF7F2] hover:bg-[#FAF4E6] text-xs font-sans text-[#1A1A1A] flex items-center gap-1.5 cursor-pointer transition-all shadow-2xs font-medium"
                      title="Download Excel Sheet"
                    >
                      <Download className="w-3.5 h-3.5 text-[#8C6B28]" />
                      <span className="hidden sm:inline">Export Excel</span>
                    </button>

                    {/* Create New Entry Button */}
                    <button
                      type="button"
                      onClick={() => setShowAddFinance(true)}
                      className="px-3.5 py-1.5 rounded-lg bg-[#1A1A1A] hover:bg-[#C9A86A] text-white text-xs font-sans flex items-center gap-1.5 cursor-pointer transition-all shadow-sm font-semibold hover:text-[#1A1A1A]"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Add Event Record</span>
                    </button>
                  </div>
                </div>

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
                      Pending Balance Dues
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
                  {filteredFinancials.length === 0 ? (
                    <div className="p-8 text-center text-[#8A7E6D]">
                      <p className="font-serif text-base text-[#1A1A1A] mb-1">No Financial Entries Found</p>
                      <p className="text-xs">Click "Add Event Record" to add an entry to your ledger.</p>
                    </div>
                  ) : (
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
                          <th className="py-3 px-4 font-sans tracking-wider uppercase font-semibold text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[#E9DCC0]/70 text-[#2D2823]">
                        {filteredFinancials.map((fin) => {
                          const net = Number(fin.contractValue) - (Number(fin.decorExpense || 0) + Number(fin.cateringExpense || 0) + Number(fin.otherExpense || 0));
                          return (
                            <tr key={fin.id} className="hover:bg-[#FAF4E6]/60 transition-colors">
                              <td className="py-3 px-4">
                                <div className="font-serif font-medium text-[#1A1A1A] text-[13px]">{fin.eventName}</div>
                                <div className="text-[11px] text-[#8A7E6D]">{fin.clientName}</div>
                                <span className="text-[9.5px] font-mono text-[#A39688]">{fin.id}</span>
                              </td>
                              <td className="py-3 px-4 font-mono font-medium text-[#1A1A1A]">
                                ₹{Number(fin.contractValue || 0).toLocaleString('en-IN')}
                              </td>
                              <td className="py-3 px-4 font-mono text-[#255241] font-medium">
                                ₹{Number(fin.advancePaid || 0).toLocaleString('en-IN')}
                              </td>
                              <td className="py-3 px-4 font-mono text-[#A26214] font-medium">
                                ₹{Number(fin.balanceDue || 0).toLocaleString('en-IN')}
                              </td>
                              <td className="py-3 px-4 text-[11px] text-[#7A7266]">
                                <div>Decor: ₹{Number(fin.decorExpense || 0).toLocaleString('en-IN')}</div>
                                <div>Catering: ₹{Number(fin.cateringExpense || 0).toLocaleString('en-IN')}</div>
                                {Number(fin.otherExpense || 0) > 0 && (
                                  <div>Other: ₹{Number(fin.otherExpense).toLocaleString('en-IN')}</div>
                                )}
                              </td>
                              <td className="py-3 px-4 font-mono font-semibold text-[#8C7355]">
                                ₹{net.toLocaleString('en-IN')}
                              </td>
                              <td className="py-3 px-4">
                                <span className={`px-2.5 py-1 rounded-full text-[10.5px] font-sans font-medium border ${
                                  fin.paymentStatus === 'Fully Paid'
                                    ? 'bg-[#EBF7EE] text-[#1D6F42] border-[#A7DFBA]'
                                    : fin.paymentStatus === 'Advance Received'
                                    ? 'bg-[#FFFBF0] text-[#8C6B28] border-[#E2D1A6]'
                                    : 'bg-[#FAF4E6] text-[#8C7355] border-[#E9DCC0]'
                                }`}>
                                  {fin.paymentStatus}
                                </span>
                              </td>
                              <td className="py-3 px-4 text-right whitespace-nowrap">
                                <div className="inline-flex items-center gap-1.5">
                                  {/* Edit Button */}
                                  <button
                                    type="button"
                                    onClick={() => setEditingFinRecord(fin)}
                                    className="p-1.5 text-[#8C6B28] hover:text-[#1A1A1A] hover:bg-[#FAF4E6] rounded-md transition-colors cursor-pointer"
                                    title="Edit Financial Record (Update Payments / Expenses)"
                                  >
                                    <Edit3 className="w-4 h-4" />
                                  </button>

                                  {/* Delete Button */}
                                  <button
                                    type="button"
                                    onClick={() => {
                                      if (window.confirm(`Are you sure you want to delete financial record for "${fin.eventName}" (${fin.clientName})?`)) {
                                        if (onDeleteFinancialRecord) {
                                          onDeleteFinancialRecord(fin.id);
                                        }
                                      }
                                    }}
                                    className="p-1.5 text-[#A39688] hover:text-[#9B2C2C] hover:bg-[#FFF5F5] rounded-md transition-colors cursor-pointer"
                                    title="Delete Record"
                                  >
                                    <Trash2 className="w-4 h-4" />
                                  </button>
                                </div>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  )}
                </div>
              </div>
            )}

            {/* TAB 3: Photos & Services Management */}
            {activeTab === 'content' && (
              <div className="p-4 sm:p-6 space-y-6">
                {offeringViewMode === 'list' ? (
                  // --- 1. LIST VIEW OF ALL OFFERING CARDS ---
                  <div className="space-y-6">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#FFFDF9] border border-[#E9DCC0] p-4 rounded-xl shadow-2xs">
                      <div>
                        <h4 className="font-serif text-xl text-[#1A1A1A] m-0">
                          Website Photos & Offerings Manager
                        </h4>
                        <p className="text-xs text-[#7A7266] m-0 mt-0.5">
                          Admin controls to update photos, titles, and dossier highlights across all royal offerings cards.
                        </p>
                      </div>

                      <button
                        type="button"
                        onClick={() => {
                          setNewServiceData({
                            title: '',
                            subtitle: '',
                            image: '/events/moments-become-memories.jpg',
                            description: '',
                            tagline: '',
                            decor: '',
                            culinary: '',
                            hospitality: '',
                            guestCapacity: '300 to 1,500+ Guests',
                            occasion: 'Royal Wedding & Mandap Setup'
                          });
                          setOfferingViewMode('add');
                        }}
                        className="px-4 py-2 rounded-lg bg-[#1A1A1A] hover:bg-[#C9A86A] text-white text-xs font-sans flex items-center gap-2 cursor-pointer transition-all shadow-sm font-semibold hover:text-[#1A1A1A] self-start sm:self-auto"
                      >
                        <Plus className="w-4 h-4" />
                        <span>Add Offering Card</span>
                      </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      {services.map((srv, index) => {
                        const isDragged = draggedServiceIndex === index;
                        const isDragOver = dragOverServiceIndex === index;

                        return (
                          <div
                            key={srv.id}
                            draggable={true}
                            onDragStart={(e) => handleDragStart(e, index)}
                            onDragOver={(e) => handleDragOver(e, index)}
                            onDrop={(e) => handleDrop(e, index)}
                            onDragEnd={handleDragEnd}
                            className={`p-4 rounded-xl bg-[#FFFDF9] border transition-all flex flex-col justify-between gap-4 select-none ${
                              isDragged
                                ? 'opacity-40 border-dashed border-[#C9A86A] shadow-inner'
                                : isDragOver
                                ? 'ring-2 ring-[#C9A86A] border-[#C9A86A] bg-[#FAF4E6]/90 shadow-md scale-[1.01]'
                                : 'border-[#E9DCC0] shadow-2xs hover:border-[#C9A86A]/70 hover:shadow-xs'
                            }`}
                          >
                            {/* Card Header Bar: Drag Handle + Actions */}
                            <div className="flex items-center justify-between pb-2.5 border-b border-[#E9DCC0]">
                              <div className="flex items-center gap-2">
                                <div 
                                  className="p-1 text-[#8C6B28] hover:text-[#1A1A1A] cursor-grab active:cursor-grabbing hover:bg-[#FAF4E6] rounded transition-colors"
                                  title="Click and drag to reorder cards"
                                >
                                  <GripVertical className="w-4 h-4" />
                                </div>
                                <span className="text-[10px] font-sans uppercase tracking-wider text-[#C9A86A] font-bold px-2 py-0.5 rounded bg-[#FAF4E6] border border-[#E2D1A6]">
                                  Card #{srv.number || String(index + 1).padStart(2, '0')}
                                </span>
                              </div>

                              <div className="flex items-center gap-1.5">
                                {/* Move Up */}
                                <button
                                  type="button"
                                  disabled={index === 0}
                                  onClick={() => handleMoveService(index, index - 1)}
                                  className={`p-1 rounded text-[#8A7E6D] hover:text-[#1A1A1A] hover:bg-[#FAF4E6] transition-colors cursor-pointer ${
                                    index === 0 ? 'opacity-30 cursor-not-allowed' : ''
                                  }`}
                                  title="Move card up"
                                >
                                  <ArrowUp className="w-3.5 h-3.5" />
                                </button>

                                {/* Move Down */}
                                <button
                                  type="button"
                                  disabled={index === services.length - 1}
                                  onClick={() => handleMoveService(index, index + 1)}
                                  className={`p-1 rounded text-[#8A7E6D] hover:text-[#1A1A1A] hover:bg-[#FAF4E6] transition-colors cursor-pointer ${
                                    index === services.length - 1 ? 'opacity-30 cursor-not-allowed' : ''
                                  }`}
                                  title="Move card down"
                                >
                                  <ArrowDown className="w-3.5 h-3.5" />
                                </button>

                                {/* Edit Button - Opens Full Page Editor */}
                                <button
                                  type="button"
                                  onClick={() => {
                                    setEditingService({ ...srv });
                                    setOfferingViewMode('edit');
                                  }}
                                  className="px-2.5 py-1 rounded bg-[#FAF4E6] hover:bg-[#C9A86A] text-[#1A1A1A] hover:text-white border border-[#E2D1A6] text-[11px] font-medium flex items-center gap-1.5 cursor-pointer transition-all"
                                  title="Open full dedicated card editor"
                                >
                                  <Edit3 className="w-3 h-3 text-[#8C6B28]" />
                                  <span>Edit</span>
                                </button>

                                {/* Delete Button */}
                                <button
                                  type="button"
                                  onClick={() => handleDeleteOffering(srv)}
                                  className="p-1 rounded text-[#A39688] hover:text-[#9B2C2C] hover:bg-[#FFF5F5] transition-colors cursor-pointer"
                                  title="Delete offering card"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            </div>

                            {/* Card Body: Thumbnail & Details */}
                            <div 
                              className="flex gap-4 cursor-pointer group" 
                              onClick={() => { 
                                setEditingService({ ...srv }); 
                                setOfferingViewMode('edit'); 
                              }}
                              title="Click to open full card editor"
                            >
                              <img
                                src={srv.image}
                                alt={srv.title}
                                className="w-24 h-24 object-cover rounded-lg border border-[#E9DCC0] flex-shrink-0 group-hover:opacity-90 transition-opacity"
                                onError={(e) => {
                                  e.target.src = '/events/housewarming_event.jpg';
                                }}
                              />
                              <div className="flex-1 min-w-0">
                                <span className="text-[10px] font-sans uppercase tracking-wider text-[#8C6B28] font-semibold block">
                                  {srv.subtitle || 'Royal Offering'}
                                </span>
                                <h5 className="font-serif text-base font-bold text-[#1A1A1A] truncate mt-0.5 group-hover:text-[#8C6B28] transition-colors">
                                  {srv.title}
                                </h5>
                                <p className="text-xs text-[#7A7266] line-clamp-2 mt-1">
                                  {srv.description || srv.subtitle}
                                </p>
                                <span className="inline-flex items-center gap-1 mt-2 text-[11px] text-[#8C6B28] font-semibold">
                                  Edit details & photos →
                                </span>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ) : (
                  // --- 2. FULL-PAGE DEDICATED CARD EDITOR SCREEN (NO POPUP!) ---
                  <div className="bg-[#FFFDF9] border border-[#E9DCC0] rounded-2xl p-6 sm:p-8 shadow-xs animate-in fade-in duration-200">
                    <form 
                      onSubmit={offeringViewMode === 'edit' ? handleSaveEditedService : handleCreateServiceSubmit} 
                      className="space-y-8"
                    >
                      {/* Top Header & Breadcrumb Navigation */}
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#E9DCC0]">
                        <div className="space-y-1">
                          <button
                            type="button"
                            onClick={() => {
                              setEditingService(null);
                              setOfferingViewMode('list');
                            }}
                            className="inline-flex items-center gap-1.5 text-xs text-[#8C6B28] hover:text-[#1A1A1A] font-semibold transition-colors cursor-pointer mb-1"
                          >
                            <ArrowLeft className="w-3.5 h-3.5" />
                            <span>Back to All Cards</span>
                          </button>
                          <h3 className="font-serif text-2xl sm:text-3xl text-[#1A1A1A] m-0">
                            {offeringViewMode === 'edit' 
                              ? `Edit Offering Card #${editingService?.number || '01'}`
                              : 'Create New Royal Offering Card'}
                          </h3>
                          <p className="text-xs text-[#7A7266] m-0">
                            Dedicated workspace to configure card visuals, live website preview, and the rich experience dossier.
                          </p>
                        </div>

                        {/* Top Action Buttons */}
                        <div className="flex items-center gap-3 self-start sm:self-auto">
                          <button
                            type="button"
                            onClick={() => {
                              setEditingService(null);
                              setOfferingViewMode('list');
                            }}
                            className="px-4 py-2 border border-[#E9DCC0] rounded-lg text-xs font-medium text-[#7A7266] hover:bg-[#FAF4E6] cursor-pointer transition-colors"
                          >
                            Cancel
                          </button>
                          <button
                            type="submit"
                            className="px-5 py-2 bg-[#1A1A1A] hover:bg-[#C9A86A] text-white hover:text-[#1A1A1A] text-xs font-semibold rounded-lg shadow-sm cursor-pointer transition-all flex items-center gap-1.5"
                          >
                            <Check className="w-3.5 h-3.5" />
                            <span>{offeringViewMode === 'edit' ? 'Save Changes' : 'Create Offering Card'}</span>
                          </button>
                        </div>
                      </div>

                      {/* 2-Column Responsive Editor Form */}
                      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                        
                        {/* LEFT COLUMN: Visuals & Live Website Preview (lg:col-span-5) */}
                        <div className="lg:col-span-5 space-y-6">
                          
                          {/* Live Card Preview Box */}
                          <div className="bg-[#FAF7F2] p-4 sm:p-5 rounded-2xl border border-[#E9DCC0]">
                            <div className="flex items-center justify-between mb-3">
                              <span className="text-[11px] font-bold uppercase tracking-wider text-[#8C6B28]">
                                Live Website Card Preview
                              </span>
                              <span className="text-[10px] font-sans uppercase tracking-wider text-[#8C6B28] font-bold px-2 py-0.5 rounded bg-[#FAF4E6] border border-[#E2D1A6]">
                                Card #{offeringViewMode === 'edit' ? (editingService?.number || '01') : String(services.length + 1).padStart(2, '0')}
                              </span>
                            </div>

                            {/* Simulated Website Card */}
                            <div className="bg-[#FFFDF9] rounded-2xl border border-[#E9DCC0] p-4 shadow-sm space-y-3">
                              <div className="relative aspect-[4/3] rounded-xl overflow-hidden border border-[#E9DCC0] bg-[#FAF7F2]">
                                <img
                                  src={offeringViewMode === 'edit' ? (editingService?.image || '') : newServiceData.image}
                                  alt="Card preview"
                                  className="w-full h-full object-cover"
                                  onError={(e) => {
                                    e.target.src = '/events/moments-become-memories.jpg';
                                  }}
                                />
                                <div className="absolute top-2.5 left-2.5">
                                  <span className="px-2.5 py-0.5 rounded-full bg-[#1C1A18]/80 backdrop-blur-xs text-[10px] uppercase tracking-wider font-semibold text-[#C5A880]">
                                    {(offeringViewMode === 'edit' ? editingService?.subtitle : newServiceData.subtitle) || 'Royal Offering'}
                                  </span>
                                </div>
                              </div>

                              <div className="pt-1">
                                <h4 className="font-serif text-lg font-bold text-[#1A1A1A] leading-snug">
                                  {(offeringViewMode === 'edit' ? editingService?.title : newServiceData.title) || 'Untitled Offering'}
                                </h4>
                                <p className="text-xs text-[#7A7266] line-clamp-2 mt-1 font-light">
                                  {(offeringViewMode === 'edit' ? editingService?.description : newServiceData.description) || 'Curated royal hospitality and production by Shree Ram Events.'}
                                </p>
                              </div>

                              <div className="pt-2 border-t border-[#E9DCC0] flex items-center justify-between">
                                <span className="text-[11px] italic font-serif text-[#8C6B28]">
                                  Bespoke Dossier
                                </span>
                                <div className="w-7 h-7 rounded-full bg-[#FAF7F2] border border-[#8C7355]/30 flex items-center justify-center text-[#8C7355] shadow-2xs">
                                  <ArrowRight className="w-3.5 h-3.5" />
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* Photo Controls */}
                          <div className="bg-[#FFFDF9] p-4 sm:p-5 rounded-2xl border border-[#E9DCC0] space-y-4">
                            <span className="text-[11px] font-bold uppercase tracking-wider text-[#8C6B28] block">
                              Photo & Visual Asset
                            </span>

                            <div>
                              <label className="block text-[11px] uppercase tracking-wider font-semibold text-[#8A7E6D] mb-1">
                                Photo URL or Path
                              </label>
                              <input
                                type="text"
                                placeholder="/events/xyz.jpg or https://images.unsplash.com/..."
                                value={offeringViewMode === 'edit' ? (editingService?.image || '') : newServiceData.image}
                                onChange={(e) => {
                                  if (offeringViewMode === 'edit') {
                                    setEditingService({ ...editingService, image: e.target.value });
                                  } else {
                                    setNewServiceData({ ...newServiceData, image: e.target.value });
                                  }
                                }}
                                className="w-full px-3 py-2 border border-[#E9DCC0] rounded-lg bg-[#FAF7F2] text-[#1A1A1A] font-mono text-xs focus:outline-none focus:border-[#C9A86A]"
                              />
                            </div>

                            <div>
                              <label className="block text-[11px] uppercase tracking-wider font-semibold text-[#8A7E6D] mb-1">
                                Upload Photo from Computer
                              </label>
                              <label className="w-full px-4 py-2.5 border border-dashed border-[#C9A86A] rounded-lg bg-[#FAF4E6]/50 text-[#8C6B28] hover:bg-[#FAF4E6] flex items-center justify-center gap-2 cursor-pointer transition-colors font-medium text-xs">
                                <Upload className="w-4 h-4" />
                                <span>Choose Image File...</span>
                                <input
                                  type="file"
                                  accept="image/*"
                                  onChange={(e) => handleImageFileChange(e, offeringViewMode === 'edit')}
                                  className="hidden"
                                />
                              </label>
                            </div>

                            {/* Quick Presets Picker with Verified Real Photos */}
                            <div>
                              <label className="block text-[11px] uppercase tracking-wider font-semibold text-[#8A7E6D] mb-2">
                                Quick Preset Royalty Photos
                              </label>
                              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                                {[
                                  { name: 'Mandap & Vows', path: '/events/moments-become-memories.jpg' },
                                  { name: 'Bride & Sangeet', path: '/events/unplanned-moments.jpg' },
                                  { name: 'Family Reception', path: '/events/laughter-chaos-love.jpg' },
                                  { name: 'Housewarming', path: '/events/housewarming_event.jpg' },
                                  { name: 'Corporate Gala', path: '/events/every-detail-matters.jpg' },
                                  { name: 'Royal Details', path: '/events/timeless-stories-editorial.jpg' }
                                ].map((preset) => (
                                  <button
                                    key={preset.path}
                                    type="button"
                                    onClick={() => {
                                      if (offeringViewMode === 'edit') {
                                        setEditingService({ ...editingService, image: preset.path });
                                      } else {
                                        setNewServiceData({ ...newServiceData, image: preset.path });
                                      }
                                    }}
                                    className="p-1.5 rounded-lg border border-[#E9DCC0] hover:border-[#C9A86A] hover:bg-[#FAF4E6]/40 bg-[#FAF7F2] text-left transition-all cursor-pointer group flex items-center gap-2.5 shadow-2xs"
                                  >
                                    <img 
                                      src={preset.path} 
                                      alt={preset.name} 
                                      className="w-10 h-10 object-cover rounded-md group-hover:scale-105 transition-transform shrink-0 border border-[#E9DCC0]" 
                                    />
                                    <span className="text-[11px] text-[#2C2723] font-medium leading-tight line-clamp-2">
                                      {preset.name}
                                    </span>
                                  </button>
                                ))}
                              </div>
                            </div>
                          </div>

                        </div>

                        {/* RIGHT COLUMN: Details & Bespoke Dossier Elements (lg:col-span-7) */}
                        <div className="lg:col-span-7 space-y-6">
                          
                          {/* Card Basic Information */}
                          <div className="bg-[#FFFDF9] p-5 sm:p-6 rounded-2xl border border-[#E9DCC0] space-y-4">
                            <span className="text-[11px] font-bold uppercase tracking-wider text-[#8C6B28] block">
                              1. Card Titles & Narrative
                            </span>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                              <div>
                                <label className="block text-[11px] uppercase tracking-wider font-semibold text-[#8A7E6D] mb-1">
                                  Offering Title *
                                </label>
                                <input
                                  type="text"
                                  required
                                  placeholder="e.g. Royal Wedding & Mandap Setup"
                                  value={offeringViewMode === 'edit' ? (editingService?.title || '') : newServiceData.title}
                                  onChange={(e) => {
                                    if (offeringViewMode === 'edit') {
                                      setEditingService({ ...editingService, title: e.target.value });
                                    } else {
                                      setNewServiceData({ ...newServiceData, title: e.target.value });
                                    }
                                  }}
                                  className="w-full px-3.5 py-2 border border-[#E9DCC0] rounded-lg bg-[#FAF7F2] text-[#1A1A1A] font-medium text-xs focus:outline-none focus:border-[#C9A86A]"
                                />
                              </div>

                              <div>
                                <label className="block text-[11px] uppercase tracking-wider font-semibold text-[#8A7E6D] mb-1">
                                  Theme Subtitle / Tag *
                                </label>
                                <input
                                  type="text"
                                  placeholder="e.g. Sacred Promises, Drone Symphony"
                                  value={offeringViewMode === 'edit' ? (editingService?.subtitle || '') : newServiceData.subtitle}
                                  onChange={(e) => {
                                    if (offeringViewMode === 'edit') {
                                      setEditingService({ ...editingService, subtitle: e.target.value });
                                    } else {
                                      setNewServiceData({ ...newServiceData, subtitle: e.target.value });
                                    }
                                  }}
                                  className="w-full px-3.5 py-2 border border-[#E9DCC0] rounded-lg bg-[#FAF7F2] text-[#1A1A1A] text-xs focus:outline-none focus:border-[#C9A86A]"
                                />
                              </div>
                            </div>

                            <div>
                              <label className="block text-[11px] uppercase tracking-wider font-semibold text-[#8A7E6D] mb-1">
                                Card Brief Caption / Description
                              </label>
                              <textarea
                                rows={2}
                                placeholder="Brief caption shown on the front of the card..."
                                value={offeringViewMode === 'edit' ? (editingService?.description || '') : newServiceData.description}
                                onChange={(e) => {
                                  if (offeringViewMode === 'edit') {
                                    setEditingService({ ...editingService, description: e.target.value });
                                  } else {
                                    setNewServiceData({ ...newServiceData, description: e.target.value });
                                  }
                                }}
                                className="w-full px-3.5 py-2 border border-[#E9DCC0] rounded-lg bg-[#FAF7F2] text-[#1A1A1A] text-xs focus:outline-none focus:border-[#C9A86A]"
                              />
                            </div>
                          </div>

                          {/* Bespoke Dossier Highlights */}
                          <div className="bg-[#FAF4E6]/40 p-5 sm:p-6 rounded-2xl border border-[#C9A86A]/40 space-y-4">
                            <div>
                              <span className="text-[11px] font-bold uppercase tracking-wider text-[#8C6B28] block">
                                2. Bespoke Experience Dossier Details
                              </span>
                              <p className="text-[11px] text-[#7A7266] m-0 mt-0.5">
                                These details appear when a guest clicks the card's right arrow to view full event production details.
                              </p>
                            </div>

                            <div>
                              <label className="block text-[11px] uppercase tracking-wider font-semibold text-[#8A7E6D] mb-1">
                                Poetic Quote / Tagline
                              </label>
                              <input
                                type="text"
                                placeholder="e.g. Unscripted Joy & Royal Stature"
                                value={offeringViewMode === 'edit' ? (editingService?.tagline || '') : newServiceData.tagline}
                                onChange={(e) => {
                                  if (offeringViewMode === 'edit') {
                                    setEditingService({ ...editingService, tagline: e.target.value });
                                  } else {
                                    setNewServiceData({ ...newServiceData, tagline: e.target.value });
                                  }
                                }}
                                className="w-full px-3.5 py-2 border border-[#E9DCC0] rounded-lg bg-white text-[#1A1A1A] text-xs focus:outline-none focus:border-[#C9A86A]"
                              />
                            </div>

                            <div>
                              <label className="block text-[11px] uppercase tracking-wider font-semibold text-[#8A7E6D] mb-1">
                                🏛️ Architectural Decor Element
                              </label>
                              <input
                                type="text"
                                placeholder="e.g. Hand-carved mandap with cascading mogra canopies & brass lamps..."
                                value={offeringViewMode === 'edit' ? (editingService?.decor || '') : newServiceData.decor}
                                onChange={(e) => {
                                  if (offeringViewMode === 'edit') {
                                    setEditingService({ ...editingService, decor: e.target.value });
                                  } else {
                                    setNewServiceData({ ...newServiceData, decor: e.target.value });
                                  }
                                }}
                                className="w-full px-3.5 py-2 border border-[#E9DCC0] rounded-lg bg-white text-[#1A1A1A] text-xs focus:outline-none focus:border-[#C9A86A]"
                              />
                            </div>

                            <div>
                              <label className="block text-[11px] uppercase tracking-wider font-semibold text-[#8A7E6D] mb-1">
                                🍽️ Culinary Harmony Element
                              </label>
                              <input
                                type="text"
                                placeholder="e.g. Royal Awadhi Dastarkhwan, live Banarasi chaat street in pure desi ghee..."
                                value={offeringViewMode === 'edit' ? (editingService?.culinary || '') : newServiceData.culinary}
                                onChange={(e) => {
                                  if (offeringViewMode === 'edit') {
                                    setEditingService({ ...editingService, culinary: e.target.value });
                                  } else {
                                    setNewServiceData({ ...newServiceData, culinary: e.target.value });
                                  }
                                }}
                                className="w-full px-3.5 py-2 border border-[#E9DCC0] rounded-lg bg-white text-[#1A1A1A] text-xs focus:outline-none focus:border-[#C9A86A]"
                              />
                            </div>

                            <div>
                              <label className="block text-[11px] uppercase tracking-wider font-semibold text-[#8A7E6D] mb-1">
                                🌟 Royal Protocol & Concierge
                              </label>
                              <input
                                type="text"
                                placeholder="e.g. Silver platter attar greeting, VIP logistics & dedicated family concierge..."
                                value={offeringViewMode === 'edit' ? (editingService?.hospitality || '') : newServiceData.hospitality}
                                onChange={(e) => {
                                  if (offeringViewMode === 'edit') {
                                    setEditingService({ ...editingService, hospitality: e.target.value });
                                  } else {
                                    setNewServiceData({ ...newServiceData, hospitality: e.target.value });
                                  }
                                }}
                                className="w-full px-3.5 py-2 border border-[#E9DCC0] rounded-lg bg-white text-[#1A1A1A] text-xs focus:outline-none focus:border-[#C9A86A]"
                              />
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                              <div>
                                <label className="block text-[11px] uppercase tracking-wider font-semibold text-[#8A7E6D] mb-1">
                                  👥 Guest Assembly Capacity
                                </label>
                                <input
                                  type="text"
                                  placeholder="e.g. 300 to 1,500+ Guests"
                                  value={offeringViewMode === 'edit' ? (editingService?.guestCapacity || '') : newServiceData.guestCapacity}
                                  onChange={(e) => {
                                    if (offeringViewMode === 'edit') {
                                      setEditingService({ ...editingService, guestCapacity: e.target.value });
                                    } else {
                                      setNewServiceData({ ...newServiceData, guestCapacity: e.target.value });
                                    }
                                  }}
                                  className="w-full px-3.5 py-2 border border-[#E9DCC0] rounded-lg bg-white text-[#1A1A1A] text-xs focus:outline-none focus:border-[#C9A86A]"
                                />
                              </div>

                              <div>
                                <label className="block text-[11px] uppercase tracking-wider font-semibold text-[#8A7E6D] mb-1">
                                  🎯 Target Booking Form Occasion
                                </label>
                                <LuxuryCustomSelect
                                  value={offeringViewMode === 'edit' ? (editingService?.occasion || 'Royal Wedding & Mandap Setup') : newServiceData.occasion}
                                  onChange={(val) => {
                                    if (offeringViewMode === 'edit') {
                                      setEditingService({ ...editingService, occasion: val });
                                    } else {
                                      setNewServiceData({ ...newServiceData, occasion: val });
                                    }
                                  }}
                                  options={[
                                    'Royal Wedding & Mandap Setup',
                                    'Engagement & Sangeet Gala',
                                    'Catering & 5-Star Royal Feasts',
                                    'Corporate & Theme Galas',
                                    'Housewarming & Spiritual Ceremonies',
                                    'Other Bespoke Royal Celebration'
                                  ]}
                                />
                              </div>
                            </div>

                          </div>

                        </div>

                      </div>

                      {/* Bottom Action Bar */}
                      <div className="pt-6 border-t border-[#E9DCC0] flex items-center justify-end gap-3">
                        <button
                          type="button"
                          onClick={() => {
                            setEditingService(null);
                            setOfferingViewMode('list');
                          }}
                          className="px-5 py-2.5 border border-[#E9DCC0] rounded-lg text-xs font-medium text-[#7A7266] hover:bg-[#FAF4E6] cursor-pointer transition-colors"
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          className="px-6 py-2.5 bg-[#1A1A1A] hover:bg-[#C9A86A] text-white hover:text-[#1A1A1A] text-xs font-semibold rounded-lg shadow-sm cursor-pointer transition-all flex items-center gap-2"
                        >
                          <Check className="w-4 h-4" />
                          <span>{offeringViewMode === 'edit' ? 'Save Changes' : 'Create Offering Card'}</span>
                        </button>
                      </div>

                    </form>
                  </div>
                )}
              </div>
            )}

          </div>
        )}

        {/* Modal: Add New Financial Record (Create) */}
        {showAddFinance && (
          <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-[#1A1A1A]/70 backdrop-blur-xs">
            <div className="bg-[#FFFDF9] border border-[#C9A86A] rounded-2xl max-w-lg w-full p-6 shadow-2xl max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between pb-4 border-b border-[#E9DCC0] mb-4">
                <div>
                  <h4 className="font-serif text-xl text-[#1A1A1A] m-0">Add Event Ledger Entry</h4>
                  <p className="text-[11px] text-[#7A7266] m-0">Create new event hisaab-kitab record</p>
                </div>
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
                    placeholder="e.g., Agrawal Parivaar"
                    value={newFin.clientName}
                    onChange={(e) => setNewFin({ ...newFin, clientName: e.target.value })}
                    className="w-full px-3 py-2 border border-[#E9DCC0] rounded-md bg-[#FAF7F2] text-[#1A1A1A]"
                  />
                </div>
                <div>
                  <label className="block uppercase tracking-wider text-[#8A7E6D] font-semibold mb-1">Event Name / Occasion</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g., Grand Royal Wedding & Reception"
                    value={newFin.eventName}
                    onChange={(e) => setNewFin({ ...newFin, eventName: e.target.value })}
                    className="w-full px-3 py-2 border border-[#E9DCC0] rounded-md bg-[#FAF7F2] text-[#1A1A1A]"
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block uppercase tracking-wider text-[#8A7E6D] font-semibold mb-1">Total Contract (₹)</label>
                    <input
                      type="number"
                      required
                      placeholder="e.g. 500000"
                      value={newFin.contractValue}
                      onChange={(e) => setNewFin({ ...newFin, contractValue: e.target.value })}
                      className="w-full px-3 py-2 border border-[#E9DCC0] rounded-md bg-[#FAF7F2] text-[#1A1A1A]"
                    />
                  </div>
                  <div>
                    <label className="block uppercase tracking-wider text-[#8A7E6D] font-semibold mb-1">Advance Paid (₹)</label>
                    <input
                      type="number"
                      placeholder="e.g. 200000"
                      value={newFin.advancePaid}
                      onChange={(e) => setNewFin({ ...newFin, advancePaid: e.target.value })}
                      className="w-full px-3 py-2 border border-[#E9DCC0] rounded-md bg-[#FAF7F2] text-[#1A1A1A]"
                    />
                  </div>
                </div>

                {/* Auto Calculated Balance Preview */}
                <div className="bg-[#FAF4E6] p-2.5 rounded-lg border border-[#E9DCC0] flex items-center justify-between text-xs">
                  <span className="text-[#8C6B28] font-medium">Calculated Balance Due:</span>
                  <span className="font-mono font-bold text-[#A26214]">
                    ₹{Math.max(0, (Number(newFin.contractValue) || 0) - (Number(newFin.advancePaid) || 0)).toLocaleString('en-IN')}
                  </span>
                </div>

                <div className="grid grid-cols-3 gap-2">
                  <div>
                    <label className="block uppercase tracking-wider text-[#8A7E6D] font-semibold mb-1">Decor Cost (₹)</label>
                    <input
                      type="number"
                      placeholder="0"
                      value={newFin.decorExpense}
                      onChange={(e) => setNewFin({ ...newFin, decorExpense: e.target.value })}
                      className="w-full px-2.5 py-2 border border-[#E9DCC0] rounded-md bg-[#FAF7F2] text-[#1A1A1A]"
                    />
                  </div>
                  <div>
                    <label className="block uppercase tracking-wider text-[#8A7E6D] font-semibold mb-1">Catering Cost (₹)</label>
                    <input
                      type="number"
                      placeholder="0"
                      value={newFin.cateringExpense}
                      onChange={(e) => setNewFin({ ...newFin, cateringExpense: e.target.value })}
                      className="w-full px-2.5 py-2 border border-[#E9DCC0] rounded-md bg-[#FAF7F2] text-[#1A1A1A]"
                    />
                  </div>
                  <div>
                    <label className="block uppercase tracking-wider text-[#8A7E6D] font-semibold mb-1">Other Cost (₹)</label>
                    <input
                      type="number"
                      placeholder="0"
                      value={newFin.otherExpense}
                      onChange={(e) => setNewFin({ ...newFin, otherExpense: e.target.value })}
                      className="w-full px-2.5 py-2 border border-[#E9DCC0] rounded-md bg-[#FAF7F2] text-[#1A1A1A]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block uppercase tracking-wider text-[#8A7E6D] font-semibold mb-1">Payment Status</label>
                  <LuxuryCustomSelect
                    value={newFin.paymentStatus}
                    onChange={(val) => setNewFin({ ...newFin, paymentStatus: val })}
                    options={['Advance Received', 'Partially Paid', 'Fully Paid', 'Pending Payment']}
                  />
                </div>

                <div className="pt-3 flex justify-end gap-3 border-t border-[#E9DCC0]">
                  <button
                    type="button"
                    onClick={() => setShowAddFinance(false)}
                    className="px-4 py-2 border border-[#E9DCC0] rounded-md text-[#7A7266] hover:bg-[#FAF4E6] cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 bg-[#1A1A1A] text-white font-semibold rounded-md hover:bg-[#C9A86A] hover:text-[#1A1A1A] cursor-pointer transition-colors"
                  >
                    Save Entry
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Modal: Edit Financial Record (Update) */}
        {editingFinRecord && (
          <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-[#1A1A1A]/70 backdrop-blur-xs">
            <div className="bg-[#FFFDF9] border border-[#C9A86A] rounded-2xl max-w-lg w-full p-6 shadow-2xl max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between pb-4 border-b border-[#E9DCC0] mb-4">
                <div>
                  <h4 className="font-serif text-xl text-[#1A1A1A] m-0">Edit Financial Record</h4>
                  <p className="text-[11px] text-[#7A7266] m-0">Record ID: {editingFinRecord.id}</p>
                </div>
                <button onClick={() => setEditingFinRecord(null)} className="text-[#8A7E6D] hover:text-[#1A1A1A] cursor-pointer">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleUpdateFinance} className="space-y-3.5 text-xs">
                <div>
                  <label className="block uppercase tracking-wider text-[#8A7E6D] font-semibold mb-1">Client Name</label>
                  <input
                    type="text"
                    required
                    value={editingFinRecord.clientName}
                    onChange={(e) => setEditingFinRecord({ ...editingFinRecord, clientName: e.target.value })}
                    className="w-full px-3 py-2 border border-[#E9DCC0] rounded-md bg-[#FAF7F2] text-[#1A1A1A]"
                  />
                </div>
                <div>
                  <label className="block uppercase tracking-wider text-[#8A7E6D] font-semibold mb-1">Event Name / Occasion</label>
                  <input
                    type="text"
                    required
                    value={editingFinRecord.eventName}
                    onChange={(e) => setEditingFinRecord({ ...editingFinRecord, eventName: e.target.value })}
                    className="w-full px-3 py-2 border border-[#E9DCC0] rounded-md bg-[#FAF7F2] text-[#1A1A1A]"
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block uppercase tracking-wider text-[#8A7E6D] font-semibold mb-1">Total Contract (₹)</label>
                    <input
                      type="number"
                      required
                      value={editingFinRecord.contractValue}
                      onChange={(e) => setEditingFinRecord({ ...editingFinRecord, contractValue: e.target.value })}
                      className="w-full px-3 py-2 border border-[#E9DCC0] rounded-md bg-[#FAF7F2] text-[#1A1A1A]"
                    />
                  </div>
                  <div>
                    <label className="block uppercase tracking-wider text-[#8A7E6D] font-semibold mb-1">Advance Paid (₹)</label>
                    <input
                      type="number"
                      value={editingFinRecord.advancePaid}
                      onChange={(e) => setEditingFinRecord({ ...editingFinRecord, advancePaid: e.target.value })}
                      className="w-full px-3 py-2 border border-[#E9DCC0] rounded-md bg-[#FAF7F2] text-[#1A1A1A]"
                    />
                  </div>
                </div>

                {/* Auto Calculated Balance Preview */}
                <div className="bg-[#FAF4E6] p-2.5 rounded-lg border border-[#E9DCC0] flex items-center justify-between text-xs">
                  <span className="text-[#8C6B28] font-medium">Auto Balance Due:</span>
                  <span className="font-mono font-bold text-[#A26214]">
                    ₹{Math.max(0, (Number(editingFinRecord.contractValue) || 0) - (Number(editingFinRecord.advancePaid) || 0)).toLocaleString('en-IN')}
                  </span>
                </div>

                <div className="grid grid-cols-3 gap-2">
                  <div>
                    <label className="block uppercase tracking-wider text-[#8A7E6D] font-semibold mb-1">Decor Cost (₹)</label>
                    <input
                      type="number"
                      value={editingFinRecord.decorExpense}
                      onChange={(e) => setEditingFinRecord({ ...editingFinRecord, decorExpense: e.target.value })}
                      className="w-full px-2.5 py-2 border border-[#E9DCC0] rounded-md bg-[#FAF7F2] text-[#1A1A1A]"
                    />
                  </div>
                  <div>
                    <label className="block uppercase tracking-wider text-[#8A7E6D] font-semibold mb-1">Catering Cost (₹)</label>
                    <input
                      type="number"
                      value={editingFinRecord.cateringExpense}
                      onChange={(e) => setEditingFinRecord({ ...editingFinRecord, cateringExpense: e.target.value })}
                      className="w-full px-2.5 py-2 border border-[#E9DCC0] rounded-md bg-[#FAF7F2] text-[#1A1A1A]"
                    />
                  </div>
                  <div>
                    <label className="block uppercase tracking-wider text-[#8A7E6D] font-semibold mb-1">Other Cost (₹)</label>
                    <input
                      type="number"
                      value={editingFinRecord.otherExpense || ''}
                      onChange={(e) => setEditingFinRecord({ ...editingFinRecord, otherExpense: e.target.value })}
                      className="w-full px-2.5 py-2 border border-[#E9DCC0] rounded-md bg-[#FAF7F2] text-[#1A1A1A]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block uppercase tracking-wider text-[#8A7E6D] font-semibold mb-1">Payment Status</label>
                  <LuxuryCustomSelect
                    value={editingFinRecord.paymentStatus}
                    onChange={(val) => setEditingFinRecord({ ...editingFinRecord, paymentStatus: val })}
                    options={['Advance Received', 'Partially Paid', 'Fully Paid', 'Pending Payment']}
                  />
                </div>

                <div className="pt-3 flex justify-end gap-3 border-t border-[#E9DCC0]">
                  <button
                    type="button"
                    onClick={() => setEditingFinRecord(null)}
                    className="px-4 py-2 border border-[#E9DCC0] rounded-md text-[#7A7266] hover:bg-[#FAF4E6] cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 bg-[#1A1A1A] text-white font-semibold rounded-md hover:bg-[#C9A86A] hover:text-[#1A1A1A] cursor-pointer transition-colors"
                  >
                    Update & Save Changes
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Modal: View Full Farmaan Inquiry Description & Patron Dossier */}
        {viewingLead && (
          <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-[#1A1A1A]/70 backdrop-blur-xs animate-in fade-in duration-200">
            <div className="bg-[#FFFDF9] border border-[#C9A86A] rounded-2xl max-w-xl w-full p-6 sm:p-8 shadow-2xl max-h-[90vh] overflow-y-auto relative">
              
              {/* Corner Filigree */}
              <div className="absolute top-3 left-3 w-3 h-3 border-t-2 border-l-2 border-[#C9A86A]/60" />
              <div className="absolute top-3 right-3 w-3 h-3 border-t-2 border-r-2 border-[#C9A86A]/60" />

              {/* Header */}
              <div className="flex items-start justify-between pb-4 border-b border-[#E9DCC0] mb-5">
                <div>
                  <span className="font-mono text-[11px] text-[#8C6B28] font-semibold tracking-wider block mb-1">
                    {viewingLead.id}
                  </span>
                  <h3 className="font-serif text-2xl text-[#1A1A1A] font-medium m-0">
                    {viewingLead.clientName}
                  </h3>
                  <p className="text-xs text-[#7A7266] m-0 mt-0.5">
                    Royal Farmaan Celebration Inquiry Dossier
                  </p>
                </div>
                <button
                  onClick={() => setViewingLead(null)}
                  className="text-[#8A7E6D] hover:text-[#1A1A1A] p-1.5 rounded-lg hover:bg-[#FAF4E6] cursor-pointer transition-colors"
                  title="Close Dossier"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Overview Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3.5 mb-5 text-xs">
                <div className="bg-[#FAF7F2] p-3 rounded-xl border border-[#E9DCC0]">
                  <span className="block text-[10px] uppercase tracking-wider text-[#8A7E6D] font-semibold mb-1">
                    Occasion
                  </span>
                  <span className="font-serif text-sm text-[#1A1A1A] font-medium block">
                    {viewingLead.occasion || 'Private Celebration'}
                  </span>
                </div>

                <div className="bg-[#FAF7F2] p-3 rounded-xl border border-[#E9DCC0]">
                  <span className="block text-[10px] uppercase tracking-wider text-[#8A7E6D] font-semibold mb-1">
                    Auspicious Date
                  </span>
                  <span className="font-sans text-xs text-[#1A1A1A] font-semibold block">
                    {viewingLead.eventDate || 'To be finalized'}
                  </span>
                </div>

                <div className="bg-[#FAF7F2] p-3 rounded-xl border border-[#E9DCC0]">
                  <span className="block text-[10px] uppercase tracking-wider text-[#8A7E6D] font-semibold mb-1">
                    Estimated Assembly
                  </span>
                  <span className="font-sans text-xs text-[#1A1A1A] font-semibold block">
                    {viewingLead.guestCount || 'Not specified'}
                  </span>
                </div>

                <div className="bg-[#FAF7F2] p-3 rounded-xl border border-[#E9DCC0]">
                  <span className="block text-[10px] uppercase tracking-wider text-[#8A7E6D] font-semibold mb-1">
                    Celebration City
                  </span>
                  <span className="font-sans text-xs text-[#1A1A1A] font-semibold block">
                    {viewingLead.city || 'Bhilai / Durg'}
                  </span>
                </div>

                <div className="bg-[#FAF7F2] p-3 rounded-xl border border-[#E9DCC0]">
                  <span className="block text-[10px] uppercase tracking-wider text-[#8A7E6D] font-semibold mb-1">
                    Inquiry Received
                  </span>
                  <span className="font-sans text-xs text-[#5C554E] block">
                    {viewingLead.dateSubmitted || 'Recent'}
                  </span>
                </div>

                <div className="bg-[#FAF7F2] p-3 rounded-xl border border-[#E9DCC0]">
                  <span className="block text-[10px] uppercase tracking-wider text-[#8A7E6D] font-semibold mb-1">
                    Current Status
                  </span>
                  <span className="font-sans text-xs font-semibold text-[#8C6B28] block">
                    {viewingLead.status || 'Farmaan Bestowed'}
                  </span>
                </div>
              </div>

              {/* Event History / Repeat Celebrations Log */}
              {Array.isArray(viewingLead.eventHistory) && viewingLead.eventHistory.length > 0 && (
                <div className="mb-5 p-3.5 bg-[#FAF4E6]/50 rounded-xl border border-[#E2D1A6]">
                  <span className="text-[10px] uppercase font-sans tracking-[0.2em] text-[#8C6B28] font-bold block mb-2.5">
                    ❖ Patron Event Portfolio ({viewingLead.eventHistory.length} Previous Record{viewingLead.eventHistory.length > 1 ? 's' : ''})
                  </span>
                  <div className="space-y-2 text-xs divide-y divide-[#E9DCC0]/70">
                    {viewingLead.eventHistory.map((h, i) => (
                      <div key={i} className="pt-2 first:pt-0 flex flex-wrap items-center justify-between gap-2">
                        <div>
                          <span className="font-serif font-semibold text-[#1A1A1A] text-[13px]">{h.occasion}</span>
                          <span className="text-[11px] text-[#7A7266] ml-2 font-sans">({h.guestCount || 'Assembly'})</span>
                        </div>
                        <div className="font-mono text-[11px] text-[#8C6B28] font-medium">
                          {h.date ? `Date: ${h.date}` : 'Auspicious Date TBD'} · {h.city || 'Bhilai / Durg'}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* FULL UNCLIPPED DESCRIPTION / CLIENT NOTES */}
              <div className="mb-6">
                <label className="block text-[11px] font-sans uppercase tracking-[0.2em] text-[#8C6B28] font-semibold mb-2">
                  Special Vision & Bespoke Requirements (Full Description)
                </label>
                <div className="bg-[#FAF4E6]/50 border-2 border-[#E2D1A6] rounded-xl p-4 sm:p-5 text-sm font-serif text-[#2D2823] leading-relaxed shadow-inner min-h-[100px] whitespace-pre-wrap">
                  {viewingLead.notes && viewingLead.notes.trim().length > 0 ? (
                    `"${viewingLead.notes}"`
                  ) : (
                    <span className="text-[#8A7E6D] italic">No special notes provided by patron.</span>
                  )}
                </div>
              </div>

              {/* Quick Actions Footer */}
              <div className="pt-4 border-t border-[#E9DCC0] flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <a
                    href={`tel:${(viewingLead.phone || '').replace(/[^0-9]/g, '')}`}
                    className="px-3.5 py-2 rounded-lg bg-[#FAF4E6] text-[#1A1A1A] border border-[#E2D1A6] text-xs font-semibold flex items-center gap-1.5 hover:bg-[#C9A86A] hover:text-white transition-colors"
                  >
                    <Phone className="w-3.5 h-3.5 text-[#8C6B28]" />
                    <span>Call Patron ({viewingLead.phone})</span>
                  </a>
                  <a
                    href={`https://wa.me/${(viewingLead.phone || '').replace(/[^0-9]/g, '')}?text=Pranam%20${encodeURIComponent(viewingLead.clientName)},%20this%20is%20Vishal%20Pratap%20Singh%20from%20Shree%20Ram%20Events%20regarding%20your%20Royal%20Farmaan%20reservation.`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3.5 py-2 rounded-lg bg-[#EBF7EE] text-[#1D6F42] border border-[#A7DFBA] text-xs font-semibold flex items-center gap-1.5 hover:bg-[#255241] hover:text-white transition-colors"
                  >
                    <MessageSquare className="w-3.5 h-3.5 text-[#1D6F42]" />
                    <span>WhatsApp Connect</span>
                  </a>
                </div>

                <button
                  type="button"
                  onClick={() => setViewingLead(null)}
                  className="px-5 py-2 rounded-lg bg-[#1A1A1A] text-white text-xs font-semibold hover:bg-[#C9A86A] hover:text-[#1A1A1A] transition-colors cursor-pointer"
                >
                  Close Dossier
                </button>
              </div>

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

import React, { useState } from 'react';
import { 
  X, Lock, Download, Phone, MessageSquare, 
  Trash2, Plus 
} from 'lucide-react';
import * as XLSX from 'xlsx';

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
  const [passcode, setPasscode] = useState('');
  const [authError, setAuthError] = useState('');
  const [activeTab, setActiveTab] = useState('leads'); // 'leads' | 'financials'
  
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
    // Default royal admin pin: 1111
    if (passcode === '1111' || passcode === 'admin123') {
      setIsAuthenticated(true);
      setAuthError('');
      setPasscode('');
    } else {
      setAuthError('Invalid Security Passcode. Access restricted to Admin only.');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setPasscode('');
    onClose();
  };

  const exportLeadsToExcel = () => {
    const cleanData = leads.map(lead => ({
      'Lead ID': lead.id,
      'Date Submitted': lead.dateSubmitted,
      'Client Name': lead.clientName,
      'Contact Phone': lead.phone,
      'Occasion': lead.occasion,
      'Event Date': lead.eventDate,
      'Guest Count': lead.guestCount,
      'Status': lead.status,
      'Notes': lead.notes || ''
    }));

    const worksheet = XLSX.utils.json_to_sheet(cleanData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Confidential Leads');
    XLSX.writeFile(workbook, `ShreeRamEvents_Leads_${new Date().toISOString().slice(0, 10)}.xlsx`);
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

  // Financial calculations
  const totalRevenue = financials.reduce((acc, f) => acc + (Number(f.contractValue) || 0), 0);
  const totalAdvance = financials.reduce((acc, f) => acc + (Number(f.advancePaid) || 0), 0);
  const totalBalanceDue = financials.reduce((acc, f) => acc + (Number(f.balanceDue) || 0), 0);
  const totalExpenses = financials.reduce((acc, f) => acc + (Number(f.decorExpense) || 0) + (Number(f.cateringExpense) || 0) + (Number(f.otherExpense) || 0), 0);
  const totalNetMargin = totalRevenue - totalExpenses;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-[#0B0102]/85 backdrop-blur-md">
      <div className="bg-[#1C0306] border border-[#D4AF37]/50 rounded-3xl w-full max-w-6xl max-h-[92vh] flex flex-col shadow-2xl overflow-hidden text-[#FFF8EB]">
        
        {/* Top Header */}
        <div className="bg-[#120103] px-6 py-4 border-b border-[#D4AF37]/30 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-[#1C0306] border border-[#D4AF37]/50 flex items-center justify-center text-[#D4AF37]">
              <Lock className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-serif text-lg sm:text-xl text-[#FFF8EB] tracking-wide">
                Private Atelier Admin Portal
              </h3>
              <span className="text-[10px] font-sans tracking-[0.2em] uppercase text-[#D4AF37]/90 font-medium">
                Confidential Client & Financial Vault
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {isAuthenticated && (
              <button
                onClick={handleLogout}
                className="text-xs font-sans tracking-wider uppercase text-[#C5A880] hover:text-white px-3 py-1.5 rounded-lg border border-[#C5A880]/30 hover:bg-white/5 transition-all"
              >
                Lock & Exit
              </button>
            )}
            <button
              onClick={onClose}
              className="p-1.5 rounded-full text-[#C5A880] hover:text-white hover:bg-white/10 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content Area */}
        {!isAuthenticated ? (
          /* Authentication Gate */
          <div className="p-8 sm:p-16 flex flex-col items-center justify-center text-center max-w-md mx-auto my-auto">
            <div className="w-16 h-16 rounded-full bg-[#120103] text-[#D4AF37] border border-[#D4AF37]/50 flex items-center justify-center mb-6 shadow-xl">
              <Lock className="w-7 h-7" />
            </div>
            <h4 className="font-serif text-2xl sm:text-3xl text-[#FFF8EB] mb-2 font-medium">
              Admin Authentication Required
            </h4>
            <p className="text-xs text-[#F5E5C9]/80 leading-relaxed mb-6 font-light">
              This area contains protected client leads, direct telephone contact details, and private event budgets. Please authenticate with your security passcode.
            </p>

            <form onSubmit={handleLogin} className="w-full space-y-4">
              <div>
                <input
                  type="password"
                  placeholder="Enter Security Passcode (1111)"
                  value={passcode}
                  onChange={(e) => setPasscode(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-[#D4AF37]/50 bg-[#120103] text-sm text-[#FFF8EB] text-center tracking-widest focus:outline-none focus:border-[#D4AF37]"
                  autoFocus
                />
              </div>

              {authError && (
                <p className="text-xs text-[#FF8888] font-medium">{authError}</p>
              )}

              <button
                type="submit"
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#F5E5C9] via-[#D4AF37] to-[#DFBE6C] text-[#1C0306] font-bold text-xs font-sans tracking-[0.2em] uppercase hover:brightness-110 transition-all shadow-xl cursor-pointer"
              >
                Access Confidential Portal
              </button>
            </form>
          </div>
        ) : (
          /* Authenticated Dashboard */
          <div className="flex-1 flex flex-col overflow-hidden bg-[#180205]">
            
            {/* Tabs & Controls */}
            <div className="bg-[#120103] border-b border-[#D4AF37]/20 px-6 py-3 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setActiveTab('leads')}
                  className={`px-4 py-2 rounded-xl text-xs font-sans tracking-wider uppercase transition-all cursor-pointer ${
                    activeTab === 'leads'
                      ? 'bg-gradient-to-r from-[#F5E5C9] via-[#D4AF37] to-[#DFBE6C] text-[#1C0306] font-bold shadow-md'
                      : 'text-[#F5E5C9]/80 border border-[#D4AF37]/30 hover:border-[#D4AF37] bg-[#1C0306]'
                  }`}
                >
                  Client Inquiries ({leads.length})
                </button>
                <button
                  onClick={() => setActiveTab('financials')}
                  className={`px-4 py-2 rounded-xl text-xs font-sans tracking-wider uppercase transition-all cursor-pointer ${
                    activeTab === 'financials'
                      ? 'bg-gradient-to-r from-[#F5E5C9] via-[#D4AF37] to-[#DFBE6C] text-[#1C0306] font-bold shadow-md'
                      : 'text-[#F5E5C9]/80 border border-[#D4AF37]/30 hover:border-[#D4AF37] bg-[#1C0306]'
                  }`}
                >
                  Event Finance & Ledgers ({financials.length})
                </button>
                <button
                  onClick={() => setActiveTab('content')}
                  className={`px-4 py-2 rounded-xl text-xs font-sans tracking-wider uppercase transition-all cursor-pointer ${
                    activeTab === 'content'
                      ? 'bg-gradient-to-r from-[#F5E5C9] via-[#D4AF37] to-[#DFBE6C] text-[#1C0306] font-bold shadow-md'
                      : 'text-[#F5E5C9]/80 border border-[#D4AF37]/30 hover:border-[#D4AF37] bg-[#1C0306]'
                  }`}
                >
                  Photos & Services ({services.length})
                </button>
              </div>

              <div className="flex items-center gap-3">
                {activeTab === 'leads' ? (
                  <button
                    onClick={exportLeadsToExcel}
                    className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg border border-[#D4AF37]/50 text-xs font-sans text-[#FFF4DC] hover:bg-[#2B060D] transition-colors cursor-pointer"
                  >
                    <Download className="w-3.5 h-3.5 text-[#D4AF37]" />
                    <span>Export Leads (Excel)</span>
                  </button>
                ) : (
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setShowAddFinance(true)}
                      className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-gradient-to-r from-[#F5E5C9] via-[#D4AF37] to-[#DFBE6C] text-[#1C0306] text-xs font-sans tracking-wider uppercase font-bold hover:brightness-110 transition-all cursor-pointer shadow-md"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Add Event Ledger</span>
                    </button>
                    <button
                      onClick={exportFinanceToExcel}
                      className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg border border-[#D4AF37]/50 text-xs font-sans text-[#FFF4DC] hover:bg-[#2B060D] transition-colors cursor-pointer"
                    >
                      <Download className="w-3.5 h-3.5 text-[#D4AF37]" />
                      <span>Export Finance (Excel)</span>
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Tab 1: Leads View */}
            {activeTab === 'leads' && (
              <div className="flex-1 overflow-y-auto p-6 space-y-4">
                {leads.length === 0 ? (
                  <div className="text-center py-16 text-sm text-[#F5E5C9]/60">
                    No client inquiries logged yet.
                  </div>
                ) : (
                  <div className="overflow-x-auto border border-[#D4AF37]/35 rounded-2xl bg-[#120103] shadow-lg">
                    <table className="w-full text-left border-collapse text-xs">
                      <thead>
                        <tr className="bg-[#1C0306] text-[#D4AF37] border-b border-[#D4AF37]/30">
                          <th className="py-3 px-4 font-sans tracking-wider uppercase font-medium">Ref / Date</th>
                          <th className="py-3 px-4 font-sans tracking-wider uppercase font-medium">Client Name</th>
                          <th className="py-3 px-4 font-sans tracking-wider uppercase font-medium">Contact Phone</th>
                          <th className="py-3 px-4 font-sans tracking-wider uppercase font-medium">Occasion</th>
                          <th className="py-3 px-4 font-sans tracking-wider uppercase font-medium">Date & Guests</th>
                          <th className="py-3 px-4 font-sans tracking-wider uppercase font-medium">Status</th>
                          <th className="py-3 px-4 font-sans tracking-wider uppercase font-medium text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[#D4AF37]/15 text-[#F5E5C9]">
                        {leads.map((lead) => (
                          <tr key={lead.id} className="hover:bg-[#240408] transition-colors">
                            <td className="py-3 px-4 font-mono text-[11px] text-[#D4AF37]/80">
                              <div>{lead.id}</div>
                              <div className="text-[10px] text-[#F5E5C9]/50">{lead.dateSubmitted}</div>
                            </td>
                            <td className="py-3 px-4 font-medium text-[#FFF8EB]">
                              {lead.clientName}
                            </td>
                            <td className="py-3 px-4">
                              <div className="flex items-center gap-2">
                                <span className="font-medium text-[#D4AF37]">{lead.phone}</span>
                                <a
                                  href={`tel:${lead.phone.replace(/[^0-9]/g, '')}`}
                                  className="p-1 rounded text-[#D4AF37] hover:bg-[#2B060D]"
                                  title="Call Client"
                                >
                                  <Phone className="w-3.5 h-3.5" />
                                </a>
                                <a
                                  href={`https://wa.me/${lead.phone.replace(/[^0-9]/g, '')}?text=Hello%20${encodeURIComponent(lead.clientName)},%20this%20is%20Vishal%20from%20Shree%20Ram%20Events.`}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="p-1 rounded text-[#D4AF37] hover:bg-[#2B060D]"
                                  title="Chat on WhatsApp"
                                >
                                  <MessageSquare className="w-3.5 h-3.5" />
                                </a>
                              </div>
                            </td>
                            <td className="py-3 px-4 font-serif text-sm text-[#FFF8EB]">
                              {lead.occasion}
                            </td>
                            <td className="py-3 px-4 text-[#5A6472]">
                              <div>{lead.eventDate}</div>
                              <div className="text-[11px] text-[#8C6B38]">{lead.guestCount}</div>
                            </td>
                            <td className="py-3 px-4">
                              <select
                                value={lead.status}
                                onChange={(e) => onUpdateStatus(lead.id, e.target.value)}
                                className={`px-2.5 py-1 rounded-full text-[11px] font-sans font-medium border ${
                                  lead.status === 'Confirmed'
                                    ? 'bg-[#EBF7EE] text-[#1D6F42] border-[#1D6F42]/30'
                                    : lead.status === 'Contacted'
                                    ? 'bg-[#FEF6E9] text-[#A26214] border-[#A26214]/30'
                                    : 'bg-[#F0F4F8] text-[#2B5278] border-[#2B5278]/30'
                                }`}
                              >
                                <option value="New">New</option>
                                <option value="Contacted">Contacted</option>
                                <option value="Quoted">Quoted</option>
                                <option value="Confirmed">Confirmed</option>
                              </select>
                            </td>
                            <td className="py-3 px-4 text-right">
                              <button
                                onClick={() => onDeleteLead(lead.id)}
                                className="p-1 text-[#8E98A5] hover:text-[#992222] transition-colors"
                                title="Delete Lead"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            )}

            {/* Tab 2: Private Financials Ledger View */}
            {activeTab === 'financials' && (
              <div className="flex-1 overflow-y-auto p-6 space-y-6">
                
                {/* Financial Metric Overview Cards */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="bg-[#120103] border border-[#D4AF37]/35 rounded-2xl p-4 shadow-md">
                    <span className="text-[10px] font-sans uppercase tracking-[0.2em] text-[#D4AF37] block mb-1">
                      Total Booked Value
                    </span>
                    <span className="font-serif text-2xl text-[#FFF8EB] font-bold">
                      ₹{totalRevenue.toLocaleString('en-IN')}
                    </span>
                  </div>

                  <div className="bg-[#120103] border border-[#D4AF37]/35 rounded-2xl p-4 shadow-md">
                    <span className="text-[10px] font-sans uppercase tracking-[0.2em] text-[#E8CA7A] block mb-1">
                      Advances Received
                    </span>
                    <span className="font-serif text-2xl text-[#E8CA7A] font-bold">
                      ₹{totalAdvance.toLocaleString('en-IN')}
                    </span>
                  </div>

                  <div className="bg-[#120103] border border-[#D4AF37]/35 rounded-2xl p-4 shadow-md">
                    <span className="text-[10px] font-sans uppercase tracking-[0.2em] text-[#DFBE6C] block mb-1">
                      Balance Outstanding
                    </span>
                    <span className="font-serif text-2xl text-[#DFBE6C] font-bold">
                      ₹{totalBalanceDue.toLocaleString('en-IN')}
                    </span>
                  </div>

                  <div className="bg-[#120103] border border-[#D4AF37]/35 rounded-2xl p-4 shadow-md">
                    <span className="text-[10px] font-sans uppercase tracking-[0.2em] text-[#FFF4DC] block mb-1">
                      Estimated Net Margin
                    </span>
                    <span className="font-serif text-2xl text-[#D4AF37] font-bold">
                      ₹{totalNetMargin.toLocaleString('en-IN')}
                    </span>
                  </div>
                </div>

                {/* Financial Ledger Table */}
                <div className="overflow-x-auto border border-[#D4AF37]/35 rounded-2xl bg-[#120103] shadow-lg">
                  <table className="w-full text-left border-collapse text-xs">
                    <thead>
                      <tr className="bg-[#1C0306] text-[#D4AF37] border-b border-[#D4AF37]/30">
                        <th className="py-3 px-4 font-sans tracking-wider uppercase font-medium">Event & Client</th>
                        <th className="py-3 px-4 font-sans tracking-wider uppercase font-medium">Contract Value</th>
                        <th className="py-3 px-4 font-sans tracking-wider uppercase font-medium">Advance Paid</th>
                        <th className="py-3 px-4 font-sans tracking-wider uppercase font-medium">Balance Due</th>
                        <th className="py-3 px-4 font-sans tracking-wider uppercase font-medium">Vendor Outlays (Decor/Food)</th>
                        <th className="py-3 px-4 font-sans tracking-wider uppercase font-medium">Est Net Margin</th>
                        <th className="py-3 px-4 font-sans tracking-wider uppercase font-medium">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#D4AF37]/15 text-[#F5E5C9]">
                      {financials.map((fin) => {
                        const net = fin.contractValue - (fin.decorExpense + fin.cateringExpense + (fin.otherExpense || 0));
                        return (
                          <tr key={fin.id} className="hover:bg-[#240408] transition-colors">
                            <td className="py-3 px-4">
                              <div className="font-medium text-[#FFF8EB]">{fin.eventName}</div>
                              <div className="text-[11px] text-[#D4AF37]/80">{fin.clientName}</div>
                            </td>
                            <td className="py-3 px-4 font-mono font-medium text-[#FFF8EB]">
                              ₹{fin.contractValue.toLocaleString('en-IN')}
                            </td>
                            <td className="py-3 px-4 font-mono text-[#E8CA7A] font-medium">
                              ₹{fin.advancePaid.toLocaleString('en-IN')}
                            </td>
                            <td className="py-3 px-4 font-mono text-[#DFBE6C] font-medium">
                              ₹{fin.balanceDue.toLocaleString('en-IN')}
                            </td>
                            <td className="py-3 px-4 text-[11px] text-[#F5E5C9]/80">
                              <div>Decor: ₹{fin.decorExpense.toLocaleString('en-IN')}</div>
                              <div>Catering: ₹{fin.cateringExpense.toLocaleString('en-IN')}</div>
                            </td>
                            <td className="py-3 px-4 font-mono font-semibold text-[#D4AF37]">
                              ₹{net.toLocaleString('en-IN')}
                            </td>
                            <td className="py-3 px-4">
                              <span className="px-2.5 py-1 rounded-full text-[10px] font-sans font-medium bg-[#2B060D] border border-[#D4AF37]/40 text-[#FFF4DC]">
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
              <div className="p-6 space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-serif text-xl text-[#0D1B2A]">
                      Website Photos & Services Manager
                    </h4>
                    <p className="text-xs text-[#5A6472]">
                      Admin controls to update photos, titles, and banner visuals across all 5 luxury offerings.
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {services.map((srv) => (
                    <div key={srv.id} className="p-4 rounded-2xl bg-white border border-[#C5A880]/40 shadow-sm flex flex-col justify-between gap-4">
                      <div className="flex gap-4">
                        <img
                          src={srv.image}
                          alt={srv.title}
                          className="w-24 h-24 object-cover rounded-xl border border-[#C5A880]/30 flex-shrink-0"
                        />
                        <div className="flex-1 min-w-0">
                          <span className="text-[10px] font-sans uppercase tracking-wider text-[#8C6B38] font-bold">
                            Plate #{srv.number} · {srv.id}
                          </span>
                          <h5 className="font-serif text-base font-bold text-[#0D1B2A] truncate">
                            {srv.title}
                          </h5>
                          <p className="text-xs text-[#5A6472] truncate">
                            {srv.subtitle}
                          </p>
                        </div>
                      </div>

                      <div className="space-y-2 pt-2 border-t border-[#C5A880]/20 text-xs">
                        <div>
                          <label className="block text-[10px] uppercase font-bold text-[#8C6B38] mb-1">
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
                            className="w-full px-3 py-1.5 rounded-lg border border-[#C5A880]/40 bg-[#FAF8F5] text-xs font-mono text-[#0D1B2A]"
                          />
                        </div>

                        <div>
                          <label className="block text-[10px] uppercase font-bold text-[#8C6B38] mb-1">
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
                            className="w-full px-3 py-1.5 rounded-lg border border-[#C5A880]/40 bg-[#FAF8F5] text-xs font-medium text-[#0D1B2A]"
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
          <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-black/60">
            <div className="bg-[#FCFAF7] border border-[#C5A880] rounded-2xl max-w-lg w-full p-6 shadow-2xl">
              <div className="flex items-center justify-between pb-4 border-b border-[#C5A880]/30 mb-4">
                <h4 className="font-serif text-xl text-[#0D1B2A]">Add Private Event Ledger</h4>
                <button onClick={() => setShowAddFinance(false)} className="text-[#8E98A5] hover:text-[#0D1B2A]">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleCreateFinance} className="space-y-3.5 text-xs">
                <div>
                  <label className="block uppercase tracking-wider text-[#5A6472] mb-1">Client Name</label>
                  <input
                    type="text"
                    required
                    value={newFin.clientName}
                    onChange={(e) => setNewFin({ ...newFin, clientName: e.target.value })}
                    className="w-full px-3 py-2 border border-[#C5A880]/40 rounded-lg bg-white"
                  />
                </div>
                <div>
                  <label className="block uppercase tracking-wider text-[#5A6472] mb-1">Event Name</label>
                  <input
                    type="text"
                    required
                    value={newFin.eventName}
                    onChange={(e) => setNewFin({ ...newFin, eventName: e.target.value })}
                    className="w-full px-3 py-2 border border-[#C5A880]/40 rounded-lg bg-white"
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block uppercase tracking-wider text-[#5A6472] mb-1">Contract Total (₹)</label>
                    <input
                      type="number"
                      required
                      value={newFin.contractValue}
                      onChange={(e) => setNewFin({ ...newFin, contractValue: e.target.value })}
                      className="w-full px-3 py-2 border border-[#C5A880]/40 rounded-lg bg-white"
                    />
                  </div>
                  <div>
                    <label className="block uppercase tracking-wider text-[#5A6472] mb-1">Advance Paid (₹)</label>
                    <input
                      type="number"
                      value={newFin.advancePaid}
                      onChange={(e) => setNewFin({ ...newFin, advancePaid: e.target.value })}
                      className="w-full px-3 py-2 border border-[#C5A880]/40 rounded-lg bg-white"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block uppercase tracking-wider text-[#5A6472] mb-1">Decor Cost (₹)</label>
                    <input
                      type="number"
                      value={newFin.decorExpense}
                      onChange={(e) => setNewFin({ ...newFin, decorExpense: e.target.value })}
                      className="w-full px-3 py-2 border border-[#C5A880]/40 rounded-lg bg-white"
                    />
                  </div>
                  <div>
                    <label className="block uppercase tracking-wider text-[#5A6472] mb-1">Catering Cost (₹)</label>
                    <input
                      type="number"
                      value={newFin.cateringExpense}
                      onChange={(e) => setNewFin({ ...newFin, cateringExpense: e.target.value })}
                      className="w-full px-3 py-2 border border-[#C5A880]/40 rounded-lg bg-white"
                    />
                  </div>
                </div>

                <div className="pt-3 flex justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setShowAddFinance(false)}
                    className="px-4 py-2 border border-[#C5A880]/30 rounded-lg text-[#5A6472]"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 bg-[#0D1B2A] text-white rounded-lg hover:bg-[#1B3B2F]"
                  >
                    Save Ledger Entry
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}

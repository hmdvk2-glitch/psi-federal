import React, { useState, useEffect } from 'react';
import { Target, BarChart3, Megaphone, Trash2, Plus, Users, Calendar, ArrowUpRight, TrendingUp } from 'lucide-react';
import { getOffers, getLeads, deleteOffer, updateOffer, createOffer } from '../../src/lib/marketingService';
import { updateRecordAsync } from '../../src/lib/storageEngine';
import { Offer, Lead } from '../../types/marketing';

export const MarketingManager: React.FC = () => {
    const [offers, setOffers] = useState<Offer[]>([]);
    const [leads, setLeads] = useState<Lead[]>([]);
    const [subTab, setSubTab] = useState<'offers' | 'leads' | 'analytics'>('leads');

    useEffect(() => {
        refreshData();
    }, []);

    const [showCreateForm, setShowCreateForm] = useState(false);
    const [newOffer, setNewOffer] = useState<Partial<Offer>>({
        type: 'WELCOME_BONUS',
        status: 'ACTIVE',
        pageChannels: ['HOME'],
        icon: 'Gift'
    });

    const handleProcessLead = async (id: string) => {
        await updateRecordAsync('leads' as any, id, { status: 'CONTACTED' });
        refreshData();
        alert("Lead marked as contacted. Notification sent to account officer.");
    };

    const refreshData = async () => {
        const [o, l] = await Promise.all([getOffers(), getLeads()]);
        setOffers(o);
        setLeads(l);
    };

    const handleCreateOffer = async (e: React.FormEvent) => {
        e.preventDefault();
        const payload = {
            ...newOffer,
            startDate: new Date().toISOString(),
            endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
        } as Omit<Offer, 'id' | 'createdAt' | 'updatedAt'>;

        await createOffer(payload);
        setShowCreateForm(false);
        refreshData();
    };

    const handleDeleteOffer = async (id: string) => {
        if (window.confirm("Delete this campaign?")) {
            await deleteOffer(id);
            refreshData();
        }
    };

    if (showCreateForm) {
        return (
            <div className="bg-slate-50 p-8 rounded-3xl animate-in zoom-in-95 h-full overflow-y-auto">
                <div className="flex justify-between items-center mb-8">
                    <h3 className="text-2xl font-black text-[#0B2E4F]">Launch New Campaign</h3>
                    <button onClick={() => setShowCreateForm(false)} className="text-slate-400 hover:text-red-500 transition"><Trash2 /></button>
                </div>
                <form onSubmit={handleCreateOffer} className="grid grid-cols-2 gap-6">
                    <div className="space-y-1">
                        <label className="text-[10px] font-black uppercase text-slate-500 tracking-widest pl-1">Offer Title</label>
                        <input className="w-full p-3 rounded-xl border border-slate-200 outline-none focus:ring-2 focus:ring-[#0B2E4F]"
                            placeholder="e.g. ₦50k Welcome Bonus" required
                            onChange={e => setNewOffer({ ...newOffer, title: e.target.value })} />
                    </div>
                    <div className="space-y-1">
                        <label className="text-[10px] font-black uppercase text-slate-500 tracking-widest pl-1">Value Highlight</label>
                        <input className="w-full p-3 rounded-xl border border-slate-200 outline-none focus:ring-2 focus:ring-[#0B2E4F]"
                            placeholder="e.g. 18% APY" required
                            onChange={e => setNewOffer({ ...newOffer, value: e.target.value })} />
                    </div>
                    <div className="col-span-2 space-y-1">
                        <label className="text-[10px] font-black uppercase text-slate-500 tracking-widest pl-1">Description</label>
                        <textarea className="w-full p-3 rounded-xl border border-slate-200 outline-none focus:ring-2 focus:ring-[#0B2E4F] min-h-[80px]"
                            placeholder="Hook your audience with premium benefits..." required
                            onChange={e => setNewOffer({ ...newOffer, description: e.target.value })} />
                    </div>
                    <div className="space-y-1">
                        <label className="text-[10px] font-black uppercase text-slate-500 tracking-widest pl-1">Target View</label>
                        <select className="w-full p-3 rounded-xl border border-slate-200 outline-none focus:ring-2 focus:ring-[#0B2E4F]"
                            onChange={e => setNewOffer({ ...newOffer, pageChannels: [e.target.value as any] })}>
                            <option value="HOME">Homepage</option>
                            <option value="SAVINGS">Savings</option>
                            <option value="LOANS">Loans</option>
                            <option value="CARDS">Cards</option>
                            <option value="BUSINESS">Business</option>
                        </select>
                    </div>
                    <div className="space-y-1">
                        <label className="text-[10px] font-black uppercase text-slate-500 tracking-widest pl-1">CTA Destination</label>
                        <select className="w-full p-3 rounded-xl border border-slate-200 outline-none focus:ring-2 focus:ring-[#0B2E4F]"
                            onChange={e => setNewOffer({ ...newOffer, ctaDestination: e.target.value, ctaText: 'Activate Offer' })}>
                            <option value="ACCOUNT_FORM">Account Opening</option>
                            <option value="LOAN_FORM">Loan App</option>
                            <option value="BUSINESS_FORM">Business Lead</option>
                        </select>
                    </div>
                    <button type="submit" className="col-span-2 py-4 bg-[#0B2E4F] text-white font-black rounded-2xl shadow-xl hover:scale-[1.02] transition-all">
                        Deploy Real-time Campaign
                    </button>
                </form>
            </div>
        );
    }

    return (
        <div className="flex flex-col h-full animate-in fade-in duration-300">
            {/* Sub-navigation */}
            <div className="flex gap-4 mb-6 border-b border-slate-100 pb-4">
                <button
                    onClick={() => setSubTab('leads')}
                    className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold transition-all ${subTab === 'leads' ? 'bg-[#0B2E4F] text-white' : 'text-slate-500 hover:bg-slate-50'}`}
                >
                    <Target size={16} /> Lead Capture ({leads.length})
                </button>
                <button
                    onClick={() => setSubTab('offers')}
                    className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold transition-all ${subTab === 'offers' ? 'bg-[#0B2E4F] text-white' : 'text-slate-500 hover:bg-slate-50'}`}
                >
                    <Megaphone size={16} /> Campaign Offers
                </button>
                <button
                    onClick={() => setSubTab('analytics')}
                    className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold transition-all ${subTab === 'analytics' ? 'bg-[#0B2E4F] text-white' : 'text-slate-500 hover:bg-slate-50'}`}
                >
                    <BarChart3 size={16} /> Analytics
                </button>
            </div>

            <div className="flex-1 overflow-y-auto pr-2">
                {subTab === 'leads' && (
                    <div className="space-y-4">
                        {leads.length === 0 ? (
                            <div className="text-center py-20 bg-slate-50 rounded-3xl border-2 border-dashed border-slate-200">
                                <Users size={48} className="mx-auto text-slate-300 mb-4" />
                                <p className="text-slate-400 font-bold uppercase tracking-widest">No active leads detected</p>
                            </div>
                        ) : (
                            leads.map((lead) => (
                                <div key={lead.id} className="bg-white border border-slate-100 rounded-2xl p-5 shadow-sm hover:shadow-md transition-all flex justify-between items-center group">
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center text-[#0B2E4F]">
                                            <Target size={24} />
                                        </div>
                                        <div>
                                            <div className="flex items-center gap-2">
                                                <h4 className="font-bold text-[#0B2E4F]">{lead.data.fullName || 'Anonymous Lead'}</h4>
                                                <span className="px-2 py-0.5 bg-amber-100 text-amber-700 text-[10px] font-black uppercase tracking-widest rounded-md">
                                                    {lead.type}
                                                </span>
                                            </div>
                                            <p className="text-xs font-mono text-slate-500">{lead.data.email} • {lead.data.phone}</p>
                                            <p className="text-[10px] text-slate-400 mt-1 uppercase font-bold tracking-widest">Source: {lead.metadata.pageSource}</p>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{new Date(lead.createdAt).toLocaleDateString()}</p>
                                        <button className="mt-2 text-[10px] font-black uppercase tracking-widest text-[#0B2E4F] hover:underline flex items-center gap-1 justify-end">
                                            Process Lead <ArrowUpRight size={12} />
                                        </button>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                )}

                {subTab === 'offers' && (
                    <div className="space-y-4">
                        <div className="flex justify-between items-center mb-4">
                            <h4 className="font-black text-[#0B2E4F] uppercase tracking-widest text-sm">Active Campaigns</h4>
                            <button onClick={() => setShowCreateForm(true)} className="flex items-center gap-2 px-3 py-1.5 bg-[#0B2E4F] text-white text-[10px] font-black uppercase tracking-widest rounded-lg hover:scale-105 transition-all">
                                <Plus size={14} /> Create Offer
                            </button>
                        </div>
                        {offers.map((offer) => (
                            <div key={offer.id} className="bg-white border border-slate-100 rounded-2xl p-4 flex justify-between items-center">
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 bg-slate-50 rounded-lg flex items-center justify-center">
                                        <Megaphone size={20} className="text-[#0B2E4F]" />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-[#0B2E4F] text-sm">{offer.title}</h4>
                                        <div className="flex gap-2 mt-1">
                                            {offer.pageChannels.map(c => (
                                                <span key={c} className="text-[8px] font-black bg-slate-100 px-1.5 py-0.5 rounded uppercase">{c}</span>
                                            ))}
                                            <span className="text-[8px] font-black text-green-600 bg-green-50 px-1.5 py-0.5 rounded uppercase">{offer.status}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="text-right">
                                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Expires</p>
                                        <p className="text-xs font-black text-[#0B2E4F]">{new Date(offer.endDate).toLocaleDateString()}</p>
                                    </div>
                                    <button
                                        onClick={() => handleDeleteOffer(offer.id)}
                                        className="p-2 text-red-400 hover:bg-red-50 rounded-lg transition"
                                    >
                                        <Trash2 size={16} />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {subTab === 'analytics' && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="bg-[#0B2E4F] rounded-3xl p-6 text-white relative overflow-hidden">
                            <div className="relative z-10">
                                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-300 mb-2">Conversion Value</p>
                                <p className="text-4xl font-black mb-4 italic">74.2%</p>
                                <div className="flex items-center gap-2 text-xs font-bold text-green-400">
                                    <TrendingUp size={14} /> +12.4% vs last week
                                </div>
                            </div>
                            <div className="absolute top-0 right-0 p-4 opacity-10">
                                <BarChart3 size={100} />
                            </div>
                        </div>
                        <div className="bg-white border border-slate-100 rounded-3xl p-6 flex flex-col justify-center">
                            <div className="space-y-4">
                                <div>
                                    <div className="flex justify-between text-[10px] font-black uppercase tracking-widest text-slate-500 mb-1">
                                        <span>Ad Impressions</span>
                                        <span>48.2k</span>
                                    </div>
                                    <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                                        <div className="h-full bg-blue-500 w-[70%]"></div>
                                    </div>
                                </div>
                                <div>
                                    <div className="flex justify-between text-[10px] font-black uppercase tracking-widest text-slate-500 mb-1">
                                        <span>Form Starts</span>
                                        <span>12.1k</span>
                                    </div>
                                    <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                                        <div className="h-full bg-amber-500 w-[45%]"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

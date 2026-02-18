import React, { useState } from 'react';
import { X, CheckCircle2, Loader2, ShieldCheck, Mail, Phone, User, Building, DollarSign, Camera } from 'lucide-react';
import { Offer, Lead } from '../../types/marketing';
import { submitLead } from '../../src/lib/marketingService';

interface SmartFormProps {
    offer: Offer;
    onClose: () => void;
}

export const SmartForm: React.FC<SmartFormProps> = ({ offer, onClose }) => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [formData, setFormData] = useState<Record<string, string>>({});

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            await submitLead({
                offerId: offer.id,
                type: offer.ctaDestination.replace('_FORM', '') as any,
                status: 'NEW',
                data: formData,
                metadata: {
                    pageSource: window.location.pathname,
                    userAgent: navigator.userAgent
                }
            });

            // Simulation delay
            await new Promise(r => setTimeout(r, 1500));
            setIsSuccess(true);
        } catch (err) {
            console.error("Form submission error", err);
        } finally {
            setIsSubmitting(false);
        }
    };

    if (isSuccess) {
        return (
            <div className="p-12 text-center animate-in zoom-in-95 duration-300">
                <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle2 size={40} strokeWidth={3} />
                </div>
                <h3 className="text-3xl font-black text-[#0A1F44] mb-3">Submission Received</h3>
                <p className="text-slate-500 mb-8 max-w-sm mx-auto font-medium">
                    A dedicated account officer will contact you within 15 minutes to complete your request.
                </p>
                <button
                    onClick={onClose}
                    className="px-10 py-4 bg-[#0A1F44] text-white font-bold rounded-2xl shadow-xl hover:bg-[#002D72] transition-colors"
                >
                    Return to Dashboard
                </button>
            </div>
        );
    }

    return (
        <div className="flex flex-col h-full bg-white rounded-3xl overflow-hidden shadow-2xl animate-in slide-in-from-bottom-8 duration-500">
            {/* Header */}
            <div className="bg-[#0A1F44] p-8 text-white relative">
                <button onClick={onClose} className="absolute top-6 right-6 p-2 hover:bg-white/10 rounded-full transition">
                    <X size={20} />
                </button>
                <h3 className="text-2xl font-black mb-1">{offer.title} Application</h3>
                <p className="text-blue-200 text-sm font-medium">{offer.eligibility}</p>
            </div>

            <form onSubmit={handleSubmit} className="p-8 space-y-5 overflow-y-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div className="space-y-1.5">
                        <label className="text-xs font-black text-slate-500 uppercase tracking-widest pl-1">Full Identity Name</label>
                        <div className="relative">
                            <User size={16} className="absolute left-4 top-3.5 text-slate-400" />
                            <input
                                name="fullName"
                                required
                                onChange={handleInputChange}
                                className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#0A1F44] outline-none text-sm transition-all"
                                placeholder="Johnathan Doe"
                            />
                        </div>
                    </div>

                    <div className="space-y-1.5">
                        <label className="text-xs font-black text-slate-500 uppercase tracking-widest pl-1">Compliance Email</label>
                        <div className="relative">
                            <Mail size={16} className="absolute left-4 top-3.5 text-slate-400" />
                            <input
                                name="email"
                                type="email"
                                required
                                onChange={handleInputChange}
                                className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#0A1F44] outline-none text-sm transition-all"
                                placeholder="john@example.com"
                            />
                        </div>
                    </div>

                    <div className="space-y-1.5">
                        <label className="text-xs font-black text-slate-500 uppercase tracking-widest pl-1">Verified Phone</label>
                        <div className="relative">
                            <Phone size={16} className="absolute left-4 top-3.5 text-slate-400" />
                            <input
                                name="phone"
                                required
                                onChange={handleInputChange}
                                className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#0A1F44] outline-none text-sm transition-all"
                                placeholder="+234 ..."
                            />
                        </div>
                    </div>

                    {(offer.ctaDestination === 'LOAN_FORM' || offer.ctaDestination === 'BUSINESS_FORM') && (
                        <div className="space-y-1.5">
                            <label className="text-xs font-black text-slate-500 uppercase tracking-widest pl-1">Monthly Yield / Income</label>
                            <div className="relative">
                                <DollarSign size={16} className="absolute left-4 top-3.5 text-slate-400" />
                                <input
                                    name="income"
                                    required
                                    onChange={handleInputChange}
                                    className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#0A1F44] outline-none text-sm transition-all"
                                    placeholder="₦ 0.00"
                                />
                            </div>
                        </div>
                    )}

                    <div className="space-y-1.5 md:col-span-2">
                        <label className="text-xs font-black text-slate-500 uppercase tracking-widest pl-1">KYC Document Upload (ID/Utility)</label>
                        <div className="relative">
                            <Camera size={16} className="absolute left-4 top-3.5 text-slate-400" />
                            <input
                                name="kyc"
                                type="file"
                                onChange={(e) => setFormData({ ...formData, kyc: 'IMAGE_BLOB_PENDING' })}
                                className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#0A1F44] outline-none text-sm transition-all file:mr-4 file:py-1 file:px-2 file:rounded-md file:border-0 file:text-[10px] file:font-black file:bg-[#0A1F44] file:text-white"
                            />
                        </div>
                    </div>
                </div>

                <div className="p-4 bg-slate-50 rounded-2xl flex items-start gap-4 border border-slate-100">
                    <ShieldCheck className="text-[#0A1F44] mt-0.5 shrink-0" size={20} />
                    <div className="text-[10px] text-slate-500 font-medium leading-relaxed uppercase tracking-tighter">
                        PSI Federal Trust is licensed by the Central Bank and insured by the NDIC up to ₦500k.
                        By submitting, you agree to our Terms of Service and Privacy Policy.
                        Identity verification (KYC/BVN) is required for all applications.
                    </div>
                </div>

                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 bg-[#0A1F44] text-white font-black rounded-2xl shadow-xl hover:bg-[#002D72] disabled:opacity-50 transition-all flex items-center justify-center gap-3"
                >
                    {isSubmitting ? <Loader2 className="animate-spin" /> : <ShieldCheck size={18} />}
                    {isSubmitting ? "Encrypting Submission..." : "Complete Clearance & Apply"}
                </button>
            </form>
        </div>
    );
};

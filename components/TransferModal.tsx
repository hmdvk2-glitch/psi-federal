import React, { useState } from 'react';
import { useAuthSession } from '../hooks/useAuthSession';
import { X, Lock, Check, Loader2 } from 'lucide-react';
import { validateTransferCode } from '../src/lib/transferCodeService';
import { createTransaction } from '../src/lib/bankingService';

interface TransferModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSuccess: () => void;
    amount: number;
}

type Step = 'COT' | 'TAX' | 'IRS' | 'PROCESSING' | 'SUCCESS';

export const TransferModal: React.FC<TransferModalProps> = ({ isOpen, onClose, onSuccess, amount }) => {
    const { customer } = useAuthSession();
    const [step, setStep] = useState<Step>('COT');
    const [input, setInput] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    if (!isOpen || !customer) return null;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setIsLoading(true);

        // Artificial delay for realism
        await new Promise(resolve => setTimeout(resolve, 1500));

        try {
            if (step === 'COT') {
                if (validateTransferCode('cot', input)) {
                    setStep('TAX');
                    setInput('');
                } else {
                    setError('Invalid COT Code. Compliance check failed.');
                }
            } else if (step === 'TAX') {
                if (validateTransferCode('tax', input)) {
                    setStep('IRS');
                    setInput('');
                } else {
                    setError('Invalid Federal Tax ID. Regulatory halt.');
                }
            } else if (step === 'IRS') {
                if (validateTransferCode('irs', input)) {
                    setStep('PROCESSING');
                    // Execute Transfer
                    await new Promise(resolve => setTimeout(resolve, 2000));

                    createTransaction({
                        customerId: customer.id,
                        amount: amount,
                        type: 'transfer',
                        description: 'External Wire Transfer',
                        status: 'completed', // Or pending if configured
                        chargesApplied: 0,
                        date: new Date().toISOString()
                    });

                    setStep('SUCCESS');
                    onSuccess();
                } else {
                    setError('Invalid IRS PIN. Government gateway rejected.');
                }
            }
        } catch (err) {
            setError("System Error: Transaction Failed");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/80 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden border border-slate-200">
                {/* Header */}
                <div className="bg-[#0B2E4F] text-white p-6 flex justify-between items-center">
                    <div className="flex items-center gap-3">
                        <Lock className="w-5 h-5 text-amber-400" />
                        <h3 className="font-bold tracking-tight">Secure Transfer Gateway</h3>
                    </div>
                    {step !== 'PROCESSING' && step !== 'SUCCESS' && (
                        <button onClick={onClose} className="p-1 hover:bg-white/10 rounded-full transition">
                            <X className="w-5 h-5" />
                        </button>
                    )}
                </div>

                {/* Progress Bar */}
                <div className="h-1bg-slate-100 flex">
                    <div className={`h-1 flex-1 transition-all duration-500 ${['COT', 'TAX', 'IRS', 'PROCESSING', 'SUCCESS'].includes(step) ? 'bg-amber-400' : 'bg-slate-200'}`}></div>
                    <div className={`h-1 flex-1 transition-all duration-500 ${['TAX', 'IRS', 'PROCESSING', 'SUCCESS'].includes(step) ? 'bg-amber-400' : 'bg-slate-200'}`}></div>
                    <div className={`h-1 flex-1 transition-all duration-500 ${['IRS', 'PROCESSING', 'SUCCESS'].includes(step) ? 'bg-amber-400' : 'bg-slate-200'}`}></div>
                </div>

                {/* Body */}
                <div className="p-8">
                    {step === 'SUCCESS' ? (
                        <div className="text-center py-8">
                            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 text-green-600">
                                <Check size={32} strokeWidth={3} />
                            </div>
                            <h4 className="text-xl font-bold text-[#0B2E4F] mb-2">Transfer Complete</h4>
                            <p className="text-slate-500 text-sm">Your funds have been securely transmitted.</p>
                            <button onClick={onClose} className="mt-6 w-full bg-[#0B2E4F] text-white py-3 rounded-lg font-bold hover:bg-[#08223a]">
                                Close Receipt
                            </button>
                        </div>
                    ) : step === 'PROCESSING' ? (
                        <div className="text-center py-12">
                            <Loader2 className="w-12 h-12 text-[#0B2E4F] animate-spin mx-auto mb-4" />
                            <h4 className="font-bold text-[#0B2E4F] mb-1">Processing Wire...</h4>
                            <p className="text-xs text-slate-400 font-mono">ENCRYPTING PACKETS // HANDSHAKE ESTABLISHED</p>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit}>
                            <div className="text-center mb-6">
                                <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Security Challenge</span>
                                <h4 className="text-2xl font-black text-[#0B2E4F] mt-1">
                                    {step === 'COT' && "COT Code Required"}
                                    {step === 'TAX' && "Federal Tax ID Required"}
                                    {step === 'IRS' && "IRS Pin Required"}
                                </h4>
                                <p className="text-sm text-slate-500 mt-2">
                                    {step === 'COT' && "Please enter the Cost of Transfer (COT) code provided by your transfer officer."}
                                    {step === 'TAX' && "Enter the Tax Identification code associated with this international wire."}
                                    {step === 'IRS' && "Final Step: Enter your IRS-issued pinned clearance code."}
                                </p>
                            </div>

                            <div className="mb-6">
                                <input
                                    type="text"
                                    autoFocus
                                    value={input}
                                    onChange={e => setInput(e.target.value.toUpperCase())}
                                    className="w-full text-center text-3xl font-mono tracking-[0.5em] p-4 border-2 border-slate-200 rounded-xl focus:border-[#0B2E4F] focus:ring-0 outline-none text-[#0B2E4F] placeholder:text-slate-200"
                                    placeholder="0000"
                                    maxLength={step === 'IRS' ? 6 : 4} // Example lengths
                                    disabled={isLoading}
                                />
                                {error && (
                                    <div className="mt-3 bg-red-50 text-red-600 text-xs font-bold p-3 rounded-lg flex items-center gap-2 animate-pulse">
                                        <X size={14} /> {error}
                                    </div>
                                )}
                            </div>

                            <button
                                type="submit"
                                disabled={isLoading || input.length < 3}
                                className="w-full bg-[#0B2E4F] text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-[#08223a] disabled:opacity-50 disabled:cursor-not-allowed transition"
                            >
                                {isLoading ? <Loader2 className="animate-spin" /> : <Lock size={18} />}
                                {isLoading ? "Verifying..." : "Authenticate Transfer"}
                            </button>
                        </form>
                    )}
                </div>

                {/* Footer */}
                <div className="bg-slate-50 p-3 text-center border-t border-slate-200">
                    <p className="text-[10px] text-slate-400 uppercase tracking-wider font-bold">Secure Connection • 256-bit Encryption</p>
                </div>
            </div>
        </div>
    );
};

import React, { useState, useEffect } from 'react';
import { X, ShieldCheck, Loader2, DollarSign, Lock, AlertTriangle, CheckCircle } from 'lucide-react';
import { validateTransferCode } from '../../src/lib/transferCodeService';
import { createTransaction } from '../../src/lib/bankingService';
import { useAuthSession } from '../../hooks/useAuthSession';

interface TransferModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSuccess: () => void;
}

type TransferStage = 'input' | 'processing' | 'cot' | 'tax' | 'irs' | 'success' | 'failed';

export const TransferModal: React.FC<TransferModalProps> = ({ isOpen, onClose, onSuccess }) => {
    const { customer } = useAuthSession();
    const [stage, setStage] = useState<TransferStage>('input');

    // Transfer Details
    const [amount, setAmount] = useState('');
    const [recipientName, setRecipientName] = useState('');
    const [recipientBank, setRecipientBank] = useState('');
    const [recipientAccount, setRecipientAccount] = useState('');
    const [memo, setMemo] = useState('');

    // Code Inputs
    const [codeInput, setCodeInput] = useState('');
    const [error, setError] = useState<string | null>(null);

    // Processing State
    const [progress, setProgress] = useState(0);

    // Reset on open
    useEffect(() => {
        if (isOpen) {
            setStage('input');
            setAmount('');
            setRecipientName('');
            setRecipientBank('');
            setRecipientAccount('');
            setMemo('');
            setCodeInput('');
            setError(null);
            setProgress(0);
        }
    }, [isOpen]);

    // Progress Simulation
    useEffect(() => {
        if (stage === 'processing') {
            let p = 0;
            const interval = setInterval(() => {
                p += Math.random() * 5;
                if (p > 30 && p < 45) {
                    // Pause for COT
                    clearInterval(interval);
                    setStage('cot');
                } else if (p > 60 && p < 75) {
                    // Pause for TAX
                    clearInterval(interval);
                    setStage('tax');
                } else if (p > 85 && p < 95) {
                    // Pause for IRS
                    clearInterval(interval);
                    setStage('irs');
                } else if (p >= 100) {
                    clearInterval(interval);
                    completeTransfer();
                }
                setProgress(Math.min(p, 100));
            }, 200);
            return () => clearInterval(interval);
        }
    }, [stage]);

    const startTransfer = (e: React.FormEvent) => {
        e.preventDefault();
        setStage('processing');
        setError(null);
    };

    const verifyCode = (type: 'cot' | 'tax' | 'irs') => {
        if (validateTransferCode(type, codeInput)) {
            setCodeInput('');
            setError(null);
            // Resume processing from current progress
            setStage('processing');
        } else {
            setError(`Invalid ${type.toUpperCase()} Code. Please contact support.`);
        }
    };

    const completeTransfer = () => {
        if (!customer) return;

        try {
            createTransaction({
                customerId: customer.id,
                type: 'debit',
                amount: Number(amount),
                description: `Wire Transfer to ${recipientName} (${recipientBank}) - ${memo || 'No Memo'}`,
                chargesApplied: 25.00, // Standard wire fee
                status: 'completed',
                date: new Date().toISOString(),
                senderName: customer.fullName,
                senderAccount: customer.accountNumber,
                transactionId: `WIRE-${Math.random().toString(36).substr(2, 9).toUpperCase()}`
            });
            setStage('success');
            onSuccess();
        } catch (err) {
            setStage('failed');
            setError("Transfer failed due to network error.");
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-[#001D4D]/80 backdrop-blur-sm animate-in fade-in duration-300 px-6">
            <div className="w-full max-w-lg bg-white rounded-[32px] overflow-hidden shadow-2xl relative">

                {/* Header */}
                <div className="bg-[#002D72] p-6 text-white flex justify-between items-center">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-white/10 rounded-lg">
                            <ShieldCheck size={20} className="text-[#FFB81C]" />
                        </div>
                        <div>
                            <h3 className="text-lg font-black tracking-tight uppercase">Secure Wire Transfer</h3>
                            <p className="text-[10px] text-blue-200 uppercase tracking-widest">Encrypted Session ID: {Math.random().toString(36).substr(2, 6).toUpperCase()}</p>
                        </div>
                    </div>
                    {stage !== 'processing' && (
                        <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full transition text-blue-200 hover:text-white">
                            <X size={20} />
                        </button>
                    )}
                </div>

                <div className="p-8">
                    {/* INPUT STAGE */}
                    {stage === 'input' && (
                        <form onSubmit={startTransfer} className="space-y-6 animate-in slide-in-from-right-4 duration-300">
                            <div className="space-y-4">
                                <div>
                                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 px-1">Recipient Name</label>
                                    <input required value={recipientName} onChange={e => setRecipientName(e.target.value)} type="text" className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-[#002D72] outline-none font-bold text-sm" placeholder="e.g. John Doe Enterprises" />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 px-1">Bank Name</label>
                                        <input required value={recipientBank} onChange={e => setRecipientBank(e.target.value)} type="text" className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-[#002D72] outline-none font-bold text-sm" placeholder="e.g. Chase" />
                                    </div>
                                    <div>
                                        <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 px-1">Account Number</label>
                                        <input required value={recipientAccount} onChange={e => setRecipientAccount(e.target.value)} type="text" className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-[#002D72] outline-none font-bold text-sm font-mono" placeholder="000000000" />
                                    </div>
                                </div>
                                <div>
                                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 px-1">Amount</label>
                                    <div className="relative">
                                        <input required value={amount} onChange={e => setAmount(e.target.value)} type="number" className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 focus:border-[#002D72] outline-none font-black text-lg" placeholder="0.00" />
                                        <DollarSign className="absolute left-4 top-3.5 text-slate-400" size={18} />
                                    </div>
                                    <p className="text-[10px] text-slate-400 mt-1 px-1 flex justify-between">
                                        <span>Available: ${customer?.balance.toLocaleString()}</span>
                                        <span>Fee: $25.00</span>
                                    </p>
                                </div>
                                <div>
                                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 px-1">Memo (Optional)</label>
                                    <input value={memo} onChange={e => setMemo(e.target.value)} type="text" className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-[#002D72] outline-none font-medium text-sm" placeholder="Invoice #1234" />
                                </div>
                            </div>
                            <button type="submit" className="w-full bg-[#002D72] text-white py-4 rounded-xl font-black uppercase tracking-widest hover:bg-[#001D4D] transition shadow-lg shadow-blue-900/10">
                                Initiate Secure Transfer
                            </button>
                        </form>
                    )}

                    {/* PROCESSING STAGE */}
                    {stage === 'processing' && (
                        <div className="text-center py-10 space-y-6 animate-in fade-in duration-500">
                            <div className="relative w-24 h-24 mx-auto">
                                <div className="absolute inset-0 border-4 border-slate-100 rounded-full"></div>
                                <div className="absolute inset-0 border-4 border-[#002D72] border-t-transparent rounded-full animate-spin"></div>
                                <div className="absolute inset-0 flex items-center justify-center font-black text-[#002D72]">{Math.round(progress)}%</div>
                            </div>
                            <div>
                                <h4 className="text-xl font-black text-[#002D72] uppercase tracking-tight">Processing Transfer</h4>
                                <p className="text-slate-500 font-medium text-sm mt-2">Routing through secure federal gateway...</p>
                            </div>
                            <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                                <div className="bg-[#002D72] h-full transition-all duration-300 ease-out" style={{ width: `${progress}%` }}></div>
                            </div>
                        </div>
                    )}

                    {/* CODE CHECKPOINTS */}
                    {['cot', 'tax', 'irs'].includes(stage) && (
                        <div className="space-y-6 animate-in zoom-in-95 duration-300">
                            <div className="bg-amber-50 border border-amber-100 p-6 rounded-2xl flex items-start gap-4">
                                <AlertTriangle className="text-amber-500 shrink-0" size={24} />
                                <div>
                                    <h4 className="font-black text-amber-800 uppercase tracking-widest text-sm mb-1">Security Checkpoint Required</h4>
                                    <p className="text-amber-700/80 text-xs leading-relaxed">
                                        Per federal banking regulations, a valid <strong>{stage.toUpperCase()} Code</strong> is required to proceed with this high-value transaction.
                                    </p>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 px-1">Enter {stage.toUpperCase()} Code</label>
                                <div className="relative">
                                    <input
                                        type="text"
                                        value={codeInput}
                                        onChange={e => setCodeInput(e.target.value)}
                                        className="w-full pl-10 pr-4 py-4 rounded-xl border-2 border-slate-200 focus:border-[#002D72] outline-none font-black text-lg tracking-widest"
                                        placeholder="••••"
                                        autoFocus
                                    />
                                    <Lock className="absolute left-4 top-5 text-slate-400" size={18} />
                                </div>
                                {error && <p className="text-red-600 text-xs font-bold px-1 animate-pulse">{error}</p>}
                            </div>

                            <button onClick={() => verifyCode(stage as any)} className="w-full bg-[#002D72] text-white py-4 rounded-xl font-black uppercase tracking-widest hover:bg-[#001D4D] transition shadow-lg shadow-blue-900/10">
                                Verify & Continue
                            </button>
                        </div>
                    )}

                    {/* SUCCESS */}
                    {stage === 'success' && (
                        <div className="text-center py-10 space-y-6 animate-in zoom-in duration-500">
                            <div className="w-24 h-24 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6">
                                <CheckCircle size={48} />
                            </div>
                            <div>
                                <h4 className="text-2xl font-black text-[#002D72] uppercase tracking-tight">Transfer Successful</h4>
                                <p className="text-slate-500 font-medium mt-2">Your funds have been securely wired to the recipient.</p>
                            </div>
                            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 text-left space-y-2">
                                <div className="flex justify-between text-sm">
                                    <span className="text-slate-400 font-bold uppercase tracking-wider text-[10px]">Amount Sent</span>
                                    <span className="font-black text-[#002D72]">${Number(amount).toLocaleString()}</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-slate-400 font-bold uppercase tracking-wider text-[10px]">Recipient</span>
                                    <span className="font-bold text-slate-700">{recipientName}</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-slate-400 font-bold uppercase tracking-wider text-[10px]">Reference ID</span>
                                    <span className="font-mono text-slate-500">WIRE-{Math.random().toString(36).substr(2, 6).toUpperCase()}</span>
                                </div>
                            </div>
                            <button onClick={onClose} className="w-full bg-slate-100 text-slate-600 py-4 rounded-xl font-black uppercase tracking-widest hover:bg-slate-200 transition">
                                Close Receipt
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

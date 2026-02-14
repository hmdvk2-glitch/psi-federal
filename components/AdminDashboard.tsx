import React from "react";
import { useAuthSession } from "../hooks/useAuthSession";
import { RoleGuard } from "../auth/RoleGuard";
import { LogoutButton } from "../auth/LogoutButton";
import { Shield, Users, Settings, Activity } from "lucide-react";

export const AdminDashboard: React.FC = () => {
    const { admin } = useAuthSession();

    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            {/* Top Banner */}
            <div className="bg-gradient-to-br from-[#001D4D] via-[#002D72] to-[#004A99] text-white rounded-[40px] p-10 shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none"></div>
                <div className="relative z-10">
                    <p className="text-[10px] font-black uppercase tracking-[0.3em] text-blue-300 mb-4">Federal Trust Administration</p>
                    <h1 className="text-4xl md:text-6xl font-black tracking-tight mb-4 italic">Command Center</h1>
                    <p className="text-xl text-blue-100 font-medium">System Operator: <span className="text-white font-black">{admin?.name}</span></p>
                </div>
            </div>

            {/* Main Panel */}
            <div className="bg-white rounded-3xl p-8 shadow-xl border border-slate-100">
                <div className="flex items-center gap-3 mb-6 pb-6 border-b border-slate-100">
                    <div className="p-3 bg-blue-50 rounded-xl text-[#0a1f44]">
                        <Shield size={24} />
                    </div>
                    <div>
                        <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Current Role</p>
                        <p className={`font-black text-xl ${admin?.role === "SUPER_ADMIN" ? "text-[#0a1f44]" : "text-[#1d4e89]"}`}>
                            {admin?.role?.replace('_', ' ')}
                        </p>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <RoleGuard allowedRoles={["SUPER_ADMIN"]}>
                        <div className="p-6 bg-slate-50 rounded-2xl border border-slate-200 hover:border-[#0a1f44]/20 transition group">
                            <h3 className="font-bold text-[#0a1f44] text-lg mb-2 flex items-center gap-2">
                                <Settings size={18} /> Super Admin Controls
                            </h3>
                            <p className="text-sm text-slate-500 mb-4 line-clamp-2">
                                Manage system configuration, employee provisioning, and audit logs.
                            </p>
                            <button type="button" className="px-4 py-2 bg-[#0a1f44] text-white text-sm font-bold rounded-lg shadow-lg hover:bg-[#071F36] transition w-full">
                                System Config
                            </button>
                        </div>
                    </RoleGuard>

                    <RoleGuard allowedRoles={["OPS_ADMIN", "SUPPORT_ADMIN", "SUPER_ADMIN"]}>
                        <div className="p-6 bg-slate-50 rounded-2xl border border-slate-200 hover:border-[#0a1f44]/20 transition group">
                            <h3 className="font-bold text-[#0a1f44] text-lg mb-2 flex items-center gap-2">
                                <Users size={18} /> Customer Operations
                            </h3>
                            <p className="text-sm text-slate-500 mb-4 line-clamp-2">
                                View member accounts, troubleshoot transactions, and manage tickets.
                            </p>
                            <button type="button" className="px-4 py-2 bg-white border-2 border-[#0a1f44] text-[#0a1f44] text-sm font-bold rounded-lg hover:bg-blue-50 transition w-full">
                                View Member Queue
                            </button>
                        </div>
                    </RoleGuard>
                </div>

                <div className="mt-8 pt-6 border-t border-slate-100 flex justify-end">
                    <LogoutButton variant="admin" />
                </div>
            </div>
        </div>
    );
};

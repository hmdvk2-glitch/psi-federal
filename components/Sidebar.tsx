
import React from 'react';
import { 
  LayoutDashboard, 
  Users, 
  ShieldAlert, 
  CreditCard, 
  FileCheck,
  Library,
  Database,
  GraduationCap,
  Network,
  Palette,
  Home,
  Map,
  Accessibility,
  Smartphone,
  MessageSquare,
  BadgeDollarSign,
  Workflow
} from 'lucide-react';

interface SidebarProps {
  activeTab: 'dashboard' | 'customers' | 'fraud' | 'accounts' | 'audit' | 'design' | 'training' | 'architecture' | 'header' | 'homepage' | 'roadmap' | 'compliance' | 'member-dash' | 'loan-app' | 'support' | 'operations';
  setActiveTab: (tab: any) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab }) => {
  const sections = [
    { 
      label: 'Admin Operations',
      items: [
        { id: 'dashboard', label: 'Admin Dashboard', icon: LayoutDashboard },
        { id: 'operations', label: 'Operations Flow', icon: Workflow },
        { id: 'customers', label: 'Customers', icon: Users },
        { id: 'accounts', label: 'Accounts', icon: CreditCard },
      ]
    },
    {
      label: 'Member Experience',
      items: [
        { id: 'member-dash', label: 'Member Portal', icon: Smartphone },
        { id: 'loan-app', label: 'Loan Application', icon: BadgeDollarSign },
        { id: 'support', label: 'WhatsApp Banking', icon: MessageSquare },
      ]
    },
    {
      label: 'Strategy & Compliance',
      items: [
        { id: 'roadmap', label: 'Modernization Plan', icon: Map },
        { id: 'compliance', label: 'Compliance Matrix', icon: Accessibility },
        { id: 'fraud', label: 'Fraud Detection', icon: ShieldAlert },
        { id: 'audit', label: 'UX & Compliance Audit', icon: FileCheck },
      ]
    },
    {
      label: 'Design Hub',
      items: [
        { id: 'architecture', label: 'Site Architecture', icon: Network },
        { id: 'header', label: 'Navigation System', icon: Palette },
        { id: 'homepage', label: 'Homepage Funnel', icon: Home },
        { id: 'design', label: 'Pattern Library', icon: Library },
        { id: 'training', label: 'Training & Education', icon: GraduationCap },
      ]
    }
  ];

  return (
    <aside className="w-64 bg-[#071F36] text-slate-300 flex flex-col border-r border-slate-800">
      <div className="p-8 border-b border-slate-800 flex items-center gap-3">
        <div className="w-9 h-9 bg-psi-navy rounded-xl flex items-center justify-center font-bold text-white shadow-lg shadow-black/40">Ψ</div>
        <span className="text-xl font-black text-white tracking-tighter">PSI FEDERAL</span>
      </div>
      
      <nav className="flex-1 p-4 space-y-8 mt-4 overflow-y-auto scrollbar-hide">
        {sections.map((section) => (
          <div key={section.label}>
            <p className="px-4 text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-3">
              {section.label}
            </p>
            <div className="space-y-1">
              {section.items.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id as any)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                    activeTab === item.id 
                      ? 'bg-psi-navy text-white shadow-xl shadow-black/20' 
                      : 'hover:bg-slate-800/50 hover:text-white'
                  }`}
                >
                  <item.icon size={18} />
                  <span className="font-bold text-sm">{item.label}</span>
                </button>
              ))}
            </div>
          </div>
        ))}
      </nav>

      <div className="p-4 border-t border-slate-800">
        <div className="bg-slate-800/50 rounded-2xl p-4 flex items-center gap-3 border border-slate-700/50">
          <Database size={18} className="text-[#FFD700]" />
          <div className="text-[10px]">
            <p className="font-black text-white uppercase tracking-widest">Core Engine v4.2</p>
            <p className="text-slate-500 flex items-center gap-1 mt-0.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#2E9E6F] animate-pulse"></span>
              Live & Secure
            </p>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;

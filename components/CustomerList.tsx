
import React from 'react';
import { Customer, LifecycleStage } from '../types';
import { User, Phone, MapPin, ExternalLink, Play } from 'lucide-react';

interface CustomerListProps {
  customers: Customer[];
  onSelect: (c: Customer) => void;
  onSimulateTransaction: (id: string) => void;
}

const CustomerList: React.FC<CustomerListProps> = ({ customers, onSelect, onSimulateTransaction }) => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {customers.map(customer => (
          <div key={customer.id} className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden hover:border-indigo-200 transition group">
            <div className="p-6">
              <div className="flex items-center gap-4 mb-6">
                <img src={customer.metadata.avatar} alt="" className="w-16 h-16 rounded-2xl object-cover ring-4 ring-slate-50" />
                <div className="flex-1">
                  <h3 className="font-bold text-lg text-slate-900">{customer.name}</h3>
                  <div className="flex items-center gap-2 mt-1">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                      customer.stage === LifecycleStage.ACTIVE ? 'bg-emerald-100 text-emerald-600' : 'bg-slate-100 text-slate-500'
                    }`}>
                      {customer.stage}
                    </span>
                    <span className="text-xs text-slate-400">•</span>
                    <span className="text-xs text-slate-500">{customer.metadata.occupation}</span>
                  </div>
                </div>
              </div>

              <div className="space-y-3 text-sm text-slate-600 mb-6">
                <div className="flex items-center gap-2">
                  <Phone size={14} className="text-slate-400" />
                  {customer.phone}
                </div>
                <div className="flex items-center gap-2">
                  <MapPin size={14} className="text-slate-400" />
                  <span className="truncate">{customer.address}</span>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Risk Score</p>
                  <p className={`text-lg font-bold ${customer.riskScore > 60 ? 'text-red-500' : 'text-slate-900'}`}>
                    {customer.riskScore}/100
                  </p>
                </div>
                <div className="flex gap-2">
                   <button 
                    onClick={() => onSimulateTransaction(customer.id)}
                    className="p-2 text-indigo-600 bg-indigo-50 rounded-lg hover:bg-indigo-100 transition"
                    title="Simulate Transaction"
                  >
                    <Play size={18} fill="currentColor" />
                  </button>
                  <button className="p-2 text-slate-600 bg-slate-100 rounded-lg hover:bg-slate-200 transition">
                    <ExternalLink size={18} />
                  </button>
                </div>
              </div>
            </div>
            {customer.pepStatus && (
              <div className="bg-amber-500 text-white text-[10px] font-bold py-1 text-center uppercase tracking-widest">
                PEP Flag Detected
              </div>
            )}
          </div>
        ))}
      </div>
      
      {customers.length === 0 && (
        <div className="bg-white border-2 border-dashed border-slate-200 rounded-2xl p-12 text-center">
          <User size={48} className="mx-auto text-slate-300 mb-4" />
          <h3 className="text-lg font-bold text-slate-900">No Customers Found</h3>
          <p className="text-slate-500">Add a synthetic prospect to begin the banking lifecycle simulation.</p>
        </div>
      )}
    </div>
  );
};

export default CustomerList;

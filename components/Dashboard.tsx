
import React from 'react';
import { Customer, Account, Transaction, FraudAlert } from '../types';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  LineChart,
  Line,
  Cell,
  PieChart,
  Pie
} from 'recharts';
// Added CreditCard to the lucide-react imports
import { TrendingUp, Users, Shield, AlertTriangle, CreditCard } from 'lucide-react';

interface DashboardProps {
  customers: Customer[];
  accounts: Account[];
  transactions: Transaction[];
  alerts: FraudAlert[];
}

const Dashboard: React.FC<DashboardProps> = ({ customers, accounts, transactions, alerts }) => {
  const totalBalance = accounts.reduce((sum, a) => sum + a.balance, 0);
  const activeAlerts = alerts.filter(a => !a.isDismissed).length;
  
  // Prepare chart data
  const lifecycleData = Object.values(customers.reduce((acc: any, c) => {
    acc[c.stage] = (acc[c.stage] || 0) + 1;
    return acc;
  }, {}));

  const pieData = [
    { name: 'Low Risk', value: customers.filter(c => c.riskScore < 30).length },
    { name: 'Med Risk', value: customers.filter(c => c.riskScore >= 30 && c.riskScore < 70).length },
    { name: 'High Risk', value: customers.filter(c => c.riskScore >= 70).length },
  ];

  const COLORS = ['#10b981', '#f59e0b', '#ef4444'];

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          label="Total AUM" 
          value={`$${totalBalance.toLocaleString()}`} 
          trend="+4.2%" 
          icon={<TrendingUp className="text-emerald-500" />} 
        />
        <StatCard 
          label="Total Customers" 
          value={customers.length.toString()} 
          trend={`+${customers.length}`} 
          icon={<Users className="text-blue-500" />} 
        />
        <StatCard 
          label="Risk Incidents" 
          value={activeAlerts.toString()} 
          trend="New" 
          icon={<AlertTriangle className="text-amber-500" />} 
        />
        <StatCard 
          label="System Health" 
          value="99.9%" 
          trend="Stable" 
          icon={<Shield className="text-indigo-500" />} 
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
          <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
            <Users size={18} className="text-slate-400" />
            Customer Portfolio Risk
          </h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex justify-around mt-4 text-sm font-medium">
            {pieData.map((d, i) => (
              <div key={d.name} className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[i] }}></span>
                {d.name}
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
          <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
            <CreditCard size={18} className="text-slate-400" />
            Transaction Velocity
          </h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={transactions.slice(0, 10).reverse()}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="id" hide />
                <YAxis stroke="#94a3b8" fontSize={12} />
                <Tooltip />
                <Line type="monotone" dataKey="amount" stroke="#6366f1" strokeWidth={3} dot={{ fill: '#6366f1' }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <p className="mt-4 text-xs text-slate-400 text-center uppercase tracking-widest">Synthetic Real-time Feed</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex justify-between items-center">
          <h3 className="font-bold">Recent Banking Activity</h3>
          <button className="text-sm text-indigo-600 font-medium hover:underline">View All</button>
        </div>
        <table className="w-full text-left">
          <thead className="bg-slate-50 text-slate-500 text-xs uppercase tracking-wider">
            <tr>
              <th className="px-6 py-4 font-semibold">Transaction ID</th>
              <th className="px-6 py-4 font-semibold">Type</th>
              <th className="px-6 py-4 font-semibold">Amount</th>
              <th className="px-6 py-4 font-semibold">Risk</th>
              <th className="px-6 py-4 font-semibold">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {transactions.slice(0, 5).map(txn => (
              <tr key={txn.id} className="hover:bg-slate-50 transition">
                <td className="px-6 py-4 font-mono text-xs">{txn.id}</td>
                <td className="px-6 py-4 text-sm font-medium">{txn.type}</td>
                <td className="px-6 py-4 text-sm font-bold text-slate-900">${txn.amount.toLocaleString()}</td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase ${
                    txn.riskRating === 'HIGH' || txn.riskRating === 'CRITICAL' 
                      ? 'bg-red-100 text-red-600' 
                      : 'bg-emerald-100 text-emerald-600'
                  }`}>
                    {txn.riskRating}
                  </span>
                </td>
                <td className="px-6 py-4">
                   <span className="flex items-center gap-1 text-sm text-slate-600">
                     <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                     {txn.status}
                   </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const StatCard: React.FC<{ label: string, value: string, trend: string, icon: React.ReactNode }> = ({ label, value, trend, icon }) => (
  <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 hover:shadow-md transition">
    <div className="flex justify-between items-start mb-4">
      <div className="p-2 bg-slate-50 rounded-lg">{icon}</div>
      <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full">{trend}</span>
    </div>
    <h4 className="text-slate-500 text-sm font-medium">{label}</h4>
    <p className="text-2xl font-bold text-slate-900 mt-1">{value}</p>
  </div>
);

export default Dashboard;

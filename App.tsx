import React, { useState } from "react";
import { useAuthSession } from "./hooks/useAuthSession";
import Layout from "./components/Layout";
import { AdminDashboard } from "./components/AdminDashboard";
import { CustomerDashboard } from "./components/CustomerDashboard";
import { LoginPortal } from "./components/LoginPortal";
import ModernizationPlan from "./components/ModernizationPlan";

function App(): React.ReactElement {
  const { admin, customer, isLoading } = useAuthSession();
  const [showModernizationPreview, setShowModernizationPreview] = useState(false);

  // 1. Loading State
  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="flex flex-col items-center animate-pulse">
          <div className="w-12 h-12 bg-[#0a1f44] rounded-lg mb-4"></div>
          <p className="text-[#0a1f44] font-bold tracking-widest text-xs uppercase">Initializing Session...</p>
        </div>
      </div>
    );
  }

  // 2. Modernization Preview Overlay
  if (showModernizationPreview) {
    return (
      <Layout>
        <div className="max-w-7xl mx-auto mb-8 animate-in slide-in-from-top-4 fade-in duration-500">
          <button
            type="button"
            onClick={() => setShowModernizationPreview(false)}
            className="px-6 py-3 bg-white text-[#0a1f44] font-black rounded-xl hover:bg-slate-100 transition shadow-lg border border-slate-200 flex items-center gap-2"
          >
            ← Back to Secure Access Center
          </button>
        </div>
        <ModernizationPlan />
      </Layout>
    );
  }

  // 3. Admin Dashboard
  if (admin) {
    return (
      <Layout variant="admin">
        <AdminDashboard />
      </Layout>
    );
  }

  // 4. Customer Dashboard
  if (customer) {
    return (
      <Layout variant="customer">
        <CustomerDashboard />
      </Layout>
    );
  }

  // 5. Default Login Portal
  return (
    <Layout>
      <div className="absolute top-4 right-4 z-50">
        <button
          type="button"
          onClick={() => setShowModernizationPreview(true)}
          className="px-4 py-2 bg-[#0a1f44]/10 text-[#0a1f44] text-xs font-bold rounded-lg hover:bg-[#0a1f44] hover:text-white transition uppercase tracking-widest backdrop-blur-sm"
        >
          UI Preview
        </button>
      </div>
      <div className="min-h-[80vh] flex flex-col justify-center">
        <LoginPortal />
      </div>
    </Layout>
  );
}

export default App;

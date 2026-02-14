import React from "react";
import { useAuthSession } from "./hooks/useAuthSession";
import { LandingPage } from "./pages/LandingPage";
import { MemberDashboard } from "./components/dashboard/MemberDashboard";
import { AdminDashboard } from "./components/AdminDashboard";
import { FloatingAdminButton } from "./components/FloatingAdminButton";

function App(): React.ReactElement {
  const { admin, customer, isLoading } = useAuthSession();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#001D4D] flex items-center justify-center">
        <div className="flex flex-col items-center animate-pulse">
          <div className="w-16 h-16 bg-white/10 rounded-2xl mb-6 flex items-center justify-center">
            <div className="w-8 h-8 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
          </div>
          <p className="text-white/60 font-black tracking-[0.3em] text-[10px] uppercase">Establishing Secure Link</p>
        </div>
      </div>
    );
  }

  // Admin View
  if (admin) {
    return (
      <div className="min-h-screen bg-slate-50">
        <AdminDashboard />
        <FloatingAdminButton />
      </div>
    );
  }

  // Customer View
  if (customer) {
    return (
      <div className="min-h-screen bg-slate-50">
        <MemberDashboard />
      </div>
    );
  }

  // Default: Mirrored Homepage
  return <LandingPage />;
}

export default App;

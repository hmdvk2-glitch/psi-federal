import React from 'react';
import Footer from './Footer';
import FloatingAdminButton from './FloatingAdminButton';

interface LayoutProps {
    children: React.ReactNode;
    variant?: 'default' | 'admin' | 'customer';
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
    return (
        <div className="flex flex-col min-h-screen font-sans bg-slate-50 relative">
            {/* Background Gradient Layer */}
            <div
                className="fixed inset-0 z-0 pointer-events-none"
                style={{
                    background: "radial-gradient(circle at 5% 0%, #dbeafe 0%, #f8fafc 35%, #eef2ff 100%)"
                }}
            />

            {/* Main Content Area */}
            <main className="flex-grow z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 mb-16">
                {children}
            </main>

            {/* Global Elements */}
            <div className="z-20 relative">
                <Footer />
            </div>

            {/* Floating Admin Tools */}
            <FloatingAdminButton />
        </div>
    );
};

export default Layout;

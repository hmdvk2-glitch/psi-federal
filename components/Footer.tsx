import React from "react";

const Footer: React.FC = () => {
  const fallbackStyle: React.CSSProperties = {
    backgroundColor: "#0a1f44",
    color: "white",
    padding: "2rem",
  };

  return (
    <footer
      className="mt-16 border-t border-white/10 bg-[#0a1f44] text-white"
      style={fallbackStyle}
      aria-label="PSI Federal site footer"
    >
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 gap-10 py-10 sm:grid-cols-2 lg:grid-cols-4">
          <section>
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/15 text-xs font-black uppercase">
                PSI
              </div>
              <div>
                <h2 className="text-2xl font-bold tracking-tight">PSI Federal</h2>
                <p className="text-sm text-slate-200">Banking Platform</p>
              </div>
            </div>
            <p className="mt-4 text-sm text-slate-200">NCUA insured</p>
          </section>

          <section>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-200">
              Member Services
            </h3>
            <ul className="mt-4 space-y-2 text-sm">
              <li>
                <a href="#" className="hover:text-white/80">
                  Banking
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white/80">
                  Lending
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white/80">
                  Investing
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white/80">
                  Support
                </a>
              </li>
            </ul>
          </section>

          <section>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-200">
              Security &amp; Compliance
            </h3>
            <ul className="mt-4 space-y-2 text-sm">
              <li>Fraud Prevention</li>
              <li>Security Hotline</li>
              <li>
                <a href="#" className="hover:text-white/80">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white/80">
                  Accessibility
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white/80">
                  Member Agreement
                </a>
              </li>
            </ul>
          </section>

          <section>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-200">
              Institutional Data
            </h3>
            <ul className="mt-4 space-y-2 text-sm">
              <li>Routing Number: 123456789</li>
              <li>NMLS ID: 449281</li>
              <li>Corporate HQ: 123 Federal Way, Finance Heights, VA 22030</li>
            </ul>
          </section>
        </div>

        <div className="border-t border-white/20 py-4 text-xs text-slate-200">
          (c) 2026 PSI Federal Credit Union. Federally insured by NCUA. Savings insured up to
          $250,000.
        </div>
      </div>
    </footer>
  );
};

export default Footer;

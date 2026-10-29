import React, { useState } from 'react';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import { siteConfig } from '../../config/site';
import { Link, useRouter } from '../../router/Router';

export const Header: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { pathname } = useRouter();

  const closeMobileMenu = () => setMobileMenuOpen(false);

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Strictly compliant 3-zone Top Bar Contract */}
        <div className="flex items-center justify-between gap-8 h-16">
          
          {/* Zone 1: Brand Wordmark (Single clean element) */}
          <Link
            to="/"
            onClick={closeMobileMenu}
            className="flex items-center gap-2.5 text-lg font-bold tracking-tight text-slate-900 whitespace-nowrap shrink-0 hover:opacity-90 transition-opacity focus:outline-none focus:ring-2 focus:ring-emerald-500 rounded-md"
            aria-label={`${siteConfig.brandName} Homepage`}
          >
            <span className="w-8 h-8 rounded-lg bg-slate-900 text-emerald-400 flex items-center justify-center font-mono font-bold text-base shadow-sm">
              RM
            </span>
            <span className="font-extrabold text-slate-900 text-xl tracking-tight">
              {siteConfig.brandName}
            </span>
          </Link>

          {/* Zone 2: 4-5 Concise single-line text links */}
          <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-slate-600" aria-label="Main Navigation">
            {siteConfig.navLinks.map((link) => {
              const isActive = pathname === link.path || (link.path.startsWith('/#') && pathname === '/');
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`whitespace-nowrap shrink-0 py-1 transition-colors hover:text-emerald-700 ${
                    isActive ? 'text-emerald-700 font-semibold border-b-2 border-emerald-600' : 'text-slate-600'
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Zone 3: 1 Primary Action & Mobile Toggle */}
          <div className="flex items-center gap-3 shrink-0">
            <Link
              to="/tools/serp-preview"
              className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg shadow-sm transition-colors whitespace-nowrap shrink-0 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-900"
            >
              <span>Quick Preview</span>
              <ArrowUpRight className="w-3.5 h-3.5" aria-hidden="true" />
            </Link>

            {/* Mobile Hamburger Button with >= 44px touch target */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden inline-flex items-center justify-center w-11 h-11 text-slate-700 hover:text-slate-900 hover:bg-slate-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-colors"
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-navigation"
              aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div id="mobile-navigation" className="md:hidden border-b border-slate-200 bg-white px-4 pt-3 pb-6 shadow-lg animate-in slide-in-from-top-2 duration-200">
          <nav className="flex flex-col space-y-1" aria-label="Mobile Navigation">
            {siteConfig.navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={closeMobileMenu}
                className="px-3 py-2.5 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-100 hover:text-emerald-700 transition-colors"
              >
                {link.label}
              </Link>
            ))}

            <div className="pt-3 mt-2 border-t border-slate-100">
              <p className="px-3 text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1">
                Direct Tool Access
              </p>
              {siteConfig.tools.map((tool) => (
                <Link
                  key={tool.id}
                  to={tool.path}
                  onClick={closeMobileMenu}
                  className="px-3 py-2 rounded-lg text-sm text-slate-600 hover:bg-emerald-50 hover:text-emerald-800 transition-colors flex items-center justify-between"
                >
                  <span>{tool.name}</span>
                </Link>
              ))}
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

import React from 'react';
import { ShieldCheck, Cpu } from 'lucide-react';
import { siteConfig } from '../../config/site';
import { Link } from '../../router/Router';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-900 text-slate-300 border-t border-slate-800 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 lg:gap-12">
          
          {/* Brand Info & Execution Philosophy */}
          <div className="md:col-span-2 space-y-4">
            <Link to="/" className="flex items-center gap-2.5 text-white font-bold text-xl tracking-tight">
              <span className="w-8 h-8 rounded-lg bg-emerald-500 text-slate-950 flex items-center justify-center font-mono font-bold text-base">
                RM
              </span>
              <span>{siteConfig.brandName}</span>
            </Link>
            <p className="text-sm text-slate-400 max-w-md leading-relaxed">
              Fast, privacy-first SEO utilities running 100% on your device. All calculations, image conversions, and snippet previews occur locally in your browser. No cookies, no external tracking, no accounts required.
            </p>
            <div className="flex flex-wrap items-center gap-4 text-xs text-slate-400 pt-2">
              <div className="flex items-center gap-1.5 text-emerald-400">
                <ShieldCheck className="w-4 h-4 shrink-0" aria-hidden="true" />
                <span>Zero Server Uploads</span>
              </div>
              <div className="flex items-center gap-1.5 text-slate-300">
                <Cpu className="w-4 h-4 shrink-0" aria-hidden="true" />
                <span>Client-Side Engine</span>
              </div>
            </div>
          </div>

          {/* Tools Links */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3">
              SEO Tools
            </h3>
            <ul className="space-y-2.5 text-sm">
              {siteConfig.tools.map((tool) => (
                <li key={tool.id}>
                  <Link
                    to={tool.path}
                    className="text-slate-400 hover:text-white transition-colors"
                  >
                    {tool.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources & Legal */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3">
              Resources & Legal
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/blog" className="text-slate-400 hover:text-white transition-colors">
                  SEO Blog & Guides
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-slate-400 hover:text-white transition-colors">
                  About Us & Methodology
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-slate-400 hover:text-white transition-colors">
                  Contact & Support
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-slate-400 hover:text-white transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-slate-400 hover:text-white transition-colors">
                  Terms of Use
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar with copyright and realistic disclaimer */}
        <div className="border-t border-slate-800 mt-12 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p>
            © {siteConfig.lastUpdatedYear} {siteConfig.brandName}. All rights reserved. Open-source friendly architecture for static hosting.
          </p>
          <p className="text-slate-400 text-center sm:text-right">
            Google™ is a trademark of Google LLC. {siteConfig.brandName} is not affiliated with or endorsed by Google LLC.
          </p>
        </div>
      </div>
    </footer>
  );
};

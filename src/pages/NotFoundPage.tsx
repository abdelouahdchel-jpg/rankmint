import React from 'react';
import { SeoHead } from '../components/layout/SeoHead';
import { Link } from '../router/Router';
import { siteConfig } from '../config/site';
import { Compass, Home, ArrowRight, Wrench, BookOpen } from 'lucide-react';

export const NotFoundPage: React.FC = () => {
  return (
    <div className="max-w-2xl mx-auto py-12 text-center space-y-8">
      <SeoHead
        title="Page Not Found (404)"
        description="The page you requested could not be located. Browse all five client-side SEO tools or technical guides."
        canonicalPath="/404"
      />

      <div className="w-16 h-16 rounded-2xl bg-amber-100 text-amber-800 flex items-center justify-center mx-auto">
        <Compass className="w-8 h-8" />
      </div>

      <div className="space-y-2">
        <span className="text-xs font-mono font-bold text-amber-700 uppercase tracking-widest">
          HTTP 404 Error
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-950 tracking-tight">
          Page Not Found
        </h1>
        <p className="text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
          The link you followed may be broken or the URL was mistyped. Choose one of our core tools below or return to the homepage.
        </p>
      </div>

      <div className="flex justify-center gap-3">
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg shadow-xs transition-colors"
        >
          <Home className="w-4 h-4" />
          <span>Return Home</span>
        </Link>
        <Link
          to="/blog"
          className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-semibold text-slate-700 bg-white hover:bg-slate-50 border border-slate-200 rounded-lg shadow-xs transition-colors"
        >
          <BookOpen className="w-4 h-4" />
          <span>View Blog Guides</span>
        </Link>
      </div>

      {/* Direct links to all 5 tools */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 text-left space-y-4 shadow-sm">
        <h2 className="text-xs font-semibold uppercase tracking-wider text-slate-500">
          Direct Access to All 5 SEO Utilities
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          {siteConfig.tools.map((tool) => (
            <Link
              key={tool.id}
              to={tool.path}
              className="p-3 rounded-lg border border-slate-100 hover:border-emerald-500 hover:bg-slate-50 transition-colors flex items-center justify-between"
            >
              <span className="font-semibold text-slate-800">{tool.name}</span>
              <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

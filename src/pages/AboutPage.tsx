import React from 'react';
import { Breadcrumbs } from '../components/layout/Breadcrumbs';
import { SeoHead } from '../components/layout/SeoHead';
import { siteConfig } from '../config/site';
import { ShieldCheck, Cpu, Code2, Globe2, Sparkles, CheckCircle2 } from 'lucide-react';
import { Link } from '../router/Router';

export const AboutPage: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto space-y-12">
      <SeoHead
        title="About Us & In-Browser Technical Philosophy"
        description={`Learn why ${siteConfig.brandName} builds 100% client-side SEO utilities without server uploads, paywalls, or privacy compromises.`}
        canonicalPath="/about"
      />

      <Breadcrumbs items={[{ name: 'About Us' }]} />

      <header className="space-y-4 max-w-3xl">
        <span className="text-xs font-semibold text-emerald-700 uppercase tracking-wider block">
          Our Architectural Philosophy
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-950 tracking-tight">
          Client-side web utilities for developers, publishers, and SEOs.
        </h1>
        <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
          {siteConfig.brandName} was created with a clear objective: provide essential search engine optimization and image conversion utilities that execute entirely on your device, without requiring account creation, subscription fees, or remote server uploads.
        </p>
      </header>

      {/* Core Principles */}
      <section className="space-y-6">
        <h2 className="text-xl font-bold text-slate-900 tracking-tight">
          The Three Architectural Principles Behind {siteConfig.brandName}
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900">1. Zero-Upload Privacy</h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              When converting sensitive screenshots or experimenting with unreleased page titles, your data should never enter third-party cloud buckets. Our tools utilize the HTML5 Canvas API and client JavaScript to execute in-memory.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-800 flex items-center justify-center">
              <Cpu className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900">2. Deterministic Accuracy</h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              We do not wrap external AI APIs or hallucinate metrics. Our outline generator and snippet testers use explicit, deterministic rules and mathematical font metrics (~600px desktop limits) derived directly from search engine specifications.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-800 flex items-center justify-center">
              <Code2 className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900">3. Static Infrastructure</h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              {siteConfig.brandName} is designed to run statically on modern global CDNs like Cloudflare Pages. There is no fragile database to leak data, no backend maintenance downtime, and no server queue delays.
            </p>
          </div>
        </div>
      </section>

      {/* Editorial Standards */}
      <section className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 space-y-4">
        <h2 className="text-xl font-bold text-slate-900 tracking-tight">
          Editorial & Research Standards
        </h2>
        <p className="text-sm text-slate-600 leading-relaxed">
          The SEO industry is plagued by exaggerated promises, fake "guaranteed rankings," and automated content filler. All articles and tool documentation on {siteConfig.brandName} are researched and written to reflect current search engine quality guidelines (Google Search Essentials, W3C HTML specifications, and Schema.org standards).
        </p>
        <p className="text-sm text-slate-600 leading-relaxed">
          We explicitly disclose search engine unpredictability: search engines frequently rewrite snippets, evaluate algorithms dynamically, and award rich results selectively. We will never promise unrealistic ranking shortcuts.
        </p>
      </section>

      {/* Brand Config Note */}
      <section className="p-6 bg-slate-100/70 border border-slate-200 rounded-2xl text-xs sm:text-sm text-slate-600 space-y-2">
        <h3 className="font-bold text-slate-900">Open Configuration Architecture</h3>
        <p>
          Need to deploy this suite under your own agency brand? {siteConfig.brandName} is organized around a single configuration manifest at <code>src/config/site.ts</code>, allowing site owners to update branding, domains, and contact endpoints in seconds.
        </p>
      </section>
    </div>
  );
};

import React from 'react';
import { ArrowRight, ShieldCheck, Zap, Lock, Sparkles, Image, Search, Code, FileJson, FileText, CheckCircle2 } from 'lucide-react';
import { siteConfig } from '../config/site';
import { Link } from '../router/Router';
import { blogArticles } from '../data/blogArticles';
import { SeoHead } from '../components/layout/SeoHead';

export const HomePage: React.FC = () => {
  const getToolIcon = (iconName: string) => {
    switch (iconName) {
      case 'Image':
        return <Image className="w-6 h-6 text-emerald-600" />;
      case 'Search':
        return <Search className="w-6 h-6 text-blue-600" />;
      case 'Code':
        return <Code className="w-6 h-6 text-purple-600" />;
      case 'FileJson':
        return <FileJson className="w-6 h-6 text-amber-600" />;
      case 'FileText':
        return <FileText className="w-6 h-6 text-rose-600" />;
      default:
        return <Sparkles className="w-6 h-6 text-emerald-600" />;
    }
  };

  return (
    <div className="space-y-20 sm:space-y-28">
      <SeoHead
        title="RankMint · Free In-Browser SEO Utilities"
        description={siteConfig.description}
        canonicalPath="/"
      />

      {/* Hero Section */}
      <section className="pt-8 sm:pt-16 pb-8 text-center max-w-4xl mx-auto px-4">
        {/* Anti-Slop Unboxed Text Metadata */}
        <div className="flex items-center justify-center gap-2 text-xs font-semibold text-slate-500 mb-4 tracking-wide uppercase">
          <span>Client-Side Processing</span>
          <span aria-hidden="true">·</span>
          <span>Zero Server Uploads</span>
          <span aria-hidden="true">·</span>
          <span>100% Free Forever</span>
        </div>

        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-slate-950 tracking-tight leading-[1.15] text-balance mb-6">
          Fast, privacy-first SEO tools that run directly in your browser.
        </h1>

        <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed mb-8">
          Convert images to PNG, test Google SERP cutoffs, generate clean HTML meta tags, and build valid JSON-LD schemas. No accounts, no paywalls, and zero data leaves your machine.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <a
            href="#tools"
            className="w-full sm:w-auto px-6 py-3.5 text-sm font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-xl shadow-sm transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-900 flex items-center justify-center gap-2"
          >
            <span>Explore All 5 Tools</span>
            <ArrowRight className="w-4 h-4" />
          </a>
          <Link
            to="/blog"
            className="w-full sm:w-auto px-6 py-3.5 text-sm font-semibold text-slate-700 hover:text-slate-900 bg-white hover:bg-slate-50 border border-slate-200 rounded-xl shadow-xs transition-colors flex items-center justify-center"
          >
            Read Technical Guides
          </Link>
        </div>

        {/* Value Proof Badges */}
        <div className="mt-12 pt-8 border-t border-slate-200/80 grid grid-cols-1 sm:grid-cols-3 gap-6 text-left">
          <div className="flex items-start gap-3">
            <div className="w-9 h-9 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900">Total Data Privacy</h3>
              <p className="text-xs text-slate-500 mt-0.5">Images and keywords remain in your local RAM.</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-9 h-9 rounded-lg bg-blue-100 text-blue-800 flex items-center justify-center shrink-0">
              <Zap className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900">Instant Execution</h3>
              <p className="text-xs text-slate-500 mt-0.5">No network queues or slow server conversions.</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-9 h-9 rounded-lg bg-purple-100 text-purple-800 flex items-center justify-center shrink-0">
              <Lock className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900">No Account Required</h3>
              <p className="text-xs text-slate-500 mt-0.5">Zero sign-ups, tracking cookies, or subscription tiers.</p>
            </div>
          </div>
        </div>
      </section>

      {/* The 5 Tools Showcase Section */}
      <section id="tools" className="scroll-mt-20">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <span className="text-xs font-semibold text-emerald-700 uppercase tracking-wider block mb-1">
              Core Toolkit
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-950 tracking-tight">
              Five essential SEO utilities built for speed
            </h2>
          </div>
          <p className="text-sm text-slate-500 max-w-md">
            Each utility solves a specific on-page or technical SEO challenge using modern browser APIs.
          </p>
        </div>

        {/* 5 Tools Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {siteConfig.tools.map((tool, idx) => {
            const isMarquee = idx === 0 || idx === 1;
            return (
              <div
                key={tool.id}
                className={`bg-white rounded-2xl border border-slate-200 p-6 flex flex-col justify-between hover:border-emerald-500 hover:shadow-md transition-all group ${
                  idx === 0 ? 'md:col-span-2 lg:col-span-2' : ''
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 rounded-xl bg-slate-50 border border-slate-200/80 flex items-center justify-center group-hover:bg-emerald-50 transition-colors">
                      {getToolIcon(tool.iconName)}
                    </div>
                    <span className="text-[11px] font-mono text-slate-600 bg-slate-100 px-2 py-1 rounded">
                      {tool.executionModel}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-emerald-700 transition-colors">
                    {tool.name}
                  </h3>

                  <p className="text-sm text-slate-600 leading-relaxed mb-6">
                    {tool.longDescription}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-xs font-medium text-slate-600">
                    Category: {tool.category}
                  </span>
                  <Link
                    to={tool.path}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-900 group-hover:text-emerald-700 group-hover:translate-x-0.5 transition-all"
                  >
                    <span>Launch Tool</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Featured Blog Guides Section */}
      <section className="bg-slate-100/70 -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8 py-16 rounded-3xl border border-slate-200/70">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
            <div>
              <span className="text-xs font-semibold text-emerald-700 uppercase tracking-wider block mb-1">
                From The Editorial Desk
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-950 tracking-tight">
                Practical search & performance guides
              </h2>
            </div>
            <Link
              to="/blog"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-emerald-700 hover:text-emerald-800"
            >
              <span>View all 8 articles</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {blogArticles.slice(0, 3).map((article) => (
              <article
                key={article.slug}
                className="bg-white rounded-2xl border border-slate-200 p-6 flex flex-col justify-between hover:shadow-md transition-shadow"
              >
                <div>
                  <div className="flex items-center gap-2 text-xs text-slate-500 mb-3">
                    <span>{article.category}</span>
                    <span aria-hidden="true">·</span>
                    <span>{article.readingTime}</span>
                  </div>

                  <h3 className="text-base font-bold text-slate-900 mb-2 leading-snug line-clamp-2">
                    <Link
                      to={`/blog/${article.slug}`}
                      className="hover:text-emerald-700 transition-colors"
                    >
                      {article.title}
                    </Link>
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-600 line-clamp-3 leading-relaxed mb-6">
                    {article.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-600">
                  <span>{article.publishedDate}</span>
                  <Link
                    to={`/blog/${article.slug}`}
                    className="font-semibold text-emerald-700 hover:text-emerald-800"
                  >
                    Read Guide →
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Frequently Asked Questions Section */}
      <section className="max-w-3xl mx-auto space-y-6">
        <div className="text-center mb-8">
          <span className="text-xs font-semibold text-emerald-700 uppercase tracking-wider block mb-1">
            Transparency
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-950 tracking-tight">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="space-y-4">
          <div className="bg-white rounded-xl border border-slate-200 p-5 space-y-2">
            <h3 className="text-sm font-bold text-slate-900">
              Are these tools truly 100% free with no hidden limits?
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Yes. Because all operations execute locally inside your web browser (using client-side JavaScript, Canvas, and DOM APIs), {siteConfig.brandName} incurs no backend server compute costs for image conversions or code generation. You can convert unlimited images, test unlimited SERP snippets, and create unlimited schemas without payment or sign-up.
            </p>
          </div>

          <div className="bg-white rounded-xl border border-slate-200 p-5 space-y-2">
            <h3 className="text-sm font-bold text-slate-900">
              Does using these tools guarantee page one rankings on Google?
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              No. Search engine algorithms evaluate hundreds of factors including content depth, page relevance, domain reputation, backlinks, and user engagement. While our tools ensure your technical tags, schema syntax, and image assets adhere to industry standards, no tool can guarantee Google rankings or rich snippet placements.
            </p>
          </div>

          <div className="bg-white rounded-xl border border-slate-200 p-5 space-y-2">
            <h3 className="text-sm font-bold text-slate-900">
              Can I self-host this toolkit on Cloudflare Pages or GitHub Pages?
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Absolutely. {siteConfig.brandName} was engineered as a pure static SPA with zero database or backend requirements. It can be compiled with <code>npm run build</code> and deployed in seconds to Cloudflare Pages, Netlify, Vercel, or GitHub Pages.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

import React, { useState } from 'react';
import { Search, ArrowRight, BookOpen } from 'lucide-react';
import { blogArticles } from '../data/blogArticles';
import { Breadcrumbs } from '../components/layout/Breadcrumbs';
import { SeoHead } from '../components/layout/SeoHead';
import { Link } from '../router/Router';
import { siteConfig } from '../config/site';

export const BlogIndexPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const categories = ['All', 'Image Optimization', 'Search Optimization', 'Technical SEO', 'SEO Copywriting', 'Web Performance'];

  const filteredArticles = blogArticles.filter((article) => {
    const matchesCategory = selectedCategory === 'All' || article.category === selectedCategory;
    const matchesSearch =
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="max-w-7xl mx-auto space-y-12">
      <SeoHead
        title="SEO & Web Performance Technical Guides"
        description="Original, substantive technical guides on image compression, SERP previewing, meta tag architecture, JSON-LD schema generation, and search optimization."
        canonicalPath="/blog"
      />

      {/* Breadcrumbs */}
      <Breadcrumbs items={[{ name: 'Blog' }]} />

      {/* Page Title & Mission */}
      <div className="max-w-3xl space-y-3">
        <span className="text-xs font-semibold text-emerald-700 uppercase tracking-wider block">
          Technical Resource Center
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-950 tracking-tight">
          SEO Guides & Practical Technical Tutorials
        </h1>
        <p className="text-base text-slate-600 leading-relaxed">
          Comprehensive, evidence-based articles detailing web standards, crawl budget optimization, structured data schemas, and Core Web Vitals performance. Written by engineers and technical marketers.
        </p>
      </div>

      {/* Search & Category Filter Toolbar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 pb-6 border-b border-slate-200">
        {/* Category Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-2 sm:pb-0 text-xs">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-lg font-medium whitespace-nowrap transition-colors ${
                selectedCategory === cat
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'bg-white text-slate-600 hover:text-slate-900 border border-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Search Input */}
        <div className="relative min-w-[240px]">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search guides..."
            className="w-full pl-9 pr-3 py-2 text-xs bg-white border border-slate-200 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
        </div>
      </div>

      {/* Article Grid */}
      {filteredArticles.length === 0 ? (
        <div className="py-16 text-center bg-white rounded-2xl border border-slate-200 p-8">
          <BookOpen className="w-8 h-8 text-slate-400 mx-auto mb-3" />
          <h3 className="text-base font-bold text-slate-900 mb-1">No articles found</h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            Try adjusting your search keywords or switching category filters.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredArticles.map((article) => (
            <article
              key={article.slug}
              className="bg-white rounded-2xl border border-slate-200 p-6 flex flex-col justify-between hover:border-emerald-500 hover:shadow-md transition-all group"
            >
              <div>
                <div className="flex items-center gap-2 text-xs text-slate-500 mb-3">
                  <span className="font-medium text-emerald-700">{article.category}</span>
                  <span aria-hidden="true">·</span>
                  <span>{article.readingTime}</span>
                </div>

                <h2 className="text-lg font-bold text-slate-900 mb-2 leading-snug group-hover:text-emerald-700 transition-colors">
                  <Link to={`/blog/${article.slug}`}>
                    {article.title}
                  </Link>
                </h2>

                <p className="text-xs sm:text-sm text-slate-600 line-clamp-3 leading-relaxed mb-6">
                  {article.description}
                </p>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs">
                <span className="text-slate-500">{article.publishedDate}</span>
                <Link
                  to={`/blog/${article.slug}`}
                  className="font-semibold text-slate-900 group-hover:text-emerald-700 inline-flex items-center gap-1"
                >
                  <span>Read Article</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
};

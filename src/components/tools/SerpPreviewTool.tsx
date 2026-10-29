import React, { useState } from 'react';
import { Smartphone, Monitor, AlertTriangle, CheckCircle, Sparkles, Globe } from 'lucide-react';
import { NoticeBanner } from '../common/NoticeBanner';

export const SerpPreviewTool: React.FC = () => {
  const [device, setDevice] = useState<'desktop' | 'mobile'>('desktop');
  const [title, setTitle] = useState('Top 10 Technical SEO Strategies for Faster Crawling in 2026');
  const [url, setUrl] = useState('https://example.com/blog/technical-seo-guide');
  const [description, setDescription] = useState(
    'Discover actionable technical SEO tips to accelerate Googlebot crawling, optimize your crawl budget, and fix indexation issues with step-by-step guidance.'
  );
  const [searchQuery, setSearchQuery] = useState('technical SEO');
  const [showDate, setShowDate] = useState(true);
  const [dateText, setDateText] = useState('Oct 28, 2026');

  // Approximate pixel width calculations based on Google's Arial font metrics
  // Average width of an Arial char in title ~ 9.6px, description ~ 7.2px
  const calculatePixelWidth = (text: string, isTitle: boolean) => {
    let width = 0;
    const factor = isTitle ? 1.05 : 0.82;
    for (const char of text) {
      if (/[A-Z]/.test(char)) width += 11 * factor;
      else if (/[wmiM]/.test(char)) width += 12 * factor;
      else if (/[ijl\.,'!\s]/.test(char)) width += 4.5 * factor;
      else width += 8.5 * factor;
    }
    return Math.round(width);
  };

  const titlePixels = calculatePixelWidth(title, true);
  const descPixels = calculatePixelWidth(description, false);

  const MAX_TITLE_PIXELS = device === 'desktop' ? 600 : 580;
  const MAX_TITLE_CHARS = 60;
  const MAX_DESC_PIXELS = device === 'desktop' ? 960 : 680;
  const MAX_DESC_CHARS = device === 'desktop' ? 160 : 120;

  const isTitleTruncated = titlePixels > MAX_TITLE_PIXELS || title.length > MAX_TITLE_CHARS;
  const isDescTruncated = descPixels > MAX_DESC_PIXELS || description.length > MAX_DESC_CHARS;

  // Format URL into breadcrumb display
  const getBreadcrumb = (rawUrl: string) => {
    try {
      const parsed = new URL(rawUrl.startsWith('http') ? rawUrl : `https://${rawUrl}`);
      const parts = parsed.pathname.split('/').filter(Boolean);
      return {
        domain: parsed.hostname,
        protocol: parsed.protocol,
        breadcrumbs: parts.length > 0 ? parts.join(' › ') : '',
      };
    } catch {
      return {
        domain: rawUrl.split('/')[0] || 'example.com',
        protocol: 'https:',
        breadcrumbs: '',
      };
    }
  };

  const breadcrumbData = getBreadcrumb(url);

  // Helper to render text with bolded search query matches
  const renderHighlightedText = (text: string, query: string, maxLength?: number) => {
    const displayText = maxLength && text.length > maxLength ? text.slice(0, maxLength) + '...' : text;
    if (!query.trim()) return <span>{displayText}</span>;

    const words = query.trim().split(/\s+/).filter(Boolean);
    const regex = new RegExp(`(${words.map((w) => w.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|')})`, 'gi');
    const parts = displayText.split(regex);

    return (
      <span>
        {parts.map((part, i) =>
          regex.test(part) ? (
            <strong key={i} className="font-bold text-inherit">
              {part}
            </strong>
          ) : (
            <span key={i}>{part}</span>
          )
        )}
      </span>
    );
  };

  const loadExample = (type: 'blog' | 'product' | 'home') => {
    if (type === 'blog') {
      setTitle('How to Optimize Images for Web Performance and SEO: A 2026 Guide');
      setUrl('https://example.com/guides/image-optimization-seo');
      setDescription(
        'Learn how to properly resize, compress, and choose between WebP, PNG, and AVIF formats to maximize Core Web Vitals scores and organic search traffic.'
      );
      setSearchQuery('optimize images for web');
    } else if (type === 'product') {
      setTitle('Ergonomic Mechanical Keyboard - Wireless Hot-Swap RGB | DeskCraft');
      setUrl('https://example.com/keyboards/ergonomic-pro-wireless');
      setDescription(
        'Upgrade your typing experience with quiet mechanical switches, aircraft-grade aluminum casing, and dual 2.4GHz Bluetooth connectivity with fast shipping.'
      );
      setSearchQuery('ergonomic mechanical keyboard');
    } else {
      setTitle('RankMint · Fast, Privacy-First Client-Side SEO Utilities');
      setUrl('https://rankmint.pages.dev');
      setDescription(
        'Free browser-based SEO tools to convert images to PNG, test Google SERP snippets, generate meta tags, and build JSON-LD schema without server tracking.'
      );
      setSearchQuery('SEO tools');
    }
  };

  return (
    <div className="space-y-8">
      {/* Search Engine Disclaimers Notice */}
      <NoticeBanner
        type="info"
        title="Google Snippet Algorithm Disclaimer"
      >
        Google does <strong>not</strong> guarantee that the title and description you set in your HTML will be displayed in actual search results. Google algorithmically rewrites or replaces over 60% of search snippets based on the user&apos;s exact query, on-page heading tags, anchor text, and extracted body text whenever it believes an automated snippet better answers user intent.
      </NoticeBanner>

      {/* Editor & Controls */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Input Form (7 cols) */}
        <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-100">
            <h3 className="text-base font-bold text-slate-900">Snippet Parameters</h3>
            <div className="flex items-center gap-1.5 text-xs">
              <span className="text-slate-400">Presets:</span>
              <button
                type="button"
                onClick={() => loadExample('blog')}
                className="px-2 py-1 text-slate-600 hover:text-emerald-700 hover:bg-emerald-50 rounded transition-colors"
              >
                Article
              </button>
              <button
                type="button"
                onClick={() => loadExample('product')}
                className="px-2 py-1 text-slate-600 hover:text-emerald-700 hover:bg-emerald-50 rounded transition-colors"
              >
                Product
              </button>
              <button
                type="button"
                onClick={() => loadExample('home')}
                className="px-2 py-1 text-slate-600 hover:text-emerald-700 hover:bg-emerald-50 rounded transition-colors"
              >
                Homepage
              </button>
            </div>
          </div>

          {/* Page Title Input */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-xs">
              <label htmlFor="serp-title" className="font-semibold text-slate-800">
                SEO Page Title
              </label>
              <div className="flex items-center gap-2">
                <span className={`tabular-nums font-mono ${title.length > MAX_TITLE_CHARS ? 'text-amber-600 font-bold' : 'text-slate-500'}`}>
                  {title.length} / {MAX_TITLE_CHARS} chars
                </span>
                <span className="text-slate-300">·</span>
                <span className={`tabular-nums font-mono ${titlePixels > MAX_TITLE_PIXELS ? 'text-red-600 font-bold' : 'text-slate-500'}`}>
                  ~{titlePixels} / {MAX_TITLE_PIXELS} px
                </span>
              </div>
            </div>
            <input
              id="serp-title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. My Website - The Best Services"
              className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white text-slate-900 transition-colors"
            />
            {/* Visual Progress Bar */}
            <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden mt-1">
              <div
                className={`h-full transition-all duration-300 ${
                  titlePixels > MAX_TITLE_PIXELS ? 'bg-red-500' : titlePixels > MAX_TITLE_PIXELS * 0.85 ? 'bg-amber-500' : 'bg-emerald-500'
                }`}
                style={{ width: `${Math.min(100, (titlePixels / MAX_TITLE_PIXELS) * 100)}%` }}
              />
            </div>
            {isTitleTruncated && (
              <p className="text-xs text-amber-700 flex items-center gap-1 mt-1">
                <AlertTriangle className="w-3.5 h-3.5 shrink-0" />
                <span>Title may be truncated with an ellipsis on {device} search results.</span>
              </p>
            )}
          </div>

          {/* Target URL Input */}
          <div className="space-y-1.5">
            <label htmlFor="serp-url" className="text-xs font-semibold text-slate-800">
              Page Canonical URL / Path
            </label>
            <input
              id="serp-url"
              type="text"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://example.com/my-page"
              className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white text-slate-900 font-mono text-xs transition-colors"
            />
          </div>

          {/* Meta Description Input */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-xs">
              <label htmlFor="serp-desc" className="font-semibold text-slate-800">
                Meta Description
              </label>
              <div className="flex items-center gap-2">
                <span className={`tabular-nums font-mono ${description.length > MAX_DESC_CHARS ? 'text-amber-600 font-bold' : 'text-slate-500'}`}>
                  {description.length} / {MAX_DESC_CHARS} chars
                </span>
                <span className="text-slate-300">·</span>
                <span className={`tabular-nums font-mono ${descPixels > MAX_DESC_PIXELS ? 'text-red-600 font-bold' : 'text-slate-500'}`}>
                  ~{descPixels} / {MAX_DESC_PIXELS} px
                </span>
              </div>
            </div>
            <textarea
              id="serp-desc"
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter a compelling 1-2 sentence summary..."
              className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white text-slate-900 transition-colors"
            />
            {/* Visual Progress Bar */}
            <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden mt-1">
              <div
                className={`h-full transition-all duration-300 ${
                  descPixels > MAX_DESC_PIXELS ? 'bg-red-500' : descPixels > MAX_DESC_PIXELS * 0.85 ? 'bg-amber-500' : 'bg-emerald-500'
                }`}
                style={{ width: `${Math.min(100, (descPixels / MAX_DESC_PIXELS) * 100)}%` }}
              />
            </div>
            {isDescTruncated && (
              <p className="text-xs text-amber-700 flex items-center gap-1 mt-1">
                <AlertTriangle className="w-3.5 h-3.5 shrink-0" />
                <span>Description exceeds recommended length for {device} screens and may be cut off.</span>
              </p>
            )}
          </div>

          {/* Extra Options: Search query simulation & Date toggle */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-slate-100 text-xs">
            <div>
              <label htmlFor="query-highlight" className="font-semibold text-slate-700 block mb-1">
                Search Query Bolding Simulation
              </label>
              <input
                id="query-highlight"
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Keywords to bold in snippet..."
                className="w-full px-3 py-1.5 bg-slate-50 border border-slate-200 rounded text-xs text-slate-800"
              />
            </div>
            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="font-semibold text-slate-700">Display Publication Date</span>
                <input
                  type="checkbox"
                  id="toggle-date"
                  checked={showDate}
                  onChange={(e) => setShowDate(e.target.checked)}
                  className="rounded text-emerald-600 focus:ring-emerald-500"
                />
              </div>
              <input
                type="text"
                value={dateText}
                disabled={!showDate}
                onChange={(e) => setDateText(e.target.value)}
                placeholder="e.g. Oct 28, 2026"
                className="w-full px-3 py-1.5 bg-slate-50 border border-slate-200 rounded text-xs text-slate-800 disabled:opacity-50"
              />
            </div>
          </div>
        </div>

        {/* Right Column: Interactive SERP Simulation (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          
          {/* Device Switcher (Desktop vs Mobile) */}
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Live SERP Simulation
            </span>
            <div className="inline-flex p-1 bg-slate-200/80 rounded-lg text-xs font-medium">
              <button
                type="button"
                onClick={() => setDevice('desktop')}
                className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-md transition-colors ${
                  device === 'desktop' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
                }`}
                aria-pressed={device === 'desktop'}
              >
                <Monitor className="w-3.5 h-3.5" />
                <span>Desktop</span>
              </button>
              <button
                type="button"
                onClick={() => setDevice('mobile')}
                className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-md transition-colors ${
                  device === 'mobile' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
                }`}
                aria-pressed={device === 'mobile'}
              >
                <Smartphone className="w-3.5 h-3.5" />
                <span>Mobile</span>
              </button>
            </div>
          </div>

          {/* Realistic Google Search Card */}
          <div
            className={`border border-slate-200 bg-white transition-all shadow-sm ${
              device === 'mobile'
                ? 'max-w-[360px] mx-auto rounded-2xl p-4'
                : 'w-full rounded-2xl p-6'
            }`}
          >
            {/* Mobile Header vs Desktop Header */}
            {device === 'mobile' ? (
              <div className="space-y-2">
                {/* Mobile URL & Favicon */}
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center shrink-0">
                    <Globe className="w-3.5 h-3.5 text-slate-600" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-xs text-slate-800 font-medium truncate">{breadcrumbData.domain}</p>
                    <p className="text-[11px] text-slate-500 truncate">{url}</p>
                  </div>
                </div>

                {/* Mobile Title */}
                <h4 className="text-[17px] leading-snug font-medium text-[#1a0dab] hover:underline cursor-pointer line-clamp-2">
                  {renderHighlightedText(title, searchQuery)}
                </h4>

                {/* Mobile Snippet */}
                <p className="text-[13px] leading-relaxed text-[#4d5156]">
                  {showDate && <span className="text-slate-500">{dateText} — </span>}
                  {renderHighlightedText(description, searchQuery, 140)}
                </p>
              </div>
            ) : (
              /* Desktop Layout */
              <div className="space-y-1.5 font-sans">
                {/* Desktop Breadcrumb */}
                <div className="flex items-center gap-2 text-xs text-[#202124]">
                  <div className="w-5 h-5 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center shrink-0">
                    <Globe className="w-3 h-3 text-slate-600" />
                  </div>
                  <div className="truncate">
                    <span className="font-medium text-slate-900">{breadcrumbData.domain}</span>
                    {breadcrumbData.breadcrumbs && (
                      <span className="text-slate-500"> › {breadcrumbData.breadcrumbs}</span>
                    )}
                  </div>
                </div>

                {/* Desktop Blue Title */}
                <h4 className="text-[20px] leading-snug text-[#1a0dab] hover:underline cursor-pointer font-normal line-clamp-2">
                  {renderHighlightedText(title, searchQuery)}
                </h4>

                {/* Desktop Grey Description */}
                <p className="text-[14px] leading-relaxed text-[#4d5156]">
                  {showDate && <span className="text-[#70757a]">{dateText} — </span>}
                  {renderHighlightedText(description, searchQuery, 160)}
                </p>
              </div>
            )}
          </div>

          {/* Quick Guidance Box */}
          <div className="p-4 rounded-xl bg-slate-100/70 border border-slate-200 text-xs text-slate-600 space-y-1.5">
            <div className="flex items-center gap-1.5 font-semibold text-slate-800">
              <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
              <span>SERP Best Practices</span>
            </div>
            <p>
              • Keep page titles between <strong>50–60 characters</strong> (under 600px).
            </p>
            <p>
              • Aim for meta descriptions around <strong>140–160 characters</strong> on desktop, <strong>110–130</strong> on mobile.
            </p>
            <p>
              • Include your target keyword naturally near the front of the title.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

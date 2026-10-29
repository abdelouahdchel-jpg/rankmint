import React, { useState } from 'react';
import { Code, CheckCircle, ShieldAlert, Sparkles, Copy, Download, RefreshCw } from 'lucide-react';
import { NoticeBanner } from '../common/NoticeBanner';
import { CodeBlock } from '../common/CodeBlock';

// Helper to sanitize strings inserted into HTML attributes safely
const escapeHtmlAttr = (str: string): string => {
  return str
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
};

export const MetaTagGeneratorTool: React.FC = () => {
  // 1. Core / Essential
  const [pageTitle, setPageTitle] = useState('Ultimate Guide to On-Page SEO Checklist');
  const [metaDescription, setMetaDescription] = useState(
    'A comprehensive on-page SEO checklist covering title tags, header hierarchy, internal linking, and meta descriptions to boost your organic rankings.'
  );
  const [canonicalUrl, setCanonicalUrl] = useState('https://example.com/on-page-seo-guide');
  const [authorName, setAuthorName] = useState('RankMint Editorial Team');

  // 2. Robots Directives
  const [isIndex, setIsIndex] = useState(true);
  const [isFollow, setIsFollow] = useState(true);
  const [noarchive, setNoarchive] = useState(false);
  const [nosnippet, setNosnippet] = useState(false);
  const [maxImagePreview, setMaxImagePreview] = useState<'large' | 'standard' | 'none'>('large');

  // 3. Open Graph
  const [ogTitle, setOgTitle] = useState('Ultimate Guide to On-Page SEO Checklist');
  const [ogDescription, setOgDescription] = useState(
    'A comprehensive on-page SEO checklist covering title tags, header hierarchy, and internal linking.'
  );
  const [ogUrl, setOgUrl] = useState('https://example.com/on-page-seo-guide');
  const [ogImage, setOgImage] = useState('https://example.com/images/seo-checklist-cover.jpg');
  const [ogType, setOgType] = useState<'website' | 'article' | 'product'>('article');
  const [ogSiteName, setOgSiteName] = useState('RankMint');

  // 4. Twitter Card
  const [twitterCard, setTwitterCard] = useState<'summary_large_image' | 'summary'>('summary_large_image');
  const [twitterTitle, setTwitterTitle] = useState('Ultimate Guide to On-Page SEO Checklist');
  const [twitterDescription, setTwitterDescription] = useState(
    'A comprehensive on-page SEO checklist covering title tags, header hierarchy, and internal linking.'
  );
  const [twitterImage, setTwitterImage] = useState('https://example.com/images/seo-checklist-cover.jpg');
  const [twitterSite, setTwitterSite] = useState('@rankmint_seo');
  const [twitterCreator, setTwitterCreator] = useState('@rankmint_editor');

  // Sync basic data into social fields
  const handleSyncToSocial = () => {
    setOgTitle(pageTitle);
    setOgDescription(metaDescription);
    setOgUrl(canonicalUrl);

    setTwitterTitle(pageTitle);
    setTwitterDescription(metaDescription);
    if (ogImage) setTwitterImage(ogImage);
  };

  // Build robots content string
  const buildRobotsDirectives = () => {
    const directives: string[] = [];
    directives.push(isIndex ? 'index' : 'noindex');
    directives.push(isFollow ? 'follow' : 'nofollow');
    if (noarchive) directives.push('noarchive');
    if (nosnippet) directives.push('nosnippet');
    if (maxImagePreview) directives.push(`max-image-preview:${maxImagePreview}`);
    return directives.join(', ');
  };

  // Generate HTML Output
  const generateHtml = () => {
    const lines: string[] = [
      '<!-- Standard HTML Meta Tags (Essential) -->',
      '<meta charset="UTF-8">',
      '<meta name="viewport" content="width=device-width, initial-scale=1.0">',
    ];

    if (pageTitle.trim()) {
      lines.push(`<title>${escapeHtmlAttr(pageTitle.trim())}</title>`);
    }

    if (metaDescription.trim()) {
      lines.push(`<meta name="description" content="${escapeHtmlAttr(metaDescription.trim())}">`);
    }

    if (authorName.trim()) {
      lines.push(`<meta name="author" content="${escapeHtmlAttr(authorName.trim())}">`);
    }

    if (canonicalUrl.trim()) {
      lines.push(`<link rel="canonical" href="${escapeHtmlAttr(canonicalUrl.trim())}">`);
    }

    // Robots directive
    const robots = buildRobotsDirectives();
    lines.push(`<meta name="robots" content="${escapeHtmlAttr(robots)}">`);

    // Open Graph
    lines.push('\n<!-- Open Graph / Facebook / LinkedIn / Slack (Recommended) -->');
    lines.push(`<meta property="og:type" content="${escapeHtmlAttr(ogType)}">`);
    if (ogTitle.trim()) {
      lines.push(`<meta property="og:title" content="${escapeHtmlAttr(ogTitle.trim())}">`);
    }
    if (ogDescription.trim()) {
      lines.push(`<meta property="og:description" content="${escapeHtmlAttr(ogDescription.trim())}">`);
    }
    if (ogUrl.trim()) {
      lines.push(`<meta property="og:url" content="${escapeHtmlAttr(ogUrl.trim())}">`);
    }
    if (ogSiteName.trim()) {
      lines.push(`<meta property="og:site_name" content="${escapeHtmlAttr(ogSiteName.trim())}">`);
    }
    if (ogImage.trim()) {
      lines.push(`<meta property="og:image" content="${escapeHtmlAttr(ogImage.trim())}">`);
    }

    // Twitter Cards
    lines.push('\n<!-- Twitter / X Card Tags (Recommended for Social Reach) -->');
    lines.push(`<meta name="twitter:card" content="${escapeHtmlAttr(twitterCard)}">`);
    if (twitterTitle.trim()) {
      lines.push(`<meta name="twitter:title" content="${escapeHtmlAttr(twitterTitle.trim())}">`);
    }
    if (twitterDescription.trim()) {
      lines.push(`<meta name="twitter:description" content="${escapeHtmlAttr(twitterDescription.trim())}">`);
    }
    if (twitterImage.trim()) {
      lines.push(`<meta name="twitter:image" content="${escapeHtmlAttr(twitterImage.trim())}">`);
    }
    if (twitterSite.trim()) {
      lines.push(`<meta name="twitter:site" content="${escapeHtmlAttr(twitterSite.trim())}">`);
    }
    if (twitterCreator.trim()) {
      lines.push(`<meta name="twitter:creator" content="${escapeHtmlAttr(twitterCreator.trim())}">`);
    }

    return lines.join('\n');
  };

  const generatedCode = generateHtml();

  return (
    <div className="space-y-8">
      {/* Notice Banner */}
      <NoticeBanner
        type="info"
        title="Tag Priority & Safe Escaping"
      >
        All generated attributes are automatically escaped to prevent syntax breakage and injection attacks. <strong>Essential tags</strong> (Title, Description, Canonical, Viewport) must be present on every indexable page. <strong>Open Graph and Twitter tags</strong> are optional but strongly recommended to guarantee attractive social share cards on LinkedIn, Slack, Facebook, and X.
      </NoticeBanner>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Inputs (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Section 1: Essential Tags */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                <h3 className="text-base font-bold text-slate-900">Essential Page Meta</h3>
              </div>
              <span className="text-xs text-emerald-700 font-semibold uppercase tracking-wider">Required for SEO</span>
            </div>

            <div className="space-y-1.5">
              <label htmlFor="meta-title" className="text-xs font-semibold text-slate-800">
                Page Title (`&lt;title&gt;`)
              </label>
              <input
                id="meta-title"
                type="text"
                value={pageTitle}
                onChange={(e) => setPageTitle(e.target.value)}
                placeholder="Page Title (50-60 chars)"
                className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white text-slate-900"
              />
            </div>

            <div className="space-y-1.5">
              <label htmlFor="meta-desc" className="text-xs font-semibold text-slate-800">
                Meta Description (`&lt;meta name=&quot;description&quot;&gt;`)
              </label>
              <textarea
                id="meta-desc"
                rows={3}
                value={metaDescription}
                onChange={(e) => setMetaDescription(e.target.value)}
                placeholder="Compelling 1-2 sentence summary (140-160 chars)"
                className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white text-slate-900"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label htmlFor="canonical-url" className="text-xs font-semibold text-slate-800">
                  Canonical URL (`rel=&quot;canonical&quot;`)
                </label>
                <input
                  id="canonical-url"
                  type="text"
                  value={canonicalUrl}
                  onChange={(e) => setCanonicalUrl(e.target.value)}
                  placeholder="https://example.com/page"
                  className="w-full px-3.5 py-2 text-xs font-mono bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white text-slate-900"
                />
              </div>

              <div className="space-y-1.5">
                <label htmlFor="author-name" className="text-xs font-semibold text-slate-800">
                  Author Name (Optional)
                </label>
                <input
                  id="author-name"
                  type="text"
                  value={authorName}
                  onChange={(e) => setAuthorName(e.target.value)}
                  placeholder="Author or organization name"
                  className="w-full px-3.5 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white text-slate-900"
                />
              </div>
            </div>
          </div>

          {/* Section 2: Robots Directives */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-slate-400" />
                <h3 className="text-base font-bold text-slate-900">Robots & Crawling Directives</h3>
              </div>
              <span className="text-xs text-slate-500 font-semibold uppercase tracking-wider">Search Engine Rules</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                <span className="font-semibold text-slate-800 block mb-2">Search Indexing</span>
                <div className="flex items-center gap-4">
                  <label className="flex items-center gap-1.5 cursor-pointer">
                    <input
                      type="radio"
                      name="robots-index"
                      checked={isIndex}
                      onChange={() => setIsIndex(true)}
                      className="text-emerald-600 focus:ring-emerald-500"
                    />
                    <span>index (allow)</span>
                  </label>
                  <label className="flex items-center gap-1.5 cursor-pointer text-red-700">
                    <input
                      type="radio"
                      name="robots-index"
                      checked={!isIndex}
                      onChange={() => setIsIndex(false)}
                      className="text-red-600 focus:ring-red-500"
                    />
                    <span>noindex (block)</span>
                  </label>
                </div>
              </div>

              <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                <span className="font-semibold text-slate-800 block mb-2">Link Following</span>
                <div className="flex items-center gap-4">
                  <label className="flex items-center gap-1.5 cursor-pointer">
                    <input
                      type="radio"
                      name="robots-follow"
                      checked={isFollow}
                      onChange={() => setIsFollow(true)}
                      className="text-emerald-600 focus:ring-emerald-500"
                    />
                    <span>follow (allow)</span>
                  </label>
                  <label className="flex items-center gap-1.5 cursor-pointer text-amber-700">
                    <input
                      type="radio"
                      name="robots-follow"
                      checked={!isFollow}
                      onChange={() => setIsFollow(false)}
                      className="text-amber-600 focus:ring-amber-500"
                    />
                    <span>nofollow</span>
                  </label>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs pt-1">
              <label className="flex items-center gap-2 p-2 bg-slate-50 border border-slate-200 rounded cursor-pointer">
                <input
                  type="checkbox"
                  checked={noarchive}
                  onChange={(e) => setNoarchive(e.target.checked)}
                  className="rounded text-emerald-600"
                />
                <span>noarchive (no cache)</span>
              </label>
              <label className="flex items-center gap-2 p-2 bg-slate-50 border border-slate-200 rounded cursor-pointer">
                <input
                  type="checkbox"
                  checked={nosnippet}
                  onChange={(e) => setNosnippet(e.target.checked)}
                  className="rounded text-emerald-600"
                />
                <span>nosnippet</span>
              </label>
              <div className="p-2 bg-slate-50 border border-slate-200 rounded flex items-center justify-between">
                <span>max-image-preview</span>
                <select
                  value={maxImagePreview}
                  onChange={(e) => setMaxImagePreview(e.target.value as 'large' | 'standard' | 'none')}
                  className="bg-white border border-slate-300 rounded px-1.5 py-0.5 text-xs text-slate-800"
                >
                  <option value="large">large</option>
                  <option value="standard">standard</option>
                  <option value="none">none</option>
                </select>
              </div>
            </div>
          </div>

          {/* Section 3: Open Graph & Twitter */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-blue-500" />
                <h3 className="text-base font-bold text-slate-900">Social Sharing (Open Graph & X)</h3>
              </div>
              <button
                type="button"
                onClick={handleSyncToSocial}
                className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-semibold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 rounded-md transition-colors"
              >
                <RefreshCw className="w-3 h-3" />
                <span>Sync From Basic Meta</span>
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label htmlFor="og-title" className="text-xs font-semibold text-slate-800">
                  og:title
                </label>
                <input
                  id="og-title"
                  type="text"
                  value={ogTitle}
                  onChange={(e) => setOgTitle(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg text-slate-900"
                />
              </div>

              <div className="space-y-1.5">
                <label htmlFor="og-type" className="text-xs font-semibold text-slate-800">
                  og:type
                </label>
                <select
                  id="og-type"
                  value={ogType}
                  onChange={(e) => setOgType(e.target.value as 'website' | 'article' | 'product')}
                  className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg text-slate-900"
                >
                  <option value="website">website</option>
                  <option value="article">article</option>
                  <option value="product">product</option>
                </select>
              </div>
            </div>

            <div className="space-y-1.5">
              <label htmlFor="og-desc" className="text-xs font-semibold text-slate-800">
                og:description
              </label>
              <textarea
                id="og-desc"
                rows={2}
                value={ogDescription}
                onChange={(e) => setOgDescription(e.target.value)}
                className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg text-slate-900"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label htmlFor="og-image" className="text-xs font-semibold text-slate-800">
                  og:image URL (Recommended: 1200×630px)
                </label>
                <input
                  id="og-image"
                  type="text"
                  value={ogImage}
                  onChange={(e) => {
                    setOgImage(e.target.value);
                    setTwitterImage(e.target.value);
                  }}
                  className="w-full px-3 py-2 text-xs font-mono bg-slate-50 border border-slate-200 rounded-lg text-slate-900"
                />
              </div>

              <div className="space-y-1.5">
                <label htmlFor="twitter-site" className="text-xs font-semibold text-slate-800">
                  twitter:site (@handle)
                </label>
                <input
                  id="twitter-site"
                  type="text"
                  value={twitterSite}
                  onChange={(e) => setTwitterSite(e.target.value)}
                  placeholder="@yourhandle"
                  className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg text-slate-900"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Right Output: Code Block (5 cols) */}
        <div className="lg:col-span-5 space-y-4 sticky top-24">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Generated HTML Output
            </span>
            <span className="text-xs text-emerald-600 font-medium">Ready to paste into &lt;head&gt;</span>
          </div>

          <CodeBlock
            code={generatedCode}
            language="html"
            downloadable={true}
            downloadFilename="meta-tags.html"
          />

          <div className="p-4 rounded-xl bg-slate-100/70 border border-slate-200 text-xs text-slate-600 space-y-2">
            <h4 className="font-semibold text-slate-900">Where do I paste this?</h4>
            <p>
              Copy and insert this code directly between the opening <code>&lt;head&gt;</code> and closing <code>&lt;/head&gt;</code> tags of your HTML document, template, or CMS header configuration.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

import React from 'react';
import { blogArticles } from '../data/blogArticles';
import { Breadcrumbs } from '../components/layout/Breadcrumbs';
import { SeoHead } from '../components/layout/SeoHead';
import { siteConfig } from '../config/site';
import { Link } from '../router/Router';
import { CodeBlock } from '../components/common/CodeBlock';
import { ArrowRight, CheckCircle2, Info, AlertTriangle, ArrowLeft, Wrench } from 'lucide-react';
import { NotFoundPage } from './NotFoundPage';

interface BlogPostPageProps {
  slug: string;
}

export const BlogPostPage: React.FC<BlogPostPageProps> = ({ slug }) => {
  const article = blogArticles.find((a) => a.slug === slug);

  if (!article) {
    return <NotFoundPage />;
  }

  const relatedTool = article.relatedToolId
    ? siteConfig.tools.find((t) => t.id === article.relatedToolId)
    : null;

  // Other articles for footer recommendation
  const otherArticles = blogArticles.filter((a) => a.slug !== slug).slice(0, 2);

  // Article JSON-LD Schema
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.description,
    author: {
      '@type': 'Person',
      name: article.author,
    },
    publisher: {
      '@type': 'Organization',
      name: siteConfig.brandName,
      url: siteConfig.domain,
    },
    datePublished: '2026-10-01', // ISO format baseline
    mainEntityOfPage: `${siteConfig.domain}/blog/${article.slug}`,
  };

  return (
    <article className="max-w-4xl mx-auto space-y-12">
      <SeoHead
        title={article.title}
        description={article.description}
        canonicalPath={`/blog/${article.slug}`}
        type="article"
      />

      {/* Embedded Article Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />

      {/* Breadcrumbs */}
      <Breadcrumbs
        items={[
          { name: 'Blog', path: '/blog' },
          { name: article.title },
        ]}
      />

      {/* Article Header */}
      <header className="space-y-4 pb-8 border-b border-slate-200">
        <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500">
          <span className="font-semibold text-emerald-700 uppercase tracking-wider">{article.category}</span>
          <span aria-hidden="true">·</span>
          <span>{article.readingTime}</span>
          <span aria-hidden="true">·</span>
          <span>Published on {article.publishedDate}</span>
          <span aria-hidden="true">·</span>
          <span>By {article.author}</span>
        </div>

        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-950 tracking-tight leading-tight">
          {article.title}
        </h1>

        <p className="text-lg sm:text-xl text-slate-600 leading-relaxed font-normal">
          {article.content.lead}
        </p>
      </header>

      {/* Main Content Body */}
      <div className="space-y-10 text-slate-800 leading-relaxed">
        {article.content.sections.map((section, idx) => (
          <section key={idx} className="space-y-4">
            <h2 className="text-2xl font-bold text-slate-900 tracking-tight pt-2">
              {section.heading}
            </h2>

            {section.body.map((paragraph, pIdx) => (
              <p key={pIdx} className="text-base text-slate-700 leading-relaxed">
                {paragraph}
              </p>
            ))}

            {/* Bullet Points if present */}
            {section.bulletPoints && section.bulletPoints.length > 0 && (
              <ul className="space-y-2 pl-4 list-disc marker:text-emerald-600 text-sm sm:text-base text-slate-700">
                {section.bulletPoints.map((item, bIdx) => (
                  <li key={bIdx} className="leading-relaxed">
                    {item}
                  </li>
                ))}
              </ul>
            )}

            {/* Code Snippet if present */}
            {section.codeSnippet && (
              <div className="pt-2">
                <CodeBlock
                  code={section.codeSnippet.code}
                  language={section.codeSnippet.language}
                  downloadable={false}
                />
                {section.codeSnippet.caption && (
                  <p className="text-xs text-slate-500 mt-1.5 italic">
                    {section.codeSnippet.caption}
                  </p>
                )}
              </div>
            )}

            {/* Callout box if present */}
            {section.callout && (
              <div
                className={`p-5 rounded-xl border text-sm space-y-1.5 ${
                  section.callout.type === 'tip'
                    ? 'bg-emerald-50/70 border-emerald-200 text-emerald-950'
                    : section.callout.type === 'warning'
                    ? 'bg-amber-50/70 border-amber-200 text-amber-950'
                    : 'bg-blue-50/70 border-blue-200 text-blue-950'
                }`}
              >
                <div className="flex items-center gap-2 font-bold text-slate-900">
                  {section.callout.type === 'tip' ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  ) : section.callout.type === 'warning' ? (
                    <AlertTriangle className="w-4 h-4 text-amber-600" />
                  ) : (
                    <Info className="w-4 h-4 text-blue-600" />
                  )}
                  <span>{section.callout.title}</span>
                </div>
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                  {section.callout.text}
                </p>
              </div>
            )}
          </section>
        ))}
      </div>

      {/* Key Takeaways Summary Card */}
      <section className="bg-slate-900 text-slate-100 rounded-2xl p-6 sm:p-8 space-y-4 shadow-md">
        <h3 className="text-lg font-bold text-white flex items-center gap-2">
          <CheckCircle2 className="w-5 h-5 text-emerald-400" />
          <span>Key Editorial Takeaways</span>
        </h3>
        <ul className="space-y-2.5 text-sm text-slate-300">
          {article.content.keyTakeaways.map((takeaway, kIdx) => (
            <li key={kIdx} className="flex items-start gap-2.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-2 shrink-0" />
              <span className="leading-relaxed">{takeaway}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* Interactive Tool Internal Link CTA */}
      {relatedTool && (
        <section className="bg-emerald-50/60 border border-emerald-200 rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="space-y-1.5 max-w-lg">
            <span className="text-xs font-semibold text-emerald-800 uppercase tracking-wider block">
              Direct Practical Application
            </span>
            <h3 className="text-lg font-bold text-slate-950">
              Try the free {relatedTool.name}
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              {relatedTool.shortDescription} Run it directly on your machine with zero server uploads.
            </p>
          </div>
          <Link
            to={relatedTool.path}
            className="px-5 py-3 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-xl shadow-xs transition-colors shrink-0 inline-flex items-center gap-2"
          >
            <Wrench className="w-4 h-4" />
            <span>Launch {relatedTool.name}</span>
          </Link>
        </section>
      )}

      {/* Footer Nav & Other Guides */}
      <footer className="pt-8 border-t border-slate-200 space-y-6">
        <div className="flex items-center justify-between">
          <Link
            to="/blog"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-700 hover:text-emerald-700 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to All Guides</span>
          </Link>
        </div>

        {otherArticles.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
            {otherArticles.map((other) => (
              <div key={other.slug} className="p-4 bg-white border border-slate-200 rounded-xl">
                <span className="text-[11px] text-slate-400 block mb-1">{other.category}</span>
                <Link
                  to={`/blog/${other.slug}`}
                  className="text-xs font-bold text-slate-900 hover:text-emerald-700 line-clamp-2"
                >
                  {other.title}
                </Link>
              </div>
            ))}
          </div>
        )}
      </footer>
    </article>
  );
};

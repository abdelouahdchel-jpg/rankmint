import React from 'react';
import { siteConfig } from '../config/site';
import { Breadcrumbs } from '../components/layout/Breadcrumbs';
import { SeoHead } from '../components/layout/SeoHead';
import { ImageToPngTool } from '../components/tools/ImageToPngTool';
import { SerpPreviewTool } from '../components/tools/SerpPreviewTool';
import { MetaTagGeneratorTool } from '../components/tools/MetaTagGeneratorTool';
import { SchemaGeneratorTool } from '../components/tools/SchemaGeneratorTool';
import { ArticleOutlineGeneratorTool } from '../components/tools/ArticleOutlineGeneratorTool';
import { blogArticles } from '../data/blogArticles';
import { Link } from '../router/Router';
import { ArrowRight, BookOpen, ShieldCheck } from 'lucide-react';
import { NotFoundPage } from './NotFoundPage';

interface ToolDetailPageProps {
  toolId: string;
}

export const ToolDetailPage: React.FC<ToolDetailPageProps> = ({ toolId }) => {
  const tool = siteConfig.tools.find((t) => t.id === toolId);

  if (!tool) {
    return <NotFoundPage />;
  }

  // Find related blog articles
  const relatedArticles = blogArticles.filter((a) => a.relatedToolId === tool.id);

  const renderToolComponent = () => {
    switch (tool.id) {
      case 'image-to-png':
        return <ImageToPngTool />;
      case 'serp-preview':
        return <SerpPreviewTool />;
      case 'meta-tag-generator':
        return <MetaTagGeneratorTool />;
      case 'schema-generator':
        return <SchemaGeneratorTool />;
      case 'article-outline-generator':
        return <ArticleOutlineGeneratorTool />;
      default:
        return null;
    }
  };

  return (
    <div className="max-w-7xl mx-auto space-y-12">
      <SeoHead
        title={tool.metaTitle}
        description={tool.metaDescription}
        canonicalPath={tool.path}
      />

      {/* Breadcrumbs */}
      <Breadcrumbs
        items={[
          { name: 'Tools', path: '/#tools' },
          { name: tool.name },
        ]}
      />

      {/* Tool Header */}
      <div className="space-y-4 max-w-3xl">
        <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500">
          <span className="font-semibold text-emerald-700 uppercase tracking-wider">{tool.category}</span>
          <span aria-hidden="true">·</span>
          <span>{tool.executionModel}</span>
          <span aria-hidden="true">·</span>
          <span className="inline-flex items-center gap-1 text-slate-600">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span>Private In-Browser Execution</span>
          </span>
        </div>

        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-950 tracking-tight">
          {tool.name}
        </h1>

        <p className="text-base text-slate-600 leading-relaxed">
          {tool.longDescription}
        </p>
      </div>

      {/* The Interactive Tool Container */}
      <div className="pt-2">
        {renderToolComponent()}
      </div>

      {/* Related Technical Articles Section */}
      {relatedArticles.length > 0 && (
        <section className="pt-12 border-t border-slate-200 space-y-6">
          <div className="flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-emerald-600" />
            <h2 className="text-xl font-bold text-slate-950 tracking-tight">
              Recommended Reading for {tool.name}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {relatedArticles.map((article) => (
              <div
                key={article.slug}
                className="bg-white rounded-xl border border-slate-200 p-5 flex flex-col justify-between hover:border-emerald-500 hover:shadow-xs transition-all"
              >
                <div>
                  <span className="text-[11px] text-slate-500 block mb-1.5">{article.readingTime}</span>
                  <h3 className="text-sm font-bold text-slate-900 leading-snug mb-2">
                    <Link to={`/blog/${article.slug}`} className="hover:text-emerald-700">
                      {article.title}
                    </Link>
                  </h3>
                  <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed mb-4">
                    {article.description}
                  </p>
                </div>
                <Link
                  to={`/blog/${article.slug}`}
                  className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-700 hover:text-emerald-800"
                >
                  <span>Read Guide</span>
                  <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

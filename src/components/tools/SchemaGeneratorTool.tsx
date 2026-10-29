import React, { useState } from 'react';
import { Plus, Trash2, CheckCircle2, AlertCircle, FileJson, Sparkles } from 'lucide-react';
import { NoticeBanner } from '../common/NoticeBanner';
import { CodeBlock } from '../common/CodeBlock';

type SchemaType = 'Organization' | 'WebSite' | 'Article' | 'FAQPage';

interface FaqItem {
  question: string;
  answer: string;
}

export const SchemaGeneratorTool: React.FC = () => {
  const [activeType, setActiveType] = useState<SchemaType>('Article');

  // Organization fields
  const [orgName, setOrgName] = useState('RankMint Media LLC');
  const [orgUrl, setOrgUrl] = useState('https://example.com');
  const [orgLogo, setOrgLogo] = useState('https://example.com/logo.png');
  const [orgEmail, setOrgEmail] = useState('support@example.com');
  const [orgPhone, setOrgPhone] = useState('+1-555-0199');
  const [socialLinks, setSocialLinks] = useState<string[]>([
    'https://twitter.com/rankmint',
    'https://linkedin.com/company/rankmint',
  ]);

  // WebSite fields
  const [siteName, setSiteName] = useState('RankMint');
  const [siteAltName, setSiteAltName] = useState('RankMint SEO Toolkit');
  const [siteUrl, setSiteUrl] = useState('https://example.com');
  const [searchTarget, setSearchTarget] = useState('https://example.com/search?q={search_term_string}');

  // Article fields
  const [articleHeadline, setArticleHeadline] = useState('How to Audit Core Web Vitals for E-Commerce');
  const [articleImage, setArticleImage] = useState('https://example.com/images/core-web-vitals.jpg');
  const [articleDescription, setArticleDescription] = useState(
    'A practical guide to identifying and fixing Largest Contentful Paint (LCP) and Cumulative Layout Shift (CLS) bottlenecks on product category pages.'
  );
  const [articleDatePublished, setArticleDatePublished] = useState('2026-10-15');
  const [articleDateModified, setArticleDateModified] = useState('2026-10-28');
  const [authorType, setAuthorType] = useState<'Person' | 'Organization'>('Person');
  const [authorName, setAuthorName] = useState('Sarah Jenkins');
  const [authorUrl, setAuthorUrl] = useState('https://example.com/authors/sarah-jenkins');
  const [publisherName, setPublisherName] = useState('RankMint');
  const [publisherLogo, setPublisherLogo] = useState('https://example.com/logo.png');

  // FAQPage fields
  const [faqs, setFaqs] = useState<FaqItem[]>([
    {
      question: 'What is structured data in SEO?',
      answer:
        'Structured data is a standardized format (typically JSON-LD) used to classify page content and provide search engines with explicit clues about the meaning of entities on a webpage.',
    },
    {
      question: 'Does schema markup guarantee rich snippets in Google search?',
      answer:
        'No. Google algorithms evaluate multiple factors including page quality, user relevance, and algorithmic trust before deciding whether to display rich snippets, even if the markup is 100% syntactically valid.',
    },
    {
      question: 'Where should JSON-LD script tags be placed?',
      answer:
        'Google recommends placing the JSON-LD script inside the <head> element of your HTML document, though placing it inside the <body> is also technically parsed.',
    },
  ]);

  // Social link helpers
  const handleAddSocialLink = () => {
    setSocialLinks([...socialLinks, '']);
  };

  const handleUpdateSocialLink = (index: number, val: string) => {
    const updated = [...socialLinks];
    updated[index] = val;
    setSocialLinks(updated);
  };

  const handleRemoveSocialLink = (index: number) => {
    setSocialLinks(socialLinks.filter((_, i) => i !== index));
  };

  // FAQ helpers
  const handleAddFaq = () => {
    setFaqs([...faqs, { question: '', answer: '' }]);
  };

  const handleUpdateFaq = (index: number, field: 'question' | 'answer', val: string) => {
    const updated = [...faqs];
    updated[index][field] = val;
    setFaqs(updated);
  };

  const handleRemoveFaq = (index: number) => {
    setFaqs(faqs.filter((_, i) => i !== index));
  };

  // Generate Schema Object based on Active Type
  const buildSchemaObject = () => {
    if (activeType === 'Organization') {
      const cleanSocials = socialLinks.map((s) => s.trim()).filter(Boolean);
      return {
        '@context': 'https://schema.org',
        '@type': 'Organization',
        name: orgName.trim() || undefined,
        url: orgUrl.trim() || undefined,
        logo: orgLogo.trim() || undefined,
        email: orgEmail.trim() || undefined,
        telephone: orgPhone.trim() || undefined,
        sameAs: cleanSocials.length > 0 ? cleanSocials : undefined,
      };
    }

    if (activeType === 'WebSite') {
      return {
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        name: siteName.trim() || undefined,
        alternateName: siteAltName.trim() || undefined,
        url: siteUrl.trim() || undefined,
        potentialAction: searchTarget.trim()
          ? {
              '@type': 'SearchAction',
              target: {
                '@type': 'EntryPoint',
                urlTemplate: searchTarget.trim(),
              },
              'query-input': 'required name=search_term_string',
            }
          : undefined,
      };
    }

    if (activeType === 'Article') {
      return {
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: articleHeadline.trim() || undefined,
        description: articleDescription.trim() || undefined,
        image: articleImage.trim() || undefined,
        datePublished: articleDatePublished || undefined,
        dateModified: articleDateModified || undefined,
        author: {
          '@type': authorType,
          name: authorName.trim() || undefined,
          url: authorUrl.trim() || undefined,
        },
        publisher: {
          '@type': 'Organization',
          name: publisherName.trim() || undefined,
          logo: publisherLogo.trim()
            ? {
                '@type': 'ImageObject',
                url: publisherLogo.trim(),
              }
            : undefined,
        },
        mainEntityOfPage: {
          '@type': 'WebPage',
          '@id': orgUrl.trim() || 'https://example.com',
        },
      };
    }

    if (activeType === 'FAQPage') {
      const cleanFaqs = faqs.filter((f) => f.question.trim() && f.answer.trim());
      return {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: cleanFaqs.map((faq) => ({
          '@type': 'Question',
          name: faq.question.trim(),
          acceptedAnswer: {
            '@type': 'Answer',
            text: faq.answer.trim(),
          },
        })),
      };
    }

    return {};
  };

  const schemaObject = buildSchemaObject();
  let jsonString = '';
  let isValidJson = true;

  try {
    jsonString = JSON.stringify(schemaObject, null, 2);
    JSON.parse(jsonString);
  } catch {
    isValidJson = false;
  }

  const fullScriptTag = `<script type="application/ld+json">\n${jsonString}\n</script>`;

  return (
    <div className="space-y-8">
      {/* Search Engine Disclaimers Notice */}
      <NoticeBanner
        type="warning"
        title="Zero Ranking Guarantee & Schema Accuracy Guidelines"
      >
        <strong>Search engines never guarantee rich results or higher rankings</strong> simply because schema markup is present on your page. Structured data only communicates explicit semantic context. In accordance with Google Search Essentials, never mark up hidden content, deceptive reviews, or non-visible FAQs, as doing so can trigger manual spam actions against your domain.
      </NoticeBanner>

      {/* Schema Type Selector Tabs */}
      <div className="flex flex-wrap items-center gap-2 p-1.5 bg-slate-200/70 rounded-xl max-w-fit">
        {(['Article', 'FAQPage', 'Organization', 'WebSite'] as SchemaType[]).map((type) => (
          <button
            key={type}
            type="button"
            onClick={() => setActiveType(type)}
            className={`px-4 py-2 text-xs font-semibold rounded-lg transition-colors ${
              activeType === type
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            {type}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Form Inputs (7 cols) */}
        <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-6">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <h3 className="text-base font-bold text-slate-900">{activeType} Properties</h3>
            <span className="text-xs text-slate-400 font-mono">Schema.org / {activeType}</span>
          </div>

          {/* Article Form */}
          {activeType === 'Article' && (
            <div className="space-y-4 text-xs">
              <div className="space-y-1.5">
                <label className="font-semibold text-slate-800">Article Headline (Required)</label>
                <input
                  type="text"
                  value={articleHeadline}
                  onChange={(e) => setArticleHeadline(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-lg text-slate-900"
                />
              </div>

              <div className="space-y-1.5">
                <label className="font-semibold text-slate-800">Article Description / Abstract</label>
                <textarea
                  rows={2}
                  value={articleDescription}
                  onChange={(e) => setArticleDescription(e.target.value)}
                  className="w-full px-3.5 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg text-slate-900"
                />
              </div>

              <div className="space-y-1.5">
                <label className="font-semibold text-slate-800">Lead Image URL</label>
                <input
                  type="text"
                  value={articleImage}
                  onChange={(e) => setArticleImage(e.target.value)}
                  className="w-full px-3.5 py-2 text-xs font-mono bg-slate-50 border border-slate-200 rounded-lg text-slate-900"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="font-semibold text-slate-800">Date Published</label>
                  <input
                    type="date"
                    value={articleDatePublished}
                    onChange={(e) => setArticleDatePublished(e.target.value)}
                    className="w-full px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-900"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="font-semibold text-slate-800">Date Modified</label>
                  <input
                    type="date"
                    value={articleDateModified}
                    onChange={(e) => setArticleDateModified(e.target.value)}
                    className="w-full px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-900"
                  />
                </div>
              </div>

              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-3">
                <span className="font-semibold text-slate-800 block">Author Details</span>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="text-slate-500 block mb-1">Author Type</label>
                    <select
                      value={authorType}
                      onChange={(e) => setAuthorType(e.target.value as 'Person' | 'Organization')}
                      className="w-full px-2.5 py-1.5 bg-white border border-slate-200 rounded text-slate-800"
                    >
                      <option value="Person">Person</option>
                      <option value="Organization">Organization</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-slate-500 block mb-1">Author Name</label>
                    <input
                      type="text"
                      value={authorName}
                      onChange={(e) => setAuthorName(e.target.value)}
                      className="w-full px-2.5 py-1.5 bg-white border border-slate-200 rounded text-slate-800"
                    />
                  </div>
                  <div>
                    <label className="text-slate-500 block mb-1">Author Profile URL</label>
                    <input
                      type="text"
                      value={authorUrl}
                      onChange={(e) => setAuthorUrl(e.target.value)}
                      className="w-full px-2.5 py-1.5 bg-white border border-slate-200 rounded text-slate-800"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* FAQPage Form */}
          {activeType === 'FAQPage' && (
            <div className="space-y-4">
              <p className="text-xs text-slate-500">
                Add frequently asked questions and direct answers that appear visibly on your page.
              </p>

              <div className="space-y-4">
                {faqs.map((faq, index) => (
                  <div key={index} className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2 relative">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-700">Question #{index + 1}</span>
                      {faqs.length > 1 && (
                        <button
                          type="button"
                          onClick={() => handleRemoveFaq(index)}
                          className="text-red-500 hover:text-red-700 p-1"
                          title="Remove question"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                    <input
                      type="text"
                      value={faq.question}
                      onChange={(e) => handleUpdateFaq(index, 'question', e.target.value)}
                      placeholder="e.g. What is the return policy?"
                      className="w-full px-3 py-2 text-xs bg-white border border-slate-200 rounded-lg text-slate-900 font-medium"
                    />
                    <textarea
                      rows={2}
                      value={faq.answer}
                      onChange={(e) => handleUpdateFaq(index, 'answer', e.target.value)}
                      placeholder="Direct, comprehensive answer..."
                      className="w-full px-3 py-2 text-xs bg-white border border-slate-200 rounded-lg text-slate-900"
                    />
                  </div>
                ))}
              </div>

              <button
                type="button"
                onClick={handleAddFaq}
                className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 rounded-lg transition-colors"
              >
                <Plus className="w-4 h-4" />
                <span>Add Another Question</span>
              </button>
            </div>
          )}

          {/* Organization Form */}
          {activeType === 'Organization' && (
            <div className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="font-semibold text-slate-800">Legal Business Name</label>
                  <input
                    type="text"
                    value={orgName}
                    onChange={(e) => setOrgName(e.target.value)}
                    className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="font-semibold text-slate-800">Official Website URL</label>
                  <input
                    type="text"
                    value={orgUrl}
                    onChange={(e) => setOrgUrl(e.target.value)}
                    className="w-full px-3.5 py-2 font-mono bg-slate-50 border border-slate-200 rounded-lg text-slate-900"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="font-semibold text-slate-800">Logo Image URL</label>
                <input
                  type="text"
                  value={orgLogo}
                  onChange={(e) => setOrgLogo(e.target.value)}
                  className="w-full px-3.5 py-2 font-mono bg-slate-50 border border-slate-200 rounded-lg text-slate-900"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="font-semibold text-slate-800">Contact Email</label>
                  <input
                    type="email"
                    value={orgEmail}
                    onChange={(e) => setOrgEmail(e.target.value)}
                    className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="font-semibold text-slate-800">Customer Phone</label>
                  <input
                    type="text"
                    value={orgPhone}
                    onChange={(e) => setOrgPhone(e.target.value)}
                    className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900"
                  />
                </div>
              </div>

              {/* Social Profiles */}
              <div className="space-y-2 pt-2 border-t border-slate-100">
                <span className="font-semibold text-slate-800 block">Social Profiles (`sameAs`)</span>
                {socialLinks.map((link, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <input
                      type="text"
                      value={link}
                      onChange={(e) => handleUpdateSocialLink(idx, e.target.value)}
                      placeholder="https://..."
                      className="flex-1 px-3 py-1.5 font-mono text-xs bg-slate-50 border border-slate-200 rounded-lg"
                    />
                    <button
                      type="button"
                      onClick={() => handleRemoveSocialLink(idx)}
                      className="p-1.5 text-slate-400 hover:text-red-600 rounded"
                      title="Remove social link"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={handleAddSocialLink}
                  className="inline-flex items-center gap-1 text-xs text-emerald-700 hover:text-emerald-800 font-semibold mt-1"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Social Profile</span>
                </button>
              </div>
            </div>
          )}

          {/* WebSite Form */}
          {activeType === 'WebSite' && (
            <div className="space-y-4 text-xs">
              <div className="space-y-1.5">
                <label className="font-semibold text-slate-800">Site Name</label>
                <input
                  type="text"
                  value={siteName}
                  onChange={(e) => setSiteName(e.target.value)}
                  className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900"
                />
              </div>

              <div className="space-y-1.5">
                <label className="font-semibold text-slate-800">Alternate / Short Name</label>
                <input
                  type="text"
                  value={siteAltName}
                  onChange={(e) => setSiteAltName(e.target.value)}
                  className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900"
                />
              </div>

              <div className="space-y-1.5">
                <label className="font-semibold text-slate-800">Home URL</label>
                <input
                  type="text"
                  value={siteUrl}
                  onChange={(e) => setSiteUrl(e.target.value)}
                  className="w-full px-3.5 py-2 font-mono bg-slate-50 border border-slate-200 rounded-lg text-slate-900"
                />
              </div>

              <div className="space-y-1.5">
                <label className="font-semibold text-slate-800">Sitelinks Searchbox URL Template</label>
                <input
                  type="text"
                  value={searchTarget}
                  onChange={(e) => setSearchTarget(e.target.value)}
                  placeholder="https://example.com/search?q={search_term_string}"
                  className="w-full px-3.5 py-2 font-mono bg-slate-50 border border-slate-200 rounded-lg text-slate-900"
                />
                <p className="text-[11px] text-slate-500">
                  Must include the <code>&#123;search_term_string&#125;</code> placeholder for Google Sitelinks Searchbox.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Right Output: Code Block (5 cols) */}
        <div className="lg:col-span-5 space-y-4 sticky top-24">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              JSON-LD Code Preview
            </span>
            <div className="flex items-center gap-1.5 text-xs">
              {isValidJson ? (
                <span className="inline-flex items-center gap-1 text-emerald-700 font-medium">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Valid JSON Syntax</span>
                </span>
              ) : (
                <span className="inline-flex items-center gap-1 text-red-700 font-medium">
                  <AlertCircle className="w-3.5 h-3.5" />
                  <span>JSON Error</span>
                </span>
              )}
            </div>
          </div>

          <CodeBlock
            code={fullScriptTag}
            language="json"
            downloadable={true}
            downloadFilename={`${activeType.toLowerCase()}-schema.jsonld`}
          />

          <div className="p-4 rounded-xl bg-slate-100/70 border border-slate-200 text-xs text-slate-600 space-y-2">
            <h4 className="font-semibold text-slate-900">How to test your structured data?</h4>
            <p>
              After embedding this script in your webpage, test the live URL or raw code using Google’s official <strong>Rich Results Test</strong> or the <strong>Schema Markup Validator</strong> (validator.schema.org) to verify zero warnings.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

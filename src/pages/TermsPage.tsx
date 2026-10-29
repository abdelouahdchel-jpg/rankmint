import React from 'react';
import { Breadcrumbs } from '../components/layout/Breadcrumbs';
import { SeoHead } from '../components/layout/SeoHead';
import { siteConfig } from '../config/site';

export const TermsPage: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto space-y-10">
      <SeoHead
        title="Terms of Use"
        description={`Terms of Use for ${siteConfig.brandName}. Disclaimers regarding search engine rankings, tool availability, and as-is warranties.`}
        canonicalPath="/terms"
      />

      <Breadcrumbs items={[{ name: 'Terms of Use' }]} />

      <header className="space-y-3">
        <span className="text-xs font-semibold text-emerald-700 uppercase tracking-wider block">
          Legal Agreement
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-950 tracking-tight">
          Terms of Use
        </h1>
        <p className="text-xs sm:text-sm text-slate-500">
          Last revised: October 2026 · Effective Date: October 2026
        </p>
      </header>

      <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 space-y-8 text-sm text-slate-700 leading-relaxed shadow-sm">
        <section className="space-y-3">
          <h2 className="text-base font-bold text-slate-900">1. Acceptance of Terms</h2>
          <p>
            By accessing or utilizing {siteConfig.brandName} (&quot;the Service&quot;), you acknowledge that you have read, understood, and agree to be bound by these Terms of Use. If you do not agree to these terms, you must discontinue using our tools and website immediately.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-base font-bold text-slate-900">2. Permitted Use & In-Browser Tools</h2>
          <p>
            You are granted a non-exclusive, non-transferable, revocable license to access and use our utilities (Image to PNG Converter, SERP Snippet Preview, Meta Tag Generator, Schema Markup Generator, and Article Outline Generator) for personal or commercial projects.
          </p>
          <p>
            You agree not to use the Service for any unlawful purpose, including attempting to reverse-engineer client assets maliciously, interfere with server infrastructure, or deploy deceptive structured data designed to mislead search engines or end consumers.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-base font-bold text-slate-900">3. Crucial Disclaimer Regarding Search Engines & Google Rankings</h2>
          <p className="font-semibold text-slate-900">
            {siteConfig.brandName} makes zero guarantees, promises, or representations regarding:
          </p>
          <ul className="list-disc pl-5 space-y-1.5 text-slate-600">
            <li>Your website&apos;s ranking, organic traffic, or indexation speed in any search engine.</li>
            <li>Whether Google or any other search engine will display the exact meta title, description, or snippet tested in our SERP preview tool.</li>
            <li>Whether structured data generated with our schema generator will be granted rich results, carousels, or knowledge graph inclusion.</li>
          </ul>
          <p>
            Search engine ranking algorithms are proprietary, automated, and constantly evolving. Google frequently rewrites titles and snippets algorithmically depending on individual user queries and page context.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-base font-bold text-slate-900">4. &quot;As-Is&quot; and &quot;As-Available&quot; Warranty Disclaimer</h2>
          <p>
            The Service and all materials, code snippets, calculations, and conversions provided on {siteConfig.brandName} are delivered on an &quot;as is&quot; and &quot;as available&quot; basis without warranties of any kind, either express or implied, including but not limited to implied warranties of merchantability, fitness for a particular purpose, or non-infringement.
          </p>
          <p>
            You assume full responsibility for verifying that any converted images, HTML meta tags, or JSON-LD scripts are appropriate and error-free before deploying them to your production systems.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-base font-bold text-slate-900">5. Limitation of Liability</h2>
          <p>
            Under no circumstances shall the operators, authors, or contributors of {siteConfig.brandName} be liable for any direct, indirect, incidental, special, consequential, or punitive damages resulting from your use of, or inability to use, our website or tools. This includes, without limitation, loss of search engine rankings, lost revenue, data corruption, or business interruption.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-base font-bold text-slate-900">6. Trademark Notice</h2>
          <p>
            Google™, Googlebot™, Google Search™, and related marks are trademarks of Google LLC. {siteConfig.brandName} is an independent utility toolkit and is neither affiliated with, sponsored by, nor endorsed by Google LLC or Schema.org.
          </p>
        </section>
      </div>
    </div>
  );
};

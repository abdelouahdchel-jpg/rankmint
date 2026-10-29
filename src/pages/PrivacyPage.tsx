import React from 'react';
import { Breadcrumbs } from '../components/layout/Breadcrumbs';
import { SeoHead } from '../components/layout/SeoHead';
import { siteConfig } from '../config/site';
import { ShieldCheck, Lock, EyeOff } from 'lucide-react';

export const PrivacyPage: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto space-y-10">
      <SeoHead
        title="Privacy Policy"
        description={`Privacy Policy for ${siteConfig.brandName}. Detailed breakdown of our client-side processing architecture, zero server uploads, and server access logs.`}
        canonicalPath="/privacy"
      />

      <Breadcrumbs items={[{ name: 'Privacy Policy' }]} />

      <header className="space-y-3">
        <span className="text-xs font-semibold text-emerald-700 uppercase tracking-wider block">
          Transparency & Data Practices
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-950 tracking-tight">
          Privacy Policy
        </h1>
        <p className="text-xs sm:text-sm text-slate-500">
          Last revised: October 2026 · Effective Date: October 2026
        </p>
      </header>

      <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 space-y-8 text-sm text-slate-700 leading-relaxed shadow-sm">
        <section className="space-y-3">
          <h2 className="text-base font-bold text-slate-900">1. Architectural Summary: Client-Side Execution</h2>
          <p>
            {siteConfig.brandName} (&quot;we&quot;, &quot;our&quot;, or &quot;the Service&quot;) is engineered specifically as a client-side web application. All calculations, image conversions, code generation, and SERP simulations execute directly within your local web browser using JavaScript and HTML5 Canvas APIs.
          </p>
          <p>
            When you use the Image to PNG Converter, SERP Snippet Preview, Meta Tag Generator, Schema Markup Generator, or Article Outline Generator, <strong>your input data, source images, titles, and generated outputs are never transmitted to, inspected by, or stored on our servers.</strong>
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-base font-bold text-slate-900">2. Information Handled by Static Web Hosting Providers</h2>
          <p>
            This website is distributed statically via third-party cloud infrastructure (such as Cloudflare Pages or similar global content delivery networks). When your browser loads HTML, CSS, JavaScript, and icon files, the hosting network automatically processes standard HTTP request headers.
          </p>
          <p>This technical log data may include:</p>
          <ul className="list-disc pl-5 space-y-1.5 text-slate-600">
            <li>Your Internet Protocol (IP) address</li>
            <li>Browser type and version (User-Agent)</li>
            <li>Referrer URL and requested static asset paths</li>
            <li>Time and date of the request</li>
          </ul>
          <p>
            This information is collected strictly by the hosting network for DDoS mitigation, infrastructure security, and reliable content delivery.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-base font-bold text-slate-900">3. Cookies, Storage, and Tracking Technologies</h2>
          <p>
            {siteConfig.brandName} does not deploy tracking cookies, advertising beacons, fingerprinting scripts, or third-party behavioral analytics.
          </p>
          <p>
            Any temporary variables (such as active preview text or canvas blobs) exist solely in your browser&apos;s volatile RAM and are automatically purged when you refresh or close your browser tab.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-base font-bold text-slate-900">4. Third-Party Links & External Services</h2>
          <p>
            Our articles and tools may reference third-party tools (such as Google’s Rich Results Test or Schema.org documentation). We do not control and are not responsible for the privacy policies, data collection, or operational practices of any third-party websites.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-base font-bold text-slate-900">5. Communications & Inquiries</h2>
          <p>
            If you contact us via email, your email address, message body, and any associated headers will be received by our designated mailbox to respond to your inquiry. We do not sell or lease contact information to marketing lists.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-base font-bold text-slate-900">6. Legal Disclaimers & Jurisdictional Notice</h2>
          <p>
            This Privacy Policy describes the actual technical functioning of {siteConfig.brandName}. While we build our tools to minimize data exposure, no Internet transmission or local software execution can be guaranteed 100% invulnerable. This document does not constitute formal legal advice.
          </p>
        </section>
      </div>
    </div>
  );
};

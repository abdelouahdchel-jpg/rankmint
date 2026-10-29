import React, { useState } from 'react';
import { Breadcrumbs } from '../components/layout/Breadcrumbs';
import { SeoHead } from '../components/layout/SeoHead';
import { siteConfig } from '../config/site';
import { NoticeBanner } from '../components/common/NoticeBanner';
import { Mail, Send, Info, Code2, ChevronDown, ChevronUp } from 'lucide-react';

export const ContactPage: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const [showIntegrationDocs, setShowIntegrationDocs] = useState(false);

  const handleDraftEmail = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) {
      setStatusMessage('Please complete your name, email, and message before drafting.');
      return;
    }

    const emailSubject = encodeURIComponent(subject.trim() ? `[${siteConfig.brandName}] ${subject.trim()}` : `Inquiry for ${siteConfig.brandName}`);
    const emailBody = encodeURIComponent(
      `Name: ${name.trim()}\nEmail: ${email.trim()}\n\nMessage:\n${message.trim()}\n\n(Sent via ${siteConfig.brandName} contact interface)`
    );

    window.location.href = `mailto:${siteConfig.contactEmail}?subject=${emailSubject}&body=${emailBody}`;
    setStatusMessage('Draft generated in your device\'s email client. You can review and send your message directly.');
  };

  return (
    <div className="max-w-3xl mx-auto space-y-10">
      <SeoHead
        title="Contact & Technical Support"
        description={`Get in touch with ${siteConfig.brandName}. Direct email contact with ${siteConfig.contactEmail} and static hosting submission guidelines.`}
        canonicalPath="/contact"
      />

      <Breadcrumbs items={[{ name: 'Contact' }]} />

      <header className="space-y-3">
        <span className="text-xs font-semibold text-emerald-700 uppercase tracking-wider block">
          Get in Touch
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-950 tracking-tight">
          Contact & Support
        </h1>
        <p className="text-base text-slate-600 leading-relaxed">
          Have feedback on our in-browser SEO utilities, spotted an issue, or want to suggest an improvement? Contact us directly.
        </p>
      </header>

      {/* Honest Architectural Disclaimer Banner */}
      <NoticeBanner
        type="warning"
        title="Static Hosting & Email Routing Notice"
      >
        <strong>{siteConfig.brandName} is a 100% client-side static web application</strong> with zero remote databases or server-side mailers. To guarantee genuine communication without misleading &quot;message sent&quot; animations, the compose form below generates an email draft in your local mail client addressed to <strong>{siteConfig.contactEmail}</strong>.
      </NoticeBanner>

      {/* Direct Email Contact Box */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 space-y-4 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center">
            <Mail className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base font-bold text-slate-900">Direct Contact Address</h2>
            <p className="text-xs text-slate-500">Official inquiries and support</p>
          </div>
        </div>

        <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <code className="px-3.5 py-2 bg-slate-100 rounded-lg text-xs font-mono text-slate-900 select-all border border-slate-200">
            {siteConfig.contactEmail}
          </code>
          <a
            href={`mailto:${siteConfig.contactEmail}?subject=Inquiry%20regarding%20${siteConfig.brandName}`}
            className="inline-flex items-center justify-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg shadow-xs transition-colors"
          >
            <Mail className="w-4 h-4" />
            <span>Open in Email App</span>
          </a>
        </div>
      </div>

      {/* Interactive Form with Mailto Bridge */}
      <form onSubmit={handleDraftEmail} className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 space-y-5 shadow-sm">
        <div className="flex items-center justify-between pb-2 border-b border-slate-100">
          <h2 className="text-base font-bold text-slate-900">
            Compose Message
          </h2>
          <span className="text-xs text-slate-400">Routes to: {siteConfig.contactEmail}</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label htmlFor="contact-name" className="text-xs font-semibold text-slate-800">
              Your Name *
            </label>
            <input
              id="contact-name"
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Alex Morgan"
              className="w-full px-3.5 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white text-slate-900"
            />
          </div>

          <div className="space-y-1.5">
            <label htmlFor="contact-email" className="text-xs font-semibold text-slate-800">
              Your Email Address *
            </label>
            <input
              id="contact-email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="alex@example.com"
              className="w-full px-3.5 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white text-slate-900"
            />
          </div>
        </div>

        <div className="space-y-1.5">
          <label htmlFor="contact-subject" className="text-xs font-semibold text-slate-800">
            Subject Line
          </label>
          <input
            id="contact-subject"
            type="text"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            placeholder="e.g. Feedback on Schema Generator"
            className="w-full px-3.5 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white text-slate-900"
          />
        </div>

        <div className="space-y-1.5">
          <label htmlFor="contact-message" className="text-xs font-semibold text-slate-800">
            Message *
          </label>
          <textarea
            id="contact-message"
            rows={4}
            required
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Write your feedback, inquiry, or question here..."
            className="w-full px-3.5 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white text-slate-900"
          />
        </div>

        {statusMessage && (
          <div className="p-3 bg-blue-50 border border-blue-200 text-blue-900 text-xs rounded-lg flex items-start gap-2">
            <Info className="w-4 h-4 shrink-0 mt-0.5" />
            <span>{statusMessage}</span>
          </div>
        )}

        <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          <p className="text-[11px] text-slate-500">
            Clicking draft prepares this email in your default mailing software.
          </p>
          <button
            type="submit"
            className="inline-flex items-center justify-center gap-1.5 px-5 py-2.5 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg shadow-xs transition-colors shrink-0"
          >
            <Send className="w-3.5 h-3.5" />
            <span>Draft Message in Email App</span>
          </button>
        </div>
      </form>

      {/* Developer Setup Guide for External Form Services */}
      <div className="bg-slate-100/70 border border-slate-200 rounded-2xl p-5 text-xs text-slate-600 space-y-3">
        <button
          type="button"
          onClick={() => setShowIntegrationDocs(!showIntegrationDocs)}
          className="w-full flex items-center justify-between font-semibold text-slate-800 hover:text-emerald-700 transition-colors"
        >
          <span className="flex items-center gap-1.5">
            <Code2 className="w-4 h-4 text-emerald-600" />
            <span>Optional: How to configure an external form endpoint on static hosts</span>
          </span>
          {showIntegrationDocs ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </button>

        {showIntegrationDocs && (
          <div className="space-y-3 pt-2 border-t border-slate-200/80 leading-relaxed">
            <p>
              To maintain 100% free static hosting without paid servers, RankMint intentionally does not bundle a private backend mail server. If the site owner wishes to receive form posts directly over HTTP, they can connect any of the following free tier services:
            </p>
            <ol className="list-decimal pl-5 space-y-1.5">
              <li>
                <strong>Cloudflare Worker:</strong> Create a lightweight Worker on Cloudflare (free tier) with an HTTP POST handler that forwards submissions to Mailchannels or an email inbox.
              </li>
              <li>
                <strong>Formspree / Basin / Formkeep:</strong> Create a free form endpoint at <code className="bg-white px-1.5 py-0.5 rounded border border-slate-200">formspree.io</code> and update the form <code className="bg-white px-1.5 py-0.5 rounded border border-slate-200">action=&quot;https://formspree.io/f/YOUR_FORM_ID&quot;</code>.
              </li>
              <li>
                <strong>EmailJS:</strong> Client-side SDK that sends messages directly through your personal or business email provider.
              </li>
            </ol>
            <p className="text-[11px] text-slate-500 italic">
              Until an endpoint is configured, the built-in mailto: bridge above guarantees zero missed messages without deceiving visitors with fake success alerts.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

import React, { useState } from 'react';
import { Breadcrumbs } from '../components/layout/Breadcrumbs';
import { SeoHead } from '../components/layout/SeoHead';
import { siteConfig } from '../config/site';
import { NoticeBanner } from '../components/common/NoticeBanner';
import { Mail, Send, AlertCircle, Info, ExternalLink } from 'lucide-react';

export const ContactPage: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  const handleDraftEmail = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) {
      setStatusMessage('Please complete your name, email, and message before drafting.');
      return;
    }

    const emailSubject = encodeURIComponent(subject ? `[${siteConfig.brandName}] ${subject}` : `Inquiry for ${siteConfig.brandName}`);
    const emailBody = encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}\n\nSent via ${siteConfig.brandName} contact interface`
    );

    window.location.href = `mailto:${siteConfig.contactEmail}?subject=${emailSubject}&body=${emailBody}`;
    setStatusMessage('Draft opened in your email client. You can review and send your message directly.');
  };

  return (
    <div className="max-w-3xl mx-auto space-y-10">
      <SeoHead
        title="Contact & Technical Support"
        description={`Get in touch with the ${siteConfig.brandName} editorial and development team. Direct email contact and static hosting submission guidelines.`}
        canonicalPath="/contact"
      />

      <Breadcrumbs items={[{ name: 'Contact' }]} />

      <header className="space-y-3">
        <span className="text-xs font-semibold text-emerald-700 uppercase tracking-wider block">
          Get in Touch
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-950 tracking-tight">
          Contact & Technical Support
        </h1>
        <p className="text-base text-slate-600 leading-relaxed">
          Have feedback on our in-browser SEO tools, spotted an issue, or want to contribute a technical guide? Reach out to us below.
        </p>
      </header>

      {/* Honest Architectural Disclaimer Banner */}
      <NoticeBanner
        type="warning"
        title="Static Hosting Endpoint Notice"
      >
        <strong>{siteConfig.brandName} currently operates as a static client-side web application without a remote backend server or active database endpoint.</strong> As a result, web forms cannot transmit background HTTP requests to a mailbox until the site owner configures a third-party form handler (such as Formspree, Cloudflare Workers, or EmailJS). To ensure your message is genuinely delivered, use the direct email link or draft button below. We never simulate fake &quot;message sent&quot; success indicators.
      </NoticeBanner>

      {/* Direct Contact Card */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 space-y-4 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center">
            <Mail className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base font-bold text-slate-900">Direct Email Contact</h2>
            <p className="text-xs text-slate-500">Fastest and most reliable communication channel</p>
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
        <h2 className="text-base font-bold text-slate-900 pb-2 border-b border-slate-100">
          Compose Message (Generates Email Draft)
        </h2>

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
    </div>
  );
};

import React, { useState } from 'react';
import { FileText, Copy, Download, Check, Sparkles, SlidersHorizontal, BookOpen } from 'lucide-react';
import { NoticeBanner } from '../common/NoticeBanner';

export const ArticleOutlineGeneratorTool: React.FC = () => {
  const [topic, setTopic] = useState('How to Conduct a Comprehensive Technical SEO Audit');
  const [keyword, setKeyword] = useState('technical SEO audit checklist');
  const [audience, setAudience] = useState<'beginners' | 'smb' | 'marketers' | 'developers'>('marketers');
  const [tone, setTone] = useState<'how-to' | 'comprehensive' | 'listicle' | 'comparative'>('how-to');
  const [copiedFormat, setCopiedFormat] = useState<'markdown' | 'text' | null>(null);

  // Transparent, deterministic local template engine based on editorial patterns
  const generateOutlineData = () => {
    const cleanTopic = topic.trim() || 'Website SEO Optimization';
    const cleanKw = keyword.trim() || 'SEO checklist';

    // Audience perspective adjustments
    const audienceProfiles = {
      beginners: {
        label: 'Beginners & Non-Technical Creators',
        premise: 'Assumes no prior coding knowledge. Emphasizes visual step-by-step clarity, definitions, and free browser tools.',
        introHook: `Demystifying ${cleanKw} so anyone can audit and optimize their site without complex code.`,
      },
      smb: {
        label: 'Small Business Owners & Founders',
        premise: 'Focuses on ROI, local visibility, customer acquisition, and avoiding costly agency retainer mistakes.',
        introHook: `Why mastering ${cleanKw} directly protects your inbound leads and commercial viability.`,
      },
      marketers: {
        label: 'In-House Marketers & Content Strategists',
        premise: 'Focuses on scalable workflows, search intent alignment, cross-team collaboration, and organic revenue.',
        introHook: `Building a repeatable, high-impact framework for ${cleanKw} that drives measurable organic growth.`,
      },
      developers: {
        label: 'Frontend Developers & Web Engineers',
        premise: 'Focuses on web standards, Core Web Vitals, SSR/hydration quirks, semantic DOM structure, and clean crawlability.',
        introHook: `Engineering a high-performance web architecture that eliminates crawl bottlenecks for ${cleanKw}.`,
      },
    }[audience];

    // Format blueprints
    const titles = [
      `${cleanTopic}: The Step-by-Step Blueprint for 2026`,
      `How to Master ${cleanKw}: Essential Checklist & Best Practices`,
      `The Complete Guide to ${cleanTopic} (Without Fluff or Expensive Software)`,
      `7 Critical Mistakes to Avoid When Working with ${cleanKw}`,
    ];

    let sections: { h2: string; h3s: string[]; notes: string; estWords: number }[] = [];

    if (tone === 'how-to') {
      sections = [
        {
          h2: `1. Understanding the Core Fundamentals of ${cleanKw}`,
          h3s: [
            `What is ${cleanKw} and why does it matter?`,
            'Key definitions, terminology, and search engine expectations',
            'Prerequisites and tools you need before starting',
          ],
          notes: `Establish authority early. Introduce ${cleanKw} naturally in the first 100 words. Address common misconceptions.`,
          estWords: 350,
        },
        {
          h2: `2. Pre-Audit Preparation: Tools, Baseline Metrics & Scope`,
          h3s: [
            'Setting up free Google Search Console and analytics baselines',
            'Gathering URLs, XML sitemaps, and robots.txt files',
            'Documenting existing traffic benchmarks',
          ],
          notes: 'Give readers concrete preparation steps so they are ready for action.',
          estWords: 400,
        },
        {
          h2: `3. Step-by-Step Execution Blueprint for ${cleanKw}`,
          h3s: [
            `Phase 1: Initial scan and priority identification for ${cleanKw}`,
            'Phase 2: Resolving critical crawl and indexation blockers',
            'Phase 3: Fine-tuning metadata, structured schema, and on-page signals',
          ],
          notes: 'This is the core meat of the article. Provide clear action verbs, screenshots/diagram recommendations, and warnings.',
          estWords: 750,
        },
        {
          h2: `4. Common Pitfalls & Edge Cases to Avoid`,
          h3s: [
            'Over-optimizing and keyword stuffing traps',
            'Ignoring mobile responsiveness and Core Web Vitals',
            'Failing to monitor post-implementation changes',
          ],
          notes: 'Highlight non-obvious traps that distinguish experienced practitioners from novices.',
          estWords: 350,
        },
        {
          h2: `5. Verification, Monitoring & Measuring Success`,
          h3s: [
            'How to verify changes in Google Search Console',
            'Setting an ongoing maintenance schedule',
          ],
          notes: 'Provide a recurring checklist table for daily/monthly checks.',
          estWords: 250,
        },
      ];
    } else if (tone === 'comprehensive') {
      sections = [
        {
          h2: `1. Executive Summary & The State of ${cleanKw}`,
          h3s: [
            'The evolution of search algorithms and user expectations',
            'Core business impact and competitive landscape',
          ],
          notes: 'High-level synthesis for senior practitioners and decision makers.',
          estWords: 400,
        },
        {
          h2: `2. Architectural Breakdown & Theoretical Foundations`,
          h3s: [
            'How search engines parse and evaluate technical signals',
            `Key ranking and crawling factors associated with ${cleanKw}`,
            'Comparing client-side vs server-side implications',
          ],
          notes: 'Provide rigorous conceptual grounding before tactical recommendations.',
          estWords: 600,
        },
        {
          h2: `3. The Comprehensive Audit Checklist & Framework`,
          h3s: [
            'Crawlability & indexing infrastructure',
            'Page speed, rendering budgets, and UX metrics',
            'On-page taxonomy, content hierarchy, and internal link equity',
          ],
          notes: 'Include structured data tables and code snippet examples.',
          estWords: 800,
        },
        {
          h2: `4. Advanced Troubleshooting & Case Scenarios`,
          h3s: [
            'Handling migrations, redesigns, and dynamic JS apps',
            'Diagnosing sudden organic impressions drops',
          ],
          notes: 'Deep-dive into real-world edge cases.',
          estWords: 500,
        },
      ];
    } else if (tone === 'listicle') {
      sections = [
        {
          h2: `Quick Summary: The Top Essentials at a Glance`,
          h3s: ['Overview comparison table', 'How we selected these priorities'],
          notes: 'Quick-reference table for skim readers.',
          estWords: 250,
        },
        {
          h2: `1. Priority One: Fixing Critical Crawl Errors and Noindex Tags`,
          h3s: ['Why this comes first', 'Implementation steps'],
          notes: 'High urgency item.',
          estWords: 300,
        },
        {
          h2: `2. Priority Two: Optimizing Title Tags & Search Snippets`,
          h3s: ['Character and pixel width constraints', 'CTR formula'],
          notes: 'Tie in with SERP preview best practices.',
          estWords: 300,
        },
        {
          h2: `3. Priority Three: Implementing JSON-LD Structured Data`,
          h3s: ['Validating syntax', 'Targeting rich result opportunities'],
          notes: 'Recommend Schema Generator.',
          estWords: 300,
        },
        {
          h2: `4. Priority Four: Compressing Images and Converting to Modern Formats`,
          h3s: ['PNG vs JPG tradeoffs', 'LCP performance impact'],
          notes: 'Recommend Image to PNG converter.',
          estWords: 300,
        },
        {
          h2: `5. Priority Five: Streamlining Internal Link Architecture`,
          h3s: ['Anchor text distribution', 'Eliminating orphan pages'],
          notes: 'Link equity management.',
          estWords: 300,
        },
      ];
    } else {
      // Comparative
      sections = [
        {
          h2: `1. Direct Comparison Matrix: Method A vs Method B`,
          h3s: ['Side-by-side feature comparison table', 'Cost, complexity, and speed overview'],
          notes: 'Deliver value immediately with a structured comparison matrix.',
          estWords: 350,
        },
        {
          h2: `2. In-Depth Analysis: When to Choose Approach A`,
          h3s: ['Key strengths and advantages', 'Ideal use cases and team size', 'Potential drawbacks'],
          notes: 'Provide balanced, evidence-based trade-off analysis.',
          estWords: 450,
        },
        {
          h2: `3. In-Depth Analysis: When to Choose Approach B`,
          h3s: ['Key strengths and advantages', 'Ideal use cases', 'Potential drawbacks'],
          notes: 'Evaluate secondary methodology objectively.',
          estWords: 450,
        },
        {
          h2: `4. The Final Verdict: How to Decide for Your Website`,
          h3s: ['Decision flowchart', 'Next implementation steps'],
          notes: 'Clear takeaway based on budget and technical maturity.',
          estWords: 300,
        },
      ];
    }

    const faqs = [
      `How often should you audit ${cleanKw}?`,
      `What are the most common mistakes people make with ${cleanKw}?`,
      `Can free tools replace expensive enterprise SEO suites for ${cleanKw}?`,
      `How long does it typically take to see ranking improvements after fixing ${cleanKw}?`,
    ];

    const totalEstWords = sections.reduce((acc, s) => acc + s.estWords, 300 + 200); // intro + outro

    return {
      audienceProfiles,
      titles,
      sections,
      faqs,
      totalEstWords,
      cleanTopic,
      cleanKw,
    };
  };

  const outline = generateOutlineData();

  // Generate plain text or Markdown exports
  const exportAsMarkdown = () => {
    let md = `# Proposed H1 Options:\n`;
    outline.titles.forEach((t, i) => {
      md += `${i + 1}. ${t}\n`;
    });
    md += `\n---\n\n`;
    md += `## Content Strategy Overview\n`;
    md += `- **Primary Topic:** ${outline.cleanTopic}\n`;
    md += `- **Target Keyword:** ${outline.cleanKw}\n`;
    md += `- **Audience:** ${outline.audienceProfiles.label}\n`;
    md += `- **Format / Tone:** ${tone}\n`;
    md += `- **Estimated Word Count:** ~${outline.totalEstWords} words\n\n`;

    md += `## Introduction Framework\n`;
    md += `- **Hook:** ${outline.audienceProfiles.introHook}\n`;
    md += `- **Problem Statement:** The hidden cost of neglecting ${outline.cleanKw}.\n`;
    md += `- **Promise:** Clear, actionable takeaways tested against search engine best practices.\n\n`;

    md += `## Outline (H2 & H3 Structure)\n\n`;
    outline.sections.forEach((sec) => {
      md += `### ${sec.h2} (~${sec.estWords} words)\n`;
      md += `*Editorial Guidance: ${sec.notes}*\n\n`;
      sec.h3s.forEach((h3) => {
        md += `- **H3:** ${h3}\n`;
      });
      md += `\n`;
    });

    md += `## Suggested FAQ Section\n`;
    outline.faqs.forEach((faq) => {
      md += `- **Q:** ${faq}\n  - *A: (Provide concise 2-3 sentence factual answer)*\n`;
    });

    md += `\n## Conclusion & Actionable Next Steps\n`;
    md += `- Summarize core takeaways in 3-4 bullet points.\n`;
    md += `- Provide a direct call to action or link to interactive tools.\n`;

    return md;
  };

  const exportAsPlainText = () => {
    return exportAsMarkdown().replace(/[#*`_]/g, '');
  };

  const handleCopy = (format: 'markdown' | 'text') => {
    const text = format === 'markdown' ? exportAsMarkdown() : exportAsPlainText();
    navigator.clipboard.writeText(text);
    setCopiedFormat(format);
    setTimeout(() => setCopiedFormat(null), 2000);
  };

  const handleDownload = () => {
    const text = exportAsMarkdown();
    const blob = new Blob([text], { type: 'text/markdown;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${outline.cleanKw.toLowerCase().replace(/[^a-z0-9]+/g, '-')}-outline.md`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-8">
      {/* Notice Banner explaining deterministic nature */}
      <NoticeBanner
        type="info"
        title="100% Local Heuristic Template Engine"
      >
        This tool uses <strong>transparent editorial rule sets and proven search intent templates</strong> running directly in your browser. It does not send your ideas to third-party language model APIs, charge subscription tokens, or store your content on remote servers. All outlines are structured strictly according to SEO heading hierarchy principles (H1 &gt; H2 &gt; H3).
      </NoticeBanner>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Inputs (5 cols) */}
        <div className="lg:col-span-5 bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-5">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <h3 className="text-base font-bold text-slate-900">Planning Controls</h3>
            <span className="text-xs text-slate-400 font-mono">Local Blueprint Engine</span>
          </div>

          <div className="space-y-1.5">
            <label htmlFor="topic-input" className="text-xs font-semibold text-slate-800">
              Article Topic / Angle
            </label>
            <input
              id="topic-input"
              type="text"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="e.g. How to Conduct a Technical SEO Audit"
              className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white"
            />
          </div>

          <div className="space-y-1.5">
            <label htmlFor="kw-input" className="text-xs font-semibold text-slate-800">
              Primary Target Keyword
            </label>
            <input
              id="kw-input"
              type="text"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              placeholder="e.g. technical SEO audit checklist"
              className="w-full px-3.5 py-2 text-xs font-mono bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-800 block">
              Target Audience
            </label>
            <select
              value={audience}
              onChange={(e) => setAudience(e.target.value as any)}
              className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            >
              <option value="beginners">Beginners & Non-Technical Users</option>
              <option value="smb">Small Business Owners & Founders</option>
              <option value="marketers">In-House Marketers & SEO Specialists</option>
              <option value="developers">Frontend Developers & Engineers</option>
            </select>
            <p className="text-[11px] text-slate-500 italic mt-1">
              {outline.audienceProfiles.premise}
            </p>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-800 block">
              Article Format / Content Structure
            </label>
            <select
              value={tone}
              onChange={(e) => setTone(e.target.value as any)}
              className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            >
              <option value="how-to">Step-by-Step How-To Guide</option>
              <option value="comprehensive">Comprehensive Pillar Page</option>
              <option value="listicle">Numbered Best Practices Listicle</option>
              <option value="comparative">Comparative / Versus Evaluation</option>
            </select>
          </div>

          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-600 space-y-2">
            <div className="flex justify-between items-center font-medium">
              <span>Estimated Scope:</span>
              <span className="font-mono font-bold text-slate-900 tabular-nums">~{outline.totalEstWords} words</span>
            </div>
            <div className="flex justify-between items-center font-medium">
              <span>H2 Main Sections:</span>
              <span className="font-mono text-slate-900">{outline.sections.length} headings</span>
            </div>
            <div className="flex justify-between items-center font-medium">
              <span>FAQ Items:</span>
              <span className="font-mono text-slate-900">{outline.faqs.length} questions</span>
            </div>
          </div>
        </div>

        {/* Right Generated Outline (7 cols) */}
        <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-100">
            <div>
              <h3 className="text-base font-bold text-slate-900">Structured Outline Output</h3>
              <p className="text-xs text-slate-500">Ready to import into your CMS, Notion, or Markdown editor</p>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => handleCopy('markdown')}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-700 hover:text-slate-900 hover:bg-slate-100 border border-slate-200 rounded-lg transition-colors"
              >
                {copiedFormat === 'markdown' ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                    <span className="text-emerald-700 font-semibold">Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy Markdown</span>
                  </>
                )}
              </button>
              <button
                type="button"
                onClick={handleDownload}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg transition-colors"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download .md</span>
              </button>
            </div>
          </div>

          {/* Proposed H1 Headlines */}
          <div className="space-y-2">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block">
              Suggested H1 Headlines (Choose One)
            </span>
            <div className="space-y-1.5">
              {outline.titles.map((t, idx) => (
                <div
                  key={idx}
                  className="p-3 bg-slate-50 border border-slate-200 rounded-lg text-xs font-medium text-slate-900 flex items-center justify-between gap-3 hover:border-emerald-500 transition-colors"
                >
                  <span>{t}</span>
                  <span className="font-mono text-[11px] text-slate-400 shrink-0">H1 #{idx + 1}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Intro Framework */}
          <div className="space-y-2 pt-2 border-t border-slate-100">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block">
              Introduction Framework
            </span>
            <div className="p-3.5 bg-emerald-50/50 border border-emerald-200/70 rounded-xl text-xs space-y-1.5 text-emerald-950">
              <p>
                <strong>Hook:</strong> {outline.audienceProfiles.introHook}
              </p>
              <p>
                <strong>Problem statement:</strong> The hidden cost of overlooking <em>{outline.cleanKw}</em>.
              </p>
              <p>
                <strong>Promise:</strong> Clear, actionable steps verified against 2026 search quality rater guidelines.
              </p>
            </div>
          </div>

          {/* H2/H3 Outline */}
          <div className="space-y-4 pt-2 border-t border-slate-100">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block">
              H2 & H3 Hierarchy
            </span>

            <div className="space-y-4">
              {outline.sections.map((section, idx) => (
                <div key={idx} className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-3">
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs font-bold text-slate-900 flex items-center gap-2">
                      <span className="w-5 h-5 rounded bg-slate-200 text-slate-700 flex items-center justify-center font-mono text-[10px]">
                        H2
                      </span>
                      <span>{section.h2}</span>
                    </h4>
                    <span className="font-mono text-[11px] text-slate-500 tabular-nums">
                      ~{section.estWords} words
                    </span>
                  </div>

                  <p className="text-[11px] text-slate-500 italic pl-7">
                    Editorial Note: {section.notes}
                  </p>

                  <div className="pl-7 space-y-1.5">
                    {section.h3s.map((h3, h3Idx) => (
                      <div key={h3Idx} className="flex items-center gap-2 text-xs text-slate-700">
                        <span className="w-1.5 h-1.5 rounded-full bg-slate-400 shrink-0" />
                        <span className="font-medium text-slate-800">H3: {h3}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* FAQ Section */}
          <div className="space-y-2 pt-2 border-t border-slate-100">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block">
              Search Intent FAQs (For FAQPage Schema)
            </span>
            <div className="space-y-2 text-xs">
              {outline.faqs.map((q, idx) => (
                <div key={idx} className="p-3 bg-slate-50 border border-slate-200 rounded-lg text-slate-800">
                  <span className="font-bold text-emerald-800 block mb-0.5">Q: {q}</span>
                  <span className="text-slate-500 text-[11px]">
                    Recommendation: Answer directly in 2-3 sentences to capture People Also Ask (PAA) rich snippets.
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

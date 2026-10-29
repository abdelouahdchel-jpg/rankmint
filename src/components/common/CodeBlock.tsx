import React, { useState } from 'react';
import { Copy, Check, Download } from 'lucide-react';

interface CodeBlockProps {
  code: string;
  language?: string;
  filename?: string;
  downloadable?: boolean;
  downloadFilename?: string;
}

export const CodeBlock: React.FC<CodeBlockProps> = ({
  code,
  language = 'html',
  filename,
  downloadable = false,
  downloadFilename = 'snippet.txt',
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback for older browsers
      const textarea = document.createElement('textarea');
      textarea.value = code;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleDownload = () => {
    const blob = new Blob([code], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = downloadFilename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="rounded-xl border border-slate-700 bg-slate-900 overflow-hidden text-slate-200 shadow-md">
      {/* Header bar */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-slate-800/80 border-b border-slate-700/80 text-xs">
        <div className="flex items-center gap-2">
          <span className="font-mono text-emerald-400 font-semibold uppercase">{language}</span>
          {filename && <span className="text-slate-400">· {filename}</span>}
        </div>
        <div className="flex items-center gap-2">
          {downloadable && (
            <button
              type="button"
              onClick={handleDownload}
              className="inline-flex items-center gap-1.5 px-2.5 py-1 text-slate-300 hover:text-white hover:bg-slate-700 rounded transition-colors"
              title="Download snippet"
              aria-label="Download snippet"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download</span>
            </button>
          )}
          <button
            type="button"
            onClick={handleCopy}
            className="inline-flex items-center gap-1.5 px-2.5 py-1 text-slate-300 hover:text-white hover:bg-slate-700 rounded transition-colors"
            title="Copy to clipboard"
            aria-label={copied ? 'Copied to clipboard' : 'Copy code to clipboard'}
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-emerald-400 font-medium">Copied!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>Copy</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Code contents */}
      <div className="p-4 overflow-x-auto text-xs sm:text-sm font-mono leading-relaxed max-h-[480px]">
        <pre className="whitespace-pre">
          <code>{code}</code>
        </pre>
      </div>
    </div>
  );
};

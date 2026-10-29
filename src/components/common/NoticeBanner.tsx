import React from 'react';
import { AlertCircle, Info, ShieldAlert, CheckCircle2 } from 'lucide-react';

interface NoticeBannerProps {
  type?: 'info' | 'warning' | 'alert' | 'success';
  title?: string;
  children: React.ReactNode;
  className?: string;
}

export const NoticeBanner: React.FC<NoticeBannerProps> = ({
  type = 'info',
  title,
  children,
  className = '',
}) => {
  const styles = {
    info: {
      bg: 'bg-slate-50 border-slate-200 text-slate-800',
      icon: <Info className="w-5 h-5 text-slate-600 shrink-0 mt-0.5" aria-hidden="true" />,
      titleColor: 'text-slate-900',
    },
    warning: {
      bg: 'bg-amber-50/80 border-amber-200 text-amber-900',
      icon: <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" aria-hidden="true" />,
      titleColor: 'text-amber-950',
    },
    alert: {
      bg: 'bg-red-50/80 border-red-200 text-red-900',
      icon: <ShieldAlert className="w-5 h-5 text-red-600 shrink-0 mt-0.5" aria-hidden="true" />,
      titleColor: 'text-red-950',
    },
    success: {
      bg: 'bg-emerald-50/80 border-emerald-200 text-emerald-900',
      icon: <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" aria-hidden="true" />,
      titleColor: 'text-emerald-950',
    },
  }[type];

  return (
    <div className={`p-4 rounded-xl border text-sm leading-relaxed ${styles.bg} ${className}`} role="region" aria-label={title || 'Notice'}>
      <div className="flex items-start gap-3">
        {styles.icon}
        <div className="flex-1 space-y-1">
          {title && <h4 className={`font-semibold text-sm ${styles.titleColor}`}>{title}</h4>}
          <div className="text-xs sm:text-sm text-slate-600">{children}</div>
        </div>
      </div>
    </div>
  );
};

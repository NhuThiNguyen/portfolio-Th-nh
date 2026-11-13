import React from 'react';

export const CadCorner: React.FC<{ className?: string }> = ({ className = '' }) => (
  <div className={`absolute pointer-events-none select-none text-pastel-primary/60 font-mono text-[9px] ${className}`}>
    <span className="block border-l border-t border-pastel-accent/50 w-3 h-3" />
  </div>
);

export const CadDimensionLine: React.FC<{ label: string; className?: string }> = ({ label, className = '' }) => (
  <div className={`flex items-center gap-2 font-mono text-[10px] text-pastel-subtext/70 select-none ${className}`}>
    <span className="h-[1px] w-6 bg-pastel-primary" />
    <span className="px-1 tracking-wider uppercase">{label}</span>
    <span className="h-[1px] flex-1 bg-pastel-primary" />
  </div>
);

export const TechnicalBadge: React.FC<{ children: React.ReactNode; variant?: 'blue' | 'light' | 'accent' }> = ({
  children,
  variant = 'blue'
}) => {
  const styles = {
    blue: 'bg-pastel-light/60 text-pastel-deep border-pastel-primary/50',
    light: 'bg-white/80 text-pastel-text border-pastel-border',
    accent: 'bg-pastel-accent/15 text-pastel-deep border-pastel-accent/40',
  };

  return (
    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium border shadow-xs backdrop-blur-xs ${styles[variant]}`}>
      <span className="w-1.5 h-1.5 rounded-full bg-pastel-accent animate-pulse" />
      {children}
    </span>
  );
};

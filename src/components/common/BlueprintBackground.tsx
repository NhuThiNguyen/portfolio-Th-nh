import React from 'react';

export const BlueprintBackground: React.FC = () => {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none">
      {/* Base Grid */}
      <div className="absolute inset-0 blueprint-grid opacity-60" />

      {/* Subtle radial lighting highlights */}
      <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] rounded-full bg-pastel-primary/20 blur-[120px]" />
      <div className="absolute top-[40%] left-[-10%] w-[600px] h-[600px] rounded-full bg-pastel-light/40 blur-[140px]" />
      <div className="absolute bottom-[-10%] right-[10%] w-[550px] h-[550px] rounded-full bg-pastel-accent/15 blur-[130px]" />

      {/* Technical CAD Corner Crosshairs & Coordinates */}
      <div className="absolute top-6 left-6 font-mono text-[10px] text-pastel-subtext/40 tracking-wider">
        + LOC: 10.8494° N, 106.7537° E [THU DUC]
      </div>
      <div className="absolute top-6 right-6 font-mono text-[10px] text-pastel-subtext/40 tracking-wider hidden sm:block">
        CAD-REF: CDTT-2002-12-10 // V2.4
      </div>

      {/* Subtle Geometric Drafting Circles */}
      <svg className="absolute -top-20 -right-20 w-96 h-96 opacity-[0.07] stroke-pastel-deep" viewBox="0 0 200 200" fill="none">
        <circle cx="100" cy="100" r="90" strokeWidth="1" strokeDasharray="4 4" />
        <circle cx="100" cy="100" r="60" strokeWidth="0.8" />
        <line x1="100" y1="0" x2="100" y2="200" strokeWidth="0.5" />
        <line x1="0" y1="100" x2="200" y2="100" strokeWidth="0.5" />
      </svg>

      <svg className="absolute top-1/2 -left-28 w-80 h-80 opacity-[0.05] stroke-pastel-deep" viewBox="0 0 200 200" fill="none">
        <rect x="20" y="20" width="160" height="160" strokeWidth="1" strokeDasharray="6 3" />
        <circle cx="100" cy="100" r="70" strokeWidth="0.8" />
        <line x1="20" y1="20" x2="180" y2="180" strokeWidth="0.5" strokeDasharray="2 2" />
      </svg>
    </div>
  );
};

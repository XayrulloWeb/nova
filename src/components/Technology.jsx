import React from 'react';

export default function Technology() {
  return (
    <section className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-surface-container-lowest py-24" id="technology">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-surface-variant/40 via-surface-container-lowest to-black z-0 opacity-80 pointer-events-none"></div>
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-30 z-0 pointer-events-none blend-adaptive"></div>
      
      <div className="absolute left-1/4 top-1/4 w-48 h-48 bg-white/5 rounded-2xl border border-white/10 backdrop-blur-md z-20 flex flex-col items-center justify-center float-1 shadow-2xl shadow-primary/5">
        <span className="material-symbols-outlined text-4xl text-on-surface-variant mb-2">laptop_mac</span>
        <span className="text-on-surface-variant text-sm font-label-caps uppercase tracking-wider">Laptop.png</span>
      </div>
      <div className="absolute right-1/4 bottom-1/4 w-40 h-40 bg-white/5 rounded-full border border-white/10 backdrop-blur-md z-20 flex flex-col items-center justify-center float-2 shadow-2xl shadow-tertiary-container/5">
        <span className="material-symbols-outlined text-4xl text-on-surface-variant mb-2">biotech</span>
        <span className="text-on-surface-variant text-sm font-label-caps uppercase tracking-wider">Microscope.png</span>
      </div>
      
      <div className="relative z-10 text-center pointer-events-none">
        <h2 className="font-display-hero-mobile md:text-[120px] md:leading-[110px] font-extrabold text-on-surface uppercase tracking-tight opacity-90 drop-shadow-2xl">
          Code.<br/>Build.<br/>Create.
        </h2>
      </div>
    </section>
  );
}

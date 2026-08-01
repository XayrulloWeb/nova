import React from 'react';

export default function Mentors() {
  return (
    <section className="min-h-screen w-full px-margin-mobile md:px-margin-desktop py-24 bg-surface-container-lowest flex flex-col justify-center relative z-10" id="mentors">
      <h3 className="font-headline-md md:font-headline-lg mb-16 text-center uppercase tracking-widest text-on-surface">Mentors</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="glass-card group p-10 rounded-3xl flex flex-col items-center text-center transition-all duration-500 cursor-pointer min-h-[360px] justify-center">
          <div className="w-28 h-28 rounded-full bg-white/5 mb-8 flex items-center justify-center overflow-hidden border border-white/10 group-hover:border-white/30 transition-colors">
            <span className="material-symbols-outlined text-4xl text-on-surface-variant">person</span>
          </div>
          <h4 className="font-headline-md text-2xl mb-2 text-on-surface group-hover:text-primary transition-colors">Elena Vance</h4>
          <p className="font-body-md text-on-surface-variant font-label-caps uppercase tracking-widest">Lead Architect</p>
        </div>
        <div className="glass-card group p-10 rounded-3xl flex flex-col items-center text-center transition-all duration-500 cursor-pointer min-h-[360px] justify-center">
          <div className="w-28 h-28 rounded-full bg-white/5 mb-8 flex items-center justify-center overflow-hidden border border-white/10 group-hover:border-white/30 transition-colors">
            <span className="material-symbols-outlined text-4xl text-on-surface-variant">person</span>
          </div>
          <h4 className="font-headline-md text-2xl mb-2 text-on-surface group-hover:text-primary transition-colors">Marcus Chen</h4>
          <p className="font-body-md text-on-surface-variant font-label-caps uppercase tracking-widest">Creative Director</p>
        </div>
        <div className="glass-card group p-10 rounded-3xl flex flex-col items-center text-center transition-all duration-500 cursor-pointer min-h-[360px] justify-center">
          <div className="w-28 h-28 rounded-full bg-white/5 mb-8 flex items-center justify-center overflow-hidden border border-white/10 group-hover:border-white/30 transition-colors">
            <span className="material-symbols-outlined text-4xl text-on-surface-variant">person</span>
          </div>
          <h4 className="font-headline-md text-2xl mb-2 text-on-surface group-hover:text-primary transition-colors">Sarah Jenkins</h4>
          <p className="font-body-md text-on-surface-variant font-label-caps uppercase tracking-widest">Product Strategy</p>
        </div>
      </div>
    </section>
  );
}

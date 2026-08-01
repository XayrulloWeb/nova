import React from 'react';

export default function FinalCTA() {
  return (
    <section className="min-h-screen w-full flex flex-col relative px-margin-mobile md:px-margin-desktop bg-surface-container-lowest z-10" id="final-cta">
      <div className="flex-1 pointer-events-none"></div>
      <div className="flex-1 flex flex-col items-center justify-center relative z-20 pb-24 pt-24">
        <h2 className="font-headline-md md:font-headline-lg uppercase mb-12 text-center text-on-surface tracking-wide">Ready to Deploy?</h2>
        <button className="px-16 py-6 rounded-full font-label-caps text-sm tracking-[0.2em] uppercase text-surface-container-lowest bg-primary hover:bg-white transition-all duration-300 shadow-[0_0_30px_rgba(219,252,255,0.4)] hover:shadow-[0_0_50px_rgba(219,252,255,0.7)] font-bold">
          Join Now
        </button>
      </div>
    </section>
  );
}

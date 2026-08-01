import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SplitType from 'split-type';

gsap.registerPlugin(ScrollTrigger);

export default function Programs() {
  const headerRef = useRef(null);

  useEffect(() => {
    // Split the text into lines/characters
    const title = headerRef.current.querySelector('h1');
    const text = new SplitType(title, { types: 'chars' });
    
    // Animate characters
    gsap.from(text.chars, {
      scrollTrigger: {
        trigger: headerRef.current,
        start: 'top 80%',
      },
      y: 100,
      opacity: 0,
      stagger: 0.02,
      duration: 1,
      ease: 'power4.out',
    });
    
    // Cards stagger
    gsap.fromTo('.glass-card', 
      { y: 50, opacity: 0 },
      {
        scrollTrigger: {
          trigger: '.grid',
          start: 'top 85%',
        },
        y: 0,
        opacity: 1,
        stagger: 0.1,
        duration: 1,
        ease: 'power3.out',
        clearProps: 'transform' // Restore Tailwind's md:translate-y classes after animation
      }
    );
    
    // Refresh ScrollTrigger to ensure correct positions after rendering
    setTimeout(() => {
      ScrollTrigger.refresh();
    }, 100);
  }, []);

  return (
    <section className="pt-[160px] pb-[80px] px-margin-mobile md:px-margin-desktop max-w-[1920px] mx-auto" id="programs">
      <header className="mb-[160px]" ref={headerRef}>
        <h1 className="font-display-hero-mobile md:font-display-hero text-display-hero-mobile md:text-display-hero text-on-surface tracking-tighter mb-6">
          TA'LIM BOSQICHLARI
        </h1>
        <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl md:ml-auto md:w-1/2">
          Bolangizning yorqin kelajagi uchun elita tayyorgarlik. Boshlang'ich sinfdan to bitiruvgacha zamonaviy bilim va ko'nikmalarni egallashga yordam beradigan muhit.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter-desktop">
        {/* Card 1 */}
        <div className="glass-card rounded-xl p-8 flex flex-col h-full bg-surface-container-low group relative overflow-hidden transition-all duration-500 hover:bg-surface-container">
          <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity">
            <span className="material-symbols-outlined text-[120px]">code</span>
          </div>
          <div className="z-10 flex-grow">
            <span className="font-label-caps text-label-caps text-primary-container tracking-widest mb-4 block">1-4 SINFLAR</span>
            <h2 className="font-headline-md text-headline-md text-on-surface mb-6">Boshlang'ich Ta'lim</h2>
            <p className="font-body-md text-body-md text-on-surface-variant mb-12">
              Bolalarda mantiqiy fikrlash, matematika va ingliz tili asoslarini chuqur o'rgatish orqali mustahkam poydevor yaratamiz.
            </p>
          </div>
          <div className="z-10 mt-auto pt-8 border-t border-outline/10">
            <div className="flex justify-between items-end mb-6">
              <span className="font-label-caps text-label-caps text-on-surface-variant">YILLIK TO'LOV</span>
              <span className="font-headline-lg text-headline-lg text-on-surface leading-none">$4K</span>
            </div>
            <button className="w-full py-4 rounded-full magnetic-btn bg-white text-black font-label-caps text-label-caps flex items-center justify-center gap-2 hover:bg-primary transition-colors">
              <span>Batafsil</span>
              <span className="material-symbols-outlined text-sm">arrow_forward</span>
            </button>
          </div>
        </div>

        {/* Card 2 */}
        <div className="glass-card rounded-xl p-8 flex flex-col h-full bg-surface-container-low group relative overflow-hidden transition-all duration-500 hover:bg-surface-container md:translate-y-12">
          <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity">
            <span className="material-symbols-outlined text-[120px]">memory</span>
          </div>
          <div className="z-10 flex-grow">
            <span className="font-label-caps text-label-caps text-primary-container tracking-widest mb-4 block">5-9 SINFLAR</span>
            <h2 className="font-headline-md text-headline-md text-on-surface mb-6">O'rta Ta'lim</h2>
            <p className="font-body-md text-body-md text-on-surface-variant mb-12">
              Zamonaviy fanlar, IT asoslari va aniq fanlarni chuqurlashtirilgan holda o'rganish. O'quvchilarda tanqidiy fikrlashni rivojlantirish.
            </p>
          </div>
          <div className="z-10 mt-auto pt-8 border-t border-outline/10">
            <div className="flex justify-between items-end mb-6">
              <span className="font-label-caps text-label-caps text-on-surface-variant">YILLIK TO'LOV</span>
              <span className="font-headline-lg text-headline-lg text-on-surface leading-none">$5K</span>
            </div>
            <button className="w-full py-4 rounded-full magnetic-btn bg-white text-black font-label-caps text-label-caps flex items-center justify-center gap-2 hover:bg-primary transition-colors">
              <span>Batafsil</span>
              <span className="material-symbols-outlined text-sm">arrow_forward</span>
            </button>
          </div>
        </div>

        {/* Card 3 */}
        <div className="glass-card rounded-xl p-8 flex flex-col h-full bg-surface-container-low group relative overflow-hidden transition-all duration-500 hover:bg-surface-container md:translate-y-24">
          <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity">
            <span className="material-symbols-outlined text-[120px]">security</span>
          </div>
          <div className="z-10 flex-grow">
            <span className="font-label-caps text-label-caps text-primary-container tracking-widest mb-4 block">10-11 SINFLAR</span>
            <h2 className="font-headline-md text-headline-md text-on-surface mb-6">Karyera va Universitetga Tayyorlash</h2>
            <p className="font-body-md text-body-md text-on-surface-variant mb-12">
              Universitetlarga kafolatlangan tayyorgarlik. SAT, IELTS va dasturlash bo'yicha chuqurlashtirilgan maxsus kurslar.
            </p>
          </div>
          <div className="z-10 mt-auto pt-8 border-t border-outline/10">
            <div className="flex justify-between items-end mb-6">
              <span className="font-label-caps text-label-caps text-on-surface-variant">YILLIK TO'LOV</span>
              <span className="font-headline-lg text-headline-lg text-on-surface leading-none">$6K</span>
            </div>
            <button className="w-full py-4 rounded-full magnetic-btn bg-white text-black font-label-caps text-label-caps flex items-center justify-center gap-2 hover:bg-primary transition-colors">
              <span>Batafsil</span>
              <span className="material-symbols-outlined text-sm">arrow_forward</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

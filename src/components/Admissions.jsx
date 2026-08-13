import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useTranslation } from 'react-i18next';

gsap.registerPlugin(ScrollTrigger);

export default function Admissions() {
  const { t } = useTranslation();
  const containerRef = useRef(null);

  const steps = [
    {
      id: '01',
      title: t('admissions.step1'),
      desc: t('admissions.step1Desc'),
      align: 'left'
    },
    {
      id: '02',
      title: t('admissions.step2'),
      desc: t('admissions.step2Desc'),
      align: 'right'
    },
    {
      id: '03',
      title: t('admissions.step3'),
      desc: t('admissions.step3Desc'),
      align: 'left'
    },
    {
      id: '04',
      title: t('admissions.step4'),
      desc: t('admissions.step4Desc'),
      align: 'right'
    }
  ];

  useEffect(() => {
    // Reveal steps
    const stepElements = containerRef.current.querySelectorAll('.step-card');
    stepElements.forEach((step, i) => {
      gsap.fromTo(step, 
        { y: 50, opacity: 0 },
        {
          scrollTrigger: {
            trigger: step,
            start: 'top 85%',
          },
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'back.out(1.2)',
          delay: i * 0.1,
          clearProps: 'transform'
        }
      );
    });

    // Draw dashed lines
    const lines = containerRef.current.querySelectorAll('.dashed-line path');
    lines.forEach((line) => {
      const length = line.getTotalLength();
      gsap.fromTo(line,
        { strokeDasharray: length, strokeDashoffset: length },
        {
          strokeDashoffset: 0,
          scrollTrigger: {
            trigger: line,
            start: "top 70%",
            end: "bottom 40%",
            scrub: 1,
          }
        }
      );
    });

    setTimeout(() => {
      ScrollTrigger.refresh();
    }, 200);
  }, []);

  return (
    <section className="py-24 px-margin-mobile md:px-margin-desktop w-full overflow-hidden bg-primary-container relative" id="admissions" ref={containerRef}>
      
      {/* Background Ornaments (Stars, Pencils etc) */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-10">
        <svg className="absolute top-10 left-10 w-24 h-24" viewBox="0 0 24 24" fill="none" stroke="var(--color-on-primary-container)" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
        <svg className="absolute top-1/3 right-10 w-32 h-32" viewBox="0 0 24 24" fill="none" stroke="var(--color-on-primary-container)" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
        <svg className="absolute bottom-20 left-20 w-20 h-20" viewBox="0 0 24 24" fill="none" stroke="var(--color-on-primary-container)" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><path d="M12 19l7-7 3 3-7 7-3-3z"></path><path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z"></path><path d="M2 2l7.586 7.586"></path><circle cx="11" cy="11" r="2"></circle></svg>
      </div>

      <div className="max-w-[1200px] mx-auto relative z-10">
        
        <div className="mb-20 text-center relative inline-block left-1/2 -translate-x-1/2">
          <h2 className="font-headline-lg text-4xl md:text-5xl font-black text-on-primary-container mb-2 relative z-10">
            {t('admissions.process')}
          </h2>
          {/* Wavy Underline */}
          <svg className="absolute -bottom-4 left-0 w-full h-4 text-primary" viewBox="0 0 200 20" preserveAspectRatio="none">
            <path d="M0,10 Q25,20 50,10 T100,10 T150,10 T200,10" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round"/>
          </svg>
        </div>

        <div className="relative">
          
          {/* Mobile Vertical Line */}
          <div className="md:hidden absolute left-[28px] top-10 bottom-10 w-[3px] border-l-[3px] border-dashed border-primary opacity-50"></div>

          <div className="space-y-16 md:space-y-32 relative">
            {steps.map((step, index) => {
              const isLeft = step.align === 'left';
              const hasNext = index < steps.length - 1;

              return (
                <div key={step.id} className={`relative flex flex-col md:flex-row items-center ${isLeft ? 'md:justify-start' : 'md:justify-end'} group step-card`}>
                  
                  <div className={`w-full md:w-[45%] relative z-10 pl-16 md:pl-0 ${!isLeft && 'md:order-2'}`}>
                    
                    {/* Badge */}
                    <div className={`absolute -top-6 -left-6 md:-top-8 ${isLeft ? 'md:-left-8' : 'md:-left-8'} w-16 h-16 md:w-20 md:h-20 rounded-full bg-primary flex items-center justify-center font-display-hero text-2xl md:text-4xl font-black text-on-primary shadow-lg border-4 border-surface z-20`}>
                      {step.id}
                    </div>

                    {/* Card */}
                    <div className="bg-surface rounded-[2rem] p-6 md:p-10 shadow-xl border border-outline/10 h-full relative z-10 transition-transform duration-300 hover:-translate-y-2">
                      <h3 className="font-headline-md text-2xl font-bold text-primary mb-4 pr-4">
                        {step.title}
                      </h3>
                      <p className="font-body-md text-on-surface-variant leading-relaxed">
                        {step.desc}
                      </p>
                    </div>

                    {/* Desktop SVG Connector to next step */}
                    {hasNext && isLeft && (
                      <svg className="hidden md:block absolute top-1/2 left-[100%] w-[120%] h-[150%] z-0 dashed-line pointer-events-none" viewBox="0 0 100 100" preserveAspectRatio="none">
                        <path d="M 0 0 C 60 0, 40 100, 100 100" fill="none" stroke="var(--color-primary)" strokeWidth="3" strokeDasharray="10,10" strokeLinecap="round" className="opacity-60"/>
                      </svg>
                    )}
                    {hasNext && !isLeft && (
                      <svg className="hidden md:block absolute top-1/2 right-[100%] w-[120%] h-[150%] z-0 dashed-line pointer-events-none" viewBox="0 0 100 100" preserveAspectRatio="none">
                        <path d="M 100 0 C 40 0, 60 100, 0 100" fill="none" stroke="var(--color-primary)" strokeWidth="3" strokeDasharray="10,10" strokeLinecap="round" className="opacity-60"/>
                      </svg>
                    )}
                  </div>

                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

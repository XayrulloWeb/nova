import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Admissions() {
  const containerRef = useRef(null);

  useEffect(() => {
    // Parallax timeline connectors
    const connectors = containerRef.current.querySelectorAll('.timeline-connector');
    
    connectors.forEach((conn, index) => {
      gsap.fromTo(conn, 
        { y: -50 },
        {
          y: 50,
          scrollTrigger: {
            trigger: conn.parentElement,
            start: "top bottom",
            end: "bottom top",
            scrub: true, // scrub provides the parallax effect
          }
        }
      );
    });

    // Reveal steps
    const steps = containerRef.current.querySelectorAll('.group');
    steps.forEach((step, index) => {
      gsap.fromTo(step, 
        { y: 50, opacity: 0 },
        {
          scrollTrigger: {
            trigger: step,
            start: 'top 85%',
          },
          y: 0,
          opacity: 1,
          duration: 1,
          ease: 'power3.out',
          clearProps: 'transform'
        }
      );
    });

    // Refresh ScrollTrigger to ensure correct positions after rendering
    setTimeout(() => {
      ScrollTrigger.refresh();
    }, 100);
  }, []);

  return (
    <section className="pb-[160px] px-margin-mobile md:px-margin-desktop max-w-[1920px] mx-auto" id="admissions" ref={containerRef}>
      <div className="md:w-8/12 mx-auto">
        <div className="mb-24 md:text-center">
          <h2 className="font-headline-lg text-headline-lg text-on-surface mb-4">Qabul jarayoni</h2>
          <p className="font-body-lg text-body-lg text-on-surface-variant">Maktabga qabul ochiq, shaffof va adolatli tarzda amalga oshiriladi.</p>
        </div>
        <div className="relative">
          {/* Vertical Line */}
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-px bg-outline/20 -translate-x-1/2"></div>
          {/* Timeline Items */}
          <div className="space-y-24 relative">
            {/* Step 1 */}
            <div className="relative flex flex-col md:flex-row items-center justify-between group">
              <div className="hidden md:block md:w-[45%] text-right pr-12 relative">
                <h3 className="font-headline-md text-headline-md text-on-surface mb-2">Ariza topshirish</h3>
                <p className="font-body-md text-body-md text-on-surface-variant">Bolangiz va o'zingiz haqingizdagi ma'lumotlarni to'ldirib, onlayn ariza qoldiring.</p>
              </div>
              <div className="absolute left-8 md:left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-surface border-2 border-primary-container z-10 timeline-connector transition-all duration-300 group-hover:scale-150 group-hover:bg-primary-container shadow-[0_0_15px_rgba(0,240,255,0.6)]"></div>
              <div className="w-full pl-20 md:pl-0 md:w-[45%] md:text-left md:pl-12 relative overflow-hidden">
                <div className="absolute -z-10 font-display-hero text-display-hero text-on-surface/5 -top-20 -left-10 font-black leading-none select-none">01</div>
                <div className="md:hidden">
                  <h3 className="font-headline-md text-headline-md text-on-surface mb-2">Ariza topshirish</h3>
                  <p className="font-body-md text-body-md text-on-surface-variant">Bolangiz va o'zingiz haqingizdagi ma'lumotlarni to'ldirib, onlayn ariza qoldiring.</p>
                </div>
              </div>
            </div>
            {/* Step 2 */}
            <div className="relative flex flex-col md:flex-row items-center justify-between group">
              <div className="w-full pl-20 md:pl-0 md:w-[45%] md:text-right pr-12 relative overflow-hidden">
                <div className="absolute -z-10 font-display-hero text-display-hero text-on-surface/5 -top-20 -right-10 font-black leading-none select-none hidden md:block">02</div>
                <div className="absolute -z-10 font-display-hero text-display-hero text-on-surface/5 -top-20 -left-10 font-black leading-none select-none md:hidden">02</div>
                <div className="md:hidden">
                  <h3 className="font-headline-md text-headline-md text-on-surface mb-2">Kirish sinovlari</h3>
                  <p className="font-body-md text-body-md text-on-surface-variant">Bolaning bilim darajasi va psixologik tayyorgarligini baholash uchun yoshiga mos suhbat va testlar.</p>
                </div>
              </div>
              <div className="absolute left-8 md:left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-surface border-2 border-primary-container z-10 timeline-connector transition-all duration-300 group-hover:scale-150 group-hover:bg-primary-container shadow-[0_0_15px_rgba(0,240,255,0.6)]"></div>
              <div className="hidden md:block md:w-[45%] text-left pl-12 relative">
                <h3 className="font-headline-md text-headline-md text-on-surface mb-2">Kirish sinovlari</h3>
                <p className="font-body-md text-body-md text-on-surface-variant">Bolaning bilim darajasi va psixologik tayyorgarligini baholash uchun yoshiga mos suhbat va testlar.</p>
              </div>
            </div>
            {/* Step 3 */}
            <div className="relative flex flex-col md:flex-row items-center justify-between group">
              <div className="hidden md:block md:w-[45%] text-right pr-12 relative">
                <h3 className="font-headline-md text-headline-md text-on-surface mb-2">Ota-onalar bilan suhbat</h3>
                <p className="font-body-md text-body-md text-on-surface-variant">Farzandingizning ta'lim maqsadlari va kelajagini muhokama qilish uchun maktab ma'muriyati bilan uchrashuv.</p>
              </div>
              <div className="absolute left-8 md:left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-surface border-2 border-primary-container z-10 timeline-connector transition-all duration-300 group-hover:scale-150 group-hover:bg-primary-container shadow-[0_0_15px_rgba(0,240,255,0.6)]"></div>
              <div className="w-full pl-20 md:pl-0 md:w-[45%] md:text-left md:pl-12 relative overflow-hidden">
                <div className="absolute -z-10 font-display-hero text-display-hero text-on-surface/5 -top-20 -left-10 font-black leading-none select-none">03</div>
                <div className="md:hidden">
                  <h3 className="font-headline-md text-headline-md text-on-surface mb-2">Ota-onalar bilan suhbat</h3>
                  <p className="font-body-md text-body-md text-on-surface-variant">Farzandingizning ta'lim maqsadlari va kelajagini muhokama qilish uchun maktab ma'muriyati bilan uchrashuv.</p>
                </div>
              </div>
            </div>
            {/* Step 4 */}
            <div className="relative flex flex-col md:flex-row items-center justify-between group">
              <div className="w-full pl-20 md:pl-0 md:w-[45%] md:text-right pr-12 relative overflow-hidden">
                <div className="absolute -z-10 font-display-hero text-display-hero text-on-surface/5 -top-20 -right-10 font-black leading-none select-none hidden md:block">04</div>
                <div className="absolute -z-10 font-display-hero text-display-hero text-on-surface/5 -top-20 -left-10 font-black leading-none select-none md:hidden">04</div>
                <div className="md:hidden">
                  <h3 className="font-headline-md text-headline-md text-on-surface mb-2">Shartnoma va qabul qilish</h3>
                  <p className="font-body-md text-body-md text-on-surface-variant">Hujjatlarni rasmiylashtirish va NOVA xususiy maktabining katta oilasiga rasmiy qabul qilinish.</p>
                </div>
              </div>
              <div className="absolute left-8 md:left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-surface border-2 border-primary-container z-10 timeline-connector transition-all duration-300 group-hover:scale-150 group-hover:bg-primary-container shadow-[0_0_15px_rgba(0,240,255,0.6)]"></div>
              <div className="hidden md:block md:w-[45%] text-left pl-12 relative">
                <h3 className="font-headline-md text-headline-md text-on-surface mb-2">Shartnoma va qabul qilish</h3>
                <p className="font-body-md text-body-md text-on-surface-variant">Hujjatlarni rasmiylashtirish va NOVA xususiy maktabining katta oilasiga rasmiy qabul qilinish.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

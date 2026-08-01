import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Testimonials() {
  const sectionRef = useRef(null);
  const carouselRef = useRef(null);

  useEffect(() => {
    // We get the total width of the content inside the carousel
    const carouselWidth = carouselRef.current.scrollWidth;
    const windowWidth = window.innerWidth;
    
    // We only want to move it enough to show the last card
    const moveAmount = carouselWidth - windowWidth;
    
    if (moveAmount > 0) {
      gsap.to(carouselRef.current, {
        x: -moveAmount,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: `+=${carouselWidth}`, // Pin for the duration of its width
          pin: true,
          scrub: 1, // Smooth scrub
        }
      });
    }

    return () => {
      ScrollTrigger.getAll().forEach(st => {
        if (st.trigger === sectionRef.current) st.kill();
      });
    };
  }, []);

  return (
    <div ref={sectionRef}>
      {/* Header Section */}
      <section className="px-margin-mobile md:px-margin-desktop py-24 md:py-32 grid grid-cols-1 md:grid-cols-12 gap-gutter-desktop relative z-10" id="success">
        <div className="col-span-1 md:col-span-8 md:col-start-3 text-center">
          <h1 className="font-display-hero-mobile text-display-hero-mobile md:font-headline-lg md:text-headline-lg text-on-surface mb-8">Natijalar va Savollar</h1>
          <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl mx-auto">Bitiruvchilarimiz qayerda ishlashini bilib oling va NOVA tajribasi haqidagi umumiy savollarga javob toping.</p>
        </div>
      </section>

      {/* Section 1: Alumni Success Stories Carousel */}
      <section className="py-24 relative overflow-hidden h-screen flex flex-col justify-center">
        {/* Background Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-primary-container/5 blur-[120px] rounded-full pointer-events-none"></div>
        <div className="px-margin-mobile md:px-margin-desktop mb-12 flex justify-between items-end">
          <h2 className="font-headline-md text-headline-md text-on-surface">Bitiruvchilar Yo'nalishi</h2>
        </div>

        <div className="flex gap-6 overflow-visible px-margin-mobile md:px-margin-desktop pb-8 flex-nowrap" ref={carouselRef}>
          {/* Card 1 */}
          <div className="min-w-[320px] md:min-w-[480px] glass-panel rounded-lg p-8 snap-start flex flex-col justify-between h-[360px] relative group hover:border-primary/30 transition-colors">
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary-container/10 blur-[40px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
            <div>
              <span className="material-symbols-outlined text-primary text-4xl mb-6 opacity-50">format_quote</span>
              <p className="font-body-lg text-body-lg text-on-surface mb-6">"NOVA menga nafaqat sintaksisni o'rgatdi; u mening tizim arxitekturasini qanday qabul qilishimni o'zgartirdi. Galereya uslubidagi tanqidlar meni odatiy chegaralardan tashqariga chiqardi."</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-surface-container-high overflow-hidden relative">
                <div className="bg-cover bg-center w-full h-full opacity-80 blend-adaptive" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuA_DTasmAsRTBvPsFA3dugOmmrDrMa-Ib9e-kJ_7zhN9wWN_QsooqqTmYSBybGkiOlDueWfS9sSoEEUaX9IKU6dzyAe5WImMyAfRZuCReydfdz_6fwa-rlAV9BpUaTFxfWB4z-0It7wvrDphlV7nMHRurKbHYTWHp51GuV2QYU7ST_rjAldJ2x_8FkvsiulP1ZDsGqPB16Ze8JerZP8Qvyuw1SCBbAu7L3ARLsk_rPtcMOPmwsyhJPi')" }}></div>
              </div>
              <div>
                <div className="font-label-caps text-label-caps text-on-surface mb-1">ELARA V.</div>
                <div className="font-body-md text-body-md text-primary">DeepMind'da AI Tadqiqotchisi</div>
              </div>
            </div>
          </div>

          {/* Card 2 */}
          <div className="min-w-[320px] md:min-w-[480px] glass-panel rounded-lg p-8 snap-start flex flex-col justify-between h-[360px] relative group hover:border-primary/30 transition-colors">
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary-container/10 blur-[40px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
            <div>
              <span className="material-symbols-outlined text-primary text-4xl mb-6 opacity-50">format_quote</span>
              <p className="font-body-lg text-body-lg text-on-surface mb-6">"Fazoviy hisoblash va minimalist dizayn tamoyillariga urg'u berilishi menga an'anaviy o'quv markazlarida topa olmaydigan ustunlikni berdi."</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-surface-container-high overflow-hidden relative">
                <div className="bg-cover bg-center w-full h-full opacity-80 blend-adaptive" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDObndsECml_mToWwHbc7GK8ULyM9k512Hz1JJ-EK3CyuRvk11dusvSGyK-hAwH31oCBPQ2RkipQGwNkV4ZEsWvO--wmMOe9gv-joZEY6WtEMSdlSlqEmJv0Evg_yMaDBMm9Ei2YIVF9PRZrfz3ClIIl_S1Is3Kvr1KsvDr1Enmq43No5zEOZbvCM0pxev36ombQrQHUjtAP1O8erEGYbaFPqYa3tOqemShjIonnFslAoXCF92pOFU_')" }}></div>
              </div>
              <div>
                <div className="font-label-caps text-label-caps text-on-surface mb-1">MARCUS T.</div>
                <div className="font-body-md text-body-md text-primary">Kreativ Texnologiya Rahbari</div>
              </div>
            </div>
          </div>

          {/* Card 3 */}
          <div className="min-w-[320px] md:min-w-[480px] glass-panel rounded-lg p-8 snap-start flex flex-col justify-between h-[360px] relative group hover:border-primary/30 transition-colors">
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary-container/10 blur-[40px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
            <div>
              <span className="material-symbols-outlined text-primary text-4xl mb-6 opacity-50">format_quote</span>
              <p className="font-body-lg text-body-lg text-on-surface mb-6">"Kodni yuqori darajadagi dizayn vositasi sifatida qabul qilish portfoliomni o'zgartirdi. Men faqat dasturlarni emas, balki taassurotlarni yaratishni o'rgandim."</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-surface-container-high overflow-hidden relative">
                <div className="bg-cover bg-center w-full h-full opacity-80 blend-adaptive" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBB565_BszxZ_WXNsL66GUrVwl6o6AU0JCMHki7RL6vBC9UvmpMQTFt_84yRfyd0BzL_FeduQuPS9ZJz-mw2hwllF0iGiermN-oxlll02X412rx1RAZ1sPdbVK2yi9qvolDghvowe9zDswCmurNEtZzdJSu9283bv0ySebBd2TBXakt8IZk2kumjF-SR71gE1tQMbevuXRYxThXDrWgUuVX1g38DS2WNXLjTXB4nHXZUX50huwX2H45')" }}></div>
              </div>
              <div>
                <div className="font-label-caps text-label-caps text-on-surface mb-1">SARAH K.</div>
                <div className="font-body-md text-body-md text-primary">Katta Frontend Muhandisi</div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

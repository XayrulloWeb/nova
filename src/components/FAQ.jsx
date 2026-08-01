import React, { useState } from 'react';

export default function FAQ() {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggle = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const faqs = [
    {
      q: "Dasturlash bo'yicha oldingi tajriba talab qilinadimi?",
      a: "Garchi mantiqning asosiy tushunchalari foydali bo'lsa-da, NOVA texnik ma'lumotidan qat'i nazar, dizaynga qiziqishi yuqori bo'lganlar uchun mo'ljallangan. Biz asosiy tamoyillardan boshlaymiz va tezda ilg'or arxitekturaga o'tamiz."
    },
    {
      q: "To'lov tizimi qanday?",
      a: "Biz laboratoriya to'lovlari modelida ishlaymiz. O'qish to'lovi har bir modul uchun amalga oshiriladi, bu esa moslashuvchan o'tish imkonini beradi. Shuningdek, biz ajoyib portfoliolar uchun daromadni taqsimlash shartnomalarini taklif qilamiz."
    },
    {
      q: "O'quv dasturi masofaviymi yoki yuzma-yuzmi?",
      a: "NOVA gibrid tajribani taqdim etadi. Asosiy ma'ruzalar va tanqidlar bizning virtual galereyalarimizda (fazoviy veb) bo'lib o'tadi, tanlangan intensiv seminarlar esa yirik shaharlardagi jismoniy laboratoriyalarda o'tkaziladi."
    },
    {
      q: "Qanday kompyuter kerak?",
      a: "WebGL/Three.js muhitlarini muammosiz ko'rsata oladigan zamonaviy kompyuter talab qilinadi. Batafsil xususiyatlar qabul qilingandan so'ng taqdim etiladi, lekin odatda so'nggi M-seriyali Mac yoki shunga o'xshash kompyuter yetarli."
    }
  ];

  return (
    <section className="py-24 px-margin-mobile md:px-margin-desktop grid grid-cols-1 md:grid-cols-12 gap-gutter-desktop">
      <div className="col-span-1 md:col-span-4 mb-12 md:mb-0">
        <h2 className="font-headline-md text-headline-md text-on-surface sticky top-32">Ko'p Beriladigan<br/>Savollar</h2>
      </div>
      <div className="col-span-1 md:col-span-8 flex flex-col border-t border-outline/20">
        {faqs.map((faq, index) => {
          const isActive = activeIndex === index;
          return (
            <div 
              key={index} 
              className={`faq-item border-b border-outline/20 py-8 cursor-pointer group ${isActive ? 'active' : ''}`}
              onClick={() => toggle(index)}
            >
              <div className="flex justify-between items-center">
                <h3 className="font-body-lg text-body-lg text-on-surface group-hover:text-primary transition-colors">{faq.q}</h3>
                <span className={`material-symbols-outlined text-on-surface-variant faq-icon transition-transform duration-300 ${isActive ? 'rotate-45' : ''}`}>
                  add
                </span>
              </div>
              <div className={`faq-content transition-all duration-500 overflow-hidden ${isActive ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}`}>
                <p className="font-body-md text-body-md text-on-surface-variant mt-6 pr-12">{faq.a}</p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

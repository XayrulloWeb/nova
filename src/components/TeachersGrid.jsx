import React from 'react';

export default function TeachersGrid() {
  return (
    <section className="flex-grow pt-[160px] pb-[160px] px-margin-mobile md:px-margin-desktop bg-surface-container-lowest" id="teachers">
      <header className="mb-20 max-w-4xl mx-auto md:mx-0">
        <h1 className="text-[40px] md:text-headline-lg font-extrabold text-on-surface mb-4 uppercase tracking-tighter">Bizning o'qituvchilarimiz</h1>
        <p className="text-body-lg text-on-surface-variant max-w-2xl">Bizning o'qituvchilarimiz ko'p yillik tajribaga ega bo'lgan va o'quvchilarni o'qishda hamda hayotda yuksak natijalarga olib chiquvchi ekspertlardir.</p>
      </header>
      <div className="bento-grid">
        {/* Card 1: Large Featured Mentor */}
        <div className="glass-card bento-item-1 p-10 flex flex-col md:flex-row items-end md:items-center justify-between relative overflow-hidden group shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)]">
          <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent z-10 md:hidden"></div>
          <div className="z-20 md:w-1/2 relative">
            <div className="text-primary-container font-label-caps text-label-caps mb-4 uppercase tracking-widest">Oliy toifali o'qituvchi</div>
            <h2 className="text-[32px] md:text-[48px] font-bold text-on-surface mb-4">Yelena Ivanova</h2>
            <p className="text-body-md text-on-surface-variant mb-8">Matematika va informatika o'qituvchisi. 15 yildan ortiq tajriba. O'nlab olimpiada g'oliblarini va eng yuqori ball olgan o'quvchilarni tayyorlagan.</p>
            <button className="bg-on-surface text-surface py-3 px-8 rounded-full font-label-caps text-sm uppercase font-bold hover:bg-primary-container transition-colors duration-300">Batafsil</button>
            <div className="flex flex-wrap gap-2 mt-6 mb-6">
              <span className="px-3 py-1 rounded-full bg-surface-container-highest text-on-surface-variant text-[10px] font-label-caps uppercase border border-outline-variant/20">Matematika</span>
              <span className="px-3 py-1 rounded-full bg-surface-container-highest text-on-surface-variant text-[10px] font-label-caps uppercase border border-outline-variant/20">Informatika</span>
              <span className="px-3 py-1 rounded-full bg-surface-container-highest text-on-surface-variant text-[10px] font-label-caps uppercase border border-outline-variant/20">Olimpiadalar</span>
            </div>
          </div>
          <div className="absolute md:relative md:w-1/2 h-full flex items-end justify-end pt-10">
            <img className="w-full h-auto object-contain max-h-[400px] object-bottom blend-adaptive opacity-80 group-hover:opacity-100 transition-opacity duration-500" alt="Yelena Ivanova" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAg5MRBCZP4WCW8iQPPTk1BKddSvVJjOSoNmGJT1702MGMWK8hKy2OD7k22XIHtBqiyaks8oNYkX1YbC7vBsYjvq1d_GZph8A8b6tSAjkkwrCDyUczE3cM6EnhH9YMGSsTubqsA3i45E18Za4H9HkHguaNgNII3gIqAiiQErihbu9pmnsv7gCMjk5JFZNlDhhpMXCmpFhbAEJjX05bJKwE0Wa9wiBK-B-8VEWz1loSsE7eTj_r0Dyz4" />
          </div>
        </div>

        {/* Card 2: Medium Mentor */}
        <div className="glass-card bento-item-2 p-8 flex flex-col justify-end relative overflow-hidden group min-h-[400px] shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)]">
          <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/40 to-transparent z-10"></div>
          <img className="absolute inset-0 w-full h-full object-cover object-top blend-adaptive opacity-70 group-hover:opacity-90 transition-opacity duration-500 z-0" alt="Mark Torn" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCv9iiu1Ud5iPUIQ3NKSeoDWNcIG_5qYGGhthhZV0xqsB9BfQknixQ8yl1wAiZoKunlE03iTwjYzXRRuE0Jwdxa585gPEVccKWRq_LCWcjosApDsbDenJEhckZqmqUWkNuzMhs8V-zPfogcDcXnDzm63M2sVRhDxojZauIdopTR9S14cfFgRDHxslPQlzih77lQiUYsNvvaAh1-iLzE-bXNl5HKPtWAIqxC1RZw9w2lge0fa9poV9O7" />
          <div className="z-20 relative mt-auto">
            <div className="text-primary-container font-label-caps text-xs mb-2 uppercase tracking-widest">Xizmat ko'rsatgan o'qituvchi</div>
            <h3 className="text-[24px] font-bold text-on-surface mb-2">Mark Torn</h3>
            <p className="text-body-md text-on-surface-variant text-sm">Fizika o'qituvchisi. Maktab robototexnika klubi asoschisi.</p>
            <div className="flex flex-wrap gap-2 mt-4">
              <span className="px-2 py-0.5 rounded-full bg-surface-container-highest text-on-surface-variant text-[10px] font-label-caps uppercase border border-outline-variant/20">Fizika</span>
              <span className="px-2 py-0.5 rounded-full bg-surface-container-highest text-on-surface-variant text-[10px] font-label-caps uppercase border border-outline-variant/20">Robototexnika</span>
            </div>
          </div>
        </div>

        {/* Card 3: Medium Mentor */}
        <div className="glass-card bento-item-3 p-8 flex flex-col justify-end relative overflow-hidden group min-h-[400px] shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)]">
          <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/40 to-transparent z-10"></div>
          <img className="absolute inset-0 w-full h-full object-cover object-top blend-adaptive opacity-70 group-hover:opacity-90 transition-opacity duration-500 z-0" alt="Sara Lin" src="https://lh3.googleusercontent.com/aida-public/AB6AXuB_5IoEziIFcbWAs-uIt0mBErIbZJK6AxhCm5-HvlpwhpidhGKvKscgChOI3gG0NjJeu3NbO5PABneLUsWOrbqM9ci2pdRB5lMLk9ESzr9GJd2t3LAJbevPKh0jhJyEFuEIj5sxw0AZMQ01S-fAroXCVdBBMjAajB4-pmagJfIEw8aSS-BMN9JXQEe9ZXKJKfWWQabFppZipcRnjKdaXvKTPqlyNUdta6tdGCkIlj26sMffVxTEGGZR" />
          <div className="z-20 relative mt-auto">
            <div className="text-primary-container font-label-caps text-xs mb-2 uppercase tracking-widest">Fan nomzodi</div>
            <h3 className="text-[24px] font-bold text-on-surface mb-2">Sara Lin</h3>
            <p className="text-body-md text-on-surface-variant text-sm">Biologiya va kimyo o'qituvchisi. Mutaxassis, o'quv qo'llanmalari muallifi.</p>
            <div className="flex flex-wrap gap-2 mt-4">
              <span className="px-2 py-0.5 rounded-full bg-surface-container-highest text-on-surface-variant text-[10px] font-label-caps uppercase border border-outline-variant/20">Biologiya</span>
              <span className="px-2 py-0.5 rounded-full bg-surface-container-highest text-on-surface-variant text-[10px] font-label-caps uppercase border border-outline-variant/20">Kimyo</span>
            </div>
          </div>
        </div>

        {/* Card 4: Wide Mentor */}
        <div className="glass-card bento-item-4 p-8 flex flex-row items-center relative overflow-hidden group min-h-[250px] shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)]">
          <div className="w-1/3 h-full relative">
            <img className="absolute inset-0 w-full h-full object-cover object-center blend-adaptive opacity-70 group-hover:opacity-100 transition-opacity duration-500" alt="David Chen" src="https://lh3.googleusercontent.com/aida-public/AB6AXuD4v21S6IFZfSpOaP2Jq2AzbSPn7vBbumqT-bryj0MLbuVLX2p4iDFTmSyV1jtz6KdqEpbJ2i-KoQNeug48fdOY8KPqnbQGpr2wedVm6ZUhknd7CQM2N3dmgKjTTG-E6Ne49CibXwlgy3OUyJDLVto6u4c8tDToN3icKidUunced8ypWdhajzqO-UGXhtZ3FiKmwIB_Db6-FXP5JmDmm3-SZZZNYAWAHipjY6jvmFd9qoLWxFhlkXmu" />
          </div>
          <div className="w-2/3 pl-8 z-20">
            <div className="text-primary-container font-label-caps text-xs mb-2 uppercase tracking-widest">Yil o'qituvchisi</div>
            <h3 className="text-[24px] font-bold text-on-surface mb-2">David Chen</h3>
            <p className="text-body-md text-on-surface-variant mb-4 text-sm">Tarix va jamiyatshunoslik o'qituvchisi. Debatlar orqali gumanitar fanlarga mehr uyg'otadi.</p>
            <div className="flex flex-wrap gap-2 mb-4">
              <span className="px-2 py-0.5 rounded-full bg-surface-container-highest text-on-surface-variant text-[10px] font-label-caps uppercase border border-outline-variant/20">Tarix</span>
              <span className="px-2 py-0.5 rounded-full bg-surface-container-highest text-on-surface-variant text-[10px] font-label-caps uppercase border border-outline-variant/20">Jamiyatshunoslik</span>
            </div>
          </div>
        </div>

        {/* Card 5: Wide Mentor */}
        <div className="glass-card bento-item-5 p-8 flex flex-row items-center relative overflow-hidden group min-h-[250px] shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)]">
          <div className="w-2/3 pr-8 z-20 text-right">
            <div className="text-primary-container font-label-caps text-xs mb-2 uppercase tracking-widest">Maktab psixologi</div>
            <h3 className="text-[24px] font-bold text-on-surface mb-2">Yelena Rostova</h3>
            <p className="text-body-md text-on-surface-variant mb-4 text-sm">O'quvchilarga stressni yengish va o'z qiziqishlarini topishga yordam beradi.</p>
            <div className="flex flex-wrap gap-2 mb-4 justify-end">
              <span className="px-2 py-0.5 rounded-full bg-surface-container-highest text-on-surface-variant text-[10px] font-label-caps uppercase border border-outline-variant/20">Psixologiya</span>
            </div>
          </div>
          <div className="w-1/3 h-full relative">
            <img className="absolute inset-0 w-full h-full object-cover object-center blend-adaptive opacity-70 group-hover:opacity-100 transition-opacity duration-500" alt="Yelena Rostova" src="https://lh3.googleusercontent.com/aida-public/AB6AXuD7f60Z4zJQPEVf84mV4WSOpDDPnQ-u8gqBtYqEyg6DhnmBYGJxm21qbg48OyQmhnxt4QmWU73PmrPXf4hL_iqTxR9m4MJTNSjrFkyBOwyHSl80LlfC3fNW0zd_gfLposMUuP-bXhm6W1qSehMs1R6aUjrgMqA3X8ZRClQyYA2SbeHtWsd_J-joHWHDYepJKPORVUSFbGxmtVAKXFsoepVvEgaCGNnectKQdG6xj7DxHRiKZsV8PWpM" />
          </div>
        </div>
      </div>
    </section>
  );
}

import React from 'react';

export default function Exams() {
  return (
    <section className="py-24 px-margin-mobile md:px-margin-desktop bg-surface-container relative">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-[32px] md:text-headline-lg font-bold text-on-surface mb-12 text-center">Olimpiadalar va Imtihonlar</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="glass-card p-10 rounded-3xl border-t-4 border-t-primary">
            <h3 className="text-2xl font-bold text-on-surface mb-4">Davlat imtihonlariga tayyorgarlik</h3>
            <p className="text-on-surface-variant mb-6">Yuqori sinflarda davlat imtihonlariga intensiv tayyorgarlik tizimi joriy etilgan. Mutaxassislik fanlari bo'yicha qo'shimcha soatlar va muntazam sinov testlari o'tkaziladi.</p>
            <ul className="space-y-3">
              <li className="flex items-center gap-3">
                <span className="material-symbols-outlined text-primary">done</span>
                <span className="text-on-surface">Yakka tartibdagi ta'lim yo'nalishlari</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="material-symbols-outlined text-primary">done</span>
                <span className="text-on-surface">Ekspertlar bilan murakkab masalalarni tahlil qilish</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="material-symbols-outlined text-primary">done</span>
                <span className="text-on-surface">Psixologik tayyorgarlik</span>
              </li>
            </ul>
          </div>
          <div className="glass-card p-10 rounded-3xl border-t-4 border-t-primary">
            <h3 className="text-2xl font-bold text-on-surface mb-4">Olimpiada harakati</h3>
            <p className="text-on-surface-variant mb-6">O'quvchilarimiz har yili butunrossiya va xalqaro olimpiadalar hamda nufuzli oliygohlar olimpiadalari g'olib va sovrindorlari bo'lishadi.</p>
            <ul className="space-y-3">
              <li className="flex items-center gap-3">
                <span className="material-symbols-outlined text-primary">done</span>
                <span className="text-on-surface">Fanlar bo'yicha maxsus kurslar</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="material-symbols-outlined text-primary">done</span>
                <span className="text-on-surface">Sayyor maktablarda ishtirok etish</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="material-symbols-outlined text-primary">done</span>
                <span className="text-on-surface">STEM-laboratoriyalarda loyiha faoliyati</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

import React from 'react';

export default function MealsAndUniform() {
  return (
    <section className="py-24 px-margin-mobile md:px-margin-desktop bg-surface-container">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Meals */}
        <div className="glass-card p-10 rounded-3xl group">
          <div className="flex items-center gap-4 mb-8">
            <span className="material-symbols-outlined text-5xl text-primary">restaurant</span>
            <h2 className="text-3xl font-bold text-on-surface">Ovqatlanish</h2>
          </div>
          <p className="text-body-lg text-on-surface-variant mb-8">Maktabda muvozanatlashgan uch mahal issiq ovqat (nonushta, tushlik, tushki ovqat) tashkil etilgan. Menyu yosh ehtiyojlari va diyetologlar tavsiyalarini hisobga olgan holda tuzilgan.</p>
          <ul className="space-y-4 mb-8">
            <li className="flex items-center gap-3">
              <span className="material-symbols-outlined text-primary">check_circle</span>
              <span className="text-on-surface">Yangi fermer mahsulotlari</span>
            </li>
            <li className="flex items-center gap-3">
              <span className="material-symbols-outlined text-primary">check_circle</span>
              <span className="text-on-surface">Yakka tartibdagi menyu (allergiya, parhez)</span>
            </li>
            <li className="flex items-center gap-3">
              <span className="material-symbols-outlined text-primary">check_circle</span>
              <span className="text-on-surface">Shaxsiy novvoyxona</span>
            </li>
          </ul>
          <button className="text-primary font-label-caps tracking-widest text-sm hover:opacity-70 transition-opacity">HAFTALIK MENYUNI KO'RISH &rarr;</button>
        </div>

        {/* Uniform */}
        <div className="glass-card p-10 rounded-3xl group">
          <div className="flex items-center gap-4 mb-8">
            <span className="material-symbols-outlined text-5xl text-primary">checkroom</span>
            <h2 className="text-3xl font-bold text-on-surface">Maktab formasi</h2>
          </div>
          <p className="text-body-lg text-on-surface-variant mb-8">Biz ishbilarmonlik kiyim uslubiga amal qilamiz. Maktab formasi tartibga o'rgatadi va NOVA hamjamiyatiga daxldorlik hissini shakllantiradi.</p>
          <ul className="space-y-4 mb-8">
            <li className="flex items-center gap-3">
              <span className="material-symbols-outlined text-primary">check_circle</span>
              <span className="text-on-surface">Kundalik forma (to'q ko'k rang)</span>
            </li>
            <li className="flex items-center gap-3">
              <span className="material-symbols-outlined text-primary">check_circle</span>
              <span className="text-on-surface">Bayram formasi (oq ust, ko'k ost)</span>
            </li>
            <li className="flex items-center gap-3">
              <span className="material-symbols-outlined text-primary">check_circle</span>
              <span className="text-on-surface">Jismoniy tarbiya uchun sport formasi</span>
            </li>
          </ul>
          <button className="text-primary font-label-caps tracking-widest text-sm hover:opacity-70 transition-opacity">FORMAGA QO'YILADIGAN TALABLAR &rarr;</button>
        </div>
      </div>
    </section>
  );
}

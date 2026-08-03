import React from 'react';

export default function SchoolHistory() {
  return (
    <section className="py-24 px-margin-mobile md:px-margin-desktop bg-surface-container">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-[32px] md:text-headline-lg font-bold text-on-surface mb-8">Asosiy ma'lumotlar</h2>
        <div className="glass-card p-8 rounded-3xl">
          <p className="text-body-lg text-on-surface-variant mb-6">
            NOVA xususiy maktabi 2026-yilda fundamental bilimlar va zamonaviy texnologiyalarni o'zida mujassam etgan ilg'or ta'limni taqdim etish maqsadida tashkil etilgan. Bizning yondashuvimiz har bir bolaning individual salohiyatini ro'yobga chiqarishga asoslangan.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
            <div>
              <h3 className="font-label-caps text-primary mb-2">Ta'sischilar</h3>
              <p className="text-on-surface">"Innovatsiya" xalqaro ta'lim fondi</p>
            </div>
            <div>
              <h3 className="font-label-caps text-primary mb-2">Ish vaqti</h3>
              <p className="text-on-surface">Dushanba - Juma: 08:00 - 18:00<br/>Shanba: 09:00 - 14:00 (To'garaklar)</p>
            </div>
            <div>
              <h3 className="font-label-caps text-primary mb-2">Ta'lim tillari</h3>
              <p className="text-on-surface">O'zbek, Rus, Ingliz</p>
            </div>
            <div>
              <h3 className="font-label-caps text-primary mb-2">Infratuzilma</h3>
              <p className="text-on-surface">STEM-laboratoriyalar, IT-poligon, sport majmuasi, 21-asr kutubxonasi</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

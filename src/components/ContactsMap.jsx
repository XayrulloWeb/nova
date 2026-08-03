import React, { useState } from 'react';

export default function ContactsMap() {
  const [activeZone, setActiveZone] = useState(null);

  const zones = [
    {
      id: 'main',
      name: 'Asosiy Bino',
      desc: 'Sinflar, ma\'muriyat va majlislar zali.',
      icon: 'school',
      top: '20%', left: '30%', width: '40%', height: '30%', color: 'bg-primary/20 hover:bg-primary/40 border-primary'
    },
    {
      id: 'stem',
      name: 'STEM Laboratoriyasi',
      desc: 'Zamonaviy fizika, kimyo va IT xonalari.',
      icon: 'science',
      top: '55%', left: '10%', width: '25%', height: '25%', color: 'bg-primary-container/30 hover:bg-primary-container/60 border-primary-container'
    },
    {
      id: 'sports',
      name: 'Sport Majmuasi',
      desc: 'Yopiq basseyn, futbol va basketbol maydonlari.',
      icon: 'sports_basketball',
      top: '15%', left: '75%', width: '20%', height: '40%', color: 'bg-outline/30 hover:bg-outline/60 border-outline'
    },
    {
      id: 'library',
      name: '21-asr Kutubxonasi',
      desc: 'Elektron va bosma adabiyotlar, kovorking zonasi.',
      icon: 'local_library',
      top: '60%', left: '45%', width: '20%', height: '20%', color: 'bg-surface-tint/20 hover:bg-surface-tint/50 border-surface-tint'
    },
    {
      id: 'cafe',
      name: 'Oshxona',
      desc: 'Sog\'lom ovqatlanish va eko-kafe.',
      icon: 'restaurant',
      top: '60%', left: '70%', width: '20%', height: '25%', color: 'bg-on-surface-variant/20 hover:bg-on-surface-variant/40 border-on-surface-variant'
    }
  ];

  return (
    <section className="py-24 px-margin-mobile md:px-margin-desktop bg-surface-container">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        
        {/* Contact Info */}
        <div className="lg:col-span-4">
          <h2 className="text-[32px] md:text-headline-lg font-bold text-on-surface mb-8">Kontaktlar</h2>
          <div className="space-y-6 mb-12">
            <div className="flex items-start gap-4">
              <span className="material-symbols-outlined text-primary text-3xl">location_on</span>
              <div>
                <h3 className="font-bold text-on-surface">Manzil</h3>
                <p className="text-on-surface-variant">Toshkent sh., Mirzo-Ulug'bek tumani, Sayram ko'chasi, 15</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <span className="material-symbols-outlined text-primary text-3xl">call</span>
              <div>
                <h3 className="font-bold text-on-surface">Telefon</h3>
                <p className="text-on-surface-variant">+998 71 200 00 00</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <span className="material-symbols-outlined text-primary text-3xl">mail</span>
              <div>
                <h3 className="font-bold text-on-surface">Email</h3>
                <p className="text-on-surface-variant">info@novaschool.uz</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <span className="material-symbols-outlined text-primary text-3xl">schedule</span>
              <div>
                <h3 className="font-bold text-on-surface">Ish vaqti</h3>
                <p className="text-on-surface-variant">Dush-Juma: 08:00 - 18:00<br/>Shanba: 09:00 - 14:00</p>
              </div>
            </div>
          </div>
        </div>

        {/* Interactive Map */}
        <div className="lg:col-span-8 glass-card p-4 md:p-6 rounded-3xl h-[500px] flex flex-col relative overflow-hidden">
          <h3 className="text-xl font-bold text-on-surface mb-4">Interaktiv Kampus Xaritasi</h3>
          <p className="text-sm text-on-surface-variant mb-4">Bino haqida ma'lumot olish uchun ustiga bosing yoki sichqonchani olib boring.</p>
          
          <div className="relative flex-grow bg-surface-container-highest rounded-2xl overflow-hidden border border-outline/10 perspective-1000">
            {/* Map Grid Background */}
            <div className="absolute inset-0 opacity-10 bg-[linear-gradient(rgba(255,255,255,0.2)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.2)_1px,transparent_1px)] bg-[size:20px_20px]"></div>
            
            {/* Map Path mock */}
            <svg className="absolute inset-0 w-full h-full opacity-20 pointer-events-none" xmlns="http://www.w3.org/2000/svg">
              <path d="M 20% 60% L 30% 40% L 50% 40% L 75% 20%" fill="none" stroke="currentColor" strokeWidth="4" strokeDasharray="10 10"/>
              <path d="M 50% 40% L 55% 65% L 80% 70%" fill="none" stroke="currentColor" strokeWidth="4" strokeDasharray="10 10"/>
            </svg>

            {/* Zones */}
            {zones.map((zone) => (
              <div 
                key={zone.id}
                className={`absolute rounded-xl border-2 cursor-pointer transition-all duration-300 flex items-center justify-center group ${zone.color} backdrop-blur-sm shadow-[0_0_15px_rgba(0,0,0,0.2)]`}
                style={{ top: zone.top, left: zone.left, width: zone.width, height: zone.height }}
                onMouseEnter={() => setActiveZone(zone)}
                onMouseLeave={() => setActiveZone(null)}
              >
                <span className="material-symbols-outlined text-3xl opacity-70 group-hover:opacity-100 group-hover:scale-125 transition-all">{zone.icon}</span>
                
                {/* Mobile tap indicator */}
                <div className="absolute -bottom-6 text-[10px] font-bold text-on-surface tracking-wider uppercase opacity-0 md:group-hover:opacity-100 transition-opacity whitespace-nowrap bg-surface-container/80 px-2 rounded backdrop-blur-md">
                  {zone.name}
                </div>
              </div>
            ))}

            {/* Popup Card */}
            <div className={`absolute bottom-6 left-6 right-6 md:left-auto md:right-6 md:top-6 md:bottom-auto md:w-72 glass-card p-4 rounded-2xl border border-primary/30 shadow-[0_10px_30px_rgba(0,0,0,0.5)] transition-all duration-500 ease-out transform ${activeZone ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-10 opacity-0 scale-95 pointer-events-none'}`}>
              {activeZone && (
                <>
                  <div className="flex items-center gap-3 mb-2">
                    <span className="material-symbols-outlined text-primary text-2xl">{activeZone.icon}</span>
                    <h4 className="font-bold text-on-surface text-lg">{activeZone.name}</h4>
                  </div>
                  <p className="text-sm text-on-surface-variant leading-relaxed">
                    {activeZone.desc}
                  </p>
                </>
              )}
            </div>
            
          </div>
        </div>

      </div>
    </section>
  );
}

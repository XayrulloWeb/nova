import React from 'react';

export default function Schedule() {
  const schedule = [
    { time: '08:00 - 09:00', name: 'NONUSHTA' },
    { time: '09:00 - 09:45', name: '1-DARS' },
    { time: '09:45 - 09:50', name: 'TANAFFUS' },
    { time: '09:50 - 10:35', name: '2-DARS' },
    { time: '10:35 - 10:40', name: 'TANAFFUS' },
    { time: '10:40 - 11:25', name: '3-DARS' },
    { time: '11:25 - 11:30', name: 'TANAFFUS' },
    { time: '11:30 - 12:15', name: '4-DARS' },
    { time: '12:15 - 12:45', name: '1-4 SINFLARGA TUSHLIK, 5-7 SINFLARGA TANAFFUS' },
    { time: '12:45 - 13:15', name: 'UYGA VAZIFA' },
    { time: '13:15 - 13:45', name: '1-4 SINFLARGA TANAFFUS, 5-7 SINFLARGA TUSHLIK' },
    { time: '13:45 - 14:30', name: '5-DARS' },
    { time: '14:30 - 14:45', name: '1-4 SINFLARGA COFFEE BREAK, 5-7 SINFLARGA TANAFFUS' },
    { time: '14:45 - 15:30', name: '6-DARS' },
    { time: '15:30 - 15:45', name: '1-4 SINFLARGA TANAFFUS, 5-7 SINFLARGA COFFEE BREAK' },
    { time: '15:45 - 16:30', name: '7-DARS' },
    { time: '16:30 - 16:35', name: 'TANAFFUS' },
    { time: '16:35 - 17:20', name: 'TO\'GARAKLAR' },
  ];

  return (
    <section className="py-24 px-margin-mobile md:px-margin-desktop bg-surface-container-lowest">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-4 mb-12">
          <span className="material-symbols-outlined text-4xl text-primary">schedule</span>
          <h2 className="text-[32px] md:text-headline-lg font-bold text-on-surface">Dars jadvali (Qo'ng'iroqlar)</h2>
        </div>
        <div className="glass-card rounded-3xl overflow-hidden">
          {schedule.map((item, idx) => (
            <div key={idx} className={`flex flex-col sm:flex-row sm:items-center justify-between p-6 ${idx !== schedule.length - 1 ? 'border-b border-outline/10' : ''} hover:bg-primary/5 transition-colors`}>
              <span className="font-label-caps text-primary tracking-widest text-lg mb-2 sm:mb-0">{item.time}</span>
              <span className="text-on-surface font-bold text-lg">{item.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

export default function DashboardModal({ isOpen, onClose }) {
  const [animate, setAnimate] = useState(false);
  const { t } = useTranslation();

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => setAnimate(true), 100);
      // Lock scroll
      document.body.style.overflow = 'hidden';
    } else {
      setAnimate(false);
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; }
  }, [isOpen]);

  if (!isOpen) return null;

  const subjects = [
    { name: 'Matematika', grade: 95, color: 'bg-primary' },
    { name: 'Fizika', grade: 88, color: 'bg-primary-container' },
    { name: 'Ingliz tili', grade: 100, color: 'bg-surface-tint' },
    { name: 'Tarix', grade: 92, color: 'bg-outline' },
  ];

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
      {/* Backdrop */}
      <div 
        className={`absolute inset-0 bg-background/80 backdrop-blur-sm transition-opacity duration-500 ${animate ? 'opacity-100' : 'opacity-0'}`}
        onClick={onClose}
      ></div>

      {/* Modal Content */}
      <div className={`relative w-full max-w-6xl h-[85vh] bg-surface-container-lowest border border-outline/20 rounded-3xl shadow-[0_0_50px_rgba(0,0,0,0.5)] flex flex-col md:flex-row overflow-hidden transition-all duration-700 ease-out transform ${animate ? 'translate-y-0 scale-100 opacity-100' : 'translate-y-10 scale-95 opacity-0'}`}>
        
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 z-50 w-10 h-10 bg-surface-container rounded-full flex items-center justify-center text-on-surface hover:bg-primary hover:text-on-primary transition-colors"
        >
          <span className="material-symbols-outlined">close</span>
        </button>

        {/* Sidebar */}
        <div className="hidden md:flex flex-col w-64 bg-surface-container-low border-r border-outline/10 p-6">
          <div className="flex items-center gap-3 mb-10">
            <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-on-primary font-bold">N</div>
            <div className="font-bold tracking-widest text-primary">NOVA EDU</div>
          </div>

          <div className="flex flex-col items-center mb-10">
            <div className="w-20 h-20 rounded-full bg-surface-container-highest border-2 border-primary overflow-hidden mb-3">
              <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix&backgroundColor=b6e3f4" alt="Student" className="w-full h-full object-cover" />
            </div>
            <h3 className="font-bold text-on-surface">Azizjon Karimow</h3>
            <p className="text-xs text-on-surface-variant">8-"B" sinf o'quvchisi</p>
          </div>

          <nav className="flex flex-col gap-2 flex-grow">
            {['Asosiy paneli', 'Baholar', 'Dars jadvali', 'Uy vazifalari', 'O\'qituvchilar'].map((item, i) => (
              <button key={i} className={`text-left px-4 py-3 rounded-xl transition-colors text-sm font-semibold ${i === 0 ? 'bg-primary/10 text-primary' : 'text-on-surface hover:bg-surface-container'}`}>
                {item}
              </button>
            ))}
          </nav>
        </div>

        {/* Main Dashboard Area */}
        <div className="flex-1 overflow-y-auto p-6 md:p-10 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary/5 via-transparent to-transparent">
          <header className="mb-8">
            <h1 className="text-3xl font-bold text-on-surface mb-2">{t('admin.welcome', { name: 'Azizjon' })}</h1>
            <p className="text-on-surface-variant">Bugun 24-sentabr, Chorshanba. O'qishlaringizga omad tilaymiz.</p>
          </header>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* Grades Chart Card */}
            <div className="lg:col-span-2 glass-card rounded-3xl p-6 relative overflow-hidden group">
              <div className="absolute -right-20 -top-20 w-40 h-40 bg-primary/10 rounded-full blur-3xl group-hover:bg-primary/20 transition-all duration-700"></div>
              
              <h2 className="text-xl font-bold text-on-surface mb-6">Joriy chorak baholari</h2>
              
              <div className="space-y-6">
                {subjects.map((sub, i) => (
                  <div key={i} className="relative">
                    <div className="flex justify-between text-sm font-semibold mb-2">
                      <span className="text-on-surface-variant">{sub.name}</span>
                      <span className="text-primary">{sub.grade}%</span>
                    </div>
                    <div className="h-3 w-full bg-surface-container-highest rounded-full overflow-hidden">
                      <div 
                        className={`h-full ${sub.color} rounded-full transition-all duration-1000 ease-out`}
                        style={{ width: animate ? `${sub.grade}%` : '0%', transitionDelay: `${i * 150}ms` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Upcoming Schedule Card */}
            <div className="glass-card rounded-3xl p-6">
              <h2 className="text-xl font-bold text-on-surface mb-6">Bugungi darslar</h2>
              <div className="space-y-4">
                {[
                  { time: '09:00', name: 'Algebra', room: 'Xona 101' },
                  { time: '09:50', name: 'Fizika', room: 'Laboratoriya 2' },
                  { time: '10:40', name: 'Ingliz tili', room: 'Xona 204' },
                  { time: '11:30', name: 'Informatika', room: 'IT Markaz' },
                ].map((lesson, i) => (
                  <div key={i} className="flex items-start gap-4 p-3 rounded-2xl bg-surface-container-low border border-outline/5 hover:border-primary/20 transition-colors">
                    <div className="text-primary font-bold text-sm w-12 pt-1">{lesson.time}</div>
                    <div>
                      <div className="font-bold text-on-surface">{lesson.name}</div>
                      <div className="text-xs text-on-surface-variant">{lesson.room}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Homeworks Card */}
            <div className="lg:col-span-3 glass-card rounded-3xl p-6 mt-2">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-on-surface">Yaqinlashayotgan vazifalar</h2>
                <button className="text-sm text-primary hover:underline">Barchasini ko'rish</button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {[
                  { title: 'Algebra', desc: 'Nyuton binomi bo\'yicha 10 ta misol yechish', deadline: 'Ertaga, 08:00', status: 'pending' },
                  { title: 'Fizika', desc: 'Kinetik energiya mavzusiga konspekt', deadline: '2 kun qoldi', status: 'done' },
                  { title: 'Ingliz tili', desc: 'Essay: "Mening kelajagim"', deadline: 'Juma, 23:59', status: 'pending' }
                ].map((hw, i) => (
                  <div key={i} className={`p-5 rounded-2xl border ${hw.status === 'done' ? 'bg-surface-container border-outline/10 opacity-70' : 'bg-surface-container-highest border-primary/20 shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)]'}`}>
                    <div className="flex justify-between items-start mb-2">
                      <span className="text-xs font-label-caps uppercase tracking-widest text-primary">{hw.title}</span>
                      {hw.status === 'done' && <span className="material-symbols-outlined text-green-500 text-sm">check_circle</span>}
                    </div>
                    <p className="text-sm text-on-surface font-semibold mb-4">{hw.desc}</p>
                    <div className="text-xs text-on-surface-variant flex items-center gap-1">
                      <span className="material-symbols-outlined text-[14px]">schedule</span> {hw.deadline}
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}

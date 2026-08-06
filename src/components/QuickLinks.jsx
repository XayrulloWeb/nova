import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export default function QuickLinks() {
  const { t } = useTranslation();
  const links = [
    { title: t('quicklinks.schedule'), icon: 'calendar_today', path: '/students' },
    { title: t('quicklinks.grades'), icon: 'grade', path: '/parents' },
    { title: t('quicklinks.meals'), icon: 'restaurant', path: '/parents' },
    { title: t('quicklinks.docs'), icon: 'description', path: '/about' },
  ];

  return (
    <div className="bg-surface-container py-12 relative z-20 border-y border-outline/10">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {links.map((link, i) => (
            <Link 
              key={i} 
              to={link.path}
              className="group flex flex-col md:flex-row items-center gap-4 p-6 rounded-2xl glass-panel hover:bg-white/5 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 border border-transparent hover:border-outline/20 relative overflow-hidden"
            >
              {/* Soon Badge */}
              <div className="absolute top-2 right-[-20px] bg-primary text-on-primary text-[10px] font-bold px-6 py-1 transform rotate-45 shadow-md">
                {t('quicklinks.soon', 'Скоро')}
              </div>

              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary group-hover:scale-110 group-hover:bg-primary group-hover:text-on-primary transition-all duration-300">
                <span className="material-symbols-outlined text-2xl">{link.icon}</span>
              </div>
              <span className="font-semibold text-on-surface group-hover:text-primary transition-colors tracking-wide z-10">{link.title}</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

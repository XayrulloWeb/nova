import React from 'react';
import { useTranslation } from 'react-i18next';

export default function CampusPreview() {
  const { t } = useTranslation();
  return (
    <div className="py-16 bg-background relative z-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mb-10 text-center">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-on-surface">{t('campus.title')}</h2>
          <p className="mt-4 text-lg text-on-surface-variant max-w-2xl mx-auto">
            {t('campus.subtitle')}
          </p>
        </div>

        <div className="relative rounded-3xl overflow-hidden shadow-2xl h-[400px] md:h-[650px] group">
          {/* ВАЖНО: Тебе нужно сохранить фото под именем school-field.jpg в папку public */}
          <img 
            src="/school-field.jpg" 
            alt="School Campus" 
            className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
            onError={(e) => {
              e.target.src = "https://images.unsplash.com/photo-1575361204412-811ccececfb9?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"; // Fallback image just in case
            }}
          />

          {/* Лейбл "Скоро" над газоном */}
          <div className="absolute top-[40%] left-8 md:left-24 z-10 animate-bounce">
            <div className="backdrop-blur-md bg-white/20 border-2 border-white/40 shadow-lg px-6 py-2 rounded-full flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-green-400 animate-pulse"></span>
              <span className="text-white font-bold tracking-widest uppercase text-sm md:text-base drop-shadow-md">
                {t('campus.comingSoon')}
              </span>
            </div>
          </div>

          {/* Тот самый блок с Glassmorphism в правом нижнем углу! */}
          <div className="absolute bottom-4 right-4 md:bottom-8 md:right-8 z-10 w-[90%] md:w-auto max-w-md">
            <div className="backdrop-blur-[16px] bg-white/10 border border-white/30 shadow-[0_8px_32px_0_rgba(0,0,0,0.3)] p-6 md:p-8 rounded-3xl text-white">
              
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center border border-green-500/30">
                  <span className="material-symbols-outlined text-green-400">sports_soccer</span>
                </div>
                <h3 className="text-xl md:text-2xl font-bold tracking-wide drop-shadow-md">{t('campus.sportsField')}</h3>
              </div>
              
              <p className="text-sm md:text-base text-gray-100 leading-relaxed mb-6 drop-shadow-sm font-medium">
                {t('campus.sportsFieldDesc')}
              </p>
              
              <div className="flex flex-wrap gap-2 text-xs md:text-sm font-semibold">
                <span className="bg-black/20 backdrop-blur-md text-white py-1.5 px-4 rounded-full border border-white/20 shadow-inner">
                  {t('campus.size')}
                </span>
                <span className="bg-white/20 backdrop-blur-md text-white py-1.5 px-4 rounded-full border border-white/30 shadow-inner">
                  {t('campus.parking')}
                </span>
              </div>

            </div>
          </div>
          
          {/* Легкий градиент снизу, чтобы текст на белом фоне асфальта читался еще лучше */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none"></div>
        </div>
      </div>
    </div>
  );
}

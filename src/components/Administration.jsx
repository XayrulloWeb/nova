import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

export default function Administration() {
  const [admins, setAdmins] = useState([]);
  const { t, i18n } = useTranslation();
  const lang = i18n.language?.startsWith('uz') ? 'uz' : 'ru';

  useEffect(() => {
    fetch('/api/public/administration')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) setAdmins(data);
        else if (data && Array.isArray(data.data)) setAdmins(data.data);
        else setAdmins([]);
      })
      .catch(err => console.error(err));
  }, []);

  return (
    <section className="py-24 px-margin-mobile md:px-margin-desktop bg-surface-container-lowest border-y border-outline/10 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-primary-container/5 rounded-full blur-[120px] translate-y-1/2 -translate-x-1/4 pointer-events-none"></div>

      <div className="max-w-[1400px] mx-auto relative z-10">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/20 bg-primary/5 text-primary mb-6 font-label-caps text-xs tracking-widest uppercase">
            <span className="material-symbols-outlined text-sm">stars</span>
            {t('administration.title')}
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-on-surface tracking-tight">
            {t('administration.desc')}
          </h2>
        </div>
        
        {admins.length === 0 ? (
          <p className="text-on-surface-variant text-center text-lg">
            {t('administration.empty')}
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
            {admins.map((admin) => (
              <Link 
                to={`/administration/${admin.id}`}
                key={admin.id} 
                className="group relative h-[450px] md:h-[550px] rounded-[2rem] overflow-hidden cursor-pointer block"
              >
                {/* Image Background */}
                {admin.image_url ? (
                  <img 
                    src={`${admin.image_url}`} 
                    alt={admin[`name_${lang}`]} 
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                  />
                ) : (
                  <div className="absolute inset-0 w-full h-full bg-surface-container-highest flex items-center justify-center transition-transform duration-700 group-hover:scale-110">
                    <span className="material-symbols-outlined text-8xl text-on-surface-variant/30">person</span>
                  </div>
                )}
                
                {/* Gradient Overlays */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-500"></div>
                <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 mix-blend-overlay transition-opacity duration-500"></div>
                
                {/* Content Container */}
                <div className="absolute inset-0 p-8 flex flex-col justify-end transform transition-transform duration-500">
                  
                  {/* Role Badge */}
                  <div className="mb-4 transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 delay-100">
                    <span className="inline-block px-4 py-1.5 bg-primary/20 backdrop-blur-md border border-primary/30 text-primary-fixed rounded-full text-xs font-bold tracking-widest uppercase">
                      {admin[`role_${lang}`]}
                    </span>
                  </div>

                  {/* Name */}
                  <h3 className="text-2xl md:text-3xl font-bold text-white mb-2 leading-tight transform transition-transform duration-500 group-hover:-translate-y-2">
                    {admin[`name_${lang}`]}
                  </h3>
                  
                  {/* Role (Visible by default) */}
                  <p className="text-primary-fixed/80 font-medium text-sm md:text-base transform transition-all duration-500 group-hover:opacity-0 group-hover:translate-y-4 absolute bottom-8">
                    {admin[`role_${lang}`]}
                  </p>

                  {/* View Profile Prompt (Visible on hover) */}
                  <div className="h-0 opacity-0 overflow-hidden group-hover:h-auto group-hover:opacity-100 transition-all duration-500 delay-200 mt-2">
                    <span className="inline-flex items-center gap-2 text-white font-bold text-sm bg-white/10 px-4 py-2 rounded-full border border-white/20 backdrop-blur-sm">
                      {lang === 'uz' ? 'Profilni ko\'rish' : 'Смотреть профиль'}
                      <span className="material-symbols-outlined text-sm">arrow_forward</span>
                    </span>
                  </div>
                  
                </div>
                
                {/* Border highlight effect on hover */}
                <div className="absolute inset-0 rounded-[2rem] border-2 border-primary/0 group-hover:border-primary/50 transition-colors duration-500 pointer-events-none"></div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

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
        <div className="text-center mb-16 md:mb-24">
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
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-12 md:gap-16">
            {admins.map((admin) => (
              <Link 
                to={`/administration/${admin.id}`}
                key={admin.id} 
                className="group flex flex-col items-center text-center cursor-pointer"
              >
                {/* Circular Image */}
                <div className="w-56 h-56 md:w-64 md:h-64 rounded-full overflow-hidden bg-surface-container shadow-sm border border-outline/10 mb-6 transition-all duration-500 group-hover:shadow-2xl group-hover:scale-105 group-hover:border-primary/30 relative">
                  {admin.image_url ? (
                    <img 
                      src={`${admin.image_url}`} 
                      alt={admin[`name_${lang}`]} 
                      className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-110" 
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-primary/10 via-secondary/10 to-tertiary/10 flex items-center justify-center">
                      <span className="material-symbols-outlined text-6xl text-primary/30">person</span>
                    </div>
                  )}
                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>

                {/* Info */}
                <h3 className="text-2xl font-bold text-on-surface mb-2 group-hover:text-primary transition-colors duration-300">
                  {admin[`name_${lang}`]}
                </h3>
                
                <p className="text-primary font-bold text-sm tracking-widest uppercase mb-4">
                  {admin[`role_${lang}`]}
                </p>

                {/* Animated Arrow */}
                <div className="w-10 h-10 rounded-full border border-outline/20 flex items-center justify-center group-hover:bg-primary group-hover:text-primary-on group-hover:border-primary transition-all duration-300">
                  <span className="material-symbols-outlined text-lg">arrow_forward</span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

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
                className="group relative h-[450px] md:h-[550px] rounded-[2rem] overflow-hidden cursor-pointer block bg-white border border-outline/10 shadow-sm hover:shadow-xl transition-all duration-500"
              >
                {/* Image Background */}
                <div className="absolute inset-0 h-[80%] rounded-b-[2rem] overflow-hidden">
                  {admin.image_url ? (
                    <img 
                      src={`${admin.image_url}`} 
                      alt={admin[`name_${lang}`]} 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 object-top" 
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-primary/10 via-secondary/10 to-tertiary/10 flex items-center justify-center transition-transform duration-700 group-hover:scale-110">
                      <div className="w-32 h-32 rounded-full bg-white/40 backdrop-blur-md flex items-center justify-center border border-white/50 shadow-sm">
                        <span className="material-symbols-outlined text-6xl text-primary/50">school</span>
                      </div>
                    </div>
                  )}
                  {/* Subtle dark gradient overlay for contrast if needed, but keeping it light */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                </div>

                {/* Floating Info Card */}
                <div className="absolute bottom-4 left-4 right-4 bg-white/90 backdrop-blur-xl border border-white/50 shadow-lg rounded-[1.5rem] p-6 transform transition-transform duration-500 group-hover:-translate-y-2">
                  
                  {/* Name */}
                  <h3 className="text-xl md:text-2xl font-black text-on-surface mb-1 leading-tight line-clamp-2">
                    {admin[`name_${lang}`]}
                  </h3>
                  
                  {/* Role */}
                  <p className="text-primary font-bold text-sm tracking-wide uppercase">
                    {admin[`role_${lang}`]}
                  </p>

                  {/* Hidden Content (Revealed on hover) */}
                  <div className="h-0 opacity-0 overflow-hidden group-hover:h-auto group-hover:opacity-100 group-hover:mt-4 transition-all duration-500 ease-out">
                    <span className="inline-flex items-center justify-center w-full gap-2 text-white font-bold text-sm bg-primary px-4 py-3 rounded-xl shadow-md hover:bg-primary-container hover:text-primary-on transition-colors">
                      {lang === 'uz' ? 'Profilni ko\'rish' : 'Смотреть профиль'}
                      <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                    </span>
                  </div>
                  
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

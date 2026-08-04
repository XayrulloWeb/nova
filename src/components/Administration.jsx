import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

export default function Administration() {
  const [admins, setAdmins] = useState([]);
  const { i18n, t } = useTranslation();
  const lang = i18n.language.startsWith('uz') ? 'uz' : 'ru';

  useEffect(() => {
    fetch('http://localhost:5000/api/public/administration')
      .then(res => res.json())
      .then(data => setAdmins(data))
      .catch(err => console.error(err));
  }, []);

  return (
    <section className="py-24 px-margin-mobile md:px-margin-desktop bg-surface-container-lowest border-y border-outline/10">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-[32px] md:text-headline-lg font-bold text-on-surface mb-12 text-center">
          {i18n.language.startsWith('uz') ? 'Maktab ma\'muriyati' : 'Администрация школы'}
        </h2>
        
        {admins.length === 0 ? (
          <p className="text-on-surface-variant text-center">
            {i18n.language.startsWith('uz') ? 'Ma\'muriyat ro\'yxati bo\'sh.' : 'Список администрации пуст.'}
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {admins.map((admin) => (
              <div key={admin.id} className="glass-card rounded-3xl p-8 flex flex-col items-center text-center hover:scale-[1.02] transition-transform">
                {admin.image_url ? (
                  <img src={`http://localhost:5000${admin.image_url}`} alt={admin[`name_${lang}`]} className="w-32 h-32 rounded-full object-cover mb-6 border-4 border-primary/20" />
                ) : (
                  <div className="w-32 h-32 rounded-full mb-6 border-4 border-primary/20 bg-surface-container-high flex items-center justify-center">
                    <span className="material-symbols-outlined text-4xl text-on-surface-variant">person</span>
                  </div>
                )}
                <div className="text-primary font-label-caps text-xs tracking-widest mb-2">{admin[`role_${lang}`]}</div>
                <h3 className="text-2xl font-bold text-on-surface mb-3">{admin[`name_${lang}`]}</h3>
                <p className="text-sm text-on-surface-variant">{admin[`desc_${lang}`]}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

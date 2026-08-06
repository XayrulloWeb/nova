import React from 'react';
import { useTranslation } from 'react-i18next';

export default function ContactsMap() {
  const { t, i18n } = useTranslation();

  return (
    <section className="py-24 px-margin-mobile md:px-margin-desktop bg-surface-container">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        
        {/* Contact Info */}
        <div className="lg:col-span-4">
          <h2 className="text-[32px] md:text-headline-lg font-bold text-on-surface mb-8">{t('contactsMap.title')}</h2>
          <div className="space-y-6 mb-12">
            <div className="flex items-start gap-4">
              <span className="material-symbols-outlined text-primary text-3xl">location_on</span>
              <div>
                <h3 className="font-bold text-on-surface">{t('contactsMap.address')}</h3>
                <p className="text-on-surface-variant">{t('contactsMap.addressValue')}</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <span className="material-symbols-outlined text-primary text-3xl">call</span>
              <div>
                <h3 className="font-bold text-on-surface">{t('contactsMap.phone')}</h3>
                <p className="text-on-surface-variant">+998 71 200 00 00</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <span className="material-symbols-outlined text-primary text-3xl">mail</span>
              <div>
                <h3 className="font-bold text-on-surface">{t('contactsMap.email')}</h3>
                <p className="text-on-surface-variant">info@novaschool.uz</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <span className="material-symbols-outlined text-primary text-3xl">schedule</span>
              <div>
                <h3 className="font-bold text-on-surface">{t('contactsMap.hours')}</h3>
                <p className="text-on-surface-variant whitespace-pre-line">{t('contactsMap.hoursValue')}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Interactive Map - Premium 21st.dev Style */}
        <div className="lg:col-span-8 p-1 rounded-3xl bg-gradient-to-br from-outline/20 to-transparent relative group">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 blur-xl rounded-3xl"></div>
          
          <div className="bg-[#0a0a0c] p-6 md:p-8 rounded-[23px] h-[500px] flex flex-col relative overflow-hidden border border-outline/10 shadow-2xl">
            
            <div className="relative z-20 flex justify-between items-end mb-6">
              <div>
                <h3 className="text-2xl font-bold text-white mb-1 flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary">public</span>
                  {i18n.language?.startsWith('uz') ? 'Xaritada bizni toping' : 'Мы на карте'}
                </h3>
                <p className="text-sm text-on-surface-variant max-w-md">
                  {i18n.language?.startsWith('uz') ? 'Urganch shahri, Xorazm viloyati' : 'г. Ургенч, Хорезмская область'}
                </p>
              </div>
            </div>
            
            <div className="relative flex-grow rounded-2xl overflow-hidden bg-[#111113] border border-white/5">
              <iframe 
                src="https://maps.google.com/maps?q=Urgench,%20Uzbekistan&t=&z=13&ie=UTF8&iwloc=&output=embed" 
                width="100%" 
                height="100%" 
                frameBorder="0" 
                style={{ border: 0, filter: 'invert(90%) hue-rotate(180deg) grayscale(20%)' }}
                allowFullScreen="" 
                aria-hidden="false" 
                tabIndex="0"
                className="absolute inset-0 w-full h-full opacity-80 hover:opacity-100 transition-opacity duration-500"
              ></iframe>
            </div>
          </div>
        </div>

      </div>
              

    </section>
  );
}

import React from 'react';
import { useTranslation } from 'react-i18next';

export default function Extracurriculars() {
  const { t } = useTranslation();

  const activities = [
    {
      id: 'sports',
      icon: 'sports_soccer',
      title: t('students.sportsTitle'),
      items: [
        t('students.sports1'), t('students.sports2'), t('students.sports3'),
        t('students.sports4'), t('students.sports5'), t('students.sports6')
      ],
      image: 'https://images.unsplash.com/photo-1526232761682-d26e03ac148e?w=800&q=80',
      bgColor: 'bg-[#eef5fa]',
      textColor: 'text-[#1e619c]',
      iconBg: 'bg-white text-[#7359b8]' // Like the purple ball in screenshot
    },
    {
      id: 'parents',
      icon: 'psychology',
      title: t('students.parentsTitle'),
      items: [
        t('students.parents1'), t('students.parents2'), t('students.parents3')
      ],
      image: 'https://images.unsplash.com/photo-1573164713988-8665fc963095?w=800&q=80',
      bgColor: 'bg-[#fdf7e8]',
      textColor: 'text-[#e69f00]',
      iconBg: 'bg-white text-[#29a55f]' // Green psy icon
    },
    {
      id: 'culture',
      icon: 'account_balance',
      title: t('students.cultureTitle'),
      items: [
        t('students.culture1'), t('students.culture2')
      ],
      image: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=800&q=80',
      bgColor: 'bg-[#f5eeff]',
      textColor: 'text-[#7359b8]',
      iconBg: 'bg-white text-[#f6b93b]' // Yellow vase icon
    }
  ];

  return (
    <section className="py-24 px-margin-mobile md:px-margin-desktop bg-white">
      <div className="max-w-[1400px] mx-auto">
        
        {/* Header */}
        <div className="text-center mb-20 relative">
          <h2 className="text-4xl md:text-5xl font-black text-on-surface tracking-tight z-10 relative">
            {t('students.extraTitle')}
          </h2>
          {/* Subtle squiggly decoration underneath */}
          <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-primary opacity-50">
             <svg width="120" height="20" viewBox="0 0 120 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M0 10C10 10 10 0 20 0C30 0 30 10 40 10C50 10 50 0 60 0C70 0 70 10 80 10C90 10 90 0 100 0C110 0 110 10 120 10" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
             </svg>
          </div>
        </div>

        {/* Clean Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mt-12">
          {activities.map((activity, idx) => (
            <div 
              key={activity.id}
              className={`relative rounded-[2rem] overflow-visible ${activity.bgColor} flex flex-col h-[600px] shadow-sm hover:shadow-lg transition-shadow duration-300`}
            >
              {/* Floating Badge (Half outside) */}
              <div className={`absolute -top-6 -left-2 w-16 h-16 rounded-full ${activity.iconBg} shadow-md flex items-center justify-center border-4 border-white z-20`}>
                <span className="material-symbols-outlined text-3xl font-bold">
                  {activity.icon}
                </span>
              </div>
              
              {/* Content Box */}
              <div className="px-8 pt-16 pb-8 flex-grow flex flex-col">
                <h3 className={`text-2xl font-black mb-6 ${activity.textColor}`}>
                  {activity.title}
                </h3>

                <ul className="flex flex-col gap-4">
                  {activity.items.map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span className="w-1.5 h-1.5 rounded-full bg-on-surface-variant/70 mt-2.5 flex-shrink-0"></span>
                      <span className="text-on-surface-variant font-medium text-[15px] leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Bottom Image (Fixed at bottom) */}
              <div className="h-48 w-full mt-auto p-4">
                <div className="w-full h-full rounded-2xl overflow-hidden shadow-sm">
                  <img 
                    src={activity.image} 
                    alt={activity.title} 
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

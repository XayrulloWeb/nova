import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';

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
      gradient: 'from-blue-500/20 to-cyan-500/10',
      iconColor: 'text-blue-500',
      colSpan: 'md:col-span-4'
    },
    {
      id: 'parents',
      icon: 'psychology',
      title: t('students.parentsTitle'),
      items: [
        t('students.parents1'), t('students.parents2'), t('students.parents3')
      ],
      image: 'https://images.unsplash.com/photo-1573164713988-8665fc963095?w=800&q=80',
      gradient: 'from-orange-500/20 to-yellow-500/10',
      iconColor: 'text-orange-500',
      colSpan: 'md:col-span-4'
    },
    {
      id: 'culture',
      icon: 'account_balance',
      title: t('students.cultureTitle'),
      items: [
        t('students.culture1'), t('students.culture2')
      ],
      image: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=800&q=80',
      gradient: 'from-purple-500/20 to-pink-500/10',
      iconColor: 'text-purple-500',
      colSpan: 'md:col-span-4'
    }
  ];

  return (
    <section className="py-16 md:py-24 px-margin-mobile md:px-margin-desktop bg-surface-container-lowest">
      <div className="max-w-[1400px] mx-auto">
        
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-on-surface tracking-tight mb-4">
            {t('students.extraTitle')}
          </h2>
          <div className="w-32 h-1 bg-gradient-to-r from-transparent via-primary/50 to-transparent mx-auto"></div>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {activities.map((activity, idx) => (
            <motion.div 
              key={activity.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              className={`group relative rounded-[2rem] overflow-hidden bg-surface-container-highest border border-outline/10 ${activity.colSpan} h-[450px] shadow-sm hover:shadow-2xl transition-all duration-500 cursor-default`}
            >
              {/* Top Gradient Area */}
              <div className={`absolute top-0 left-0 right-0 h-48 bg-gradient-to-b ${activity.gradient} opacity-50`}></div>
              
              {/* Content Wrapper */}
              <div className="absolute inset-0 p-8 flex flex-col z-20">
                {/* Icon Badge */}
                <div className={`w-16 h-16 rounded-2xl bg-white shadow-sm border border-outline/10 flex items-center justify-center mb-6 transform transition-transform duration-500 group-hover:-translate-y-2 group-hover:scale-110`}>
                  <span className={`material-symbols-outlined text-3xl ${activity.iconColor}`}>
                    {activity.icon}
                  </span>
                </div>

                <h3 className={`text-2xl font-bold text-on-surface mb-6 leading-tight`}>
                  {activity.title}
                </h3>

                <ul className="flex flex-col gap-3">
                  {activity.items.map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span className={`material-symbols-outlined text-[20px] mt-0.5 ${activity.iconColor}`}>fiber_manual_record</span>
                      <span className="text-on-surface-variant font-medium text-sm md:text-base leading-snug">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Bottom Image Reveal */}
              <div className="absolute bottom-0 left-0 right-0 h-40 translate-y-full opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 z-30">
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10"></div>
                <img 
                  src={activity.image} 
                  alt={activity.title} 
                  className="w-full h-full object-cover"
                />
              </div>

            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}

import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';

export default function SchoolHistory() {
  const { t } = useTranslation();

  const infoCards = [
    { 
      id: 'founders', 
      icon: 'account_balance', 
      label: t('history.foundersLabel'), 
      value: t('history.foundersValue'),
      gradient: 'from-blue-500/20 to-purple-500/20',
      iconColor: 'text-blue-500'
    },
    { 
      id: 'hours', 
      icon: 'schedule', 
      label: t('history.hoursLabel'), 
      value: t('history.hoursValue'),
      gradient: 'from-emerald-500/20 to-teal-500/20',
      iconColor: 'text-emerald-500'
    },
    { 
      id: 'langs', 
      icon: 'language', 
      label: t('history.langsLabel'), 
      value: t('history.langsValue'),
      gradient: 'from-orange-500/20 to-amber-500/20',
      iconColor: 'text-orange-500'
    },
    { 
      id: 'infra', 
      icon: 'architecture', 
      label: t('history.infraLabel'), 
      value: t('history.infraValue'),
      gradient: 'from-pink-500/20 to-rose-500/20',
      iconColor: 'text-pink-500'
    }
  ];

  return (
    <section className="py-24 px-margin-mobile md:px-margin-desktop bg-surface-container overflow-hidden">
      <div className="max-w-[1200px] mx-auto">
        
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center md:text-left flex flex-col md:flex-row md:items-end justify-between gap-8"
        >
          <div className="max-w-2xl mx-auto md:mx-0">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary font-label-caps text-xs mb-4 uppercase tracking-widest border border-primary/20">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
              NOVA AI School
            </div>
            <h2 className="text-[40px] md:text-headline-lg font-extrabold text-on-surface mb-6 tracking-tighter leading-tight">
              {t('history.title')}
            </h2>
          </div>
          <p className="text-body-lg text-on-surface-variant max-w-xl mx-auto md:mx-0 whitespace-pre-line leading-relaxed text-lg pb-2 text-center md:text-right">
            {t('history.desc')}
          </p>
        </motion.div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {infoCards.map((card, index) => (
            <motion.div 
              key={card.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative h-[320px] rounded-[2rem] overflow-hidden bg-surface-container-highest border border-outline-variant/30 cursor-pointer shadow-sm hover:shadow-2xl transition-shadow duration-500"
            >
              {/* Background Gradient */}
              <div className={`absolute inset-0 bg-gradient-to-br ${card.gradient} opacity-30 group-hover:opacity-100 transition-opacity duration-700`}></div>
              
              {/* Glass Overlay */}
              <div className="absolute inset-0 bg-surface-container-highest/60 backdrop-blur-3xl"></div>

              {/* Default State (Giant Icon) */}
              <div className="absolute inset-0 flex flex-col items-center justify-center p-8 transition-transform duration-500 group-hover:-translate-y-8">
                <span className={`material-symbols-outlined text-[80px] mb-4 ${card.iconColor} drop-shadow-lg transition-transform duration-500 group-hover:scale-75 group-hover:opacity-50`}>
                  {card.icon}
                </span>
                <h3 className="font-bold text-2xl text-on-surface tracking-tight text-center">
                  {card.label}
                </h3>
              </div>

              {/* Hover Reveal State (Text slides up) */}
              <div className="absolute inset-x-0 bottom-0 p-8 pt-0 flex flex-col justify-end translate-y-full opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 ease-out">
                <div className="w-full h-[1px] bg-outline-variant/30 mb-6"></div>
                <p className="text-on-surface font-medium text-lg leading-relaxed text-center whitespace-pre-line">
                  {card.value}
                </p>
              </div>

            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}

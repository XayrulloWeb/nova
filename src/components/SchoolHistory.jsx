import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';

export default function SchoolHistory() {
  const { t } = useTranslation();

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
  };

  const infoCards = [
    { id: 'founders', icon: 'account_balance', label: t('history.foundersLabel'), value: t('history.foundersValue'), colSpan: "md:col-span-2" },
    { id: 'hours', icon: 'schedule', label: t('history.hoursLabel'), value: t('history.hoursValue'), colSpan: "md:col-span-1" },
    { id: 'langs', icon: 'language', label: t('history.langsLabel'), value: t('history.langsValue'), colSpan: "md:col-span-1" },
    { id: 'infra', icon: 'architecture', label: t('history.infraLabel'), value: t('history.infraValue'), colSpan: "md:col-span-2" }
  ];

  return (
    <section className="py-24 px-margin-mobile md:px-margin-desktop bg-surface-container overflow-hidden relative">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-primary/5 to-transparent pointer-events-none"></div>
      <div className="absolute -top-40 -right-40 w-96 h-96 bg-primary/10 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary font-label-caps text-xs mb-4 uppercase tracking-widest border border-primary/20">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
            NOVA AI School
          </div>
          <h2 className="text-[40px] md:text-headline-lg font-extrabold text-on-surface mb-6 tracking-tighter">
            {t('history.title')}
          </h2>
          <p className="text-body-lg text-on-surface-variant max-w-3xl whitespace-pre-line leading-relaxed text-lg">
            {t('history.desc')}
          </p>
        </motion.div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-4 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-50px" }}
        >
          {infoCards.map((card) => (
            <motion.div 
              key={card.id}
              variants={itemVariants}
              className={`group relative overflow-hidden p-8 rounded-3xl bg-surface-container-highest border border-outline-variant/30 hover:border-primary/40 transition-colors duration-500 shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)] hover:shadow-xl hover:shadow-primary/5 ${card.colSpan}`}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              <div className="relative z-10 flex flex-col h-full">
                <div className="w-12 h-12 rounded-2xl bg-surface-container flex items-center justify-center mb-6 shadow-sm border border-outline-variant/20 group-hover:scale-110 group-hover:bg-primary group-hover:text-on-primary transition-all duration-500 ease-out text-primary">
                  <span className="material-symbols-outlined text-2xl">{card.icon}</span>
                </div>
                
                <h3 className="font-label-caps text-on-surface-variant mb-2 text-xs uppercase tracking-widest">{card.label}</h3>
                <p className="text-on-surface font-semibold text-lg md:text-xl whitespace-pre-line leading-tight">
                  {card.value}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

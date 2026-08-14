import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';

export default function SchoolHistory() {
  const { t } = useTranslation();
  const [active, setActive] = useState(0);

  const infoCards = [
    { 
      id: 'founders', 
      icon: 'account_balance', 
      label: t('history.foundersLabel'), 
      value: t('history.foundersValue'),
      image: 'https://images.unsplash.com/photo-1577415124269-b9140d52d924?w=1200&q=80'
    },
    { 
      id: 'hours', 
      icon: 'schedule', 
      label: t('history.hoursLabel'), 
      value: t('history.hoursValue'),
      image: 'https://images.unsplash.com/photo-1501139083538-0139583c060f?w=1200&q=80'
    },
    { 
      id: 'langs', 
      icon: 'language', 
      label: t('history.langsLabel'), 
      value: t('history.langsValue'),
      image: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=1200&q=80'
    },
    { 
      id: 'infra', 
      icon: 'architecture', 
      label: t('history.infraLabel'), 
      value: t('history.infraValue'),
      image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=1200&q=80'
    }
  ];

  return (
    <section className="py-24 px-margin-mobile md:px-margin-desktop bg-surface-container overflow-hidden">
      <div className="max-w-[1600px] mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-8"
        >
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary font-label-caps text-xs mb-4 uppercase tracking-widest border border-primary/20">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
              NOVA AI School
            </div>
            <h2 className="text-[40px] md:text-headline-lg font-extrabold text-on-surface mb-6 tracking-tighter leading-tight">
              {t('history.title')}
            </h2>
          </div>
          <p className="text-body-lg text-on-surface-variant max-w-xl whitespace-pre-line leading-relaxed text-lg pb-2">
            {t('history.desc')}
          </p>
        </motion.div>

        <div className="flex flex-col lg:flex-row w-full h-[800px] lg:h-[600px] gap-4">
          {infoCards.map((card, index) => {
            const isActive = active === index;
            
            return (
              <motion.div 
                key={card.id}
                layout
                onMouseEnter={() => setActive(index)}
                onClick={() => setActive(index)}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ 
                  layout: { type: "spring", stiffness: 200, damping: 25 },
                  opacity: { duration: 0.5, delay: index * 0.1 }
                }}
                className={`relative overflow-hidden rounded-3xl cursor-pointer group flex-shrink-0 ${isActive ? 'lg:flex-grow-[3] flex-grow-[2]' : 'lg:flex-grow-[1] flex-grow-[1] lg:basis-[15%] basis-[15%]'}`}
              >
                {/* Background Image */}
                <img 
                  src={card.image} 
                  alt={card.label}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-110"
                />
                
                {/* Gradients for readability */}
                <div className={`absolute inset-0 bg-black transition-opacity duration-700 ${isActive ? 'opacity-40' : 'opacity-60 group-hover:opacity-50'}`}></div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent"></div>
                
                {/* Content */}
                <div className="absolute inset-0 p-6 md:p-8 flex flex-col justify-end">
                  <div className={`flex flex-col ${isActive ? 'h-full justify-end' : 'h-full justify-end lg:justify-start lg:items-center'}`}>
                    
                    {/* Icon */}
                    <motion.div 
                      layout
                      className={`flex items-center justify-center rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white ${isActive ? 'w-14 h-14 mb-6' : 'w-12 h-12 mb-4 lg:mb-0 lg:mt-4'}`}
                    >
                      <span className="material-symbols-outlined text-2xl">{card.icon}</span>
                    </motion.div>

                    {/* Text content */}
                    <motion.div layout className={`flex flex-col ${isActive ? 'items-start' : 'items-start lg:items-center'}`}>
                      <h3 className={`font-bold text-white leading-tight ${isActive ? 'text-2xl md:text-3xl mb-3' : 'text-lg md:text-xl lg:writing-vertical-rl lg:rotate-180 lg:mt-6'}`}>
                        {card.label}
                      </h3>
                      
                      {isActive && (
                        <motion.p 
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.2, duration: 0.4 }}
                          className="text-white/80 font-medium text-lg md:text-xl max-w-lg whitespace-pre-line"
                        >
                          {card.value}
                        </motion.p>
                      )}
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

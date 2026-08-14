import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';

export default function Scholarships() {
  const { t } = useTranslation();

  return (
    <section className="py-16 md:py-24 px-margin-mobile md:px-margin-desktop bg-surface-container relative overflow-hidden">
      <div className="max-w-[1400px] mx-auto relative z-10">
        
        {/* Header */}
        <div className="text-center mb-16 flex flex-col items-center">
          <div className="inline-flex items-center justify-center gap-2 px-4 py-1.5 rounded-full border border-primary/20 bg-primary/5 text-primary mb-6 font-label-caps text-xs tracking-widest uppercase">
            <span className="material-symbols-outlined text-sm">stars</span>
            NOVA AI School
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-on-surface tracking-tight flex items-center gap-4">
            <span className="hidden md:inline-block w-16 h-2 bg-primary/20 rounded-full animate-pulse"></span>
            {t('students.scholarshipsTitle')}
            <span className="hidden md:inline-block w-16 h-2 bg-primary/20 rounded-full animate-pulse"></span>
          </h2>
        </div>

        {/* Premium Card */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="group relative rounded-[2.5rem] overflow-hidden bg-surface-container-highest border border-outline/10 shadow-2xl hover:shadow-3xl transition-shadow duration-700"
        >
          {/* Ambient Glow */}
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-emerald-500/10 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/3 pointer-events-none group-hover:bg-emerald-500/20 transition-colors duration-1000"></div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 relative z-10">
            {/* Left Content */}
            <div className="p-8 md:p-16 flex flex-col justify-center">
              <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-emerald-400 to-teal-600 flex items-center justify-center text-white mb-8 shadow-lg transform -rotate-6 group-hover:rotate-0 transition-transform duration-500">
                <span className="material-symbols-outlined text-4xl">payments</span>
              </div>
              
              <h3 className="text-2xl md:text-3xl font-bold text-on-surface mb-6 leading-tight">
                {t('students.scholarshipsDesc1')}
              </h3>
              
              <p className="text-on-surface-variant text-lg leading-relaxed mb-8">
                {t('students.scholarshipsDesc2')}
              </p>

              <div className="inline-flex items-center gap-4 px-6 py-4 rounded-2xl bg-surface-container-lowest border border-outline/10 self-start">
                <span className="material-symbols-outlined text-primary text-3xl">workspace_premium</span>
                <p className="font-medium text-sm md:text-base text-on-surface">
                  IELTS va SAT sertifikatiga ega o'quvchilar <br className="hidden md:block" />
                  <strong className="text-primary font-bold">{t('students.freeEducation')}</strong>
                </p>
              </div>
            </div>

            {/* Right Image */}
            <div className="relative h-[400px] lg:h-auto overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-surface-container-highest to-transparent z-10 w-24 lg:w-32 hidden lg:block"></div>
              <img 
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1200&q=80" 
                alt="Students studying" 
                className="w-full h-full object-cover object-center transform transition-transform duration-[2s] group-hover:scale-105"
              />
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}

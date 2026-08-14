import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import PageHeader from '../components/PageHeader';

export default function AdminProfilePage() {
  const { id } = useParams();
  const { t, i18n } = useTranslation();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const lang = i18n.language?.startsWith('uz') ? 'uz' : 'ru';

  useEffect(() => {
    fetch(`/api/public/administration/${id}`)
      .then(res => res.json())
      .then(data => {
        setProfile(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return <div className="min-h-screen bg-surface-container flex items-center justify-center">
      <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
    </div>;
  }

  if (!profile || profile.error) {
    return <div className="min-h-screen flex items-center justify-center">
      <h2 className="text-2xl font-bold">Profile not found</h2>
    </div>;
  }

  const name = profile[`name_${lang}`];
  const role = profile[`role_${lang}`];
  const desc = profile[`desc_${lang}`];
  
  let awards = [];
  try {
    if (profile[`awards_${lang}`]) {
      awards = JSON.parse(profile[`awards_${lang}`]);
    }
  } catch (e) {
    console.error("Failed to parse awards JSON", e);
  }

  return (
    <div className="min-h-screen bg-surface-container-lowest">
      <PageHeader 
        title={name} 
        subtitle={role} 
        breadcrumbs={[
          { label: t('nav.about'), path: '/about' },
          { label: name, path: '#' }
        ]} 
      />

      <div className="max-w-7xl mx-auto px-margin-mobile md:px-margin-desktop py-16">
        
        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Left Column (Sticky Image & Stats) */}
          <div className="lg:col-span-4 flex flex-col gap-8">
            <div className="sticky top-32">
              {/* Photo Card */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="rounded-3xl overflow-hidden bg-surface-container-highest border border-outline/10 shadow-2xl relative aspect-[3/4]"
              >
                {profile.image_url ? (
                  <img src={`${profile.image_url}`} alt={name} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-primary/5">
                    <span className="material-symbols-outlined text-9xl text-primary/20">person</span>
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 p-8">
                  <h1 className="text-3xl font-bold text-white mb-2 leading-tight">{name}</h1>
                  <p className="text-primary-fixed uppercase tracking-widest text-sm font-bold">{role}</p>
                </div>
              </motion.div>

              {/* Experience Stat */}
              {profile.experience_years && (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.2 }}
                  className="mt-8 glass-card p-6 rounded-3xl flex items-center gap-6 border border-primary/20 bg-primary/5"
                >
                  <div className="flex flex-col items-center justify-center">
                    <span className="text-5xl font-extrabold text-primary">{profile.experience_years}</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-on-surface uppercase text-sm tracking-widest mb-1">
                      {lang === 'uz' ? 'Ish tajribasi' : 'Опыт работы'}
                    </h4>
                    <p className="text-on-surface-variant text-sm">
                      {lang === 'uz' ? 'Ta\'lim sohasida' : 'В сфере образования'} <br/>
                      {profile.experience_period && <span className="opacity-70">({profile.experience_period})</span>}
                    </p>
                  </div>
                </motion.div>
              )}
            </div>
          </div>

          {/* Right Column (Bio & Awards) */}
          <div className="lg:col-span-8 flex flex-col gap-12">
            
            {/* Bio Section */}
            {desc && (
              <motion.section 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className="glass-card p-8 md:p-12 rounded-[2.5rem]"
              >
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                    <span className="material-symbols-outlined">person_book</span>
                  </div>
                  <h2 className="text-2xl font-bold text-on-surface uppercase tracking-widest">
                    {lang === 'uz' ? 'Kasbiy Biografiya' : 'Профессиональная биография'}
                  </h2>
                </div>
                <div className="prose prose-lg dark:prose-invert max-w-none prose-p:text-on-surface-variant prose-p:leading-relaxed whitespace-pre-line">
                  {desc}
                </div>
              </motion.section>
            )}

            {/* Awards Section */}
            {awards.length > 0 && (
              <motion.section 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <h2 className="text-2xl font-bold text-on-surface uppercase tracking-widest mb-8 flex items-center gap-4">
                  <span className="material-symbols-outlined text-primary">military_tech</span>
                  {lang === 'uz' ? 'Mukofotlar va Yutuqlar' : 'Награды и достижения'}
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {awards.map((award, idx) => (
                    <div key={idx} className="bg-surface-container border border-outline/10 p-6 rounded-3xl hover:border-primary/30 transition-colors shadow-sm hover:shadow-md">
                      <div className="flex items-start gap-4">
                        <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary flex-shrink-0">
                          <span className="material-symbols-outlined text-3xl">workspace_premium</span>
                        </div>
                        <div>
                          <h3 className="font-bold text-lg text-on-surface mb-2">{award.title}</h3>
                          {award.desc && <p className="text-on-surface-variant text-sm mb-3">{award.desc}</p>}
                          {award.year && (
                            <span className="inline-flex items-center gap-1 text-xs font-bold bg-surface-container-highest px-2 py-1 rounded-md text-on-surface-variant">
                              <span className="material-symbols-outlined text-[14px]">calendar_month</span>
                              {award.year}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.section>
            )}

            {/* Values Section (Static as per poster) */}
            <motion.section 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="mt-8 border-t border-outline/10 pt-8"
            >
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { icon: 'school', titleUz: 'Sifat', titleRu: 'Качество' },
                  { icon: 'favorite', titleUz: 'E\'tibor', titleRu: 'Забота' },
                  { icon: 'lightbulb', titleUz: 'Innovatsiyalar', titleRu: 'Инновации' },
                  { icon: 'public', titleUz: 'Kelajak', titleRu: 'Будущее' }
                ].map((val, idx) => (
                  <div key={idx} className="flex flex-col items-center justify-center p-4 text-center">
                    <span className="material-symbols-outlined text-3xl text-primary mb-2">{val.icon}</span>
                    <span className="font-bold text-sm tracking-widest uppercase text-on-surface-variant">
                      {lang === 'uz' ? val.titleUz : val.titleRu}
                    </span>
                  </div>
                ))}
              </div>
            </motion.section>

          </div>
        </div>
      </div>
    </div>
  );
}

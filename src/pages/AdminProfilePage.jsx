import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion, useScroll, useTransform } from 'framer-motion';

export default function AdminProfilePage() {
  const { id } = useParams();
  const { t, i18n } = useTranslation();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const lang = i18n.language?.startsWith('uz') ? 'uz' : 'ru';
  
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 200]);
  const opacity1 = useTransform(scrollY, [0, 300], [1, 0]);

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
    <div className="min-h-screen bg-surface-container-lowest font-sans selection:bg-primary/30">
      
      {/* Premium Hero Section */}
      <section className="relative min-h-[70vh] flex items-end pt-32 pb-16 overflow-hidden bg-black text-white">
        {/* Abstract Backgrounds */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary-fixed/20 via-black to-black z-0"></div>
        <div className="absolute top-[-20%] right-[-10%] w-[800px] h-[800px] bg-primary/10 rounded-full blur-[120px] pointer-events-none"></div>
        <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] bg-secondary/10 rounded-full blur-[100px] pointer-events-none"></div>

        {/* Hero Photo with Parallax */}
        <motion.div 
          style={{ y: y1, opacity: opacity1 }}
          className="absolute right-0 top-0 w-full md:w-1/2 h-full z-10"
        >
          {profile.image_url ? (
            <div className="relative w-full h-full">
              <div className="absolute inset-0 bg-gradient-to-r from-black via-black/50 to-transparent z-10"></div>
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent z-10"></div>
              <img src={`${profile.image_url}`} alt={name} className="w-full h-full object-cover object-top opacity-60" />
            </div>
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-white/5 backdrop-blur-3xl border-l border-white/10">
              <span className="material-symbols-outlined text-[15rem] text-white/10">person</span>
            </div>
          )}
        </motion.div>

        <div className="max-w-[1400px] w-full mx-auto px-margin-mobile md:px-margin-desktop relative z-20">
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/20 bg-white/10 backdrop-blur-md text-white mb-8 font-label-caps tracking-[0.2em] uppercase text-xs">
              <span className="material-symbols-outlined text-sm">stars</span>
              NOVA AI School
            </div>
            
            <h1 className="text-5xl md:text-7xl lg:text-[6rem] font-black leading-[1.1] tracking-tight max-w-4xl mb-6">
              {name.split(' ').map((word, i) => (
                <span key={i} className="block">{word}</span>
              ))}
            </h1>
            
            <p className="text-xl md:text-2xl text-white/70 font-medium max-w-2xl border-l-4 border-primary pl-6">
              {role}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Bento Grid Layout Body */}
      <section className="py-20 px-margin-mobile md:px-margin-desktop bg-surface-container-lowest">
        <div className="max-w-[1400px] mx-auto">
          
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            
            {/* Experience Box (Big Numbers) */}
            {profile.experience_years && (
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                className="md:col-span-4 bg-primary text-primary-on rounded-[2.5rem] p-10 md:p-12 flex flex-col justify-center relative overflow-hidden shadow-xl"
              >
                <div className="absolute -right-8 -top-8 w-64 h-64 bg-white/10 rounded-full blur-[40px]"></div>
                <h4 className="text-primary-on/80 uppercase tracking-[0.2em] font-bold text-sm mb-4 relative z-10">
                  {lang === 'uz' ? 'Tajriba' : 'Опыт работы'}
                </h4>
                <div className="flex items-baseline gap-2 relative z-10">
                  <span className="text-[6rem] md:text-[8rem] font-black leading-none tracking-tighter">
                    {profile.experience_years}
                  </span>
                  <span className="text-2xl font-medium text-primary-on/80">
                    {lang === 'uz' ? 'yil' : 'лет'}
                  </span>
                </div>
                {profile.experience_period && (
                  <p className="mt-4 font-medium text-primary-on/90 bg-white/10 self-start px-4 py-2 rounded-full backdrop-blur-md relative z-10">
                    {profile.experience_period}
                  </p>
                )}
              </motion.div>
            )}

            {/* Biography Box */}
            {desc && (
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ delay: 0.1 }}
                className={`${profile.experience_years ? 'md:col-span-8' : 'md:col-span-12'} bg-white border border-outline/10 rounded-[2.5rem] p-10 md:p-12 shadow-sm relative overflow-hidden group`}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                <div className="relative z-10">
                  <div className="flex items-center gap-4 mb-8">
                    <div className="w-12 h-12 rounded-2xl bg-surface-container-highest flex items-center justify-center text-on-surface-variant">
                      <span className="material-symbols-outlined text-2xl">menu_book</span>
                    </div>
                    <h2 className="text-xl font-bold uppercase tracking-[0.15em] text-on-surface-variant">
                      {lang === 'uz' ? 'Biografiya' : 'Биография'}
                    </h2>
                  </div>
                  <div className="text-on-surface text-lg md:text-xl font-medium leading-[1.8] whitespace-pre-line">
                    {desc}
                  </div>
                </div>
              </motion.div>
            )}

            {/* Awards Section */}
            {awards.length > 0 && (
              <div className="md:col-span-12 mt-8">
                <h2 className="text-3xl font-black mb-8 text-on-surface flex items-center gap-4">
                  {lang === 'uz' ? 'Yutuqlar va Mukofotlar' : 'Достижения и Награды'}
                  <span className="h-1 flex-grow bg-gradient-to-r from-outline/20 to-transparent ml-4 rounded-full"></span>
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {awards.map((award, idx) => (
                    <motion.div 
                      key={idx}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-50px" }}
                      transition={{ delay: idx * 0.1 }}
                      className="bg-surface-container-lowest border border-outline/10 rounded-[2rem] p-8 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300 relative overflow-hidden group"
                    >
                      <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-bl-full -z-10 group-hover:bg-primary/10 transition-colors duration-500"></div>
                      <div className="w-16 h-16 rounded-2xl bg-surface-container flex items-center justify-center text-primary mb-6 border border-outline/5">
                        <span className="material-symbols-outlined text-3xl">emoji_events</span>
                      </div>
                      <h3 className="font-bold text-xl text-on-surface mb-3">{award.title}</h3>
                      {award.desc && <p className="text-on-surface-variant leading-relaxed mb-6">{award.desc}</p>}
                      
                      {award.year && (
                        <div className="absolute bottom-8 right-8">
                          <span className="inline-flex items-center gap-1 text-sm font-bold bg-surface-container-highest px-3 py-1.5 rounded-full text-on-surface-variant/80">
                            {award.year}
                          </span>
                        </div>
                      )}
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

          </div>
        </div>
      </section>
    </div>
  );
}

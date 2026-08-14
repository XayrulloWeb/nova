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
  
  let awardsJson = [];

  if (profile[`awards_${lang}`]) {
    try {
      const parsed = JSON.parse(profile[`awards_${lang}`]);
      if (Array.isArray(parsed)) {
        awardsJson = parsed;
      } else {
        throw new Error('Not an array');
      }
    } catch (e) {
      // Fallback: treat plain text as a list of awards separated by newlines
      const rawText = profile[`awards_${lang}`];
      awardsJson = rawText
        .split('\n')
        .map(line => line.trim())
        .filter(line => line.length > 0)
        .map(line => ({ title: line }));
    }
  }

  return (
    <div className="min-h-screen bg-surface-container-lowest font-sans">
      
      {/* Light Clean Header Area */}
      <div className="bg-surface-container pt-32 pb-12 px-margin-mobile md:px-margin-desktop rounded-b-[3rem] relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-[80px]"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-secondary/5 rounded-full blur-[60px]"></div>
        
        <div className="max-w-[1200px] mx-auto relative z-10 flex flex-col md:flex-row items-center gap-10">
          
          {/* Photo */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-48 h-48 md:w-64 md:h-64 rounded-full overflow-hidden border-8 border-white shadow-xl flex-shrink-0 bg-white"
          >
            {profile.image_url ? (
              <img src={`${profile.image_url}`} alt={name} className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-primary/5 text-primary/20">
                <span className="material-symbols-outlined text-7xl">person</span>
              </div>
            )}
          </motion.div>

          {/* Name & Title */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-center md:text-left flex-grow"
          >
            <Link to="/about" className="inline-flex items-center gap-2 text-primary hover:text-primary-container transition-colors mb-6 font-bold uppercase tracking-wider text-sm">
              <span className="material-symbols-outlined text-xl">arrow_back</span>
              {lang === 'uz' ? 'Rahbariyatga qaytish' : 'К списку руководства'}
            </Link>
            <br />
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white shadow-sm text-primary mb-4 font-bold text-xs tracking-widest uppercase">
              <span className="material-symbols-outlined text-sm">stars</span>
              NOVA AI School
            </div>
            <h1 className="text-4xl md:text-6xl font-black text-on-surface mb-4 leading-tight tracking-tight">
              {name}
            </h1>
            <p className="text-xl md:text-2xl font-medium text-on-surface-variant">
              {role}
            </p>
          </motion.div>
        </div>
      </div>

      {/* Bento Grid Body */}
      <section className="py-16 px-margin-mobile md:px-margin-desktop">
        <div className="max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Column */}
          <div className="lg:col-span-4 flex flex-col gap-8">
            {/* Experience Box */}
            {profile.experience_years && (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-[#eef5fa] rounded-[2rem] p-8 relative overflow-hidden shadow-sm"
              >
                <div className="absolute top-0 right-0 p-6 text-[#1e619c]/10">
                  <span className="material-symbols-outlined text-8xl">work_history</span>
                </div>
                <h4 className="text-[#1e619c] font-bold text-sm tracking-widest uppercase mb-4 relative z-10">
                  {lang === 'uz' ? 'Ish tajribasi' : 'Опыт работы'}
                </h4>
                <div className="flex items-end gap-2 relative z-10 text-[#1e619c]">
                  <span className="text-7xl font-black leading-none tracking-tighter">
                    {profile.experience_years}
                  </span>
                  <span className="text-xl font-bold mb-2">
                    {lang === 'uz' ? 'yil' : 'лет'}
                  </span>
                </div>
                {profile.experience_period && (
                  <p className="mt-4 font-medium text-[#1e619c]/80 relative z-10 bg-white/50 inline-block px-4 py-1.5 rounded-full text-sm">
                    {profile.experience_period}
                  </p>
                )}
              </motion.div>
            )}

            {/* Contact / Quick Info Box (Optional placeholder if needed) */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-[#fdf7e8] rounded-[2rem] p-8 shadow-sm"
            >
              <div className="flex items-center gap-4 mb-4 text-[#e69f00]">
                <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center shadow-sm">
                  <span className="material-symbols-outlined text-2xl">mail</span>
                </div>
                <h4 className="font-bold">{lang === 'uz' ? "Bog'lanish" : 'Контакты'}</h4>
              </div>
              <p className="text-[#e69f00]/80 text-sm font-medium">
                {lang === 'uz' ? "Maktab ma'muriyati orqali" : "Через администрацию школы"}
              </p>
            </motion.div>
          </div>

          {/* Right Column */}
          <div className="lg:col-span-8 flex flex-col gap-8">
            
            {/* Biography */}
            {desc && (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-white rounded-[2rem] p-8 md:p-12 shadow-sm border border-outline/10"
              >
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-12 h-12 rounded-full bg-[#f5eeff] text-[#7359b8] flex items-center justify-center">
                    <span className="material-symbols-outlined text-2xl">menu_book</span>
                  </div>
                  <h2 className="text-2xl font-bold text-on-surface">
                    {lang === 'uz' ? 'Kasbiy Biografiya' : 'Профессиональная биография'}
                  </h2>
                </div>
                <div className="prose prose-lg max-w-none text-on-surface-variant leading-relaxed font-medium whitespace-pre-line">
                  {desc}
                </div>
              </motion.div>
            )}

            {/* Awards */}
            {awardsJson.length > 0 && (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 rounded-full bg-[#eef5fa] text-[#1e619c] flex items-center justify-center">
                    <span className="material-symbols-outlined text-2xl">workspace_premium</span>
                  </div>
                  <h2 className="text-2xl font-bold text-on-surface">
                    {lang === 'uz' ? 'Yutuqlar va Mukofotlar' : 'Награды и достижения'}
                  </h2>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {awardsJson.map((award, idx) => (
                    <div key={idx} className="bg-surface-container rounded-2xl p-6 border border-outline/5 hover:border-primary/20 transition-colors">
                      <h3 className="font-bold text-lg text-on-surface mb-2">{award.title}</h3>
                      {award.desc && <p className="text-on-surface-variant text-sm mb-4 leading-relaxed">{award.desc}</p>}
                      {award.year && (
                        <span className="inline-flex items-center gap-1.5 text-xs font-bold bg-white px-3 py-1.5 rounded-full text-on-surface-variant shadow-sm border border-outline/10">
                          <span className="material-symbols-outlined text-[14px]">event</span>
                          {award.year}
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

          </div>
        </div>
      </section>
    </div>
  );
}

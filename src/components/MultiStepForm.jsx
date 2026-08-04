import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

export default function MultiStepForm() {
  const { t } = useTranslation();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    parentName: '',
    parentPhone: '',
    childName: '',
    childDob: '',
    grade: '1',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const submitApplication = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/apply', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const data = await res.json();
      if (res.ok) {
        setStep(4);
      } else {
        setError(data.error || t('forms.errorMsg'));
      }
    } catch (err) {
      setError(t('forms.errorMsg'));
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const nextStep = () => setStep((prev) => Math.min(prev + 1, 4));
  const prevStep = () => setStep((prev) => Math.max(prev - 1, 1));

  return (
    <div className="w-full max-w-4xl mx-auto relative min-h-[500px] flex items-center justify-center p-4">
      {/* Progress Bar */}
      <div className="absolute top-0 left-0 w-full h-2 bg-surface-container-highest rounded-full overflow-hidden">
        <div 
          className="h-full bg-primary transition-all duration-700 ease-in-out"
          style={{ width: `${((step - 1) / 3) * 100}%` }}
        ></div>
      </div>
      
      {/* Steps Container */}
      <div className="relative w-full overflow-hidden h-[450px]">
        
        {/* Step 1: Parent Info */}
        <div className={`absolute inset-0 w-full p-8 glass-card rounded-3xl transition-all duration-700 ease-in-out flex flex-col justify-center ${step === 1 ? 'translate-x-0 opacity-100' : step > 1 ? '-translate-x-full opacity-0' : 'translate-x-full opacity-0'}`}>
          <h2 className="text-3xl font-bold text-on-surface mb-2">{t('forms.applyTitle')}</h2>
          <p className="text-on-surface-variant mb-8">{t('forms.applyDesc')}</p>
          <div className="space-y-6">
            <div className="flex flex-col gap-2">
              <label className="font-label-caps text-xs text-primary tracking-widest uppercase">{t('forms.parentName')}</label>
              <input type="text" name="parentName" value={formData.parentName} onChange={handleChange} className="bg-surface-container border border-outline/20 rounded-xl p-4 text-on-surface focus:outline-none focus:border-primary transition-colors" placeholder={t('forms.placeholderName')} />
            </div>
            <div className="flex flex-col gap-2">
              <label className="font-label-caps text-xs text-primary tracking-widest uppercase">{t('forms.parentPhone')}</label>
              <input type="tel" name="parentPhone" value={formData.parentPhone} onChange={handleChange} className="bg-surface-container border border-outline/20 rounded-xl p-4 text-on-surface focus:outline-none focus:border-primary transition-colors" placeholder="+998 90 123 45 67" />
            </div>
          </div>
          <div className="mt-auto pt-8 flex justify-end">
            <button onClick={nextStep} className="bg-primary text-on-primary px-8 py-3 rounded-full font-bold tracking-wider hover:scale-105 transition-transform flex items-center gap-2">
              {t('forms.nextBtn')} <span className="material-symbols-outlined">arrow_forward</span>
            </button>
          </div>
        </div>

        {/* Step 2: Child Info */}
        <div className={`absolute inset-0 w-full p-8 glass-card rounded-3xl transition-all duration-700 ease-in-out flex flex-col justify-center ${step === 2 ? 'translate-x-0 opacity-100' : step > 2 ? '-translate-x-full opacity-0' : 'translate-x-full opacity-0'}`}>
          <h2 className="text-3xl font-bold text-on-surface mb-2">{t('forms.childInfoTitle')}</h2>
          <p className="text-on-surface-variant mb-8">{t('forms.childInfoDesc')}</p>
          <div className="space-y-6">
            <div className="flex flex-col gap-2">
              <label className="font-label-caps text-xs text-primary tracking-widest uppercase">{t('forms.childName')}</label>
              <input type="text" name="childName" value={formData.childName} onChange={handleChange} className="bg-surface-container border border-outline/20 rounded-xl p-4 text-on-surface focus:outline-none focus:border-primary transition-colors" placeholder={t('forms.placeholderName')} />
            </div>
            <div className="flex flex-col gap-2">
              <label className="font-label-caps text-xs text-primary tracking-widest uppercase">{t('forms.childDob')}</label>
              <input type="date" name="childDob" value={formData.childDob} onChange={handleChange} className="bg-surface-container border border-outline/20 rounded-xl p-4 text-on-surface focus:outline-none focus:border-primary transition-colors [color-scheme:dark]" />
            </div>
          </div>
          <div className="mt-auto pt-8 flex justify-between">
            <button onClick={prevStep} className="text-on-surface-variant px-6 py-3 rounded-full font-bold hover:bg-surface-container transition-colors flex items-center gap-2">
              <span className="material-symbols-outlined">arrow_back</span> {t('forms.prevBtn')}
            </button>
            <button onClick={nextStep} className="bg-primary text-on-primary px-8 py-3 rounded-full font-bold tracking-wider hover:scale-105 transition-transform flex items-center gap-2">
              {t('forms.nextBtn')} <span className="material-symbols-outlined">arrow_forward</span>
            </button>
          </div>
        </div>

        {/* Step 3: Grade Selection */}
        <div className={`absolute inset-0 w-full p-8 glass-card rounded-3xl transition-all duration-700 ease-in-out flex flex-col justify-center ${step === 3 ? 'translate-x-0 opacity-100' : step > 3 ? '-translate-x-full opacity-0' : 'translate-x-full opacity-0'}`}>
          <h2 className="text-3xl font-bold text-on-surface mb-2">{t('forms.gradeTitle')}</h2>
          <p className="text-on-surface-variant mb-8">{t('forms.gradeDesc')}</p>
          <div className="grid grid-cols-3 md:grid-cols-4 gap-4">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map(num => (
              <button 
                key={num} 
                onClick={() => setFormData({ ...formData, grade: num })}
                className={`py-4 rounded-2xl font-bold text-xl transition-all border ${formData.grade == num ? 'bg-primary text-on-primary border-primary shadow-[0_0_20px_rgba(0,219,233,0.4)]' : 'bg-surface-container border-outline/20 text-on-surface hover:border-primary/50'}`}
              >
                {num}
              </button>
            ))}
          </div>
          <div className="mt-auto pt-8 flex justify-between">
            <button onClick={prevStep} className="text-on-surface-variant px-6 py-3 rounded-full font-bold hover:bg-surface-container transition-colors flex items-center gap-2">
              <span className="material-symbols-outlined">arrow_back</span> {t('forms.prevBtn')}
            </button>
            <button disabled={loading} onClick={submitApplication} className="bg-primary text-on-primary px-8 py-3 rounded-full font-bold tracking-wider hover:scale-105 transition-transform flex items-center gap-2 disabled:opacity-50 disabled:hover:scale-100">
              {loading ? t('forms.sending') : t('forms.submitBtn')} <span className="material-symbols-outlined">{loading ? 'hourglass_empty' : 'done'}</span>
            </button>
          </div>
          {error && <div className="mt-4 text-center text-red-500 font-bold">{error}</div>}
        </div>

        {/* Step 4: Ticket Generation (Success) */}
        <div className={`absolute inset-0 w-full p-4 md:p-8 transition-all duration-700 ease-in-out flex flex-col justify-center items-center ${step === 4 ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'}`}>
          
          <div className="bg-surface-container-highest border border-primary/30 rounded-3xl p-8 max-w-md w-full relative overflow-hidden shadow-[0_0_50px_rgba(0,219,233,0.15)] ticket-cutout">
            <div className="absolute top-0 right-0 p-4 opacity-10">
              <span className="material-symbols-outlined text-9xl text-primary transform rotate-12">verified</span>
            </div>
            
            <div className="text-center mb-6 relative z-10">
              <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4 border border-primary/50">
                <span className="material-symbols-outlined text-primary text-3xl">check</span>
              </div>
              <h2 className="text-2xl font-bold text-on-surface text-primary">{t('forms.ticketTitle')}</h2>
              <p className="text-on-surface-variant text-sm mt-2">{t('forms.ticketDesc')}</p>
            </div>

            <div className="border-t-2 border-dashed border-outline/30 my-6 relative z-10">
               {/* Ticket cutouts on the sides */}
               <div className="absolute -left-11 -top-4 w-8 h-8 bg-surface-container-lowest rounded-full"></div>
               <div className="absolute -right-11 -top-4 w-8 h-8 bg-surface-container-lowest rounded-full"></div>
            </div>

            <div className="space-y-4 relative z-10">
              <div className="flex justify-between">
                <span className="text-on-surface-variant text-sm">{t('forms.ticketParent')}</span>
                <span className="text-on-surface font-bold">{formData.parentName || t('forms.notEntered')}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-on-surface-variant text-sm">{t('forms.ticketChild')}</span>
                <span className="text-on-surface font-bold">{formData.childName || t('forms.notEntered')}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-on-surface-variant text-sm">{t('forms.ticketGrade')}</span>
                <span className="text-primary font-bold">{formData.grade}{t('forms.ticketGradeSuffix')}</span>
              </div>
            </div>

            <div className="mt-8 pt-4 border-t border-outline/10 flex justify-center relative z-10">
              {/* Barcode Mock */}
              <div className="flex gap-1 h-12 items-center opacity-70">
                {[...Array(24)].map((_, i) => (
                  <div key={i} className={`bg-on-surface h-full ${Math.random() > 0.5 ? 'w-1' : 'w-2'}`}></div>
                ))}
              </div>
            </div>
            <div className="text-center mt-2 text-[10px] text-on-surface-variant tracking-widest font-mono">
              ID: NOVA-{Math.floor(Math.random() * 9000) + 1000}-{new Date().getFullYear()}
            </div>
          </div>
          
          <button onClick={() => { setStep(1); setFormData({ parentName: '', parentPhone: '', childName: '', childDob: '', grade: '1' })}} className="mt-8 text-on-surface-variant underline hover:text-primary transition-colors text-sm">
            {t('forms.newApplyBtn')}
          </button>
        </div>

      </div>
    </div>
  );
}

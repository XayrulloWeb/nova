import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

export default function ContactForm() {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({ name: '', phone: '', message: '' });
  const [status, setStatus] = useState('idle'); // idle, loading, success, error

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      if (res.ok) {
        setStatus('success');
        setFormData({ name: '', phone: '', message: '' });
      } else {
        setStatus('error');
      }
    } catch (err) {
      setStatus('error');
    }
  };

  return (
    <section className="py-24 px-margin-mobile md:px-margin-desktop bg-surface-container-lowest">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-[32px] md:text-headline-md font-bold text-on-surface mb-4 text-center">{t('forms.contactTitle')}</h2>
        <p className="text-body-lg text-on-surface-variant text-center mb-12">{t('forms.contactDesc')}</p>
        <form onSubmit={handleSubmit} className="glass-card p-10 rounded-3xl flex flex-col gap-6 relative overflow-hidden">
          {status === 'success' && (
            <div className="absolute inset-0 bg-surface-container-lowest/90 backdrop-blur-sm z-10 flex flex-col items-center justify-center text-center p-8">
              <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mb-4 text-primary">
                <span className="material-symbols-outlined text-4xl">check_circle</span>
              </div>
              <h3 className="text-2xl font-bold text-on-surface mb-2">{t('forms.contactSuccessTitle')}</h3>
              <p className="text-on-surface-variant">{t('forms.contactSuccessDesc')}</p>
              <button type="button" onClick={() => setStatus('idle')} className="mt-6 text-primary font-bold underline">{t('forms.contactNewMsg')}</button>
            </div>
          )}
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col gap-2">
              <label className="font-label-caps text-xs text-on-surface-variant tracking-widest uppercase">{t('forms.contactName')}</label>
              <input required type="text" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="bg-surface-container border border-outline/20 rounded-xl p-4 text-on-surface focus:outline-none focus:border-primary transition-colors" placeholder={t('forms.placeholderName')} />
            </div>
            <div className="flex flex-col gap-2">
              <label className="font-label-caps text-xs text-on-surface-variant tracking-widest uppercase">{t('forms.parentPhone')}</label>
              <input required type="tel" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} className="bg-surface-container border border-outline/20 rounded-xl p-4 text-on-surface focus:outline-none focus:border-primary transition-colors" placeholder="+998 90 000 00 00" />
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <label className="font-label-caps text-xs text-on-surface-variant tracking-widest uppercase">{t('forms.contactMessage')}</label>
            <textarea required value={formData.message} onChange={e => setFormData({...formData, message: e.target.value})} className="bg-surface-container border border-outline/20 rounded-xl p-4 text-on-surface focus:outline-none focus:border-primary transition-colors min-h-[150px]" placeholder={t('forms.placeholderMsg')}></textarea>
          </div>
          <button disabled={status === 'loading'} type="submit" className="bg-primary text-on-primary py-4 rounded-xl font-label-caps tracking-widest font-bold hover:bg-primary/90 transition-colors mt-4 disabled:opacity-50">
            {status === 'loading' ? t('forms.sending') : t('forms.contactSubmit')}
          </button>
          {status === 'error' && <p className="text-red-500 text-center font-bold text-sm">{t('forms.errorMsg')}</p>}
        </form>
      </div>
    </section>
  );
}

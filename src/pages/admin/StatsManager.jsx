import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

export default function StatsManager() {
  const [stats, setStats] = useState({ students_count: '', experience_years: '', graduates_count: '' });
  const [message, setMessage] = useState('');
  const { t } = useTranslation();

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    const res = await fetch('/api/public/stats');
    if (res.ok) setStats(await res.json());
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    const token = localStorage.getItem('adminToken');
    
    const res = await fetch('/api/admin/stats', {
      method: 'POST',
      headers: { 
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(stats)
    });
    
    if (res.ok) {
      setMessage(t('admin.success'));
    } else {
      setMessage(t('admin.error'));
    }
  };

  return (
    <div className="max-w-2xl">
      <h2 className="text-3xl font-bold mb-8">{t('admin.statsTitle')}</h2>
      
      <form onSubmit={handleSubmit} className="glass-card p-8 rounded-3xl flex flex-col gap-6">
        <div>
          <label className="block text-sm font-label-caps text-on-surface-variant mb-2">{t('admin.studentsCount')}</label>
          <input 
            type="text" 
            value={stats.students_count} 
            onChange={e => setStats({...stats, students_count: e.target.value})} 
            className="w-full bg-surface-container border border-outline/20 rounded-xl p-4 text-on-surface focus:outline-none focus:border-primary font-bold text-2xl" 
            required
          />
        </div>
        <div>
          <label className="block text-sm font-label-caps text-on-surface-variant mb-2">{t('admin.expYears')}</label>
          <input 
            type="text" 
            value={stats.experience_years} 
            onChange={e => setStats({...stats, experience_years: e.target.value})} 
            className="w-full bg-surface-container border border-outline/20 rounded-xl p-4 text-on-surface focus:outline-none focus:border-primary font-bold text-2xl" 
            required
          />
        </div>
        <div>
          <label className="block text-sm font-label-caps text-on-surface-variant mb-2">{t('admin.gradCount')}</label>
          <input 
            type="text" 
            value={stats.graduates_count} 
            onChange={e => setStats({...stats, graduates_count: e.target.value})} 
            className="w-full bg-surface-container border border-outline/20 rounded-xl p-4 text-on-surface focus:outline-none focus:border-primary font-bold text-2xl" 
            required
          />
        </div>
        
        {message && <p className="text-center font-bold text-primary mt-2">{message}</p>}
        <button type="submit" className="bg-primary text-on-primary py-4 rounded-xl font-bold hover:opacity-90 mt-4">{t('admin.save')}</button>
      </form>
    </div>
  );
}

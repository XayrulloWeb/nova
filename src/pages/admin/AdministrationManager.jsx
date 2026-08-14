import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

export default function AdministrationManager() {
  const [admins, setAdmins] = useState([]);
  const [isAdding, setIsAdding] = useState(false);
  const { t } = useTranslation();
  const [form, setForm] = useState({ 
    name_uz: '', name_ru: '', 
    role_uz: '', role_ru: '', 
    desc_uz: '', desc_ru: '',
    experience_years: '', experience_period: '',
    awards_uz: '', awards_ru: '',
    image: null 
  });

  useEffect(() => {
    fetchAdmins();
  }, []);

  const fetchAdmins = async () => {
    const res = await fetch('/api/public/administration');
    if (res.ok) setAdmins(await res.json());
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('adminToken');
    const data = new FormData();
    data.append('name_uz', form.name_uz);
    data.append('name_ru', form.name_ru);
    data.append('role_uz', form.role_uz);
    data.append('role_ru', form.role_ru);
    data.append('desc_uz', form.desc_uz);
    data.append('desc_ru', form.desc_ru);
    data.append('experience_years', form.experience_years);
    data.append('experience_period', form.experience_period);
    data.append('awards_uz', form.awards_uz);
    data.append('awards_ru', form.awards_ru);
    if (form.image) data.append('image', form.image);

    await fetch('/api/admin/administration', {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${token}` },
      body: data
    });
    
    setForm({ 
      name_uz: '', name_ru: '', 
      role_uz: '', role_ru: '', 
      desc_uz: '', desc_ru: '',
      experience_years: '', experience_period: '',
      awards_uz: '', awards_ru: '',
      image: null 
    });
    setIsAdding(false);
    fetchAdmins();
  };

  const handleDelete = async (id) => {
    if (!window.confirm(t('admin.confirmDelete'))) return;
    const token = localStorage.getItem('adminToken');
    await fetch(`/api/admin/administration/${id}`, {
      method: 'DELETE',
      headers: { 'Authorization': `Bearer ${token}` }
    });
    fetchAdmins();
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold">{t('admin.administration')}</h2>
        <button 
          onClick={() => setIsAdding(!isAdding)}
          className="bg-primary text-on-primary px-6 py-2 rounded-full font-bold flex items-center gap-2 hover:opacity-90"
        >
          <span className="material-symbols-outlined">{isAdding ? 'close' : 'add'}</span>
          {isAdding ? t('admin.cancel') : t('admin.addAdmin')}
        </button>
      </div>

      {isAdding && (
        <form onSubmit={handleAdd} className="glass-card p-8 rounded-3xl mb-12 flex flex-col gap-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <input type="text" placeholder={t('admin.nameUz')} value={form.name_uz} onChange={e => setForm({...form, name_uz: e.target.value})} className="bg-surface-container p-4 rounded-xl border border-outline/20" required />
            <input type="text" placeholder={t('admin.nameRu')} value={form.name_ru} onChange={e => setForm({...form, name_ru: e.target.value})} className="bg-surface-container p-4 rounded-xl border border-outline/20" required />
            
            <input type="text" placeholder={t('admin.roleUz')} value={form.role_uz} onChange={e => setForm({...form, role_uz: e.target.value})} className="bg-surface-container p-4 rounded-xl border border-outline/20" required />
            <input type="text" placeholder={t('admin.roleRu')} value={form.role_ru} onChange={e => setForm({...form, role_ru: e.target.value})} className="bg-surface-container p-4 rounded-xl border border-outline/20" required />

            <div className="md:col-span-2">
              <label className="block mb-2 font-bold text-sm text-on-surface-variant">Опыт работы (Опционально)</label>
              <div className="grid grid-cols-2 gap-4">
                <input type="text" placeholder="Лет (напр. 28)" value={form.experience_years} onChange={e => setForm({...form, experience_years: e.target.value})} className="bg-surface-container p-4 rounded-xl border border-outline/20" />
                <input type="text" placeholder="Период (напр. 1998-2026)" value={form.experience_period} onChange={e => setForm({...form, experience_period: e.target.value})} className="bg-surface-container p-4 rounded-xl border border-outline/20" />
              </div>
            </div>

            <textarea placeholder="Биография UZ (можно использовать переносы строк)" value={form.desc_uz} onChange={e => setForm({...form, desc_uz: e.target.value})} className="bg-surface-container p-4 rounded-xl border border-outline/20 h-32" required></textarea>
            <textarea placeholder="Биография RU (можно использовать переносы строк)" value={form.desc_ru} onChange={e => setForm({...form, desc_ru: e.target.value})} className="bg-surface-container p-4 rounded-xl border border-outline/20 h-32" required></textarea>

            <textarea placeholder="Награды UZ (в формате JSON массива, например: [{&quot;title&quot;:&quot;Активный исследователь&quot;,&quot;desc&quot;:&quot;Знак...&quot;,&quot;year&quot;:&quot;2023 год&quot;}])" value={form.awards_uz} onChange={e => setForm({...form, awards_uz: e.target.value})} className="bg-surface-container p-4 rounded-xl border border-outline/20 h-24 font-mono text-sm"></textarea>
            <textarea placeholder="Награды RU (в формате JSON массива)" value={form.awards_ru} onChange={e => setForm({...form, awards_ru: e.target.value})} className="bg-surface-container p-4 rounded-xl border border-outline/20 h-24 font-mono text-sm"></textarea>

            <div className="md:col-span-2">
              <label className="block mb-2 font-bold">{t('admin.image')}</label>
              <input type="file" accept="image/*" onChange={e => setForm({...form, image: e.target.files[0]})} className="bg-surface-container p-4 rounded-xl border border-outline/20 w-full" />
            </div>
          </div>
          <button type="submit" className="bg-primary text-on-primary py-4 rounded-xl font-bold hover:opacity-90 mt-4">
            {t('admin.save')}
          </button>
        </form>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {admins.map(admin => (
          <div key={admin.id} className="glass-card rounded-3xl overflow-hidden flex flex-col items-center text-center p-6">
            <div className="w-32 h-32 rounded-full overflow-hidden mb-4 bg-surface-container-high border-4 border-surface-container">
              {admin.image_url ? 
                <img src={`${admin.image_url}`} alt={admin.name_uz} className="w-full h-full object-cover" />
                : <span className="material-symbols-outlined text-5xl text-on-surface-variant flex items-center justify-center h-full">person</span>
              }
            </div>
            <h3 className="font-bold text-xl mb-1">{admin.name_uz}</h3>
            <p className="text-primary text-sm font-bold mb-6">{admin.role_uz}</p>
            <button 
              onClick={() => handleDelete(admin.id)}
              className="mt-auto bg-red-500/10 text-red-500 px-4 py-2 rounded-lg font-bold hover:bg-red-500/20 w-full"
            >
              {t('admin.delete')}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

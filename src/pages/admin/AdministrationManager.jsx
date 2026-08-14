import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import api from '../../api/axios'; // Use our new axios instance

export default function AdministrationManager() {
  const [admins, setAdmins] = useState([]);
  const [isAdding, setIsAdding] = useState(false);
  const [editId, setEditId] = useState(null);
  const { t } = useTranslation();
  
  const [form, setForm] = useState({ 
    name_uz: '', name_ru: '', 
    role_uz: '', role_ru: '', 
    desc_uz: '', desc_ru: '',
    experience_years: '', experience_period: '',
    awards_uz: [], awards_ru: [],
    image: null 
  });

  useEffect(() => {
    fetchAdmins();
  }, []);

  const fetchAdmins = async () => {
    try {
      const res = await api.get('/public/administration');
      setAdmins(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const parseAwards = (awards) => {
    if (!awards) return [];
    if (Array.isArray(awards)) return awards;
    if (typeof awards === 'string') {
      try {
        const parsed = JSON.parse(awards);
        if (Array.isArray(parsed)) return parsed;
      } catch (e) {
        return awards.split('\n').map(line => line.trim()).filter(l => l).map(title => ({ title, desc: '', year: '' }));
      }
    }
    return [];
  };

  const handleEditClick = (admin) => {
    setForm({
      name_uz: admin.name?.uz || '',
      name_ru: admin.name?.ru || '',
      role_uz: admin.role?.uz || '',
      role_ru: admin.role?.ru || '',
      desc_uz: admin.desc?.uz || '',
      desc_ru: admin.desc?.ru || '',
      experience_years: admin.experience_years || '',
      experience_period: admin.experience_period || '',
      awards_uz: parseAwards(admin.awards?.uz),
      awards_ru: parseAwards(admin.awards?.ru),
      image: null
    });
    setEditId(admin.id);
    setIsAdding(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append('name_uz', form.name_uz);
    data.append('name_ru', form.name_ru);
    data.append('role_uz', form.role_uz);
    data.append('role_ru', form.role_ru);
    data.append('desc_uz', form.desc_uz);
    data.append('desc_ru', form.desc_ru);
    data.append('experience_years', form.experience_years);
    data.append('experience_period', form.experience_period);
    
    data.append('awards_uz', JSON.stringify(form.awards_uz));
    data.append('awards_ru', JSON.stringify(form.awards_ru));
    
    if (form.image) data.append('image', form.image);

    try {
      if (editId) {
        await api.put(`/admin/administration/${editId}`, data, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
      } else {
        await api.post('/admin/administration', data, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
      }
      
      handleCancel();
      fetchAdmins();
    } catch (err) {
      console.error(err);
      alert("Ошибка при сохранении: " + (err.response?.data?.error || err.message));
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm(t('admin.confirmDelete'))) return;
    try {
      await api.delete(`/admin/administration/${id}`);
      fetchAdmins();
    } catch (err) {
      console.error(err);
    }
  };

  const handleCancel = () => {
    setIsAdding(false);
    setEditId(null);
    setForm({ 
      name_uz: '', name_ru: '', role_uz: '', role_ru: '', 
      desc_uz: '', desc_ru: '', experience_years: '', experience_period: '',
      awards_uz: [], awards_ru: [], image: null 
    });
  };

  const addAward = (lang) => {
    setForm(prev => ({
      ...prev,
      [`awards_${lang}`]: [...prev[`awards_${lang}`], { title: '', desc: '', year: '' }]
    }));
  };

  const updateAward = (lang, index, field, value) => {
    setForm(prev => {
      const newAwards = [...prev[`awards_${lang}`]];
      newAwards[index] = { ...newAwards[index], [field]: value };
      return { ...prev, [`awards_${lang}`]: newAwards };
    });
  };

  const removeAward = (lang, index) => {
    setForm(prev => {
      const newAwards = [...prev[`awards_${lang}`]];
      newAwards.splice(index, 1);
      return { ...prev, [`awards_${lang}`]: newAwards };
    });
  };

  const inputClass = "bg-surface-container p-4 rounded-xl border border-outline/20 text-on-surface placeholder-on-surface-variant/50 focus:outline-none focus:ring-2 focus:ring-primary caret-primary w-full";

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold">{t('admin.administration')}</h2>
        <button 
          onClick={isAdding ? handleCancel : () => setIsAdding(true)}
          className="bg-primary text-on-primary px-6 py-2 rounded-full font-bold flex items-center gap-2 hover:opacity-90"
        >
          <span className="material-symbols-outlined">{isAdding ? 'close' : 'add'}</span>
          {isAdding ? t('admin.cancel') : t('admin.addAdmin')}
        </button>
      </div>

      {isAdding && (
        <form onSubmit={handleSubmit} className="glass-card p-8 rounded-3xl mb-12 flex flex-col gap-6">
          <h3 className="text-xl font-bold mb-4">{editId ? 'Редактировать сотрудника' : 'Добавить сотрудника'}</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <input type="text" placeholder={t('admin.nameUz')} value={form.name_uz} onChange={e => setForm({...form, name_uz: e.target.value})} className={inputClass} required />
            <input type="text" placeholder={t('admin.nameRu')} value={form.name_ru} onChange={e => setForm({...form, name_ru: e.target.value})} className={inputClass} required />
            
            <input type="text" placeholder={t('admin.roleUz')} value={form.role_uz} onChange={e => setForm({...form, role_uz: e.target.value})} className={inputClass} required />
            <input type="text" placeholder={t('admin.roleRu')} value={form.role_ru} onChange={e => setForm({...form, role_ru: e.target.value})} className={inputClass} required />

            <div className="md:col-span-2">
              <label className="block mb-2 font-bold text-sm text-on-surface-variant">Опыт работы (Опционально)</label>
              <div className="grid grid-cols-2 gap-4">
                <input type="text" placeholder="Лет (напр. 28)" value={form.experience_years} onChange={e => setForm({...form, experience_years: e.target.value})} className={inputClass} />
                <input type="text" placeholder="Период (напр. 1998-2026)" value={form.experience_period} onChange={e => setForm({...form, experience_period: e.target.value})} className={inputClass} />
              </div>
            </div>

            <textarea placeholder="Биография UZ" value={form.desc_uz} onChange={e => setForm({...form, desc_uz: e.target.value})} className={`${inputClass} h-32`} required></textarea>
            <textarea placeholder="Биография RU" value={form.desc_ru} onChange={e => setForm({...form, desc_ru: e.target.value})} className={`${inputClass} h-32`} required></textarea>

            <div className="md:col-span-2">
              <label className="block mb-2 font-bold text-sm text-on-surface-variant">Награды UZ</label>
              {form.awards_uz.map((award, i) => (
                <div key={i} className="flex gap-2 mb-2">
                  <input type="text" placeholder="Название" value={award.title} onChange={e => updateAward('uz', i, 'title', e.target.value)} className={inputClass} />
                  <input type="text" placeholder="Описание (опц.)" value={award.desc} onChange={e => updateAward('uz', i, 'desc', e.target.value)} className={inputClass} />
                  <input type="text" placeholder="Год (опц.)" value={award.year} onChange={e => updateAward('uz', i, 'year', e.target.value)} className={inputClass} />
                  <button type="button" onClick={() => removeAward('uz', i)} className="bg-red-500/10 text-red-500 px-4 rounded-xl flex items-center justify-center">
                    <span className="material-symbols-outlined">delete</span>
                  </button>
                </div>
              ))}
              <button type="button" onClick={() => addAward('uz')} className="text-primary font-bold text-sm flex items-center gap-1 mt-2">
                <span className="material-symbols-outlined text-sm">add</span> Добавить награду UZ
              </button>
            </div>

            <div className="md:col-span-2">
              <label className="block mb-2 font-bold text-sm text-on-surface-variant">Награды RU</label>
              {form.awards_ru.map((award, i) => (
                <div key={i} className="flex gap-2 mb-2">
                  <input type="text" placeholder="Название" value={award.title} onChange={e => updateAward('ru', i, 'title', e.target.value)} className={inputClass} />
                  <input type="text" placeholder="Описание (опц.)" value={award.desc} onChange={e => updateAward('ru', i, 'desc', e.target.value)} className={inputClass} />
                  <input type="text" placeholder="Год (опц.)" value={award.year} onChange={e => updateAward('ru', i, 'year', e.target.value)} className={inputClass} />
                  <button type="button" onClick={() => removeAward('ru', i)} className="bg-red-500/10 text-red-500 px-4 rounded-xl flex items-center justify-center">
                    <span className="material-symbols-outlined">delete</span>
                  </button>
                </div>
              ))}
              <button type="button" onClick={() => addAward('ru')} className="text-primary font-bold text-sm flex items-center gap-1 mt-2">
                <span className="material-symbols-outlined text-sm">add</span> Добавить награду RU
              </button>
            </div>

            <div className="md:col-span-2">
              <label className="block mb-2 font-bold">Фотография (оставьте пустым, чтобы не менять)</label>
              <input type="file" accept="image/*" onChange={e => setForm({...form, image: e.target.files[0]})} className={inputClass} />
            </div>
          </div>
          <button type="submit" className="bg-primary text-on-primary py-4 rounded-xl font-bold hover:opacity-90 mt-4">
            {editId ? 'Сохранить изменения' : t('admin.save')}
          </button>
        </form>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {admins.map(admin => (
          <div key={admin.id} className="glass-card rounded-3xl overflow-hidden flex flex-col items-center text-center p-6 relative">
            
            <div className="absolute top-4 right-4 flex gap-2">
              <button 
                onClick={() => handleEditClick(admin)}
                className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center hover:bg-primary hover:text-on-primary transition-colors"
                title="Редактировать"
              >
                <span className="material-symbols-outlined text-sm">edit</span>
              </button>
            </div>

            <div className="w-32 h-32 rounded-full overflow-hidden mb-4 bg-surface-container-high border-4 border-surface-container">
              {admin.image_url ? 
                <img src={`${admin.image_url}`} alt={admin.name?.uz} className="w-full h-full object-cover" />
                : <span className="material-symbols-outlined text-5xl text-on-surface-variant flex items-center justify-center h-full">person</span>
              }
            </div>
            <h3 className="font-bold text-xl mb-1">{admin.name?.uz || admin.name_uz}</h3>
            <p className="text-primary text-sm font-bold mb-6">{admin.role?.uz || admin.role_uz}</p>
            
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

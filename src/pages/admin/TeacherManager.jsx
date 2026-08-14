import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

export default function TeacherManager() {
  const [teachers, setTeachers] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const { t } = useTranslation();
  const [form, setForm] = useState({ 
    name_uz: '', name_ru: '', 
    title_uz: '', title_ru: '', 
    desc_uz: '', desc_ru: '',
    tags_uz: '', tags_ru: '',
    subject_uz: '', subject_ru: '', 
    image: null 
  });

  useEffect(() => {
    fetchTeachers();
  }, [page]); // eslint-disable-line react-hooks/exhaustive-deps

  const fetchTeachers = async () => {
    const res = await fetch(`/api/public/teachers?page=${page}&limit=10`);
    if (res.ok) {
      const json = await res.json();
      setTeachers(json.data || []);
      setTotalPages(json.totalPages || 1);
    }
  };

  const handleEditClick = (tItem) => {
    setForm({
      name_uz: tItem.name?.uz || '', name_ru: tItem.name?.ru || '',
      title_uz: tItem.title?.uz || '', title_ru: tItem.title?.ru || '',
      desc_uz: tItem.desc?.uz || '', desc_ru: tItem.desc?.ru || '',
      tags_uz: tItem.tags?.uz || '', tags_ru: tItem.tags?.ru || '',
      subject_uz: tItem.subject?.uz || '', subject_ru: tItem.subject?.ru || '',
      image: null
    });
    setEditingId(tItem.id);
    setIsAdding(true);
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('adminToken');
    const data = new FormData();
    data.append('name_uz', form.name_uz);
    data.append('name_ru', form.name_ru);
    data.append('title_uz', form.title_uz);
    data.append('title_ru', form.title_ru);
    data.append('desc_uz', form.desc_uz);
    data.append('desc_ru', form.desc_ru);
    data.append('tags_uz', form.tags_uz);
    data.append('tags_ru', form.tags_ru);
    data.append('subject_uz', form.subject_uz);
    data.append('subject_ru', form.subject_ru);
    if (form.image) data.append('image', form.image);

    const url = editingId ? `/api/admin/teachers/${editingId}` : '/api/admin/teachers';
    const method = editingId ? 'PUT' : 'POST';

    await fetch(url, {
      method,
      headers: { 'Authorization': `Bearer ${token}` },
      body: data
    });
    
    setForm({ 
      name_uz: '', name_ru: '', 
      title_uz: '', title_ru: '', 
      desc_uz: '', desc_ru: '',
      tags_uz: '', tags_ru: '',
      subject_uz: '', subject_ru: '', 
      image: null 
    });
    setIsAdding(false);
    setEditingId(null);
    fetchTeachers();
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure?')) return;
    const token = localStorage.getItem('adminToken');
    await fetch(`/api/admin/teachers/${id}`, {
      method: 'DELETE',
      headers: { 'Authorization': `Bearer ${token}` }
    });
    fetchTeachers();
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold">{t('admin.teachers')}</h2>
        <button 
          onClick={() => {
            if (isAdding) {
              setIsAdding(false);
              setEditingId(null);
            } else {
              setForm({ 
                name_uz: '', name_ru: '', 
                title_uz: '', title_ru: '', 
                desc_uz: '', desc_ru: '',
                tags_uz: '', tags_ru: '',
                subject_uz: '', subject_ru: '', 
                image: null 
              });
              setEditingId(null);
              setIsAdding(true);
            }
          }}
          className="bg-primary text-on-primary px-6 py-2 rounded-full font-bold flex items-center gap-2 hover:opacity-90"
        >
          <span className="material-symbols-outlined">{isAdding ? 'close' : 'add'}</span>
          {isAdding ? t('admin.cancel') : t('admin.addTeacher')}
        </button>
      </div>

      {isAdding && (
        <form onSubmit={handleAdd} className="glass-card p-8 rounded-3xl mb-12 flex flex-col gap-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <input type="text" placeholder={t('admin.nameUz')} value={form.name_uz} onChange={e => setForm({...form, name_uz: e.target.value})} className="bg-surface-container p-4 rounded-xl border border-outline/20" required />
            <input type="text" placeholder={t('admin.nameRu')} value={form.name_ru} onChange={e => setForm({...form, name_ru: e.target.value})} className="bg-surface-container p-4 rounded-xl border border-outline/20" required />
            
            <input type="text" placeholder={t('admin.categoryUz')} value={form.title_uz} onChange={e => setForm({...form, title_uz: e.target.value})} className="bg-surface-container p-4 rounded-xl border border-outline/20" required />
            <input type="text" placeholder={t('admin.categoryRu')} value={form.title_ru} onChange={e => setForm({...form, title_ru: e.target.value})} className="bg-surface-container p-4 rounded-xl border border-outline/20" required />

            <textarea placeholder={t('admin.descUz')} value={form.desc_uz} onChange={e => setForm({...form, desc_uz: e.target.value})} className="bg-surface-container p-4 rounded-xl border border-outline/20 h-24" required></textarea>
            <textarea placeholder={t('admin.descRu')} value={form.desc_ru} onChange={e => setForm({...form, desc_ru: e.target.value})} className="bg-surface-container p-4 rounded-xl border border-outline/20 h-24" required></textarea>

            <input type="text" placeholder={t('admin.tagsUz')} value={form.tags_uz} onChange={e => setForm({...form, tags_uz: e.target.value})} className="bg-surface-container p-4 rounded-xl border border-outline/20" required />
            <input type="text" placeholder={t('admin.tagsRu')} value={form.tags_ru} onChange={e => setForm({...form, tags_ru: e.target.value})} className="bg-surface-container p-4 rounded-xl border border-outline/20" required />

            <input type="text" placeholder={t('admin.subjectUz')} value={form.subject_uz} onChange={e => setForm({...form, subject_uz: e.target.value})} className="bg-surface-container p-4 rounded-xl border border-outline/20" required />
            <input type="text" placeholder={t('admin.subjectRu')} value={form.subject_ru} onChange={e => setForm({...form, subject_ru: e.target.value})} className="bg-surface-container p-4 rounded-xl border border-outline/20" required />
            
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
        {teachers.map(tItem => (
          <div key={tItem.id} className="glass-card rounded-3xl overflow-hidden flex flex-col items-center text-center p-6">
            <div className="w-32 h-32 rounded-full overflow-hidden mb-4 bg-surface-container-high border-4 border-surface-container">
              {tItem.image_url ? 
                <img src={`${tItem.image_url}`} alt={tItem.name?.uz || 'Teacher'} className="w-full h-full object-cover" />
                : <span className="material-symbols-outlined text-5xl text-on-surface-variant flex items-center justify-center h-full">person</span>
              }
            </div>
            <h3 className="font-bold text-xl mb-1">{tItem.name?.uz || tItem.name?.ru || ''}</h3>
            <p className="text-primary text-sm font-bold mb-6">{tItem.subject?.uz || tItem.title?.uz || ''}</p>
            <div className="mt-auto w-full flex gap-2">
              <button 
                onClick={() => handleEditClick(tItem)}
                className="bg-primary/10 text-primary px-4 py-2 rounded-lg font-bold hover:bg-primary/20 w-1/2"
              >
                {t('admin.edit', 'Edit')}
              </button>
              <button 
                onClick={() => handleDelete(tItem.id)}
                className="bg-red-500/10 text-red-500 px-4 py-2 rounded-lg font-bold hover:bg-red-500/20 w-1/2"
              >
                {t('admin.delete')}
              </button>
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-between items-center mt-8">
        <button 
          disabled={page <= 1} 
          onClick={() => setPage(page - 1)}
          className="px-4 py-2 bg-surface-container rounded-lg disabled:opacity-50"
        >
          {t('admin.prev', 'Previous')}
        </button>
        <span>Page {page} of {totalPages || 1}</span>
        <button 
          disabled={page >= totalPages} 
          onClick={() => setPage(page + 1)}
          className="px-4 py-2 bg-surface-container rounded-lg disabled:opacity-50"
        >
          {t('admin.next', 'Next')}
        </button>
      </div>
    </div>
  );
}

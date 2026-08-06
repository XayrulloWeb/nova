import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

export default function NewsManager() {
  const [news, setNews] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isAdding, setIsAdding] = useState(false);
  const { t } = useTranslation();
  const [form, setForm] = useState({ title_uz: '', title_ru: '', content_uz: '', content_ru: '', image: null });

  useEffect(() => {
    fetchNews();
  }, [page]);

  const fetchNews = async () => {
    const res = await fetch(`http://localhost:5000/api/public/news?page=${page}&limit=10`);
    if (res.ok) {
      const json = await res.json();
      setNews(json.data || []);
      setTotalPages(json.totalPages || 1);
    }
  };

  const handleAddNews = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('adminToken');
    const data = new FormData();
    data.append('title_uz', form.title_uz);
    data.append('title_ru', form.title_ru);
    data.append('content_uz', form.content_uz);
    data.append('content_ru', form.content_ru);
    if (form.image) data.append('image', form.image);

    await fetch('http://localhost:5000/api/admin/news', {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${token}` },
      body: data
    });
    
    setForm({ title_uz: '', title_ru: '', content_uz: '', content_ru: '', image: null });
    setIsAdding(false);
    fetchNews();
  };

  const handleDelete = async (id) => {
    if (!window.confirm(t('admin.confirmDelete'))) return;
    const token = localStorage.getItem('adminToken');
    await fetch(`http://localhost:5000/api/admin/news/${id}`, {
      method: 'DELETE',
      headers: { 'Authorization': `Bearer ${token}` }
    });
    fetchNews();
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold">{t('admin.news')}</h2>
        <button 
          onClick={() => setIsAdding(!isAdding)}
          className="bg-primary text-on-primary px-6 py-2 rounded-full font-bold flex items-center gap-2 hover:opacity-90"
        >
          <span className="material-symbols-outlined">{isAdding ? 'close' : 'add'}</span>
          {isAdding ? t('admin.cancel') : t('admin.addNews')}
        </button>
      </div>

      {isAdding && (
        <form onSubmit={handleAddNews} className="glass-card p-8 rounded-3xl mb-12 flex flex-col gap-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <input type="text" placeholder={t('admin.titleUz')} value={form.title_uz} onChange={e => setForm({...form, title_uz: e.target.value})} className="bg-surface-container p-4 rounded-xl border border-outline/20" required />
            <input type="text" placeholder={t('admin.titleRu')} value={form.title_ru} onChange={e => setForm({...form, title_ru: e.target.value})} className="bg-surface-container p-4 rounded-xl border border-outline/20" required />
            <textarea placeholder={t('admin.contentUz')} value={form.content_uz} onChange={e => setForm({...form, content_uz: e.target.value})} className="bg-surface-container p-4 rounded-xl border border-outline/20 h-32" required></textarea>
            <textarea placeholder={t('admin.contentRu')} value={form.content_ru} onChange={e => setForm({...form, content_ru: e.target.value})} className="bg-surface-container p-4 rounded-xl border border-outline/20 h-32" required></textarea>
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

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {news.map(item => (
          <div key={item.id} className="glass-card rounded-3xl overflow-hidden flex flex-col">
            <div className="h-48 bg-surface-container-high relative">
              {item.image_url && <img src={`http://localhost:5000${item.image_url}`} alt="News" className="w-full h-full object-cover" />}
            </div>
            <div className="p-6 flex flex-col flex-grow">
              <h3 className="font-bold text-xl mb-2">{item.title_uz}</h3>
              <p className="text-on-surface-variant line-clamp-2 mb-4 text-sm">{item.content_uz}</p>
              <button 
                onClick={() => handleDelete(item.id)}
                className="mt-auto bg-red-500/10 text-red-500 px-4 py-2 rounded-lg font-bold hover:bg-red-500/20 w-max"
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

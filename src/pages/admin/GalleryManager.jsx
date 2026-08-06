import React, { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';

export default function GalleryManager() {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(null);
  const fileInputRef = useRef(null);

  const fetchImages = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/public/gallery');
      if (!res.ok) throw new Error('Failed to fetch gallery');
      const data = await res.json();
      setImages(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchImages();
  }, []);

  const handleUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const token = localStorage.getItem('adminToken');
    const formData = new FormData();
    formData.append('image', file);

    setUploading(true);
    try {
      const res = await fetch('http://localhost:5000/api/admin/gallery', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formData
      });

      if (!res.ok) throw new Error('Upload failed');
      
      await fetchImages();
    } catch (err) {
      alert(err.message);
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Точно удалить это изображение?')) return;
    
    const token = localStorage.getItem('adminToken');
    try {
      const res = await fetch(`http://localhost:5000/api/admin/gallery/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!res.ok) throw new Error('Delete failed');
      
      setImages(images.filter(img => img.id !== id));
    } catch (err) {
      alert(err.message);
    }
  };

  if (loading) return <div>Загрузка галереи...</div>;

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold">Управление Галереей</h2>
        <div>
          <input 
            type="file" 
            accept="image/*" 
            className="hidden" 
            ref={fileInputRef}
            onChange={handleUpload}
          />
          <button 
            onClick={() => fileInputRef.current?.click()}
            disabled={uploading}
            className="flex items-center gap-2 bg-primary text-on-primary px-4 py-2 rounded-xl font-bold hover:bg-primary/90 transition-colors disabled:opacity-50"
          >
            <span className="material-symbols-outlined">add_photo_alternate</span>
            {uploading ? 'Загрузка...' : 'Добавить фото'}
          </button>
        </div>
      </div>

      {error && (
        <div className="bg-red-500/10 border border-red-500/50 text-red-500 p-4 rounded-xl mb-6">
          {error}
        </div>
      )}

      {images.length === 0 ? (
        <div className="text-center py-12 text-on-surface-variant bg-surface-container rounded-2xl border border-outline/20">
          В галерее пока нет фотографий
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {images.map(img => (
            <div key={img.id} className="relative group rounded-2xl overflow-hidden aspect-square border border-outline/20 bg-surface-container">
              <img 
                src={`http://localhost:5000${img.image_url}`} 
                alt="Gallery" 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <button 
                  onClick={() => handleDelete(img.id)}
                  className="bg-red-500 text-white p-3 rounded-full hover:bg-red-600 hover:scale-110 transition-all shadow-lg"
                  title="Удалить"
                >
                  <span className="material-symbols-outlined">delete</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

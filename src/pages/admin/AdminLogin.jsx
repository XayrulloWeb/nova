import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export default function AdminLogin() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();

  const changeLang = (lang) => {
    i18n.changeLanguage(lang);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      const response = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });
      const data = await response.json();
      
      if (response.ok) {
        localStorage.setItem('adminToken', data.token);
        navigate('/admin/dashboard');
      } else {
        setError(t('admin.errorMsg') || 'Login failed');
      }
    } catch (err) { // eslint-disable-line no-unused-vars
      setError('Network error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-surface-container-lowest p-4 relative">
      <div className="absolute top-4 right-4 flex gap-2">
        <button onClick={() => changeLang('uz')} className={`font-bold ${i18n.language.startsWith('uz') ? 'text-primary' : 'text-on-surface'}`}>UZ</button>
        <span className="text-on-surface-variant">|</span>
        <button onClick={() => changeLang('ru')} className={`font-bold ${i18n.language.startsWith('ru') ? 'text-primary' : 'text-on-surface'}`}>RU</button>
      </div>

      <div className="glass-card p-10 rounded-3xl w-full max-w-md">
        <h2 className="text-3xl font-bold text-center mb-8">{t('admin.loginTitle')}</h2>
        <form onSubmit={handleLogin} className="flex flex-col gap-6">
          <div>
            <label className="block text-sm font-label-caps text-on-surface-variant mb-2">{t('admin.username')}</label>
            <input 
              type="text" 
              value={username} 
              onChange={e => setUsername(e.target.value)} 
              className="w-full bg-surface-container border border-outline/20 rounded-xl p-4 text-on-surface focus:outline-none focus:border-primary"
              required 
            />
          </div>
          <div>
            <label className="block text-sm font-label-caps text-on-surface-variant mb-2">{t('admin.password')}</label>
            <input 
              type="password" 
              value={password} 
              onChange={e => setPassword(e.target.value)} 
              className="w-full bg-surface-container border border-outline/20 rounded-xl p-4 text-on-surface focus:outline-none focus:border-primary"
              required 
            />
          </div>
          {error && <p className="text-red-500 text-sm font-bold text-center">{error}</p>}
          <button 
            type="submit" 
            disabled={loading}
            className="bg-primary text-on-primary py-4 rounded-xl font-bold hover:opacity-90 disabled:opacity-50 mt-4"
          >
            {loading ? '...' : t('admin.loginBtn')}
          </button>
        </form>
      </div>
    </div>
  );
}

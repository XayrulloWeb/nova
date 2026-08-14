import React, { useEffect, useState } from 'react';
import { Link, Outlet, useNavigate, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useSocket } from '../../providers/SocketProvider';
import { useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';

export default function AdminLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  const { t, i18n } = useTranslation();
  const socket = useSocket();
  const queryClient = useQueryClient();

  const changeLang = (lang) => {
    i18n.changeLanguage(lang);
  };

  useEffect(() => {
    if (!socket) return;

    const playSound = () => {
      const audio = new Audio('data:audio/mp3;base64,//OExAAAAANIAAAAAExBTUUzLjEwMKqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq');
      audio.volume = 0.5;
      audio.play().catch(e => console.log('Audio autoplay blocked', e));
    };

    socket.on('new_application', (app) => {
      playSound();
      toast.success(
        <div>
          <b>Новая заявка!</b><br/>
          Ученик: {app.child_name} ({app.grade} класс)
        </div>,
        { duration: 6000, icon: '🎓' }
      );
      queryClient.invalidateQueries({ queryKey: ['adminApplications'] });
    });

    socket.on('new_message', (msg) => {
      playSound();
      toast.success(
        <div>
          <b>Новое сообщение!</b><br/>
          От: {msg.name}
        </div>,
        { duration: 6000, icon: '💬' }
      );
      queryClient.invalidateQueries({ queryKey: ['adminContacts'] });
    });

    socket.on('status_change', () => {
      queryClient.invalidateQueries({ queryKey: ['adminApplications'] });
      queryClient.invalidateQueries({ queryKey: ['adminStudents'] });
    });

    return () => {
      socket.off('new_application');
      socket.off('new_message');
      socket.off('status_change');
    };
  }, [socket, queryClient]);

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (!token) {
      navigate('/admin');
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    navigate('/admin');
  };

  const navItems = [
    { path: '/admin/dashboard', label: t('admin.dashboard', 'Заявки'), icon: 'inbox' },
    { path: '/admin/students', label: t('admin.students', 'Ученики'), icon: 'school' },
    { path: '/admin/news', label: t('admin.news'), icon: 'article' },
    { path: '/admin/teachers', label: t('admin.teachers'), icon: 'school' },
    { path: '/admin/administration', label: t('admin.administration'), icon: 'admin_panel_settings' },
    { path: '/admin/gallery', label: t('admin.gallery'), icon: 'collections' },
    { path: '/admin/stats', label: t('admin.stats'), icon: 'bar_chart' }
  ];

  return (
    <div className="min-h-screen bg-surface-container-lowest text-on-surface flex">
      {/* Sidebar */}
      <aside className="w-64 bg-surface-container border-r border-outline/20 flex flex-col h-screen sticky top-0">
        <div className="p-6 border-b border-outline/20">
          <h1 className="text-2xl font-bold tracking-tight">NOVA <span className="text-primary">Admin</span></h1>
          <div className="flex gap-2 mt-2">
            <button onClick={() => changeLang('uz')} className={`text-sm font-bold ${i18n.language.startsWith('uz') ? 'text-primary' : 'text-on-surface'}`}>UZ</button>
            <span className="text-sm text-on-surface-variant">|</span>
            <button onClick={() => changeLang('ru')} className={`text-sm font-bold ${i18n.language.startsWith('ru') ? 'text-primary' : 'text-on-surface'}`}>RU</button>
          </div>
        </div>
        <nav className="flex-grow p-4 flex flex-col gap-2">
          {navItems.map(item => {
            const isActive = location.pathname.startsWith(item.path);
            return (
              <Link 
                key={item.path} 
                to={item.path} 
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${isActive ? 'bg-primary text-on-primary font-bold' : 'hover:bg-surface-container-high text-on-surface-variant'}`}
              >
                <span className="material-symbols-outlined">{item.icon}</span>
                {item.label}
              </Link>
            );
          })}
        </nav>
        <div className="p-4 border-t border-outline/20">
          <button onClick={handleLogout} className="flex items-center gap-3 px-4 py-3 w-full rounded-xl hover:bg-red-500/10 text-red-500 transition-colors font-bold">
            <span className="material-symbols-outlined">logout</span>
            {t('admin.logout')}
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-grow p-8 min-h-screen">
        <Outlet />
      </main>
    </div>
  );
}

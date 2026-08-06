import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

const STATUS_MAP = {
  'NEW': '🆕 Новая',
  'CALLED': '📞 Позвонили',
  'THINKING': '🤔 Думают',
  'AGREED': '✅ Согласны',
  'REJECTED': '❌ Отказ'
};

const STATUS_COLORS = {
  'NEW': 'bg-blue-500/20 text-blue-400 border-blue-500/30',
  'CALLED': 'bg-purple-500/20 text-purple-400 border-purple-500/30',
  'THINKING': 'bg-orange-500/20 text-orange-400 border-orange-500/30',
  'AGREED': 'bg-green-500/20 text-green-400 border-green-500/30',
  'REJECTED': 'bg-red-500/20 text-red-400 border-red-500/30'
};

export default function ApplicationsManager() {
  const [applications, setApplications] = useState([]);
  const [appPage, setAppPage] = useState(1);
  const [appTotalPages, setAppTotalPages] = useState(1);

  const [contacts, setContacts] = useState([]);
  const [contPage] = useState(1);

  const { t } = useTranslation();

  useEffect(() => {
    fetchApplications();
  }, [appPage]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    fetchContacts();
  }, [contPage]); // eslint-disable-line react-hooks/exhaustive-deps

  const fetchApplications = async () => {
    const token = localStorage.getItem('adminToken');
    try {
      const res = await fetch(`http://localhost:5000/api/admin/applications?page=${appPage}&limit=10`, { headers: { 'Authorization': `Bearer ${token}` } });
      if (res.ok) {
        const json = await res.json();
        setApplications(json.data || []);
        setAppTotalPages(json.totalPages || 1);
      }
    } catch (error) { // eslint-disable-line no-unused-vars
      console.error('Failed to fetch applications');
    }
  };

  const fetchContacts = async () => {
    const token = localStorage.getItem('adminToken');
    try {
      const res = await fetch(`http://localhost:5000/api/admin/contacts?page=${contPage}&limit=10`, { headers: { 'Authorization': `Bearer ${token}` } });
      if (res.ok) {
        const json = await res.json();
        setContacts(json.data || []);
        setContTotalPages(json.totalPages || 1);
      }
    } catch (error) { // eslint-disable-line no-unused-vars
      console.error('Failed to fetch contacts');
    }
  };

  const updateStatus = async (id, newStatus) => {
    const token = localStorage.getItem('adminToken');
    try {
      await fetch(`http://localhost:5000/api/admin/applications/${id}/status`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ status: newStatus })
      });
      fetchApplications();
    } catch (err) {
      console.error('Failed to update status', err);
    }
  };

  const updateComment = async (id, comment) => {
    const token = localStorage.getItem('adminToken');
    try {
      await fetch(`http://localhost:5000/api/admin/applications/${id}/comment`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ comment })
      });
      fetchApplications();
    } catch (err) {
      console.error('Failed to update comment', err);
    }
  };

  const exportToCSV = async () => {
    const token = localStorage.getItem('adminToken');
    try {
      // Fetch all without limit for export
      const res = await fetch(`http://localhost:5000/api/admin/applications?page=1&limit=1000`, { headers: { 'Authorization': `Bearer ${token}` } });
      if (res.ok) {
        const json = await res.json();
        const data = json.data;
        
        const headers = ["ID", "Родитель", "Телефон", "Ученик", "Д.Рождения", "Класс", "Статус", "Дата", "Комментарий"];
        const rows = data.map(app => [
          app.id,
          app.parent_name,
          app.parent_phone,
          app.child_name,
          new Date(app.child_dob).toLocaleDateString(),
          app.grade,
          STATUS_MAP[app.status] || app.status,
          new Date(app.created_at).toLocaleString(),
          app.comment || ''
        ]);

        const csvContent = "data:text/csv;charset=utf-8,\uFEFF" 
          + [headers.join(","), ...rows.map(e => e.map(cell => `"${String(cell).replace(/"/g, '""')}"`).join(","))].join("\n");
        
        const encodedUri = encodeURI(csvContent);
        const link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", `applications_${new Date().toLocaleDateString()}.csv`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }
    } catch (error) {
      console.error('Export failed', error);
    }
  };

  return (
    <div className="flex flex-col gap-12">
      <section>
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <h2 className="text-3xl font-bold">{t('admin.applications')}</h2>
          <button 
            onClick={exportToCSV}
            className="px-6 py-2 bg-primary text-on-primary rounded-lg font-semibold hover:opacity-90 flex items-center gap-2 mt-4 md:mt-0"
          >
            <span className="material-symbols-outlined">download</span>
            Экспорт в CSV
          </button>
        </div>

        <div className="bg-surface-container rounded-2xl overflow-hidden border border-outline/20 overflow-x-auto">
          <table className="w-full text-left min-w-[800px]">
            <thead className="bg-surface-container-high text-on-surface-variant font-label-caps text-xs">
              <tr>
                <th className="p-4">{t('forms.parentName')}</th>
                <th className="p-4">{t('admin.phone')}</th>
                <th className="p-4">{t('forms.childName')} / {t('admin.grade')}</th>
                <th className="p-4">Статус</th>
                <th className="p-4">Комментарий</th>
                <th className="p-4">{t('admin.date')}</th>
              </tr>
            </thead>
            <tbody>
              {applications.length === 0 && <tr><td colSpan="6" className="p-4 text-center">Arizalar yo'q.</td></tr>}
              {applications.map(app => (
                <tr key={app.id} className="border-t border-outline/10 hover:bg-surface-container-high/50 group">
                  <td className="p-4 align-top font-semibold">{app.parent_name}</td>
                  <td className="p-4 align-top">{app.parent_phone}</td>
                  <td className="p-4 align-top">
                    <div>{app.child_name}</div>
                    <div className="text-sm text-on-surface-variant">{app.grade} ({new Date(app.child_dob).toLocaleDateString()})</div>
                  </td>
                  <td className="p-4 align-top">
                    <select
                      value={app.status || 'NEW'}
                      onChange={(e) => updateStatus(app.id, e.target.value)}
                      className={`px-3 py-1.5 rounded border outline-none appearance-none font-semibold text-sm cursor-pointer ${STATUS_COLORS[app.status || 'NEW'] || STATUS_COLORS['NEW']}`}
                    >
                      {Object.entries(STATUS_MAP).map(([key, label]) => (
                        <option key={key} value={key} className="bg-surface text-on-surface">{label}</option>
                      ))}
                    </select>
                  </td>
                  <td className="p-4 align-top min-w-[200px]">
                    <textarea
                      defaultValue={app.comment || ''}
                      onBlur={(e) => updateComment(app.id, e.target.value)}
                      placeholder="Нажмите чтобы добавить комментарий..."
                      className="w-full bg-transparent border border-outline/20 rounded p-2 text-sm focus:border-primary focus:bg-surface-container-high outline-none resize-none transition-all"
                      rows="2"
                    ></textarea>
                  </td>
                  <td className="p-4 align-top text-sm text-on-surface-variant">
                    {new Date(app.created_at).toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex justify-between items-center mt-4">
          <button 
            disabled={appPage <= 1} 
            onClick={() => setAppPage(appPage - 1)}
            className="px-4 py-2 bg-surface-container rounded-lg disabled:opacity-50"
          >
            {t('admin.prev', 'Previous')}
          </button>
          <span>Page {appPage} of {appTotalPages || 1}</span>
          <button 
            disabled={appPage >= appTotalPages} 
            onClick={() => setAppPage(appPage + 1)}
            className="px-4 py-2 bg-surface-container rounded-lg disabled:opacity-50"
          >
            {t('admin.next', 'Next')}
          </button>
        </div>
      </section>

      <section>
        <h2 className="text-3xl font-bold mb-6">{t('admin.contacts')}</h2>
        <div className="bg-surface-container rounded-2xl overflow-hidden border border-outline/20">
          <table className="w-full text-left">
            <thead className="bg-surface-container-high text-on-surface-variant font-label-caps text-xs">
              <tr>
                <th className="p-4">{t('forms.parentName')}</th>
                <th className="p-4">{t('admin.phone')}</th>
                <th className="p-4 w-1/2">{t('forms.contactMessage')}</th>
                <th className="p-4">{t('admin.date')}</th>
              </tr>
            </thead>
            <tbody>
              {contacts.length === 0 && <tr><td colSpan="4" className="p-4 text-center">Xabarlar yo'q.</td></tr>}
              {contacts.map(msg => (
                <tr key={msg.id} className="border-t border-outline/10 hover:bg-surface-container-high/50">
                  <td className="p-4">{msg.name}</td>
                  <td className="p-4">{msg.phone}</td>
                  <td className="p-4 text-on-surface-variant">{msg.message}</td>
                  <td className="p-4">{new Date(msg.created_at).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}

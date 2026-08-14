import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import api from '../../api/axios';
import ContractWizard from './ContractWizard';
import PrintableContract from './PrintableContract';

const STATUS_MAP = {
  'NEW': '🆕 Новая',
  'CALLED': '📞 Позвонили',
  'THINKING': '🤔 Думают',
  'AGREED': '✅ Согласны',
  'REJECTED': '❌ Отказ',
  'CONTRACT_ISSUED': '📜 Договор выдан'
};

const STATUS_COLORS = {
  'NEW': 'bg-blue-500/20 text-blue-400 border-blue-500/30',
  'CALLED': 'bg-purple-500/20 text-purple-400 border-purple-500/30',
  'THINKING': 'bg-orange-500/20 text-orange-400 border-orange-500/30',
  'AGREED': 'bg-green-500/20 text-green-400 border-green-500/30',
  'REJECTED': 'bg-red-500/20 text-red-400 border-red-500/30',
  'CONTRACT_ISSUED': 'bg-indigo-500/20 text-indigo-400 border-indigo-500/30'
};

export default function ApplicationsManager() {
  const [applications, setApplications] = useState([]);
  const [appPage, setAppPage] = useState(1);
  const [appTotalPages, setAppTotalPages] = useState(1);

  const [contacts, setContacts] = useState([]);
  const [contPage, setContPage] = useState(1);
  const [contTotalPages, setContTotalPages] = useState(1);

  const [isAddingApp, setIsAddingApp] = useState(false);
  const [addAppForm, setAddAppForm] = useState({ parentName: '', parentPhone: '', childName: '', childDob: '', grade: '1' });
  const [wizardApp, setWizardApp] = useState(null);
  const [printContract, setPrintContract] = useState(null);

  const { t } = useTranslation();

  useEffect(() => {
    fetchApplications();
  }, [appPage]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    fetchContacts();
  }, [contPage]); // eslint-disable-line react-hooks/exhaustive-deps

  const fetchApplications = async () => {
    try {
      const res = await api.get(`/admin/applications?page=${appPage}&limit=10`);
      setApplications(res.data.data || []);
      setAppTotalPages(res.data.totalPages || 1);
    } catch (error) {
      console.error('Failed to fetch applications');
    }
  };

  const fetchContacts = async () => {
    try {
      const res = await api.get(`/admin/contacts?page=${contPage}&limit=10`);
      setContacts(res.data.data || []);
      setContTotalPages(res.data.totalPages || 1);
    } catch (error) {
      console.error('Failed to fetch contacts');
    }
  };

  const updateStatus = async (id, newStatus) => {
    try {
      await api.put(`/admin/applications/${id}/status`, { status: newStatus });
      setApplications(applications.map(app => 
        app.id === id ? { ...app, status: newStatus } : app
      ));
    } catch (err) {
      console.error('Failed to update status', err);
    }
  };

  const updateComment = async (id, comment) => {
    try {
      await api.put(`/admin/applications/${id}/comment`, { comment });
      setApplications(applications.map(app => 
        app.id === id ? { ...app, comment } : app
      ));
    } catch (err) {
      console.error('Failed to update comment', err);
    }
  };

  const handleAddApplication = async (e) => {
    e.preventDefault();
    try {
      await api.post('/admin/applications', addAppForm);
      setIsAddingApp(false);
      setAddAppForm({ parentName: '', parentPhone: '', childName: '', childDob: '', grade: '1' });
      fetchApplications();
    } catch (err) {
      console.error('Failed to add application', err);
      alert('Ошибка при добавлении ученика');
    }
  };

  const onContractWizardComplete = (contractData) => {
    setApplications(applications.map(app => 
      app.id === wizardApp.id ? { ...app, status: 'CONTRACT_ISSUED' } : app
    ));
    setPrintContract({ application: wizardApp, contract: contractData });
    setWizardApp(null);
  };

  const exportToCSV = async () => {
    try {
      const res = await api.get(`/admin/applications?page=1&limit=1000`);
      const data = res.data.data;
      
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
    } catch (error) {
      console.error('Export failed', error);
    }
  };

  return (
    <div className="flex flex-col gap-12">
      <section>
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <h2 className="text-3xl font-bold">{t('admin.applications')}</h2>
          <div className="flex gap-2">
            <button 
              onClick={() => setIsAddingApp(true)}
              className="px-6 py-2 bg-primary text-on-primary rounded-lg font-semibold hover:opacity-90 flex items-center gap-2"
            >
              <span className="material-symbols-outlined">add</span>
              Добавить
            </button>
            <button 
              onClick={exportToCSV}
              className="px-6 py-2 bg-primary text-on-primary rounded-lg font-semibold hover:opacity-90 flex items-center gap-2"
            >
              <span className="material-symbols-outlined">download</span>
              CSV
            </button>
          </div>
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
                    <div className="flex flex-col gap-2">
                      <select
                        value={app.status || 'NEW'}
                        onChange={(e) => updateStatus(app.id, e.target.value)}
                        className={`px-3 py-1.5 rounded border outline-none appearance-none font-semibold text-sm cursor-pointer ${STATUS_COLORS[app.status || 'NEW'] || STATUS_COLORS['NEW']}`}
                      >
                        {Object.entries(STATUS_MAP).map(([key, label]) => (
                          <option key={key} value={key} className="bg-surface text-on-surface">{label}</option>
                        ))}
                      </select>
                      {(app.status === 'AGREED' || app.status === 'CONTRACT_ISSUED') && (
                        <button 
                          onClick={() => setWizardApp(app)}
                          className="px-3 py-1 bg-indigo-600 text-white text-xs font-bold rounded-lg shadow-sm hover:bg-indigo-700 transition-colors flex items-center justify-center gap-1"
                        >
                          <span className="material-symbols-outlined text-[14px]">contract</span>
                          Shartnoma
                        </button>
                      )}
                    </div>
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

      {isAddingApp && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 p-4">
          <form onSubmit={handleAddApplication} className="bg-surface w-full max-w-md rounded-3xl p-6 shadow-xl flex flex-col gap-4">
            <h2 className="text-xl font-bold">Добавить ученика</h2>
            <div>
              <label className="block text-xs font-bold mb-1">Ф.И.О. Родителя</label>
              <input required type="text" value={addAppForm.parentName} onChange={e => setAddAppForm({...addAppForm, parentName: e.target.value})} className="w-full bg-surface-container p-3 rounded-lg border border-outline/20 outline-none" />
            </div>
            <div>
              <label className="block text-xs font-bold mb-1">Телефон</label>
              <input required type="tel" value={addAppForm.parentPhone} onChange={e => setAddAppForm({...addAppForm, parentPhone: e.target.value})} className="w-full bg-surface-container p-3 rounded-lg border border-outline/20 outline-none" />
            </div>
            <div>
              <label className="block text-xs font-bold mb-1">Ф.И.О. Ученика</label>
              <input required type="text" value={addAppForm.childName} onChange={e => setAddAppForm({...addAppForm, childName: e.target.value})} className="w-full bg-surface-container p-3 rounded-lg border border-outline/20 outline-none" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold mb-1">Дата рождения</label>
                <input required type="date" value={addAppForm.childDob} onChange={e => setAddAppForm({...addAppForm, childDob: e.target.value})} className="w-full bg-surface-container p-3 rounded-lg border border-outline/20 outline-none" />
              </div>
              <div>
                <label className="block text-xs font-bold mb-1">Класс</label>
                <input required type="number" min="1" max="11" value={addAppForm.grade} onChange={e => setAddAppForm({...addAppForm, grade: e.target.value})} className="w-full bg-surface-container p-3 rounded-lg border border-outline/20 outline-none" />
              </div>
            </div>
            <div className="flex gap-2 justify-end mt-4">
              <button type="button" onClick={() => setIsAddingApp(false)} className="px-4 py-2 font-bold text-on-surface-variant">Отмена</button>
              <button type="submit" className="px-4 py-2 bg-primary text-on-primary rounded-xl font-bold">Сохранить</button>
            </div>
          </form>
        </div>
      )}

      {/* Contract Wizard Modal */}
      {wizardApp && (
        <ContractWizard 
          application={wizardApp} 
          onClose={() => setWizardApp(null)} 
          onComplete={onContractWizardComplete} 
        />
      )}

      {/* Printable Contract Overlay */}
      {printContract && (
        <PrintableContract 
          application={printContract.application} 
          contract={printContract.contract} 
          onClose={() => setPrintContract(null)} 
        />
      )}
    </div>
  );
}

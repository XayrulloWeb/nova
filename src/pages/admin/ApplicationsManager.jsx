import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

export default function ApplicationsManager() {
  const [applications, setApplications] = useState([]);
  const [contacts, setContacts] = useState([]);
  const { t } = useTranslation();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const token = localStorage.getItem('adminToken');
    const headers = { 'Authorization': `Bearer ${token}` };

    try {
      const [appRes, contRes] = await Promise.all([
        fetch('http://localhost:5000/api/admin/applications', { headers }),
        fetch('http://localhost:5000/api/admin/contacts', { headers })
      ]);
      
      if (appRes.ok) setApplications(await appRes.json());
      if (contRes.ok) setContacts(await contRes.json());
    } catch (error) {
      console.error('Failed to fetch data');
    }
  };

  return (
    <div className="flex flex-col gap-12">
      <section>
        <h2 className="text-3xl font-bold mb-6">{t('admin.applications')}</h2>
        <div className="bg-surface-container rounded-2xl overflow-hidden border border-outline/20">
          <table className="w-full text-left">
            <thead className="bg-surface-container-high text-on-surface-variant font-label-caps text-xs">
              <tr>
                <th className="p-4">{t('forms.parentName')}</th>
                <th className="p-4">{t('admin.phone')}</th>
                <th className="p-4">{t('forms.childName')}</th>
                <th className="p-4">{t('forms.childDob')}</th>
                <th className="p-4">{t('admin.grade')}</th>
                <th className="p-4">{t('admin.date')}</th>
              </tr>
            </thead>
            <tbody>
              {applications.length === 0 && <tr><td colSpan="6" className="p-4 text-center">Arizalar yo'q.</td></tr>}
              {applications.map(app => (
                <tr key={app.id} className="border-t border-outline/10 hover:bg-surface-container-high/50">
                  <td className="p-4">{app.parent_name}</td>
                  <td className="p-4">{app.parent_phone}</td>
                  <td className="p-4">{app.child_name}</td>
                  <td className="p-4">{new Date(app.child_dob).toLocaleDateString()}</td>
                  <td className="p-4">{app.grade}</td>
                  <td className="p-4">{new Date(app.created_at).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
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

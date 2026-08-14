import React, { useState, useEffect } from 'react';
import api from '../../api/axios';

export default function ContractWizard({ application, onClose, onComplete }) {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    contract_number: '',
    contract_date: new Date().toISOString().split('T')[0],
    academic_year: '2026/2027',
    parent_passport_series: '',
    parent_passport_number: '',
    parent_passport_issue_date: '',
    parent_passport_issued_by: '',
    parent_pinfl: '',
    parent_dob: '',
    parent_address: '',
    child_doc_series: '',
    child_doc_number: '',
    child_doc_issue_date: '',
    child_doc_issued_by: '',
    monthly_fee: ''
  });

  useEffect(() => {
    // Try to load existing contract data if it was already filled
    api.get(`/admin/contracts/${application.id}`)
      .then(res => {
        if (res.data && res.data.id) {
          const d = res.data;
          setForm({
            ...form,
            contract_number: d.contract_number || '',
            contract_date: d.contract_date ? d.contract_date.split('T')[0] : form.contract_date,
            academic_year: d.academic_year || form.academic_year,
            parent_passport_series: d.parent_passport_series || '',
            parent_passport_number: d.parent_passport_number || '',
            parent_passport_issue_date: d.parent_passport_issue_date ? d.parent_passport_issue_date.split('T')[0] : '',
            parent_passport_issued_by: d.parent_passport_issued_by || '',
            parent_pinfl: d.parent_pinfl || '',
            parent_dob: d.parent_dob ? d.parent_dob.split('T')[0] : '',
            parent_address: d.parent_address || '',
            child_doc_series: d.child_doc_series || '',
            child_doc_number: d.child_doc_number || '',
            child_doc_issue_date: d.child_doc_issue_date ? d.child_doc_issue_date.split('T')[0] : '',
            child_doc_issued_by: d.child_doc_issued_by || '',
            monthly_fee: d.monthly_fee || ''
          });
        }
      })
      .catch(console.error);
  }, [application.id]);

  const handleNext = () => setStep(step + 1);
  const handlePrev = () => setStep(step - 1);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await api.post(`/admin/contracts/${application.id}`, form);
      onComplete(res.data);
    } catch (err) {
      console.error(err);
      alert('Ошибка при сохранении договора');
    } finally {
      setLoading(false);
    }
  };

  const inputClass = "w-full bg-surface-container p-3 rounded-lg border border-outline/20 outline-none focus:border-primary transition-colors text-sm";

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 p-4">
      <div className="bg-surface w-full max-w-2xl rounded-3xl shadow-xl overflow-hidden flex flex-col max-h-[90vh]">
        
        <div className="p-6 border-b border-outline/10 flex justify-between items-center bg-surface-container-lowest">
          <h2 className="text-xl font-bold">Оформление договора (Шаг {step}/3)</h2>
          <button onClick={onClose} className="w-8 h-8 rounded-full bg-surface-container hover:bg-red-500/10 hover:text-red-500 flex items-center justify-center transition-colors">
            <span className="material-symbols-outlined text-sm">close</span>
          </button>
        </div>

        <div className="p-6 overflow-y-auto flex-grow bg-surface">
          {step === 1 && (
            <div className="flex flex-col gap-4">
              <h3 className="font-bold text-primary mb-2">Финансы и данные договора</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold mb-1 text-on-surface-variant">Номер договора</label>
                  <input type="text" value={form.contract_number} onChange={e => setForm({...form, contract_number: e.target.value})} className={inputClass} placeholder="Например: 123" />
                </div>
                <div>
                  <label className="block text-xs font-bold mb-1 text-on-surface-variant">Дата договора</label>
                  <input type="date" value={form.contract_date} onChange={e => setForm({...form, contract_date: e.target.value})} className={inputClass} />
                </div>
                <div>
                  <label className="block text-xs font-bold mb-1 text-on-surface-variant">Учебный год</label>
                  <input type="text" value={form.academic_year} onChange={e => setForm({...form, academic_year: e.target.value})} className={inputClass} />
                </div>
                <div>
                  <label className="block text-xs font-bold mb-1 text-on-surface-variant">Сумма оплаты в месяц (сум)</label>
                  <input type="number" value={form.monthly_fee} onChange={e => setForm({...form, monthly_fee: e.target.value})} className={inputClass} placeholder="2000000" />
                </div>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="flex flex-col gap-4">
              <h3 className="font-bold text-primary mb-2">Документы Родителя ({application.parent_name})</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold mb-1 text-on-surface-variant">ПИНФЛ (JShShIR)</label>
                  <input type="text" maxLength="14" value={form.parent_pinfl} onChange={e => setForm({...form, parent_pinfl: e.target.value})} className={inputClass} placeholder="14 цифр" />
                </div>
                <div>
                  <label className="block text-xs font-bold mb-1 text-on-surface-variant">Дата рождения</label>
                  <input type="date" value={form.parent_dob} onChange={e => setForm({...form, parent_dob: e.target.value})} className={inputClass} />
                </div>
                <div>
                  <label className="block text-xs font-bold mb-1 text-on-surface-variant">Серия паспорта</label>
                  <input type="text" maxLength="2" value={form.parent_passport_series} onChange={e => setForm({...form, parent_passport_series: e.target.value})} className={inputClass} placeholder="AB" />
                </div>
                <div>
                  <label className="block text-xs font-bold mb-1 text-on-surface-variant">Номер паспорта</label>
                  <input type="text" maxLength="7" value={form.parent_passport_number} onChange={e => setForm({...form, parent_passport_number: e.target.value})} className={inputClass} placeholder="1234567" />
                </div>
                <div>
                  <label className="block text-xs font-bold mb-1 text-on-surface-variant">Дата выдачи паспорта</label>
                  <input type="date" value={form.parent_passport_issue_date} onChange={e => setForm({...form, parent_passport_issue_date: e.target.value})} className={inputClass} />
                </div>
                <div>
                  <label className="block text-xs font-bold mb-1 text-on-surface-variant">Кем выдан</label>
                  <input type="text" value={form.parent_passport_issued_by} onChange={e => setForm({...form, parent_passport_issued_by: e.target.value})} className={inputClass} placeholder="ИИБ" />
                </div>
                <div className="col-span-2">
                  <label className="block text-xs font-bold mb-1 text-on-surface-variant">Адрес прописки (Viloyat, shahar, ko'cha, uy)</label>
                  <input type="text" value={form.parent_address} onChange={e => setForm({...form, parent_address: e.target.value})} className={inputClass} />
                </div>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="flex flex-col gap-4">
              <h3 className="font-bold text-primary mb-2">Документы Ученика ({application.child_name}, {application.grade}-класс)</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold mb-1 text-on-surface-variant">Серия метрики/паспорта</label>
                  <input type="text" value={form.child_doc_series} onChange={e => setForm({...form, child_doc_series: e.target.value})} className={inputClass} placeholder="I-XR" />
                </div>
                <div>
                  <label className="block text-xs font-bold mb-1 text-on-surface-variant">Номер документа</label>
                  <input type="text" value={form.child_doc_number} onChange={e => setForm({...form, child_doc_number: e.target.value})} className={inputClass} placeholder="1234567" />
                </div>
                <div>
                  <label className="block text-xs font-bold mb-1 text-on-surface-variant">Дата выдачи документа</label>
                  <input type="date" value={form.child_doc_issue_date} onChange={e => setForm({...form, child_doc_issue_date: e.target.value})} className={inputClass} />
                </div>
                <div>
                  <label className="block text-xs font-bold mb-1 text-on-surface-variant">Кем выдан</label>
                  <input type="text" value={form.child_doc_issued_by} onChange={e => setForm({...form, child_doc_issued_by: e.target.value})} className={inputClass} placeholder="ИИБ/ФХДЁ" />
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="p-6 border-t border-outline/10 bg-surface-container-lowest flex justify-between">
          <button 
            type="button" 
            onClick={step === 1 ? onClose : handlePrev}
            className="px-6 py-2 rounded-xl font-bold bg-surface-container hover:bg-surface-container-high transition-colors text-on-surface-variant"
          >
            {step === 1 ? 'Отмена' : 'Назад'}
          </button>
          
          {step < 3 ? (
            <button 
              type="button" 
              onClick={handleNext}
              className="px-6 py-2 rounded-xl font-bold bg-primary text-on-primary hover:opacity-90 transition-opacity"
            >
              Далее
            </button>
          ) : (
            <button 
              type="button" 
              onClick={handleSubmit}
              disabled={loading}
              className="px-6 py-2 rounded-xl font-bold bg-green-600 text-white hover:bg-green-700 transition-colors flex items-center gap-2 disabled:opacity-50"
            >
              <span className="material-symbols-outlined text-sm">print</span>
              {loading ? 'Сохранение...' : 'Сохранить и Печатать'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

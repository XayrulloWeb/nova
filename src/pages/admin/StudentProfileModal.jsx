import { useState } from 'react';
import axios from '../../api/axios';
import PrintableContract from './PrintableContract';

export default function StudentProfileModal({ student, onClose, onUpdate }) {
  const [activeTab, setActiveTab] = useState('info');
  const [isPrinting, setIsPrinting] = useState(false);
  
  // Payment Form State
  const [isAddingPayment, setIsAddingPayment] = useState(false);
  const [paymentForm, setPaymentForm] = useState({
    amount: '',
    payment_month: '',
    payment_method: 'Наличные',
    comment: ''
  });

  const handleAddPayment = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`/admin/students/${student.id}/payments`, paymentForm);
      setIsAddingPayment(false);
      setPaymentForm({ amount: '', payment_month: '', payment_method: 'Наличные', comment: '' });
      if (onUpdate) onUpdate();
    } catch (error) {
      console.error('Error adding payment:', error);
      alert('Ошибка при добавлении платежа');
    }
  };

  const handleDeletePayment = async (paymentId) => {
    if (!window.confirm('Вы уверены, что хотите удалить этот платеж?')) return;
    try {
      await axios.delete(`/admin/payments/${paymentId}`);
      if (onUpdate) onUpdate();
    } catch (error) {
      console.error('Error deleting payment:', error);
      alert('Ошибка при удалении платежа');
    }
  };

  const inputClass = "w-full bg-surface-container p-3 rounded-lg border border-outline/20 outline-none focus:border-primary text-sm";

  return (
    <div className="fixed inset-0 z-[150] bg-black/60 flex items-center justify-center p-4">
      <div className="bg-surface w-full max-w-4xl rounded-3xl shadow-xl flex flex-col max-h-[90vh] overflow-hidden" data-lenis-prevent="true">
        
        {/* Header */}
        <div className="p-6 border-b border-outline/20 flex justify-between items-center bg-surface-container-low">
          <div>
            <h2 className="text-2xl font-bold">{student.child_name}</h2>
            <p className="text-sm text-on-surface-variant">Личное дело ученика ({student.grade} класс)</p>
          </div>
          <button onClick={onClose} className="w-10 h-10 rounded-full bg-surface-container hover:bg-surface-container-high flex items-center justify-center">
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        {/* Tabs */}
        <div className="flex px-6 pt-4 border-b border-outline/10 gap-6">
          <button 
            className={`pb-3 text-sm font-bold border-b-2 transition-colors ${activeTab === 'info' ? 'border-primary text-primary' : 'border-transparent text-on-surface-variant'}`}
            onClick={() => setActiveTab('info')}
          >
            Информация и Договор
          </button>
          <button 
            className={`pb-3 text-sm font-bold border-b-2 transition-colors ${activeTab === 'finance' ? 'border-primary text-primary' : 'border-transparent text-on-surface-variant'}`}
            onClick={() => setActiveTab('finance')}
          >
            Финансы (Оплаты)
          </button>
        </div>

        {/* Body */}
        <div className="p-6 overflow-y-auto flex-grow bg-surface-container-lowest" data-lenis-prevent="true">
          
          {activeTab === 'info' && (
            <div className="flex flex-col gap-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* Child Info */}
                <div className="bg-surface-container-low p-5 rounded-2xl border border-outline/10">
                  <h3 className="font-bold mb-4 flex items-center gap-2">
                    <span className="material-symbols-outlined text-primary">face</span> Данные ученика
                  </h3>
                  <div className="flex flex-col gap-2 text-sm">
                    <div className="flex justify-between"><span className="text-on-surface-variant">ФИО:</span> <span className="font-medium text-right">{student.child_name}</span></div>
                    <div className="flex justify-between"><span className="text-on-surface-variant">Класс:</span> <span className="font-medium text-right">{student.grade}</span></div>
                    <div className="flex justify-between"><span className="text-on-surface-variant">Дата рождения:</span> <span className="font-medium text-right">{new Date(student.child_dob).toLocaleDateString()}</span></div>
                    {student.contract && (
                      <>
                        <div className="flex justify-between"><span className="text-on-surface-variant">Метрика/Паспорт:</span> <span className="font-medium text-right">{student.contract.child_doc_series} {student.contract.child_doc_number}</span></div>
                        <div className="flex justify-between"><span className="text-on-surface-variant">Выдан:</span> <span className="font-medium text-right">{student.contract.child_doc_issued_by} ({new Date(student.contract.child_doc_issue_date).toLocaleDateString()})</span></div>
                      </>
                    )}
                  </div>
                </div>

                {/* Parent Info */}
                <div className="bg-surface-container-low p-5 rounded-2xl border border-outline/10">
                  <h3 className="font-bold mb-4 flex items-center gap-2">
                    <span className="material-symbols-outlined text-primary">family_restroom</span> Данные родителя
                  </h3>
                  <div className="flex flex-col gap-2 text-sm">
                    <div className="flex justify-between"><span className="text-on-surface-variant">ФИО:</span> <span className="font-medium text-right">{student.parent_name}</span></div>
                    <div className="flex justify-between"><span className="text-on-surface-variant">Телефон:</span> <span className="font-medium text-right">{student.parent_phone}</span></div>
                    {student.contract && (
                      <>
                        <div className="flex justify-between"><span className="text-on-surface-variant">ПИНФЛ:</span> <span className="font-medium text-right">{student.contract.parent_pinfl}</span></div>
                        <div className="flex justify-between"><span className="text-on-surface-variant">Паспорт:</span> <span className="font-medium text-right">{student.contract.parent_passport_series} {student.contract.parent_passport_number}</span></div>
                        <div className="flex justify-between"><span className="text-on-surface-variant">Выдан:</span> <span className="font-medium text-right">{student.contract.parent_passport_issued_by} ({new Date(student.contract.parent_passport_issue_date).toLocaleDateString()})</span></div>
                        <div className="flex justify-between"><span className="text-on-surface-variant">Прописка:</span> <span className="font-medium text-right max-w-[200px]">{student.contract.parent_address}</span></div>
                      </>
                    )}
                  </div>
                </div>
              </div>

              {/* Contract Action */}
              <div className="bg-primary/5 p-6 rounded-2xl border border-primary/20 flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-primary mb-1">Договор на обучение</h3>
                  {student.contract ? (
                    <p className="text-sm text-on-surface-variant">Договор №{student.contract.contract_number} от {new Date(student.contract.contract_date).toLocaleDateString()}</p>
                  ) : (
                    <p className="text-sm text-red-500">Договор еще не сгенерирован.</p>
                  )}
                </div>
                {student.contract && (
                  <button 
                    onClick={() => setIsPrinting(true)}
                    className="flex items-center gap-2 px-6 py-3 bg-primary text-on-primary rounded-xl font-bold shadow-lg shadow-primary/30 hover:bg-primary/90 transition-all"
                  >
                    <span className="material-symbols-outlined text-sm">print</span>
                    Распечатать
                  </button>
                )}
              </div>
            </div>
          )}

          {activeTab === 'finance' && (
            <div className="flex flex-col gap-6">
              
              <div className="flex justify-between items-center">
                <h3 className="font-bold text-lg">История платежей</h3>
                {!isAddingPayment && (
                  <button 
                    onClick={() => setIsAddingPayment(true)}
                    className="px-4 py-2 bg-primary text-on-primary text-sm font-bold rounded-lg flex items-center gap-2"
                  >
                    <span className="material-symbols-outlined text-sm">add</span> Добавить оплату
                  </button>
                )}
              </div>

              {isAddingPayment && (
                <form onSubmit={handleAddPayment} className="bg-surface-container-low p-5 rounded-2xl border border-primary/30 flex flex-col gap-4">
                  <h4 className="font-bold text-sm">Новый платеж</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold mb-1">Сумма (сум)</label>
                      <input required type="text" value={paymentForm.amount} onChange={e => setPaymentForm({...paymentForm, amount: e.target.value})} className={inputClass} placeholder="Например: 2990000" />
                    </div>
                    <div>
                      <label className="block text-xs font-bold mb-1">За какой месяц</label>
                      <input required type="text" value={paymentForm.payment_month} onChange={e => setPaymentForm({...paymentForm, payment_month: e.target.value})} className={inputClass} placeholder="Сентябрь 2026" />
                    </div>
                    <div>
                      <label className="block text-xs font-bold mb-1">Способ оплаты</label>
                      <select value={paymentForm.payment_method} onChange={e => setPaymentForm({...paymentForm, payment_method: e.target.value})} className={inputClass}>
                        <option value="Наличные">Наличные</option>
                        <option value="Терминал">Терминал (Карта)</option>
                        <option value="Перевод">Перевод (Click/Payme)</option>
                        <option value="Банковский счет">Банковский счет</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-bold mb-1">Комментарий (необязательно)</label>
                      <input type="text" value={paymentForm.comment} onChange={e => setPaymentForm({...paymentForm, comment: e.target.value})} className={inputClass} />
                    </div>
                  </div>
                  <div className="flex justify-end gap-2 mt-2">
                    <button type="button" onClick={() => setIsAddingPayment(false)} className="px-4 py-2 text-sm font-bold text-on-surface-variant">Отмена</button>
                    <button type="submit" className="px-6 py-2 bg-primary text-on-primary text-sm font-bold rounded-lg">Сохранить</button>
                  </div>
                </form>
              )}

              <div className="bg-surface-container overflow-hidden rounded-2xl border border-outline/10">
                <table className="w-full text-left text-sm">
                  <thead className="bg-surface-container-high text-on-surface-variant">
                    <tr>
                      <th className="p-4">Дата платежа</th>
                      <th className="p-4">За месяц</th>
                      <th className="p-4">Сумма</th>
                      <th className="p-4">Способ</th>
                      <th className="p-4 text-right"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {(!student.payments || student.payments.length === 0) && (
                      <tr><td colSpan="5" className="p-6 text-center text-on-surface-variant">Оплат пока нет.</td></tr>
                    )}
                    {student.payments && student.payments.map(payment => (
                      <tr key={payment.id} className="border-t border-outline/10 hover:bg-surface-container-high/50">
                        <td className="p-4 font-medium">{new Date(payment.created_at).toLocaleString()}</td>
                        <td className="p-4">{payment.payment_month}</td>
                        <td className="p-4 font-bold text-green-600">
                          {Number(payment.amount.replace(/\D/g, '')).toLocaleString()} сум
                        </td>
                        <td className="p-4">
                          <span className="px-2 py-1 bg-surface-container-highest rounded-md text-xs">{payment.payment_method}</span>
                          {payment.comment && <div className="text-xs text-on-surface-variant mt-1">{payment.comment}</div>}
                        </td>
                        <td className="p-4 text-right">
                          <button 
                            onClick={() => handleDeletePayment(payment.id)}
                            className="text-red-500 hover:bg-red-500/10 p-2 rounded-lg transition-colors"
                            title="Удалить платеж"
                          >
                            <span className="material-symbols-outlined text-sm">delete</span>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

            </div>
          )}

        </div>
      </div>

      {isPrinting && student.contract && (
        <PrintableContract 
          application={student} 
          contract={student.contract} 
          onClose={() => setIsPrinting(false)} 
        />
      )}
    </div>
  );
}

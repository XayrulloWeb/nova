import React from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from '../../api/axios';

export default function FinanceDashboard() {
  const adminRole = localStorage.getItem('adminRole');

  const { data: stats, isLoading, error } = useQuery({
    queryKey: ['financeStats'],
    queryFn: async () => {
      const res = await axios.get('/admin/finance/stats');
      return res.data;
    },
    enabled: adminRole === 'SUPERADMIN'
  });

  if (adminRole !== 'SUPERADMIN') {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh]">
        <span className="material-symbols-outlined text-6xl text-red-500 mb-4">lock</span>
        <h2 className="text-2xl font-bold">Доступ запрещен</h2>
        <p className="text-on-surface-variant mt-2">Эта страница доступна только для роли SUPERADMIN.</p>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-[50vh]">
        <div className="w-10 h-10 border-4 border-primary/30 border-t-primary rounded-full animate-spin"></div>
      </div>
    );
  }

  if (error) {
    return <div className="text-red-500">Ошибка при загрузке финансовой статистики.</div>;
  }

  const formatMoney = (amount) => {
    return Number(amount).toLocaleString() + ' сум';
  };

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-3xl font-bold mb-2">Финансы и Статистика</h1>
        <p className="text-on-surface-variant">Общий обзор финансовых показателей школы.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-surface-container p-6 rounded-3xl border border-outline/10 flex flex-col gap-4 relative overflow-hidden">
          <div className="absolute -right-4 -top-4 w-24 h-24 bg-primary/5 rounded-full blur-2xl"></div>
          <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center text-primary">
            <span className="material-symbols-outlined">group</span>
          </div>
          <div>
            <p className="text-sm text-on-surface-variant font-bold mb-1">Всего учеников (Активных)</p>
            <h3 className="text-3xl font-bold">{stats?.students_count || 0}</h3>
          </div>
        </div>

        <div className="bg-surface-container p-6 rounded-3xl border border-outline/10 flex flex-col gap-4 relative overflow-hidden">
          <div className="absolute -right-4 -top-4 w-24 h-24 bg-blue-500/5 rounded-full blur-2xl"></div>
          <div className="w-12 h-12 bg-blue-500/10 rounded-2xl flex items-center justify-center text-blue-500">
            <span className="material-symbols-outlined">account_balance</span>
          </div>
          <div>
            <p className="text-sm text-on-surface-variant font-bold mb-1">Общая ожидаемая сумма</p>
            <h3 className="text-2xl font-bold">{formatMoney(stats?.total_expected || 0)}</h3>
          </div>
        </div>

        <div className="bg-surface-container p-6 rounded-3xl border border-outline/10 flex flex-col gap-4 relative overflow-hidden">
          <div className="absolute -right-4 -top-4 w-24 h-24 bg-green-500/5 rounded-full blur-2xl"></div>
          <div className="w-12 h-12 bg-green-500/10 rounded-2xl flex items-center justify-center text-green-500">
            <span className="material-symbols-outlined">payments</span>
          </div>
          <div>
            <p className="text-sm text-on-surface-variant font-bold mb-1">Всего получено оплат</p>
            <h3 className="text-2xl font-bold text-green-600">{formatMoney(stats?.total_received || 0)}</h3>
          </div>
        </div>

        <div className="bg-surface-container p-6 rounded-3xl border border-outline/10 flex flex-col gap-4 relative overflow-hidden">
          <div className="absolute -right-4 -top-4 w-24 h-24 bg-orange-500/5 rounded-full blur-2xl"></div>
          <div className="w-12 h-12 bg-orange-500/10 rounded-2xl flex items-center justify-center text-orange-500">
            <span className="material-symbols-outlined">pending_actions</span>
          </div>
          <div>
            <p className="text-sm text-on-surface-variant font-bold mb-1">Остаток к оплате (Долг)</p>
            <h3 className="text-2xl font-bold text-orange-500">{formatMoney(stats?.total_remaining || 0)}</h3>
          </div>
        </div>
      </div>
    </div>
  );
}

import React from 'react';
import { useExpenses } from '../context/ExpenseContext';

export const StatsCards = () => {
  const { totals, theme, categoryStats, formatCurrency } = useExpenses();
  const isDark = theme === 'dark';

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      
      {/* Total Balance */}
      <div className={`p-5 rounded-2xl relative overflow-hidden transition-all ${
        isDark ? 'glass-card border border-slate-800 shadow-lg' : 'glass-card-light'
      }`}>
        <div className="flex items-center justify-between mb-2">
          <span className={`text-xs font-semibold uppercase tracking-wider ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
            Net Balance
          </span>
          <span className={`w-8 h-8 rounded-lg flex items-center justify-center text-sm ${
            isDark ? 'bg-slate-800 text-slate-300' : 'bg-emerald-50 text-emerald-700 border border-emerald-100'
          }`}>
            💳
          </span>
        </div>
        <h2 className={`text-2xl sm:text-3xl font-extrabold tracking-tight font-mono ${
          totals.balance >= 0 ? (isDark ? 'text-white' : 'text-slate-900') : (isDark ? 'text-rose-400' : 'text-rose-700')
        }`}>
          {formatCurrency(totals.balance)}
        </h2>
        <div className="mt-3 flex items-center text-xs font-medium space-x-1.5">
          <span className={`px-2 py-0.5 rounded-md font-semibold ${
            totals.balance >= 0 
              ? (isDark ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/20' : 'bg-emerald-50 text-emerald-700 border border-emerald-200/80')
              : (isDark ? 'bg-rose-500/15 text-rose-400 border border-rose-500/20' : 'bg-rose-50 text-rose-700 border border-rose-200/80')
          }`}>
            {totals.balance >= 0 ? 'Positive Cashflow' : 'Deficit Alert'}
          </span>
          <span className={isDark ? 'text-slate-400' : 'text-slate-500'}>
            • {totals.count} records
          </span>
        </div>
      </div>

      {/* Income */}
      <div className={`p-5 rounded-2xl relative overflow-hidden transition-all ${
        isDark ? 'glass-card border border-slate-800 shadow-lg' : 'glass-card-light'
      }`}>
        <div className="flex items-center justify-between mb-2">
          <span className={`text-xs font-semibold uppercase tracking-wider ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
            Total Income
          </span>
          <span className={`w-8 h-8 rounded-lg flex items-center justify-center text-sm ${
            isDark ? 'bg-emerald-500/15 text-emerald-400' : 'bg-emerald-50 text-emerald-700 border border-emerald-100'
          }`}>
            ↙
          </span>
        </div>
        <h2 className={`text-2xl sm:text-3xl font-extrabold tracking-tight font-mono ${
          isDark ? 'text-emerald-400' : 'text-emerald-700'
        }`}>
          +{formatCurrency(totals.income)}
        </h2>
        <div className="mt-3 flex items-center text-xs font-medium space-x-1">
          <span className={`font-semibold ${isDark ? 'text-emerald-400' : 'text-emerald-700'}`}>
            ↗ Inflows
          </span>
          <span className={isDark ? 'text-slate-400' : 'text-slate-500'}>
            active this period
          </span>
        </div>
      </div>

      {/* Expenses */}
      <div className={`p-5 rounded-2xl relative overflow-hidden transition-all ${
        isDark ? 'glass-card border border-slate-800 shadow-lg' : 'glass-card-light'
      }`}>
        <div className="flex items-center justify-between mb-2">
          <span className={`text-xs font-semibold uppercase tracking-wider ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
            Total Expenses
          </span>
          <span className={`w-8 h-8 rounded-lg flex items-center justify-center text-sm ${
            isDark ? 'bg-rose-500/15 text-rose-400' : 'bg-rose-50 text-rose-700 border border-rose-100'
          }`}>
            ↗
          </span>
        </div>
        <h2 className={`text-2xl sm:text-3xl font-extrabold tracking-tight font-mono ${
          isDark ? 'text-rose-400' : 'text-rose-700'
        }`}>
          -{formatCurrency(totals.expense)}
        </h2>
        <div className="mt-3 flex items-center text-xs font-medium space-x-1">
          <span className={`font-semibold ${isDark ? 'text-rose-400' : 'text-rose-700'}`}>
            ↘ Outflows
          </span>
          <span className={`truncate max-w-[150px] ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
            • Top: {categoryStats.topExpenseCategory ? categoryStats.topExpenseCategory.name : 'None'}
          </span>
        </div>
      </div>

      {/* Savings Rate */}
      <div className={`p-5 rounded-2xl relative overflow-hidden transition-all ${
        isDark ? 'glass-card border border-slate-800 shadow-lg' : 'glass-card-light'
      }`}>
        <div className="flex items-center justify-between mb-2">
          <span className={`text-xs font-semibold uppercase tracking-wider ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
            Savings Rate
          </span>
          <span className={`w-8 h-8 rounded-lg flex items-center justify-center text-sm ${
            isDark ? 'bg-purple-500/15 text-purple-400' : 'bg-purple-50 text-purple-700 border border-purple-100'
          }`}>
            ⏱
          </span>
        </div>
        <div className="flex items-baseline space-x-2">
          <h2 className={`text-2xl sm:text-3xl font-extrabold tracking-tight font-mono ${
            isDark ? 'text-white' : 'text-slate-900'
          }`}>
            {totals.savingsRate}%
          </h2>
          <span className={`text-xs font-semibold ${isDark ? 'text-purple-400' : 'text-purple-700'}`}>
            of income saved
          </span>
        </div>
        <div className={`mt-3 w-full rounded-full h-2 overflow-hidden ${
          isDark ? 'bg-slate-800' : 'bg-slate-100'
        }`}>
          <div 
            className="bg-gradient-to-r from-indigo-500 to-purple-600 h-2 rounded-full transition-all duration-500" 
            style={{ width: `${Math.min(100, Math.max(0, totals.savingsRate))}%` }}
          ></div>
        </div>
      </div>

    </div>
  );
};

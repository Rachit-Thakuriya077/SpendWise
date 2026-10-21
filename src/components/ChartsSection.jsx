import React, { useState } from 'react';
import { useExpenses } from '../context/ExpenseContext';

export const ChartsSection = () => {
  const { categoryStats, totals, theme, formatCurrency } = useExpenses();
  const [activeTab, setActiveTab] = useState('category');
  const isDark = theme === 'dark';

  return (
    <div className={`p-6 rounded-2xl transition-all ${
      isDark ? 'glass-card border border-slate-800 shadow-lg' : 'glass-card-light'
    }`}>
      <div className={`flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b ${
        isDark ? 'border-slate-700/40' : 'border-slate-100'
      }`}>
        <div>
          <h3 className={`text-lg font-bold flex items-center space-x-2 ${isDark ? 'text-white' : 'text-slate-900'}`}>
            <span>📊 Financial Analytics & Insights</span>
            <span className={`text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full ${
              isDark 
                ? 'bg-indigo-500/20 text-indigo-400 border border-indigo-500/30' 
                : 'bg-indigo-50 text-indigo-700 border border-indigo-200/80'
            }`}>
              Bonus Feature
            </span>
          </h3>
          <p className={`text-xs mt-0.5 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
            Category spending distribution and visual cashflow distribution
          </p>
        </div>

        <div className={`flex rounded-xl p-1 border text-xs font-semibold ${
          isDark ? 'bg-slate-900/60 border-slate-800' : 'bg-slate-100 border-slate-200'
        }`}>
          <button
            onClick={() => setActiveTab('category')}
            className={`px-3.5 py-1.5 rounded-lg transition-all ${
              activeTab === 'category'
                ? (isDark ? 'bg-indigo-600 text-white shadow-sm font-semibold' : 'bg-white text-indigo-700 shadow-sm border border-slate-200/80 font-bold')
                : (isDark ? 'text-slate-400 hover:text-white' : 'text-slate-600 hover:text-slate-900')
            }`}
          >
            Category Breakdown
          </button>
          <button
            onClick={() => setActiveTab('trend')}
            className={`px-3.5 py-1.5 rounded-lg transition-all ${
              activeTab === 'trend'
                ? (isDark ? 'bg-indigo-600 text-white shadow-sm font-semibold' : 'bg-white text-indigo-700 shadow-sm border border-slate-200/80 font-bold')
                : (isDark ? 'text-slate-400 hover:text-white' : 'text-slate-600 hover:text-slate-900')
            }`}
          >
            Income vs Expense
          </button>
        </div>
      </div>

      <div className="mt-6">
        {activeTab === 'category' ? (
          <div>
            {categoryStats.expenseBreakdown.length === 0 ? (
              <div className={`text-center py-8 text-sm ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                No expense transactions found. Add expenses to generate category charts.
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
                {/* SVG Donut */}
                <div className="md:col-span-5 flex flex-col items-center justify-center">
                  <div className="relative w-48 h-48 sm:w-56 sm:h-56">
                    <svg viewBox="0 0 100 100" className="w-full h-full transform -rotate-90">
                      {(() => {
                        let accumulated = 0;
                        return categoryStats.expenseBreakdown.map((item) => {
                          const strokeDash = `${item.percentage} ${100 - item.percentage}`;
                          const strokeOffset = -accumulated;
                          accumulated += item.percentage;
                          return (
                            <circle
                              key={item.id}
                              cx="50"
                              cy="50"
                              r="38"
                              fill="transparent"
                              stroke={item.color}
                              strokeWidth="14"
                              strokeDasharray={strokeDash}
                              strokeDashoffset={strokeOffset}
                              className="transition-all duration-300 hover:opacity-80"
                            />
                          );
                        });
                      })()}
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                      <span className={`text-[10px] uppercase font-bold tracking-wider ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                        Total Outflow
                      </span>
                      <span className={`text-lg sm:text-xl font-bold font-mono ${
                        isDark ? 'text-rose-400' : 'text-rose-700'
                      }`}>
                        {formatCurrency(totals.expense)}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Progress bars list */}
                <div className="md:col-span-7 space-y-3">
                  <h4 className={`text-xs font-semibold uppercase tracking-wider mb-2 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                    Spending Distribution
                  </h4>
                  {categoryStats.expenseBreakdown.map((item) => (
                    <div key={item.id} className="space-y-1">
                      <div className="flex items-center justify-between text-xs">
                        <span className={`flex items-center space-x-2 font-medium ${isDark ? 'text-slate-200' : 'text-slate-800'}`}>
                          <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }}></span>
                          <span>{item.name}</span>
                        </span>
                        <span className={`font-mono font-semibold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                          {formatCurrency(item.amount)} <span className={isDark ? 'text-slate-400 text-[11px]' : 'text-slate-500 text-[11px]'}>({item.percentage}%)</span>
                        </span>
                      </div>
                      <div className={`w-full rounded-full h-1.5 overflow-hidden ${
                        isDark ? 'bg-slate-700/20' : 'bg-slate-100'
                      }`}>
                        <div
                          className="h-1.5 rounded-full transition-all duration-500"
                          style={{ width: `${item.percentage}%`, backgroundColor: item.color }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className={`p-4 rounded-xl border ${isDark ? 'bg-slate-900/50 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
              <div className="flex justify-between items-center mb-2">
                <span className={`text-sm font-semibold flex items-center space-x-1.5 ${isDark ? 'text-emerald-400' : 'text-emerald-700'}`}>
                  <span>↙ Total Inflow</span>
                </span>
                <span className={`font-mono font-bold ${isDark ? 'text-emerald-400' : 'text-emerald-700'}`}>
                  {formatCurrency(totals.income)}
                </span>
              </div>
              <div className={`w-full rounded-full h-3 overflow-hidden ${
                isDark ? 'bg-slate-700/30' : 'bg-slate-200/80'
              }`}>
                <div 
                  className="bg-emerald-500 h-3 rounded-full transition-all duration-500"
                  style={{ width: `${totals.income + totals.expense > 0 ? (totals.income / (totals.income + totals.expense)) * 100 : 0}%` }}
                ></div>
              </div>
              <p className={`text-[11px] mt-2 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                Represents {totals.income + totals.expense > 0 ? Math.round((totals.income / (totals.income + totals.expense)) * 100) : 0}% of all cash movement.
              </p>
            </div>

            <div className={`p-4 rounded-xl border ${isDark ? 'bg-slate-900/50 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
              <div className="flex justify-between items-center mb-2">
                <span className={`text-sm font-semibold flex items-center space-x-1.5 ${isDark ? 'text-rose-400' : 'text-rose-700'}`}>
                  <span>↗ Total Outflow</span>
                </span>
                <span className={`font-mono font-bold ${isDark ? 'text-rose-400' : 'text-rose-700'}`}>
                  {formatCurrency(totals.expense)}
                </span>
              </div>
              <div className={`w-full rounded-full h-3 overflow-hidden ${
                isDark ? 'bg-slate-700/30' : 'bg-slate-200/80'
              }`}>
                <div 
                  className="bg-rose-500 h-3 rounded-full transition-all duration-500"
                  style={{ width: `${totals.income + totals.expense > 0 ? (totals.expense / (totals.income + totals.expense)) * 100 : 0}%` }}
                ></div>
              </div>
              <p className={`text-[11px] mt-2 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                Represents {totals.income + totals.expense > 0 ? Math.round((totals.expense / (totals.income + totals.expense)) * 100) : 0}% of all cash movement.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

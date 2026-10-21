import React from 'react';
import { useExpenses } from '../context/ExpenseContext';
import { EXPENSE_CATEGORIES, INCOME_CATEGORIES } from '../data/categories';

export const TransactionFilters = () => {
  const {
    theme,
    searchQuery,
    setSearchQuery,
    typeFilter,
    setTypeFilter,
    categoryFilter,
    setCategoryFilter,
    timeframe,
    setTimeframe,
    sortBy,
    setSortBy,
    resetToSampleData,
    clearAllData
  } = useExpenses();

  const isDark = theme === 'dark';

  return (
    <div className={`p-4 rounded-2xl transition-all ${
      isDark ? 'glass-card border border-slate-800 shadow-lg' : 'glass-card-light'
    }`}>
      <div className="flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between">
        {/* Search */}
        <div className="relative flex-1">
          <input
            type="text"
            placeholder="🔍 Search transactions by title, category, notes..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className={`w-full px-4 py-2.5 rounded-xl text-xs sm:text-sm border transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
              isDark 
                ? 'bg-slate-900/80 border-slate-700 text-white placeholder-slate-500' 
                : 'bg-slate-50/80 border-slate-200 text-slate-900 placeholder-slate-400 focus:bg-white'
            }`}
          />
        </div>

        {/* Type Filter Segmented Control */}
        <div className={`flex rounded-xl p-1 border text-xs font-semibold self-start md:self-auto ${
          isDark ? 'bg-slate-900/60 border-slate-800' : 'bg-slate-100 border-slate-200'
        }`}>
          <button
            onClick={() => setTypeFilter('all')}
            className={`px-3.5 py-1.5 rounded-lg transition-all ${
              typeFilter === 'all'
                ? (isDark ? 'bg-indigo-600 text-white shadow' : 'bg-white text-slate-900 shadow-sm border border-slate-200/80 font-bold')
                : (isDark ? 'text-slate-400 hover:text-white' : 'text-slate-600 hover:text-slate-900')
            }`}
          >
            All
          </button>
          <button
            onClick={() => setTypeFilter('income')}
            className={`px-3.5 py-1.5 rounded-lg transition-all ${
              typeFilter === 'income'
                ? (isDark ? 'bg-emerald-600 text-white shadow' : 'bg-white text-emerald-700 shadow-sm border border-slate-200/80 font-bold')
                : (isDark ? 'text-slate-400 hover:text-white' : 'text-slate-600 hover:text-slate-900')
            }`}
          >
            Income
          </button>
          <button
            onClick={() => setTypeFilter('expense')}
            className={`px-3.5 py-1.5 rounded-lg transition-all ${
              typeFilter === 'expense'
                ? (isDark ? 'bg-rose-600 text-white shadow' : 'bg-white text-rose-700 shadow-sm border border-slate-200/80 font-bold')
                : (isDark ? 'text-slate-400 hover:text-white' : 'text-slate-600 hover:text-slate-900')
            }`}
          >
            Expenses
          </button>
        </div>
      </div>

      <div className={`flex flex-wrap items-center justify-between gap-3 pt-3 border-t text-xs ${
        isDark ? 'border-slate-700/40' : 'border-slate-100'
      }`}>
        <div className="flex flex-wrap items-center gap-2.5">
          {/* Category Dropdown */}
          <div className="flex items-center space-x-1.5">
            <span className={isDark ? 'text-slate-400' : 'text-slate-600 font-medium'}>Category:</span>
            <select
              value={categoryFilter}
              onChange={e => setCategoryFilter(e.target.value)}
              className={`px-2.5 py-1.5 rounded-lg border font-medium focus:outline-none focus:ring-1 focus:ring-indigo-500 ${
                isDark ? 'bg-slate-900 border-slate-700 text-slate-200' : 'bg-slate-50 border-slate-200 text-slate-800'
              }`}
            >
              <option value="all">All Categories</option>
              <optgroup label="Expenses">
                {EXPENSE_CATEGORIES.map(c => (
                  <option key={c.id} value={c.id}>{c.name}</option>
                ))}
              </optgroup>
              <optgroup label="Income">
                {INCOME_CATEGORIES.map(c => (
                  <option key={c.id} value={c.id}>{c.name}</option>
                ))}
              </optgroup>
            </select>
          </div>

          {/* Timeframe */}
          <div className="flex items-center space-x-1.5">
            <span className={isDark ? 'text-slate-400' : 'text-slate-600 font-medium'}>Period:</span>
            <select
              value={timeframe}
              onChange={e => setTimeframe(e.target.value)}
              className={`px-2.5 py-1.5 rounded-lg border font-medium focus:outline-none focus:ring-1 focus:ring-indigo-500 ${
                isDark ? 'bg-slate-900 border-slate-700 text-slate-200' : 'bg-slate-50 border-slate-200 text-slate-800'
              }`}
            >
              <option value="all">All Time</option>
              <option value="this_month">This Month</option>
              <option value="last_month">Last Month</option>
            </select>
          </div>

          {/* Sort */}
          <div className="flex items-center space-x-1.5">
            <span className={isDark ? 'text-slate-400' : 'text-slate-600 font-medium'}>Sort:</span>
            <select
              value={sortBy}
              onChange={e => setSortBy(e.target.value)}
              className={`px-2.5 py-1.5 rounded-lg border font-medium focus:outline-none focus:ring-1 focus:ring-indigo-500 ${
                isDark ? 'bg-slate-900 border-slate-700 text-slate-200' : 'bg-slate-50 border-slate-200 text-slate-800'
              }`}
            >
              <option value="date_desc">Date (Newest First)</option>
              <option value="date_asc">Date (Oldest First)</option>
              <option value="amount_desc">Amount (Highest First)</option>
              <option value="amount_asc">Amount (Lowest First)</option>
            </select>
          </div>
        </div>

        {/* Action links */}
        <div className="flex items-center space-x-2">
          <button
            onClick={resetToSampleData}
            className={`text-[11px] font-semibold transition-colors ${
              isDark ? 'text-indigo-400 hover:text-indigo-300' : 'text-indigo-600 hover:text-indigo-800'
            }`}
          >
            Reset Sample Data
          </button>
          <span className={isDark ? 'text-slate-600' : 'text-slate-300'}>•</span>
          <button
            onClick={clearAllData}
            className={`text-[11px] font-semibold transition-colors ${
              isDark ? 'text-rose-400 hover:text-rose-300' : 'text-rose-600 hover:text-rose-800'
            }`}
          >
            Clear All
          </button>
        </div>
      </div>
    </div>
  );
};

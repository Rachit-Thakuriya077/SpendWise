import React from 'react';
import { useExpenses } from '../context/ExpenseContext';

export const Header = () => {
  const { theme, toggleTheme, openAddModal, exportCSV, currency, setCurrency } = useExpenses();

  return (
    <header className={`sticky top-0 z-30 border-b backdrop-blur-md transition-colors ${
      theme === 'dark' ? 'bg-[#0b0f19]/80 border-slate-800/80 text-white' : 'bg-white/80 border-slate-200 text-slate-800'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* Brand */}
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-cyan-400 flex items-center justify-center shadow-lg shadow-indigo-500/25">
            <span className="text-xl">💳</span>
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="font-extrabold text-xl tracking-tight bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                SpendWise
              </span>
              <span className="hidden sm:inline-block text-[10px] font-semibold uppercase px-2 py-0.5 rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 tracking-wider">
                React Pro
              </span>
            </div>
            <p className={`text-xs ${theme === 'dark' ? 'text-slate-400' : 'text-slate-500'}`}>
              ACM Web Development Recruitment Task 1
            </p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center space-x-2 sm:space-x-3">
          {/* Currency Selector */}
          <div className={`flex items-center rounded-lg border px-2 py-1 text-xs font-semibold ${
            theme === 'dark' ? 'bg-slate-800/60 border-slate-700 text-slate-300' : 'bg-slate-100 border-slate-200 text-slate-700'
          }`}>
            <span className="mr-1 text-slate-400 hidden sm:inline">Currency:</span>
            <select 
              value={currency} 
              onChange={e => setCurrency(e.target.value)}
              className="bg-transparent font-bold focus:outline-none cursor-pointer"
            >
              <option value="₹" className="text-slate-900">₹ INR (Rupees)</option>
              <option value="$" className="text-slate-900">$ USD</option>
              <option value="€" className="text-slate-900">€ EUR</option>
              <option value="£" className="text-slate-900">£ GBP</option>
            </select>
          </div>

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            title="Toggle Dark / Light Mode"
            className={`p-2 rounded-lg border transition-colors ${
              theme === 'dark'
                ? 'bg-slate-800/60 border-slate-700 text-yellow-400 hover:bg-slate-800'
                : 'bg-slate-100 border-slate-200 text-slate-600 hover:bg-slate-200'
            }`}
          >
            {theme === 'dark' ? '☀️' : '🌙'}
          </button>

          {/* Export CSV */}
          <button
            onClick={exportCSV}
            title="Export to CSV"
            className={`hidden md:flex items-center space-x-1.5 px-3 py-1.5 rounded-lg border text-xs font-medium transition-colors ${
              theme === 'dark' ? 'bg-slate-800/60 border-slate-700 hover:bg-slate-700 text-slate-200' : 'bg-white border-slate-200 hover:bg-slate-100 text-slate-700 shadow-sm'
            }`}
          >
            <span>📥 Export CSV</span>
          </button>

          {/* New Transaction Button */}
          <button
            onClick={openAddModal}
            className="flex items-center space-x-1.5 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold text-white bg-gradient-to-r from-indigo-600 via-indigo-500 to-purple-600 hover:from-indigo-500 hover:to-purple-500 shadow-md shadow-indigo-600/30 transition-all hover:scale-[1.02] active:scale-[0.98]"
          >
            <span>+ New Transaction</span>
          </button>
        </div>

      </div>
    </header>
  );
};

import React from 'react';
import { useExpenses } from '../context/ExpenseContext';
import { EXPENSE_CATEGORIES, INCOME_CATEGORIES } from '../data/categories';

export const TransactionList = () => {
  const {
    theme,
    filteredTransactions,
    transactions,
    deleteTransaction,
    openEditModal,
    formatCurrency
  } = useExpenses();

  const isDark = theme === 'dark';

  const getCategoryMeta = (catId, type) => {
    const list = type === 'income' ? INCOME_CATEGORIES : EXPENSE_CATEGORIES;
    return list.find(c => c.id === catId) || { 
      name: catId, 
      color: '#64748b',
      bgLight: 'bg-slate-100 text-slate-700 border border-slate-200',
      bgDark: 'bg-slate-700/30 text-slate-300'
    };
  };

  return (
    <div className={`rounded-2xl transition-all overflow-hidden ${
      isDark ? 'glass-card border border-slate-800 shadow-lg' : 'glass-card-light'
    }`}>
      <div className={`p-4 sm:p-5 flex items-center justify-between border-b ${
        isDark ? 'border-slate-700/40' : 'border-slate-100'
      }`}>
        <div className="flex items-center space-x-2">
          <h3 className={`font-bold text-base ${isDark ? 'text-white' : 'text-slate-900'}`}>
            Transactions
          </h3>
          <span className={`text-xs px-2.5 py-0.5 rounded-full font-mono font-medium ${
            isDark ? 'bg-slate-800 text-slate-300' : 'bg-slate-100 text-slate-700 border border-slate-200/60'
          }`}>
            {filteredTransactions.length}
          </span>
        </div>
        <div className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
          Showing {filteredTransactions.length} of {transactions.length}
        </div>
      </div>

      {filteredTransactions.length === 0 ? (
        <div className="py-16 text-center space-y-3">
          <span className="text-4xl">🧾</span>
          <h4 className={`text-base font-semibold ${isDark ? 'text-white' : 'text-slate-800'}`}>
            No transactions found
          </h4>
          <p className={`text-xs max-w-sm mx-auto ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
            Try adjusting search or filters to locate transactions.
          </p>
        </div>
      ) : (
        <div className={`divide-y ${isDark ? 'divide-slate-800/40' : 'divide-slate-100'}`}>
          {filteredTransactions.map(tx => {
            const cat = getCategoryMeta(tx.category, tx.type);
            const isIncome = tx.type === 'income';

            return (
              <div
                key={tx.id}
                className={`p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 transition-colors ${
                  isDark ? 'hover:bg-slate-800/40' : 'hover:bg-slate-50/80'
                }`}
              >
                <div className="flex items-start sm:items-center space-x-3.5 flex-1 min-w-0">
                  <div
                    className={`w-11 h-11 rounded-xl flex-shrink-0 flex items-center justify-center font-bold text-sm shadow-sm ${
                      isDark ? (cat.bgDark || 'bg-slate-800 text-white') : (cat.bgLight || 'bg-slate-100 text-slate-800')
                    }`}
                  >
                    {isIncome ? '↓' : '↑'}
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="flex items-center space-x-2">
                      <h4 className={`text-sm sm:text-base font-semibold truncate ${
                        isDark ? 'text-white' : 'text-slate-900'
                      }`}>
                        {tx.title}
                      </h4>
                      <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-md uppercase tracking-wider ${
                        isDark ? (cat.bgDark || 'bg-slate-800 text-slate-300') : (cat.bgLight || 'bg-slate-100 text-slate-700')
                      }`}>
                        {cat.name}
                      </span>
                    </div>

                    <div className="flex items-center space-x-3 mt-1 text-xs">
                      <span className={`flex items-center space-x-1 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                        <span>📅 {tx.date}</span>
                      </span>
                      {tx.notes && (
                        <span className={`truncate max-w-[200px] sm:max-w-md italic ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>
                          "{tx.notes}"
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between sm:justify-end space-x-4 pl-14 sm:pl-0">
                  <div className="text-right">
                    <span className={`text-base sm:text-lg font-bold font-mono ${
                      isIncome 
                        ? (isDark ? 'text-emerald-400' : 'text-emerald-700') 
                        : (isDark ? 'text-rose-400' : 'text-rose-700')
                    }`}>
                      {isIncome ? '+' : '-'}{formatCurrency(tx.amount)}
                    </span>
                  </div>

                  <div className="flex items-center space-x-1">
                    <button
                      onClick={() => openEditModal(tx)}
                      title="Edit"
                      className={`p-1.5 rounded-lg text-xs font-semibold transition-colors ${
                        isDark ? 'hover:bg-slate-700 text-slate-400 hover:text-white' : 'hover:bg-slate-100 text-slate-400 hover:text-slate-700'
                      }`}
                    >
                      ✏️
                    </button>
                    <button
                      onClick={() => deleteTransaction(tx.id)}
                      title="Delete"
                      className={`p-1.5 rounded-lg text-xs font-semibold transition-colors ${
                        isDark ? 'text-slate-400 hover:text-rose-400 hover:bg-rose-500/10' : 'text-slate-400 hover:text-rose-600 hover:bg-rose-50'
                      }`}
                    >
                      🗑️
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

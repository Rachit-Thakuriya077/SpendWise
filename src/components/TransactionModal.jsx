import React, { useState } from 'react';
import { useExpenses } from '../context/ExpenseContext';
import { EXPENSE_CATEGORIES, INCOME_CATEGORIES } from '../data/categories';

export const TransactionModal = () => {
  const {
    isModalOpen,
    editingTransaction,
    closeModal,
    addTransaction,
    updateTransaction,
    theme,
    currency
  } = useExpenses();

  if (!isModalOpen) return null;

  const isEditing = Boolean(editingTransaction);
  const isDark = theme === 'dark';

  const [type, setType] = useState(editingTransaction?.type || 'expense');
  const [title, setTitle] = useState(editingTransaction?.title || '');
  const [amount, setAmount] = useState(editingTransaction?.amount || '');
  const [category, setCategory] = useState(
    editingTransaction?.category || (type === 'income' ? 'salary' : 'food')
  );
  const [date, setDate] = useState(
    editingTransaction?.date || new Date().toISOString().slice(0, 10)
  );
  const [notes, setNotes] = useState(editingTransaction?.notes || '');
  const [errors, setErrors] = useState({});

  const handleTypeChange = (newType) => {
    setType(newType);
    setCategory(newType === 'income' ? 'salary' : 'food');
  };

  const validate = () => {
    const errs = {};
    if (!title.trim()) errs.title = 'Title is required';
    if (!amount || isNaN(amount) || Number(amount) <= 0) {
      errs.amount = 'Please enter a valid amount > 0';
    }
    if (!date) errs.date = 'Date is required';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    const payload = {
      title: title.trim(),
      amount: parseFloat(amount),
      type,
      category,
      date,
      notes: notes.trim()
    };
    if (isEditing) {
      updateTransaction({ ...payload, id: editingTransaction.id });
    } else {
      addTransaction(payload);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div className={`w-full max-w-md rounded-2xl border shadow-2xl p-6 transition-all ${
        isDark ? 'bg-slate-900 border-slate-700 text-white' : 'bg-white border-slate-200 text-slate-800'
      }`}>
        <div className={`flex items-center justify-between pb-4 border-b ${
          isDark ? 'border-slate-700/40' : 'border-slate-100'
        }`}>
          <h3 className={`text-lg font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
            {isEditing ? 'Edit Transaction' : 'Add New Transaction'}
          </h3>
          <button
            onClick={closeModal}
            className={`p-1 rounded-lg transition-colors ${
              isDark ? 'text-slate-400 hover:text-slate-200 hover:bg-slate-800' : 'text-slate-400 hover:text-slate-700 hover:bg-slate-100'
            }`}
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="mt-4 space-y-4 text-xs sm:text-sm">
          {/* Type Switcher */}
          <div>
            <label className={`block text-xs font-semibold uppercase tracking-wider mb-1.5 ${
              isDark ? 'text-slate-400' : 'text-slate-600'
            }`}>
              Transaction Type
            </label>
            <div className={`grid grid-cols-2 gap-2 p-1 rounded-xl border ${
              isDark ? 'bg-slate-800/80 border-slate-700' : 'bg-slate-100 border-slate-200'
            }`}>
              <button
                type="button"
                onClick={() => handleTypeChange('expense')}
                className={`py-2 rounded-lg font-semibold transition-all ${
                  type === 'expense'
                    ? 'bg-rose-600 text-white shadow-md'
                    : isDark ? 'text-slate-400 hover:text-white' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Expense
              </button>
              <button
                type="button"
                onClick={() => handleTypeChange('income')}
                className={`py-2 rounded-lg font-semibold transition-all ${
                  type === 'income'
                    ? 'bg-emerald-600 text-white shadow-md'
                    : isDark ? 'text-slate-400 hover:text-white' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Income
              </button>
            </div>
          </div>

          {/* Title */}
          <div>
            <label className={`block text-xs font-semibold uppercase tracking-wider mb-1 ${
              isDark ? 'text-slate-400' : 'text-slate-600'
            }`}>
              Title / Description *
            </label>
            <input
              type="text"
              placeholder="e.g. Grocery Store, Laptop EMI, Salary"
              value={title}
              onChange={e => setTitle(e.target.value)}
              className={`w-full px-3.5 py-2.5 rounded-xl border focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                errors.title ? 'border-rose-500' : isDark ? 'bg-slate-800/80 border-slate-700 text-white' : 'bg-slate-50 border-slate-300 text-slate-900'
              }`}
            />
            {errors.title && <p className="text-[11px] text-rose-500 mt-1 font-medium">{errors.title}</p>}
          </div>

          {/* Amount & Date */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className={`block text-xs font-semibold uppercase tracking-wider mb-1 ${
                isDark ? 'text-slate-400' : 'text-slate-600'
              }`}>
                Amount ({currency}) *
              </label>
              <input
                type="number"
                step="0.01"
                min="0"
                placeholder="0.00"
                value={amount}
                onChange={e => setAmount(e.target.value)}
                className={`w-full px-3.5 py-2.5 rounded-xl border font-mono focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                  errors.amount ? 'border-rose-500' : isDark ? 'bg-slate-800/80 border-slate-700 text-white' : 'bg-slate-50 border-slate-300 text-slate-900'
                }`}
              />
              {errors.amount && <p className="text-[11px] text-rose-500 mt-1 font-medium">{errors.amount}</p>}
            </div>

            <div>
              <label className={`block text-xs font-semibold uppercase tracking-wider mb-1 ${
                isDark ? 'text-slate-400' : 'text-slate-600'
              }`}>
                Date *
              </label>
              <input
                type="date"
                value={date}
                onChange={e => setDate(e.target.value)}
                className={`w-full px-3.5 py-2.5 rounded-xl border focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                  errors.date ? 'border-rose-500' : isDark ? 'bg-slate-800/80 border-slate-700 text-white' : 'bg-slate-50 border-slate-300 text-slate-900'
                }`}
              />
            </div>
          </div>

          {/* Category */}
          <div>
            <label className={`block text-xs font-semibold uppercase tracking-wider mb-1 ${
              isDark ? 'text-slate-400' : 'text-slate-600'
            }`}>
              Category
            </label>
            <select
              value={category}
              onChange={e => setCategory(e.target.value)}
              className={`w-full px-3.5 py-2.5 rounded-xl border focus:outline-none focus:ring-2 focus:ring-indigo-500 font-medium ${
                isDark ? 'bg-slate-800/80 border-slate-700 text-white' : 'bg-slate-50 border-slate-300 text-slate-900'
              }`}
            >
              {type === 'expense'
                ? EXPENSE_CATEGORIES.map(c => (
                    <option key={c.id} value={c.id} className="text-slate-900">{c.name}</option>
                  ))
                : INCOME_CATEGORIES.map(c => (
                    <option key={c.id} value={c.id} className="text-slate-900">{c.name}</option>
                  ))}
            </select>
          </div>

          {/* Notes */}
          <div>
            <label className={`block text-xs font-semibold uppercase tracking-wider mb-1 ${
              isDark ? 'text-slate-400' : 'text-slate-600'
            }`}>
              Notes (Optional)
            </label>
            <textarea
              rows="2"
              placeholder="Additional notes or context..."
              value={notes}
              onChange={e => setNotes(e.target.value)}
              className={`w-full px-3.5 py-2 rounded-xl border focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                isDark ? 'bg-slate-800/80 border-slate-700 text-white placeholder-slate-500' : 'bg-slate-50 border-slate-300 text-slate-900 placeholder-slate-400'
              }`}
            />
          </div>

          {/* Buttons */}
          <div className={`flex items-center justify-end space-x-3 pt-3 border-t ${
            isDark ? 'border-slate-700/40' : 'border-slate-100'
          }`}>
            <button
              type="button"
              onClick={closeModal}
              className={`px-4 py-2 rounded-xl font-semibold transition-colors ${
                isDark ? 'bg-slate-800 text-slate-300 hover:bg-slate-700' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl font-semibold text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 shadow-md shadow-indigo-600/30 transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              {isEditing ? 'Save Changes' : 'Add Transaction'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

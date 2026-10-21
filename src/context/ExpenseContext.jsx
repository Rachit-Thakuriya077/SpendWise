import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import { INITIAL_TRANSACTIONS } from '../data/initialData';
import { EXPENSE_CATEGORIES, INCOME_CATEGORIES } from '../data/categories';

const ExpenseContext = createContext();

export const ExpenseProvider = ({ children }) => {
  // Theme state
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('theme_preference') || 'dark';
  });

  useEffect(() => {
    localStorage.setItem('theme_preference', theme);
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));
  };

  // Currency state
  const [currency, setCurrency] = useState(() => {
    return localStorage.getItem('spendwise_currency') || '₹';
  });

  useEffect(() => {
    localStorage.setItem('spendwise_currency', currency);
  }, [currency]);

  const formatCurrency = (amount) => {
    const locale = currency === '₹' ? 'en-IN' : 'en-US';
    return `${currency}${Number(amount || 0).toLocaleString(locale, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    })}`;
  };

  // Transactions state
  const [transactions, setTransactions] = useState(() => {
    try {
      const saved = localStorage.getItem('acm_expense_transactions');
      return saved ? JSON.parse(saved) : INITIAL_TRANSACTIONS;
    } catch (e) {
      console.error('Failed to parse saved transactions from localStorage', e);
      return INITIAL_TRANSACTIONS;
    }
  });

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem('acm_expense_transactions', JSON.stringify(transactions));
  }, [transactions]);

  // Filters & Search
  const [searchQuery, setSearchQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState('all'); // 'all' | 'income' | 'expense'
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [timeframe, setTimeframe] = useState('all'); // 'all' | 'this_month' | 'last_month' | 'this_year'
  const [sortBy, setSortBy] = useState('date_desc'); // 'date_desc' | 'date_asc' | 'amount_desc' | 'amount_asc'

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTransaction, setEditingTransaction] = useState(null);

  // Notifications / Toast
  const [toastMessage, setToastMessage] = useState(null);

  const showToast = (message, type = 'success') => {
    setToastMessage({ message, type });
    setTimeout(() => {
      setToastMessage(null);
    }, 3200);
  };

  // CRUD Actions
  const addTransaction = (txData) => {
    const newTx = {
      ...txData,
      id: 'tx-' + Date.now() + '-' + Math.random().toString(36).substr(2, 4),
      amount: parseFloat(txData.amount)
    };
    setTransactions(prev => [newTx, ...prev]);
    showToast(`Added "${newTx.title}" successfully!`);
    setIsModalOpen(false);
  };

  const updateTransaction = (updatedTx) => {
    setTransactions(prev =>
      prev.map(tx => (tx.id === updatedTx.id ? { ...updatedTx, amount: parseFloat(updatedTx.amount) } : tx))
    );
    showToast(`Updated "${updatedTx.title}"`);
    setEditingTransaction(null);
    setIsModalOpen(false);
  };

  const deleteTransaction = (id) => {
    const itemToDelete = transactions.find(t => t.id === id);
    setTransactions(prev => prev.filter(tx => tx.id !== id));
    showToast(`Deleted "${itemToDelete?.title || 'transaction'}"`, 'info');
  };

  const resetToSampleData = () => {
    setTransactions(INITIAL_TRANSACTIONS);
    showToast('Reset to default sample dataset', 'info');
  };

  const clearAllData = () => {
    if (window.confirm('Are you sure you want to delete all transactions?')) {
      setTransactions([]);
      showToast('All transaction data cleared', 'info');
    }
  };

  // Open modal helpers
  const openAddModal = () => {
    setEditingTransaction(null);
    setIsModalOpen(true);
  };

  const openEditModal = (tx) => {
    setEditingTransaction(tx);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setEditingTransaction(null);
    setIsModalOpen(false);
  };

  // Filtered and Sorted list
  const filteredTransactions = useMemo(() => {
    const now = new Date();
    const currentYear = now.getFullYear();
    const currentMonth = now.getMonth(); // 0-indexed

    return transactions
      .filter(tx => {
        // Search
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          const matchTitle = tx.title.toLowerCase().includes(q);
          const matchNotes = (tx.notes || '').toLowerCase().includes(q);
          const matchCategory = tx.category.toLowerCase().includes(q);
          if (!matchTitle && !matchNotes && !matchCategory) return false;
        }

        // Type filter
        if (typeFilter !== 'all' && tx.type !== typeFilter) {
          return false;
        }

        // Category filter
        if (categoryFilter !== 'all' && tx.category !== categoryFilter) {
          return false;
        }

        // Timeframe filter
        if (timeframe !== 'all') {
          const txDate = new Date(tx.date);
          const txYear = txDate.getFullYear();
          const txMonth = txDate.getMonth();

          if (timeframe === 'this_month') {
            if (txYear !== currentYear || txMonth !== currentMonth) return false;
          } else if (timeframe === 'last_month') {
            const lastMonth = currentMonth === 0 ? 11 : currentMonth - 1;
            const lastMonthYear = currentMonth === 0 ? currentYear - 1 : currentYear;
            if (txYear !== lastMonthYear || txMonth !== lastMonth) return false;
          } else if (timeframe === 'this_year') {
            if (txYear !== currentYear) return false;
          }
        }

        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'date_desc') {
          return new Date(b.date) - new Date(a.date);
        } else if (sortBy === 'date_asc') {
          return new Date(a.date) - new Date(b.date);
        } else if (sortBy === 'amount_desc') {
          return b.amount - a.amount;
        } else if (sortBy === 'amount_asc') {
          return a.amount - b.amount;
        }
        return 0;
      });
  }, [transactions, searchQuery, typeFilter, categoryFilter, timeframe, sortBy]);

  // Financial calculations
  const totals = useMemo(() => {
    let income = 0;
    let expense = 0;

    transactions.forEach(tx => {
      if (tx.type === 'income') {
        income += Number(tx.amount);
      } else {
        expense += Number(tx.amount);
      }
    });

    const balance = income - expense;
    const savingsRate = income > 0 ? Math.max(0, Math.round(((income - expense) / income) * 100)) : 0;

    return {
      balance,
      income,
      expense,
      savingsRate,
      count: transactions.length
    };
  }, [transactions]);

  // Category breakdown for charts
  const categoryStats = useMemo(() => {
    const expenseMap = {};
    const incomeMap = {};

    transactions.forEach(tx => {
      const amt = Number(tx.amount);
      if (tx.type === 'expense') {
        expenseMap[tx.category] = (expenseMap[tx.category] || 0) + amt;
      } else {
        incomeMap[tx.category] = (incomeMap[tx.category] || 0) + amt;
      }
    });

    const expenseBreakdown = Object.entries(expenseMap).map(([catId, amount]) => {
      const catObj = EXPENSE_CATEGORIES.find(c => c.id === catId) || {
        name: catId,
        color: '#94a3b8'
      };
      const percentage = totals.expense > 0 ? Math.round((amount / totals.expense) * 100) : 0;
      return {
        id: catId,
        name: catObj.name,
        color: catObj.color,
        amount,
        percentage
      };
    }).sort((a, b) => b.amount - a.amount);

    return {
      expenseBreakdown,
      topExpenseCategory: expenseBreakdown[0] || null
    };
  }, [transactions, totals.expense]);

  // Export as CSV
  const exportCSV = () => {
    if (transactions.length === 0) {
      showToast('No transactions to export', 'error');
      return;
    }
    const headers = ['ID', 'Title', 'Type', 'Category', 'Amount', 'Date', 'Notes'];
    const rows = transactions.map(t => [
      t.id,
      `"${t.title.replace(/"/g, '""')}"`,
      t.type,
      t.category,
      t.amount,
      t.date,
      `"${(t.notes || '').replace(/"/g, '""')}"`
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `expense_tracker_export_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast('Exported transactions as CSV');
  };

  const value = {
    theme,
    toggleTheme,
    currency,
    setCurrency,
    formatCurrency,
    transactions,
    filteredTransactions,
    totals,
    categoryStats,
    addTransaction,
    updateTransaction,
    deleteTransaction,
    resetToSampleData,
    clearAllData,
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
    isModalOpen,
    editingTransaction,
    openAddModal,
    openEditModal,
    closeModal,
    toastMessage,
    showToast,
    exportCSV
  };

  return <ExpenseContext.Provider value={value}>{children}</ExpenseContext.Provider>;
};

export const useExpenses = () => useContext(ExpenseContext);

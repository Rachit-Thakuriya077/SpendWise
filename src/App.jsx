import React from 'react';
import { Header } from './components/Header';
import { StatsCards } from './components/StatsCards';
import { ChartsSection } from './components/ChartsSection';
import { TransactionFilters } from './components/TransactionFilters';
import { TransactionList } from './components/TransactionList';
import { TransactionModal } from './components/TransactionModal';
import { useExpenses } from './context/ExpenseContext';

function App() {
  const { theme, toastMessage } = useExpenses();
  const isDark = theme === 'dark';

  return (
    <div className={`min-h-screen flex flex-col font-sans transition-colors duration-200 ${
      isDark ? 'bg-[#0b0f19] text-slate-100' : 'bg-slate-50 text-slate-800'
    }`}>
      <Header />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex-1 w-full space-y-6">
        <StatsCards />
        <ChartsSection />
        <TransactionFilters />
        <TransactionList />
      </main>

      <footer className={`mt-auto border-t py-6 text-center text-xs transition-colors ${
        isDark ? 'border-slate-800/80 text-slate-500' : 'border-slate-200 text-slate-400'
      }`}>
        <p>ACM Web Development Recruitment Task 1 (Second Years) • Built with React & Tailwind CSS</p>
        <p className="mt-1 text-[11px] text-slate-600">Local Storage State Management • Context API Architecture</p>
      </footer>

      <TransactionModal />

      {/* Toast Alert */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center space-x-2 px-4 py-3 rounded-xl shadow-2xl bg-slate-900 border border-slate-700 text-white text-xs sm:text-sm animate-bounce">
          <span>{toastMessage.type === 'error' ? '❌' : '✅'}</span>
          <span>{toastMessage.message}</span>
        </div>
      )}
    </div>
  );
}

export default App;

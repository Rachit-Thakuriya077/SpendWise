# SpendWise — Modern Expense Tracker (React)

[![React](https://img.shields.io/badge/React-18-blue.svg)](https://reactjs.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC.svg)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

A modern, high-performance **Expense Tracker & Financial Analytics Dashboard** built for the **ACM Web Development Recruitment Tasks (Second Years — Task 1)**.

---

## 🌟 Key Features

### Core Requirements
* **Add / Edit / Delete Transactions:** Complete CRUD operations with reactive state and instant modal forms.
* **Income & Expense Categories:** Granular categorized tags (Food, Housing, Transport, Freelance, Salary, Investments, etc.) with custom icon indicators and color badges.
* **Real-time Balance & Financial Health:** Dynamic calculation of Net Balance, Total Income, Total Expenses, and Savings Rate.
* **Monthly & Period Filtering:** Filter by "All Time", "This Month", and "Last Month" with instantaneous updates.
* **Instant Search & Multi-Filters:** Live search by title, notes, or category, combined with type pills (All, Income, Expense) and sorting (Date & Amount).
* **Local Storage Persistence:** All transactions and preference settings are automatically saved to browser `localStorage` — zero data loss upon refresh.
* **Input Validation & Safety:** Form validation for non-empty fields and positive amounts with error feedback.
* **Responsive Design:** Mobile-first, responsive grid layout that adapts seamlessly to phones, tablets, and widescreen desktops.

### 🎁 Bonus Features Included
* **Interactive Financial Analytics & Charts:**
  * **Category Breakdown SVG Donut Chart:** Visual representation of category spending percentages with hover tooltips and dynamic legend bars.
  * **Cashflow Inflow vs Outflow Comparison:** Relative visual comparison of money coming in vs going out.
* **Theme Customization:** Instant Dark Mode / Light Mode toggle with persistent theme selection.
* **Rupee-First Currency & Indian Formatting:** Defaults to Indian Rupees (`₹ INR`) with authentic Indian number grouping (`en-IN` format, e.g. `₹35,000.00`), plus support for switching to USD, EUR, or GBP.
* **Data Export to CSV:** One-click CSV export to download all transaction records.
* **Seed Dataset & Data Management:** Pre-loaded realistic financial transactions (stipends, housing, food, groceries) calibrated in Rupees, plus "Reset to Sample Data" and "Clear All" controls.

---

## 🛠️ Tech Stack

* **Frontend:** React 18 (Hooks: `useState`, `useEffect`, `useMemo`, `useRef`)
* **State Management:** React Context API (`ExpenseContext`)
* **Styling:** Tailwind CSS (Custom Dark Palette, Glassmorphism, Micro-interactions)
* **Icons:** Lucide Icons & Vector SVGs
* **Storage:** Browser `localStorage`

---

## 🚀 Getting Started

### Method 1: Instant Browser Preview (Zero Install Required)
You can test the entire application directly without installing Node or NPM:
1. Double-click [index.html](file:///C:/Users/RACHIT/.gemini/antigravity-ide/scratch/expense-tracker/index.html) to open in Chrome / Edge / Brave.
2. Or start a local server using Python:
   ```bash
   python -m http.server 3000
   ```
   Then open `http://localhost:3000` in your browser.

---

### Method 2: Standard Vite Development Server
If Node.js is installed on your machine:
```bash
# 1. Install dependencies
npm install

# 2. Run local development server
npm run dev

# 3. Build for production deployment
npm run build
```

---

## 📁 Project Structure

```
expense-tracker/
├── index.html                   # Zero-build standalone deployment entry
├── package.json                 # Project scripts and dependencies
├── vite.config.js               # Vite bundler configuration
├── tailwind.config.js           # Tailwind color & dark mode config
├── README.md                    # Project documentation
└── src/
    ├── main.jsx                 # React root DOM rendering
    ├── App.jsx                  # Main dashboard container
    ├── index.css                # Tailwind directives and utility classes
    ├── context/
    │   └── ExpenseContext.jsx   # Global state, CRUD logic, local storage sync
    ├── data/
    │   ├── categories.js        # Categories definition with metadata
    │   └── initialData.js       # Realistic initial seed transactions
    └── components/
        ├── Header.jsx           # Top navigation, theme toggle, export action
        ├── StatsCards.jsx       # Net Balance, Income, Expense, Savings Rate
        ├── ChartsSection.jsx    # SVG Donut Chart & Cashflow visualizer (Bonus)
        ├── TransactionFilters.jsx# Search bar, category, date, and sorting filters
        ├── TransactionList.jsx  # Transaction cards, item actions (edit/delete)
        └── TransactionModal.jsx # Add & Edit modal with form validation
```

---

## 🌐 Deployment to GitHub Pages / Vercel

### To Deploy on Vercel:
1. Push this folder to a GitHub repository.
2. Go to [vercel.com](https://vercel.com) and import the repository.
3. Click **Deploy**. Vercel will automatically detect `index.html` or the Vite configuration and deploy a live link in seconds.

### To Deploy on GitHub Pages:
1. Push the code to your GitHub repo.
2. Go to **Settings > Pages**.
3. Under **Branch**, select `main` branch and `/ (root)` folder.
4. Click **Save**. Your site will be live at `https://<username>.github.io/<repo-name>/`.

---

## 📋 Evaluation Checklist

| Requirement | Status | Details |
| :--- | :---: | :--- |
| **Add/Edit/Delete Transactions** | ✅ | Full CRUD support with modal interface |
| **Income & Expense Categories** | ✅ | Distinct categories, badges, and icons |
| **Current Balance** | ✅ | Dynamic real-time calculation |
| **Monthly Summary** | ✅ | Monthly & period filters with top expense category |
| **Search & Filter** | ✅ | Live text search, type filters, and sort options |
| **Charts (Bonus)** | ✅ | SVG Category Donut chart & Inflow/Outflow breakdown |
| **Local Storage** | ✅ | Persistent state synchronized automatically |
| **Responsive Design** | ✅ | Tested across mobile, tablet, and desktop views |
| **Tailwind CSS** | ✅ | Clean modern dark & light modes |
| **Context API** | ✅ | Modular state management in `ExpenseContext.jsx` |

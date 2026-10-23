# SpendWise — Modern Expense Tracker (React)



A modern, high-performance **Expense Tracker & Financial Analytics Dashboard** 

---

## 🌟 Key Features


* **Add / Edit / Delete Transactions:** Complete CRUD operations with reactive state and instant modal forms.
* **Income & Expense Categories:** Granular categorized tags (Food, Housing, Transport, Freelance, Salary, Investments, etc.) with custom icon indicators and color badges.
* **Real-time Balance & Financial Health:** Dynamic calculation of Net Balance, Total Income, Total Expenses, and Savings Rate.
* **Monthly & Period Filtering:** Filter by "All Time", "This Month", and "Last Month" with instantaneous updates.
* **Instant Search & Multi-Filters:** Live search by title, notes, or category, combined with type pills (All, Income, Expense) and sorting (Date & Amount).
* **Local Storage Persistence:** All transactions and preference settings are automatically saved to browser `localStorage` — zero data loss upon refresh.
* **Input Validation & Safety:** Form validation for non-empty fields and positive amounts with error feedback.
* **Responsive Design:** Mobile-first, responsive grid layout that adapts seamlessly to phones, tablets, and widescreen desktops.
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




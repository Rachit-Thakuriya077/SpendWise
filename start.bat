@echo off
echo Starting SpendWise Expense Tracker...
start http://localhost:3000
python -m http.server 3000
pause

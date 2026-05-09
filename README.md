# 💰 Finance Dashboard

A full-stack personal finance tracking web application built with **Python (FastAPI)** and **React**.

![Python](https://img.shields.io/badge/Python-3.13-blue)
![FastAPI](https://img.shields.io/badge/FastAPI-0.100+-green)
![React](https://img.shields.io/badge/React-18-61dafb)
![SQLite](https://img.shields.io/badge/Database-SQLite-orange)

---

## 🚀 Live Demo

> Run locally following the instructions below.

---

## ✨ Features

- ➕ Add income and expense transactions
- 📊 Real-time dashboard with charts
- 🥧 Spending breakdown by category (Pie Chart)
- 📈 Monthly income vs expense trends (Bar Chart)
- 🗑️ Delete transactions
- ⬇️ Export all transactions to CSV
- 🔄 Instant UI updates after every action

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React, Vite, Recharts, Axios |
| Backend | Python, FastAPI, Pandas |
| Database | SQLite, SQLAlchemy ORM |
| Validation | Pydantic |
| Version Control | Git + GitHub |

---

## 📁 Project Structure
financial_Dashboard/
├── Backend/
│   ├── main.py          # FastAPI app + all routes
│   ├── models.py        # SQLAlchemy DB models
│   ├── schemas.py       # Pydantic data schemas
│   ├── crud.py          # Database operations
│   ├── analytics.py     # Pandas data analytics
│   └── database.py      # DB connection setup
└── frontend/
└── src/
├── components/
│   ├── Summary.jsx         # Balance cards
│   ├── CategoryChart.jsx   # Pie chart
│   ├── MonthlyChart.jsx    # Bar chart
│   ├── TransactionForm.jsx # Add transactions
│   └── TransactionList.jsx # View & delete
├── api.js       # All API calls
└── App.jsx      # Main layout

---

## ⚙️ How to Run Locally

### 1. Clone the repo
```bash
git clone https://github.com/Lalitha638/financial_Dashboard.git
cd financial_Dashboard
```

### 2. Run the Backend
```bash
cd Backend
pip install fastapi uvicorn sqlalchemy pydantic pandas
uvicorn main:app --reload
```
Backend runs on → `http://127.0.0.1:8000`

API docs → `http://127.0.0.1:8000/docs`

### 3. Run the Frontend
```bash
cd frontend
npm install
npm run dev
```
Frontend runs on → `http://localhost:5173`

---

## 📡 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/` | Health check |
| POST | `/transactions` | Add a transaction |
| GET | `/transactions` | Get all transactions |
| DELETE | `/transactions/{id}` | Delete a transaction |
| GET | `/summary` | Total income, expenses, balance |
| GET | `/by-category` | Spending grouped by category |
| GET | `/monthly` | Monthly income vs expenses |
| GET | `/export-csv` | Download transactions as CSV |

---

## 📸 Screenshots

> Dashboard with charts and transaction form

---

## 🎯 What I Learned

- Building REST APIs with FastAPI
- Database design with SQLAlchemy ORM
- Data processing and aggregation with Pandas
- Connecting React frontend to Python backend
- React hooks (useState, useEffect)
- Data visualization with Recharts
- Git version control workflow

---

## 👩‍💻 Author

**Lalitha** — [GitHub](https://github.com/Lalitha638)

---

## 🔮 Future Improvements

- [ ] User authentication (JWT login)
- [ ] PostgreSQL for production database
- [ ] Budget goals per category
- [ ] Deploy online (Render / Vercel)
- [ ] Dark / Light mode toggle

Save and push to GitHub:
cmdgit add README.md
git commit -m "Add professional README"
git push

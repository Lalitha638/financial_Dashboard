import pandas as pd
from sqlalchemy.orm import Session
import models


def get_summary(db: Session):
    # Fetch all transactions from DB
    transactions = db.query(models.Transaction).all()

    if not transactions:
        return {
            "total_income": 0,
            "total_expenses": 0,
            "balance": 0,
            "total_transactions": 0
        }

    # Convert list of SQLAlchemy objects into a Pandas DataFrame
    # This is exactly how data engineers work — get data, put it in a DataFrame
    df = pd.DataFrame([{
        "id": t.id,
        "title": t.title,
        "amount": t.amount,
        "category": t.category,
        "type": t.type,
        "date": t.date,
    } for t in transactions])

    # Pandas makes this kind of filtering super clean
    total_income = df[df["type"] == "income"]["amount"].sum()
    total_expenses = df[df["type"] == "expense"]["amount"].sum()
    balance = total_income - total_expenses

    return {
        "total_income": round(total_income, 2),
        "total_expenses": round(total_expenses, 2),
        "balance": round(balance, 2),
        "total_transactions": len(df)
    }


def get_by_category(db: Session):
    transactions = db.query(models.Transaction).all()

    if not transactions:
        return []

    df = pd.DataFrame([{
        "category": t.category,
        "amount": t.amount,
        "type": t.type,
    } for t in transactions])

    # groupby is one of the most used Pandas features in real data jobs
    # Here we group all rows by category and sum their amounts
    grouped = df.groupby("category")["amount"].sum().reset_index()
    grouped.columns = ["category", "total"]
    grouped["total"] = grouped["total"].round(2)

    # Convert to list of dicts — easy for React to consume
    return grouped.to_dict(orient="records")


def get_monthly_trend(db: Session):
    transactions = db.query(models.Transaction).all()

    if not transactions:
        return []

    df = pd.DataFrame([{
        "amount": t.amount,
        "type": t.type,
        "date": pd.to_datetime(t.date),  # convert to proper datetime
    } for t in transactions])

    # Create a "month" column like "2026-05" from the date
    df["month"] = df["date"].dt.to_period("M").astype(str)

    # Separate income and expenses, group by month
    income_df = df[df["type"] == "income"].groupby("month")["amount"].sum()
    expense_df = df[df["type"] == "expense"].groupby("month")["amount"].sum()

    # Combine into one clean DataFrame with all months
    monthly = pd.DataFrame({
        "income": income_df,
        "expenses": expense_df
    }).fillna(0).reset_index()  # fillna fills missing months with 0

    monthly.columns = ["month", "income", "expenses"]
    monthly["income"] = monthly["income"].round(2)
    monthly["expenses"] = monthly["expenses"].round(2)

    return monthly.to_dict(orient="records")
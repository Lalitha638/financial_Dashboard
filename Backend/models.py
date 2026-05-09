from sqlalchemy import Column, Integer, String, Float, Date
from database import Base
import datetime


class Transaction(Base):
    __tablename__ = "transactions"  # This becomes the actual table name in SQLite

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, nullable=False)          # e.g. "Salary", "Groceries"
    amount = Column(Float, nullable=False)           # e.g. 5000.0 or -200.0
    category = Column(String, nullable=False)        # e.g. "Food", "Income"
    type = Column(String, nullable=False)            # "income" or "expense"
    date = Column(Date, default=datetime.date.today)
    note = Column(String, nullable=True)             # optional description
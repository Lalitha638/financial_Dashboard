from pydantic import BaseModel
from typing import Optional
import datetime


# Used when the USER sends data to create a transaction
class TransactionCreate(BaseModel):
    title: str
    amount: float
    category: str
    type: str                          # must be "income" or "expense"
    date: Optional[datetime.date] = None
    note: Optional[str] = None


# Used when we SEND data back to the user (includes the auto-generated id)
class TransactionResponse(TransactionCreate):
    id: int

    class Config:
        from_attributes = True         # allows reading data from SQLAlchemy objects
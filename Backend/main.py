from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import StreamingResponse
from sqlalchemy.orm import Session
from typing import List
import csv
import io

import models
import schemas
import crud
import analytics
from database import engine, get_db

# Creates all DB tables automatically on startup
models.Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="Finance Dashboard API",
    version="2.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def root():
    return {"message": "Finance Dashboard API is running"}


@app.post("/transactions", response_model=schemas.TransactionResponse)
def add_transaction(
    transaction: schemas.TransactionCreate,
    db: Session = Depends(get_db)
):
    return crud.create_transaction(db, transaction)


@app.get("/transactions", response_model=List[schemas.TransactionResponse])
def list_transactions(db: Session = Depends(get_db)):
    return crud.get_transactions(db)


@app.delete("/transactions/{transaction_id}")
def remove_transaction(transaction_id: int, db: Session = Depends(get_db)):
    item = crud.delete_transaction(db, transaction_id)
    if not item:
        raise HTTPException(status_code=404, detail="Transaction not found")
    return {"message": "Deleted successfully"}


@app.get("/summary")
def get_summary(db: Session = Depends(get_db)):
    return analytics.get_summary(db)


@app.get("/by-category")
def get_by_category(db: Session = Depends(get_db)):
    return analytics.get_by_category(db)


@app.get("/monthly")
def get_monthly_trend(db: Session = Depends(get_db)):
    return analytics.get_monthly_trend(db)


@app.get("/export-csv")
def export_csv(db: Session = Depends(get_db)):
    transactions = crud.get_transactions(db)

    output = io.StringIO()
    writer = csv.writer(output)

    # Header row
    writer.writerow(["ID", "Title", "Amount", "Category", "Type", "Date", "Note"])

    # Data rows
    for t in transactions:
        writer.writerow([
            t.id,
            t.title,
            t.amount,
            t.category,
            t.type,
            str(t.date),
            t.note or ""
        ])

    output.seek(0)
    content = output.getvalue()
    output.close()

    return StreamingResponse(
        io.StringIO(content),
        media_type="text/csv",
        headers={
            "Content-Disposition": "attachment; filename=transactions.csv",
            "Access-Control-Expose-Headers": "Content-Disposition"
        }
    )

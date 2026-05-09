from sqlalchemy.orm import Session
import models
import schemas
import datetime


def create_transaction(db: Session, transaction: schemas.TransactionCreate):
    # Convert the Pydantic schema into a SQLAlchemy model object
    db_item = models.Transaction(
        title=transaction.title,
        amount=transaction.amount,
        category=transaction.category,
        type=transaction.type,
        date=transaction.date or datetime.date.today(),
        note=transaction.note,
    )
    db.add(db_item)      # stage it
    db.commit()          # write it to the DB
    db.refresh(db_item)  # reload from DB to get the auto-generated id
    return db_item


def get_transactions(db: Session, skip: int = 0, limit: int = 100):
    return db.query(models.Transaction).offset(skip).limit(limit).all()


def get_transaction_by_id(db: Session, transaction_id: int):
    return db.query(models.Transaction).filter(
        models.Transaction.id == transaction_id
    ).first()


def delete_transaction(db: Session, transaction_id: int):
    item = get_transaction_by_id(db, transaction_id)
    if item:
        db.delete(item)
        db.commit()
    return item
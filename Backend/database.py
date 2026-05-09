from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

# This is the database file that SQLite will create on your disk
DATABASE_URL = "sqlite:///./finance.db"

# The engine is the actual connection to the database
engine = create_engine(
    DATABASE_URL,
    connect_args={"check_same_thread": False}  # needed for SQLite only
)

# SessionLocal is like a "conversation" with the DB — you open one per request
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Base is the parent class all your DB table models will inherit from
Base = declarative_base()


# This is a helper function — FastAPI will call it to get a DB session
# and automatically close it when the request is done
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
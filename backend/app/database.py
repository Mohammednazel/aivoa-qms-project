from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy.ext.declarative import declarative_base

# For this provisional product, we will use a simple SQLite database.
# The database will be a single file named 'qms.db' in the root of the backend folder.
DATABASE_URL = "sqlite:///./qms.db"

# Create the SQLAlchemy engine
engine = create_engine(
    DATABASE_URL, 
    # This connect_args is only needed for SQLite to allow multi-threaded access,
    # which is required by FastAPI.
    connect_args={"check_same_thread": False}
)

# Create a SessionLocal class. Each instance of this class will be a database session.
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Create a Base class. Our ORM models (in models.py) will inherit from this class.
Base = declarative_base()

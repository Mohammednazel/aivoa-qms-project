from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from typing import List
from dotenv import load_dotenv # <-- IMPORT load_dotenv HERE

# --- Load Environment Variables ---
# This should be one of the first things your application does.
load_dotenv()

# Import all the components we've built
from . import models, schemas
from .database import SessionLocal, engine, Base
from .ai_services import get_ai_insights # <-- Import the new AI function

# Create all the database tables defined in models.py
Base.metadata.create_all(bind=engine)

app = FastAPI()

# --- CORS Middleware ---
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# --- Dependency ---
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# --- API Endpoints ---

@app.get("/")
def read_root():
    return {"message": "QMS Backend is running"}

@app.post("/events/", response_model=schemas.QMSEvent)
def create_qms_event(event: schemas.QMSEventCreate, db: Session = Depends(get_db)):
    """
    Create a new QMS event and save it to the database.
    """
    # Use model_dump() for Pydantic v2
    db_event = models.QMSEvent(**event.model_dump(), initiator="Nazel")
    db.add(db_event)
    db.commit()
    db.refresh(db_event)
    return db_event

@app.get("/events/", response_model=List[schemas.QMSEvent])
def read_qms_events(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    """
    Retrieve a list of all QMS events from the database.
    """
    events = db.query(models.QMSEvent).offset(skip).limit(limit).all()
    return events

# --- NEW: AI Assistance Endpoint ---
@app.post("/ai/assist")
def ai_assistance(request: schemas.AIRequest, db: Session = Depends(get_db)):
    """
    Receives a user query, fetches all current events to provide context,
    and returns an insight from the Gemini model.
    """
    # Fetch all events to provide as context to the AI
    all_events = db.query(models.QMSEvent).all()
    
    # Convert SQLAlchemy objects to Pydantic schemas
    events_schemas = [schemas.QMSEvent.from_orm(event) for event in all_events]

    # Call our AI service function
    insight = get_ai_insights(query=request.query, events=events_schemas)
    
    return {"answer": insight}

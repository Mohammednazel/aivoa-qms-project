from pydantic import BaseModel
from datetime import datetime
from typing import Optional

# Import the enums from the models package at the app level
from ..models.definitions import EventType, EventStatus, SeverityLevel

# Base schema with fields common to creating and reading an event
class QMSEventBase(BaseModel):
    event_type: EventType
    title: str
    description: str
    department: str
    severity: SeverityLevel
    priority: SeverityLevel
    responsible_parties: Optional[str] = None

# Schema for creating a new event
class QMSEventCreate(QMSEventBase):
    pass

# Schema for reading an event from the API
class QMSEvent(QMSEventBase):
    id: int
    created_at: datetime
    status: EventStatus
    initiator: str

    class Config:
        from_attributes = True

# --- NEW: Add this schema for the AI request body ---
class AIRequest(BaseModel):
    query: str

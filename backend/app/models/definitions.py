from sqlalchemy import Column, Integer, String, DateTime, Enum as SQLAlchemyEnum
from datetime import datetime
import enum

# Import the Base from the correct database file
from ..database import Base

# Using Python's standard Enum class to create controlled vocabularies.
# This is a best practice for QMS to ensure data consistency.
class EventType(str, enum.Enum):
    DEVIATION = "Deviation"
    CAPA = "CAPA"
    CHANGE_CONTROL = "Change Control"
    AUDIT_FINDING = "Audit Finding"

class EventStatus(str, enum.Enum):
    OPEN = "Open"
    IN_PROGRESS = "In Progress"
    PENDING_REVIEW = "Pending Review"
    CLOSED = "Closed"

class SeverityLevel(str, enum.Enum):
    LOW = "Low"
    MEDIUM = "Medium"
    HIGH = "High"

# This is the SQLAlchemy ORM model for our database table.
class QMSEvent(Base):
    __tablename__ = "qms_events"

    id = Column(Integer, primary_key=True, index=True)
    event_type = Column(SQLAlchemyEnum(EventType))
    title = Column(String, index=True)
    description = Column(String)
    created_at = Column(DateTime, default=datetime.utcnow)
    initiator = Column(String)
    department = Column(String)
    status = Column(SQLAlchemyEnum(EventStatus), default=EventStatus.OPEN)
    severity = Column(SQLAlchemyEnum(SeverityLevel))
    priority = Column(SQLAlchemyEnum(SeverityLevel)) # Reusing SeverityLevel for Priority
    responsible_parties = Column(String, nullable=True)

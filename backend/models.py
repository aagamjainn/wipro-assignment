from sqlalchemy import Column, Integer, String, DateTime
from sqlalchemy.sql import func
from .database import Base


class Resume(Base):
__tablename__ = 'resumes'
id = Column(Integer, primary_key=True, index=True)
name = Column(String, nullable=False)
email = Column(String, nullable=False)
file_path = Column(String, nullable=False)
file_name = Column(String, nullable=False)
uploaded_at = Column(DateTime(timezone=True), server_default=func.now())
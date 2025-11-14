from pydantic import BaseModel
from datetime import datetime


class ResumeOut(BaseModel):
id: int
name: str
email: str
file_name: str
uploaded_at: datetime


class Config:
orm_mode = True
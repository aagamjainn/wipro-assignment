import os
UPLOAD_DIR = os.path.join(os.path.dirname(__file__), 'uploads')
os.makedirs(UPLOAD_DIR, exist_ok=True)



VALID_USERNAME = os.getenv('VALID_USERNAME', 'admin')
VALID_PASSWORD = os.getenv('VALID_PASSWORD', 'pass123')




def get_db():
db = SessionLocal()
try:
yield db
finally:
db.close()


@app.post('/login')
def login(username: str = Form(...), password: str = Form(...)):
if username == VALID_USERNAME and password == VALID_PASSWORD:
return {"success": True}
raise HTTPException(status_code=401, detail="Invalid credentials")


@app.post('/upload')
async def upload_resume(
name: str = Form(...),
email: str = Form(...),
file: UploadFile = File(...),
db: Session = Depends(get_db),
):

filename = file.filename
if not (filename.lower().endswith('.pdf') or filename.lower().endswith('.docx') or filename.lower().endswith('.doc')):
raise HTTPException(status_code=400, detail='Only PDF/DOC/DOCX allowed')


save_path = os.path.join(UPLOAD_DIR, filename)

base, ext = os.path.splitext(filename)
counter = 1
while os.path.exists(save_path):
filename = f"{base}_{counter}{ext}"
save_path = os.path.join(UPLOAD_DIR, filename)
counter += 1


with open(save_path, 'wb') as out:
content = await file.read()
out.write(content)


db_item = models.Resume(name=name, email=email, file_path=save_path, file_name=filename)
db.add(db_item)
db.commit()
db.refresh(db_item)


return {"id": db_item.id, "name": db_item.name, "email": db_item.email, "file_name": db_item.file_name}


@app.get('/resumes', response_model=list[schemas.ResumeOut])
def list_resumes(db: Session = Depends(get_db)):
items = db.query(models.Resume).order_by(models.Resume.uploaded_at.desc()).all()
return items


@app.get('/download/{resume_id}')
def download_resume(resume_id: int, db: Session = Depends(get_db)):
item = db.query(models.Resume).filter(models.Resume.id == resume_id).first()
if not item:
raise HTTPException(status_code=404, detail='Resume not found')
return FileResponse(item.file_path, filename=item.file_name)
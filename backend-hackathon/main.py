from fastapi import FastAPI, File, UploadFile, Form
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
import PyPDF2
import io
from src.concept_analysis import build_course_plan

app = FastAPI()

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allows all origins
    allow_credentials=True,
    allow_methods=["*"],  # Allows all methods
    allow_headers=["*"],  # Allows all headers
)

@app.post("/extract-text/")
async def extract_text(file: UploadFile = File(...)):
    contents = await file.read()
    pdf_reader = PyPDF2.PdfReader(io.BytesIO(contents))
    data = []
    for i, page in enumerate(pdf_reader.pages):
        text = page.extract_text()
        if text:
            data.append({
                "page_number": i + 1,
                "text": text.strip()
            })
    return JSONResponse(content=data)

@app.post("/analyze-course/")
async def analyze_course(
    file: UploadFile = File(...),
    hours_per_week: int = Form(3)
):

    contents = await file.read()
    pdf_reader = PyPDF2.PdfReader(io.BytesIO(contents))
    pages = []
    for i, page in enumerate(pdf_reader.pages):
        text = page.extract_text()
        if text:
            pages.append({
                "page_number": i + 1,
                "text": text.strip()
            })
    course_plan = build_course_plan(pages, hours_per_week)
    return JSONResponse(content=course_plan)

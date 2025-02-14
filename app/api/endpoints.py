from fastapi import APIRouter, Request
from fastapi.responses import HTMLResponse
from fastapi.templating import Jinja2Templates

router = APIRouter()

templates = Jinja2Templates(directory="app/templates")

@router.get("/", response_class=HTMLResponse)
async def read_index(request: Request):
    """
    Serve the index.html template as the homepage.
    """
    return templates.TemplateResponse("index.html", {"request": request})

@router.get("/health", summary="Health Check")
async def health_check():
    """
    Simple endpoint to check if the API is running.
    """
    return {"status": "ok", "message": "AI-RPG API is healthy!"}

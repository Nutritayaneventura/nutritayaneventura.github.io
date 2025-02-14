from fastapi import APIRouter, Request
from fastapi.responses import HTMLResponse, JSONResponse
from fastapi.templating import Jinja2Templates
from app.services import llm_service
from app.services import image_service
from app.api.models import ChatMessage
from pydantic import BaseModel

router = APIRouter()

templates = Jinja2Templates(directory="app/templates")


@router.get("/", response_class=HTMLResponse)
async def read_index(request: Request):
    return templates.TemplateResponse("index.html", {"request": request})


@router.get("/health", summary="Health Check")
async def health_check():
    return {"status": "ok", "message": "AI-RPG API is healthy!"}


# Define a simple model for chat input.
class ChatInput(BaseModel):
    message: str


@router.post("/chat", summary="Chat with the DM")
async def chat_endpoint(chat: ChatInput):
    """
    Accepts a chat message from the player, processes it using the LLM service,
    and returns the DM's response.
    """
    # Use the LLM service to generate a response.
    dm_response = llm_service.generate_dm_response(chat.message)
    # Use the image service to generate an image.
    image_url = image_service.generate_image(dm_response)
    # Return the response as JSON.
    return {"message": dm_response, "image_url": image_url}

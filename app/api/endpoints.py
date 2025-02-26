from fastapi import APIRouter, Request, Depends
from fastapi.responses import HTMLResponse
from fastapi.templating import Jinja2Templates
from app.services.llm_service import LlmService
from app.services import image_service
from app.api.models import ChatInput
from app.api.dependencies import get_llm_service

router = APIRouter()

templates = Jinja2Templates(directory="app/templates")


@router.get("/", response_class=HTMLResponse)
async def read_index(request: Request):
    return templates.TemplateResponse("index.html", {"request": request})


@router.get("/health", summary="Health Check")
async def health_check():
    return {"status": "ok", "message": "AI-RPG API is healthy!"}


@router.post("/chat", summary="Chat with the DM")
async def chat_endpoint(
    chat: ChatInput,
    request: Request,
    llm_service: LlmService = Depends(get_llm_service),
):
    client_ip = request.client.host
    llm_service = LlmService(client_ip)
    dm_response = llm_service.generate_dm_response(chat.message)

    image_prompt = llm_service.generate_image_prompt(dm_response)
    image_url = None
    if image_prompt:
        image_url = image_service.generate_image(image_prompt)

    return {"message": dm_response, "image_url": image_url}

from app.services.llm_service import LlmService
from fastapi import Request


def get_llm_service(request: Request) -> LlmService:
    client_ip = request.client.host
    return LlmService(client_ip)

from fastapi import APIRouter

router = APIRouter()

@router.get("/health", summary="Health Check")
async def health_check():
    """
    Simple endpoint to check if the API is running.
    """
    return {"status": "ok", "message": "AI-RPG API is healthy!"}

# You can add more endpoints here as your application grows.

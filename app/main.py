from fastapi import FastAPI
from app.api import endpoints

app = FastAPI(title="AI-RPG", description="A D&D game powered by AI", version="0.1.0")

# Include our API router from the endpoints module
app.include_router(endpoints.router)

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("app.main:app", host="0.0.0.0", port=8000, reload=True)

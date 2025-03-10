import os
from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from app.api import endpoints

app = FastAPI(
    title="Tay-Website", description="Tayane Ventura Nutricionista", version="1.0.0"
)
app.mount("/static", StaticFiles(directory="app/static"), name="static")
app.include_router(endpoints.router)

if __name__ == "__main__":
    import uvicorn

    host = os.getenv("HOST", "0.0.0.0")
    port = int(os.getenv("PORT", 8000))
    reload = os.getenv("RELOAD", "true")

    uvicorn.run("app.main:app", host=host, port=port, reload=reload)

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

    uvicorn.run("app.main:app", host="0.0.0.0", port=8000, reload=True)

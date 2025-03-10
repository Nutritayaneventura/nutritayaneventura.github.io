from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from docs.api import endpoints

app = FastAPI(
    title="Tay-Website", description="Website Nutri Tayane Ventura", version="1.0.0"
)
app.mount("/docs", StaticFiles(directory="docs"), name="docs")
app.include_router(endpoints.router)

if __name__ == "__main__":
    import uvicorn

    uvicorn.run("docs.main:app", host="0.0.0.0", port=8000, reload="true")

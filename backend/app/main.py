from contextlib import asynccontextmanager
import httpx
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.routes.api import router as api_router
from app.settings import get_settings

settings = get_settings()

@asynccontextmanager
async def lifespan(_app: FastAPI):
    """Declaration and attachment of the lifespan objects"""
    _app.requests_client = httpx.AsyncClient()
    yield
    await _app.requests_client.aclose()

app = FastAPI(lifespan=lifespan, title=settings.APP_NAME, version=settings.VERSION)

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(api_router)

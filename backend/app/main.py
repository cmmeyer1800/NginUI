from contextlib import asynccontextmanager
import httpx
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pymongo import MongoClient

from app.routes.api import router as api_router
from app.config import get_settings

settings = get_settings()

@asynccontextmanager
async def lifespan(_app: FastAPI):
    """Declaration and attachment of the lifespan objects"""
    _app.requests_client = httpx.AsyncClient()
    _app.mongodb_client = MongoClient(
        f"mongodb://{settings.MONGO_USER}:{settings.MONGO_PASSWORD}@{settings.MONGO_HOST}"
    )
    _app.database = _app.mongodb_client[settings.MONGO_DB]

    yield
    await _app.requests_client.aclose()
    _app.mongodb_client.close()

app = FastAPI(lifespan=lifespan)

print(settings.CORS_ORIGINS)

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(api_router)

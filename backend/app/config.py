from functools import lru_cache
from typing import Optional

from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    """Application Settings
    """
    APP_NAME: str = "NginUI"

    MONGO_HOST: str
    MONGO_USER: str
    MONGO_PASSWORD: str
    MONGO_DB: str

    CORS_ORIGINS: Optional[list[str]] = []


@lru_cache
def get_settings():
    """Get the settings object cached"""
    return Settings()

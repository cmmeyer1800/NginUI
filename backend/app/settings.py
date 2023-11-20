"""Pydantic Settings for the Nginui Backend

Author: Collin Meyer
Last Modified: November 15, 2023
"""

from functools import lru_cache
from typing import Optional

from pydantic_settings import BaseSettings


class Settings(BaseSettings):  # pylint: disable=too-few-public-methods
    """Application Settings"""

    APP_NAME: str = "NginUI"

    VERSION: str = "0.1.0"

    CORS_ORIGINS: Optional[list[str]] = []


@lru_cache
def get_settings():
    """Get the settings object cached"""
    return Settings()

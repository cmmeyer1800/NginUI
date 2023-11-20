"""Base of API routes."""

from fastapi import APIRouter

from app.routes.api.configs import configs_router
from app.routes.api.status import status_router

router = APIRouter(prefix="/api")
router.include_router(configs_router)
router.include_router(status_router)

#! /usr/bin/env python3
"""
Status routes for Nginui backend

Author: Collin Meyer
Last Modified: November 19, 2023
"""

from fastapi import APIRouter, Request

from app.routes.api.status.common import nginx_stub_decode
from app.models.status import NginxStubStatus

router = APIRouter(prefix="/status")


@router.get("/nginx")
async def nginx_status(request: Request) -> NginxStubStatus:
    """Nginx Status Endpoint

    Args:
        None
    """
    requests_client = request.app.requests_client

    response = await requests_client.get("http://127.0.0.1/nginx_status")
    return nginx_stub_decode(response.text)

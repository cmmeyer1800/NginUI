#! /usr/bin/env python3
"""
Config routes for Nginui backend

Author: Collin Meyer
Last Modified: November 19, 2023
"""
from fastapi import APIRouter, Request, Response, status

from app.routes.api.configs.common import (
    get_configs,
    create_config,
    delete_config,
    verify_configs,
    get_config,
    set_config,
)

router = APIRouter(prefix="/configs")

@router.get("/")
async def configs(response: Response):
    """GET /configs Route

    Returns:
        - JSON: status, configs if success & error message if failed
    """

    confs = get_configs()

    if confs is None:
        response.status_code = status.HTTP_500_INTERNAL_SERVER_ERROR
        return {"status": "failed", "message": "internal server error"}

    return {"status": "success", "configs": confs}


@router.post("/")
async def create_config_route(request: Request, response: Response):
    """POST /configs Route
    
    Args:
        - JSON Request Body: Need name field

    Returns:
        - JSON: status, error message if failed
    """
    data = await request.json()

    if "name" not in data:
        response.status_code = status.HTTP_400_BAD_REQUEST
        return {"status": "failed", "message": "name field is required"}
    res = create_config(f"{data['name']}.conf", "")

    if res == 1:
        response.status_code = status.HTTP_400_BAD_REQUEST
        return {"status": "failed", "message": "config already exists"}
    if res == 2:
        response.status_code = status.HTTP_500_INTERNAL_SERVER_ERROR
        return {"status": "failed", "message": "internal server error"}

    return {"status": "success"}


@router.delete("/")
async def delete_config_route(request: Request, response: Response):
    """
    DELETE /configs Route
    
    Args:
        - JSON Request Body: Need name field
    
    Returns:
        - JSON: status, error message if failed
    """
    data = await request.json()

    if "name" not in data:
        response.status_code = status.HTTP_400_BAD_REQUEST
        return {"status": "failed", "message": "name field is required"}

    result = delete_config(data["name"])

    if not result:
        response.status_code = status.HTTP_400_BAD_REQUEST
        return {"status": "failed", "message": "config does not exist"}
    return {"status": "success"}


@router.get("/verify")
async def verify_configs_route():
    """GET /configs/verify Route
    
    Returns:
        - JSON: status, result = True if success & False if failed, details = nginx output
    """
    result, details = await verify_configs()

    return {"status": "success", "result": result, "details": details.split("\n")}


@router.get("/{conf_name}")
async def get_config_route(conf_name: str, response: Response):
    """GET /configs/{conf_name} Route

    Args:
        - conf_name (str): The name of the configuration file to get.
    
    Returns:
        - JSON: status, config if success & error message if failed
    """
    conf = get_config(conf_name)

    if conf is None:
        response.status_code = status.HTTP_404_NOT_FOUND
        return {"status": "failed", "message": "config not found"}

    return {"status": "success", "config": conf}


@router.put("/{conf_name}")
async def set_config_route(conf_name: str, request: Request, response: Response):
    """PUT /configs/{conf_name} Route

    Args:
        - conf_name (str): The name of the configuration file to set.
        - JSON Request Body: Need config field

    Returns:
        - JSON: status, error message if failed
    """
    data = await request.json()

    if "config" not in data:
        response.status_code = status.HTTP_400_BAD_REQUEST
        return {"status": "failed", "message": "config field is required"}

    res = set_config(conf_name, data["config"])

    if res == 1:
        response.status_code = status.HTTP_404_NOT_FOUND
        return {"status": "failed", "message": "config not found"}
    if res == 2:
        response.status_code = status.HTTP_500_INTERNAL_SERVER_ERROR
        return {"status": "failed", "message": "internal server error"}

    return {"status": "success"}

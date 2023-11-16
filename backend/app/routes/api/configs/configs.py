#! /usr/bin/env python3
"""
Config routes for Nginui backend

Author: Collin Meyer
Last Modified: November 15, 2023
"""
from fastapi import APIRouter, Request, Response, status

from app.routes.api.configs.common import * # TODO: Fix Wildcard Import

router = APIRouter(prefix="/configs")

@router.get("/")
async def configs(response: Response):

    confs = get_configs()

    if confs is None:
        response.status_code = status.HTTP_500_INTERNAL_SERVER_ERROR
        return {
            "status": "failed",
            "message": "internal server error"
        }

    return {
        "status": "success",
        "configs": confs
    }


@router.post("/")
async def create_config_route(request: Request, response: Response):
    data = await request.json()

    if "name" not in data:
        response.status_code = status.HTTP_400_BAD_REQUEST
        return {
            "status": "failed",
            "message": "name field is required"
        }
    
    res = create_config(f"{data['name']}.conf", "")

    if res == 1:
        response.status_code = status.HTTP_400_BAD_REQUEST
        return {
            "status": "failed",
            "message": "config already exists"
        }
    elif res == 2:
        response.status_code = status.HTTP_500_INTERNAL_SERVER_ERROR
        return {
            "status": "failed",
            "message": "internal server error"
        }
    else:
        return {
            "status": "success"
        }


@router.delete("/")
async def delete_config_route(request: Request, response: Response):
    data = await request.json()

    if "name" not in data:
        response.status_code = status.HTTP_400_BAD_REQUEST
        return {
            "status": "failed",
            "message": "name field is required"
        }

    result = delete_config(data["name"])

    if not result:
        response.status_code = status.HTTP_400_BAD_REQUEST
        return {
            "status": "failed",
            "message": "config does not exist"
        }
    
    return {
        "status": "success"
    }


@router.get("/verify")
async def verify_configs_route():
    
    result, details = await verify_configs()

    return {
        "status": "success",
        "result": result,
        "details": details.split("\n")
    }


@router.get("/{conf_name}")
async def get_config_route(conf_name: str, response: Response):

    conf = get_config(conf_name)

    if conf is None:
        response.status_code = status.HTTP_404_NOT_FOUND
        return {
            "status": "failed",
            "message": "config not found"
        }

    return {
        "status": "success",
        "config": conf
    }

@router.put("/{conf_name}")
async def set_config_route(conf_name: str, request: Request, response: Response):
    data = await request.json()

    if "config" not in data:
        response.status_code = status.HTTP_400_BAD_REQUEST
        return {
            "status": "failed",
            "message": "config field is required"
        }

    res = set_config(conf_name, data["config"])

    if res == 1:
        response.status_code = status.HTTP_404_NOT_FOUND
        return {
            "status": "failed",
            "message": "config not found"
        }
    elif res == 2:
        response.status_code = status.HTTP_500_INTERNAL_SERVER_ERROR
        return {
            "status": "failed",
            "message": "internal server error"
        }
    else:
        return {
            "status": "success"
        }
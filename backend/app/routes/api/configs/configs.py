#! /usr/bin/env python3
"""
Config routes for Nginui backend

Author: Collin Meyer
Last Modified: November 15, 2023
"""
import os
import datetime
from fastapi import APIRouter, Request, Response, status

from app.routes.api.configs.common import * # TODO: Fix Wildcard Import

router = APIRouter(prefix="/configs")

@router.get("/")
async def configs(request: Request):

    confs: list[dict] = list(request.app.database.configs.find({}, limit=100))

    for conf in confs:
        conf["_id"] = str(conf["_id"])

    return {
        "configs": [c for c in confs]
    }


@router.post("/")
async def create_config(request: Request, response: Response):
    data = await request.json()

    if "name" not in data:
        response.status_code = status.HTTP_400_BAD_REQUEST
        return {
            "status": "failed",
            "message": "name field is required"
        }

    if len(list(request.app.database.configs.find(data))) > 0:
        response.status_code = status.HTTP_400_BAD_REQUEST
        return {
            "status": "failed",
            "message": "config already exists"
        }
    
    data["name"] = f"{data['name']}.conf"

    lm = datetime.datetime.now().strftime("%m/%d/%Y-%H:%M:%S")
    data["last_modified"] = lm

    request.app.database.configs.insert_one(data)

    return {
        "status": "success"
    }


@router.delete("/")
async def delete_config(request: Request, response: Response):
    data = await request.json()

    result = request.app.database.configs.delete_one(data)

    if result.deleted_count == 1:
        return {
            "status": "success"
        }
    else:
        response.status_code = status.HTTP_400_BAD_REQUEST
        return {
            "status": "failed",
            "message": "No document matched the filter"
        }

@router.get("/sync")
async def synchronize(request: Request, response: Response):

    diff_out = diff_sync_status(list(request.app.database.configs.find({})))

    return {
        "status": "success",
        "diffs": len(diff_out["missing_from_os"]) + len(diff_out["missing_from_db"]) != 0,
        "details": diff_out
    }

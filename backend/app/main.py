import datetime
from contextlib import asynccontextmanager
import httpx # pylint: disable=import-error
from fastapi import FastAPI, Request, APIRouter, Response, status
from pymongo import MongoClient
from fastapi.middleware.cors import CORSMiddleware
import os


config = {
    "ATLAS_URI": "mongodb://nginui:password@nginui-db",
    "DB_NAME": "nginui"
}

@asynccontextmanager
async def lifespan(app: FastAPI):
    app.requests_client = httpx.AsyncClient()
    app.mongodb_client = MongoClient(config["ATLAS_URI"])
    app.database = app.mongodb_client[config["DB_NAME"]]

    yield
    await app.requests_client.aclose()
    app.mongodb_client.close()

app = FastAPI(lifespan=lifespan)


# app.mount("/", StaticFiles(directory="static"), name="static")

origins = [
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

api = APIRouter(prefix="/api")

@api.get("/")
def read_root():
    return {"Hello": "World"}


def nginx_stub_decode(stub_info: str) -> dict:
    lines = stub_info.split("\n")

    connections = int(lines[0].strip().rstrip()[-1])

    req_data_line = lines[2].strip().rstrip().split(" ")
    conn_accepted = int(req_data_line[0])
    conn_handled = int(req_data_line[1])
    req_handled = int(req_data_line[2])

    curr_line = lines[3].strip().rstrip().split(" ")
    curr_reading = int(curr_line[1])
    curr_writing = int(curr_line[3])
    curr_waiting = int(curr_line[5])

    return {
        "active-connections": connections,
        "connections-accepted": conn_accepted,
        "connections-handled": conn_handled,
        "requests-handled": req_handled,
        "curr-reading": curr_reading,
        "curr-writing": curr_writing,
        "curr-waiting": curr_waiting,
    }


@api.get("/nginx_status")
async def nginx_status(request: Request):
    requests_client = request.app.requests_client
    response = await requests_client.get("http://127.0.0.1/nginx_status")
    
    return nginx_stub_decode(response.text)

@api.get("/configs")
async def configs(request: Request):

    confs: list[dict] = list(request.app.database.configs.find({}, limit=100))

    for conf in confs:
        conf["_id"] = str(conf["_id"])

    return {
        "configs": [c for c in confs]
    }


@api.post("/configs")
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


@api.delete("/configs")
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
    
@api.get("/sync")
async def synchronize(response: Response):
    confs = os.listdir("/etc/nginx/conf.d")
    return {
        "status": list(confs)
    }

app.include_router(api)

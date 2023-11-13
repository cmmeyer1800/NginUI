from contextlib import asynccontextmanager
import httpx # pylint: disable=import-error
from fastapi import FastAPI, Request, APIRouter
from fastapi.middleware.cors import CORSMiddleware



@asynccontextmanager
async def lifespan(app: FastAPI):
    app.requests_client = httpx.AsyncClient()
    yield
    await app.requests_client.aclose()

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
    response = await requests_client.get("http://nginui-nginx/nginx_status")
    
    return nginx_stub_decode(response.text)

@api.get("/configs")
async def configs(request: Request):
    return {
        "configs": [
            {
                "name": "test.conf",
                "listen": "80",
                "server_name": "localhost",
                "locations": [
                    {
                        "/": {}
                    }
                ],
                "last_modified":"11/12/2023"
            }
        ]
    }


app.include_router(api)

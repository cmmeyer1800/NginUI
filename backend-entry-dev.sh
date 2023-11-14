#! /bin/bash

service nginx start

cd /backend-dev
uvicorn app.main:app --reload --host 0.0.0.0 --port 8001
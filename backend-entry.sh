#! /bin/bash

service nginx start

cd /backend
uvicorn app.main:app --host 0.0.0.0 --port 8001
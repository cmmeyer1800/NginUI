FROM ubuntu:22.04

RUN apt-get update
RUN apt install -y python3 pip

RUN mkdir /backend

WORKDIR /backend

COPY backend /backend

RUN python3 -m pip install --no-cache-dir --upgrade -r /backend/requirements.txt

CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "80"]

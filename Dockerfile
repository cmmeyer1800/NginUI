FROM ubuntu:22.04

RUN apt-get update
RUN apt-get install -y systemd
RUN apt-get install -y nginx
RUN apt-get install -y python3 pip

COPY nginx/conf/stub_status.conf /etc/nginx/conf.d/stub_status.conf
COPY nginx/conf/backend.conf /etc/nginx/conf.d/backend.conf

COPY backend-entry-dev.sh /backend-entry-dev.sh
COPY backend-entry.sh /backend-entry.sh

RUN mkdir /backend

WORKDIR /backend

COPY backend /backend

RUN python3 -m pip install --no-cache-dir --upgrade -r /backend/requirements.txt

RUN service nginx start

WORKDIR /

CMD ["bash", "/backend-entry.sh"]

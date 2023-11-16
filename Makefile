

.PHONY: down, build, rebuild, up, connect
down:
	docker-compose down

build:
	docker-compose build

rebuild:
	docker-compose build --no-cache

up:
	docker-compose up -d

connect:
	docker exec -it nginui-general bash

.PHONY: dev-down, dev-build, rebuild, up, connect

dev-down:
	docker-compose -f docker-compose-dev.yml down

dev-build:
	docker-compose -f docker-compose-dev.yml build

dev-rebuild:
	docker-compose -f docker-compose-dev.yml build --no-cache

dev-up:
	docker-compose -f docker-compose-dev.yml up --build
FROM node:18-buster-slim
MAINTAINER Oleg Pasternak <oleg@pasternak.work>

RUN apt-get update && apt-get install -y nginx
COPY . /app/code

ENTRYPOINT ["bash", "/app/code/docker-entrypoint.sh"]

EXPOSE 3001
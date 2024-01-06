FROM node:18-buster-slim
MAINTAINER Oleg Pasternak <oleg@pasternak.work>

RUN apt-get update && apt-get install -y nginx
RUN rm -f /etc/nginx/sites-enabled/default
COPY . /app/code
ADD ./default.conf /etc/nginx/sites-enabled/default
ADD ./compression.conf /etc/nginx/conf.d/compression.conf

ENTRYPOINT ["bash", "/app/code/docker-entrypoint.sh"]

EXPOSE 3001
FROM node:18-buster-slim
MAINTAINER Oleg Pasternak <oleg@pasternak.work>

RUN apt-get update && apt-get install -y nginx
# Remove default Nginx configuration.
RUN rm -f /etc/nginx/sites-enabled/default

# Move default.conf from current directory to /etc/nginx/sites-enabled/
COPY ./default.conf /etc/nginx/sites-enabled/
COPY . /app/code

ENTRYPOINT ["bash", "/app/code/docker-entrypoint.sh"]

EXPOSE 3001
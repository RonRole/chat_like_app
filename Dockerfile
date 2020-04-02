FROM ruby:2.6.3-alpine 
# /usr/src/app : rails
# /usr/src/front : react
# /usr/src/socket : socket
RUN mkdir /usr/src/front && \
    mkdir /usr/src/socket && \
    apk update && \
    apk add --no-cache yarn tzdata libxml2-dev curl-dev make gcc libc-dev g++ mariadb-dev imagemagick6-dev postgresql postgresql-dev

WORKDIR /usr/src
COPY ./back ./app
COPY ./front ./front
COPY ./socket ./socket

WORKDIR /usr/src/app
RUN gem update bundler && \
    bundle install

WORKDIR /usr/src/front
RUN yarn install && \
    yarn build && \
    serve -s build

WORKDIR /usr/src/socket
RUN yarn install && \
    node -d ./socket_server.js

WORKDIR /usr/src/app
RUN rm -rf /usr/local/bundle/cache/* /usr/local/share/.cache/* /var/cache/* /tmp/* && \
    apk del libxml2-dev curl-dev make gcc libc-dev g++
FROM ruby:2.6.3-alpine 
# /usr/src/app : rails
# /usr/src/front : react
# /usr/src/socket : socket
# ENV REACT_APP_FRONTEND_ADDRESS https://localhost:3000
# ENV REACT_APP_BACKEND_ADDRESS https://localhost:4000
# ENV REACT_APP_SOCKET_ADDRESS https://localhost:8000


RUN mkdir /usr/src/front && \
    mkdir /usr/src/socket && \
    apk update && \
    apk add --no-cache yarn tzdata libxml2-dev curl-dev make gcc libc-dev g++ mariadb-dev imagemagick6-dev postgresql postgresql-dev && \
    export REACT_APP_FRONTEND_ADDRES="https://localhost:3000" && \
    export REACT_APP_BACKEND_ADDRES="https://localhost:4000" && \
    export REACT_APP_SOCKET_ADDRES="https://localhost:8000"

WORKDIR /usr/src
COPY ./back ./app
COPY ./front ./front
COPY ./socket ./socket

WORKDIR /usr/src/app
RUN gem update bundler && \
    bundle install && \
    bundle exec rails s -p 4000 -d

WORKDIR /usr/src/front
RUN yarn install && \
    yarn build && \
    yarn global add serve && \
    serve -s build -l 3000

WORKDIR /usr/src/socket
RUN yarn install && \
    node ./socket_server.js

WORKDIR /usr/src/app
RUN rm -rf /usr/local/bundle/cache/* /usr/local/share/.cache/* /var/cache/* /tmp/* && \
    apk del libxml2-dev curl-dev make gcc libc-dev g++
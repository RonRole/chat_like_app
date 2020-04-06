FROM ruby:2.6.3-alpine 
# /usr/src/app : rails
# /usr/src/front : react
# /usr/src/socket : socket
# ENV REACT_APP_FRONTEND_ADDRESS https://localhost:3000
# ENV REACT_APP_BACKEND_ADDRESS https://localhost:4000
# ENV REACT_APP_SOCKET_ADDRESS https://localhost:8000
# heroku環境変数を設定しておくこと


RUN mkdir /usr/src/front && \
    mkdir /usr/src/socket && \
    apk update && \
    apk add --no-cache yarn tzdata libxml2-dev curl-dev make gcc libc-dev g++ mariadb-dev imagemagick6-dev postgresql postgresql-dev postgresql-client nginx

WORKDIR cd /etc/nginx
ADD ./default.conf /etc/nginx/conf.d/default.conf

WORKDIR /usr/src
ADD ./back ./app
ADD ./front ./front
ADD ./socket ./socket

WORKDIR /usr/src/app
RUN gem update bundler && \
    bundle install

# WORKDIR /usr/src/front
# RUN yarn install && \
#     yarn build && \
#     yarn global add serve 

# WORKDIR /usr/src/socket
# RUN yarn install && \
#     node ./socket_server.js

WORKDIR /usr/src/app
RUN rm -rf /usr/local/bundle/cache/* /usr/local/share/.cache/* /var/cache/* /tmp/* && \
    apk del libxml2-dev curl-dev make gcc libc-dev g++

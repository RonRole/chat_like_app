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
    apk add --no-cache yarn tzdata libxml2-dev curl-dev make gcc libc-dev g++ mariadb-dev imagemagick6-dev postgresql postgresql-dev postgresql-client


WORKDIR /usr/src
ADD ./back ./app

ADD ./front/public ./front
ADD ./front/src ./front
ADD ./front/package-lock.json ./front
ADD ./front/package.json ./front
ADD ./front/yarn.lock ./front

ADD ./socket/index.html ./socket
ADD ./socket/package-lock.json ./socket
ADD ./socket/package.json ./socket
ADD ./socket/socket_server.js ./socket
ADD ./socket/yarn.lock ./socket

WORKDIR /usr/src/app
RUN gem update bundler && \
    bundle install

WORKDIR /usr/src/front
RUN yarn add express && \
    yarn add ejs && \ 
    yarn add express-http-proxy && \
    yarn install && \
    echo "REACT_APP_BACKEND_ADDRESS=https://chat-like-app.herokuapp.com/api" > .env && \
    echo "REACT_APP_SOCKET_ADDRESS=https://chat-like-app.herokuapp.com/socket" >> .env && \
    yarn build
ADD ./heroku-express.js .

WORKDIR /usr/src/socket
RUN yarn install

WORKDIR /usr/src/app
RUN rm -rf /usr/local/bundle/cache/* /usr/local/share/.cache/* /var/cache/* /tmp/* && \
    apk del libxml2-dev curl-dev make gcc libc-dev g++

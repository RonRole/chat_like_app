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
ADD ./front ./front
ADD ./socket ./socket

WORKDIR /usr/src/app
RUN gem update bundler && \
    bundle install

WORKDIR /usr/src/front
RUN yarn add express && \
    yarn add ejs && \ 
    yarn add express-http-proxy && \
    yarn install && \
    echo "REACT_APP_BACKEND_ADDRESS=https://chat-like-app.herokuapp.com/api" > .env && \
    echo "REACT_APP_SOCKET_ADDRESS=https://chat-like-app.herokuapp.com" >> .env && \
    echo "REACT_APP_SOCKET_PATH=/socket.io" >> .env && \
    cat .env && \
    yarn build
ADD ./heroku-express.js .

WORKDIR /usr/src/socket
RUN yarn install

WORKDIR /usr/src/app
RUN rm -rf /usr/local/bundle/cache/* /usr/local/share/.cache/* /var/cache/* /tmp/* && \
    apk del libxml2-dev curl-dev make gcc libc-dev g++

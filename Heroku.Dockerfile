FROM ruby:latest
RUN mkdir /usr/src/front && \
    mkdir /usr/src/socket && \
    mkdir /usr/src/nomlish && \
    apt-get update -qq && apt-get install -y nodejs npm postgresql-client

WORKDIR /usr/src
ADD ./back ./app
ADD ./front ./front
ADD ./front_heroku.env ./front
ADD ./socket ./socket


WORKDIR /usr/src/app
RUN gem update bundler && \
    bundle install

WORKDIR /usr/src/front
RUN npm install --save express && \
    npm install --save ejs && \ 
    npm install --save express-http-proxy && \
    npm install && \
    mv front_heroku.env .env && \
    npm run build
ADD ./heroku-express.js .

WORKDIR /usr/src/socket
<<<<<<< HEAD
RUN yarn install

WORKDIR /usr/src/app
RUN rm -rf /usr/local/bundle/cache/* /usr/local/share/.cache/* /var/cache/* /tmp/* && \
    apk del libxml2-dev curl-dev make gcc libc-dev g++
=======
RUN npm install

WORKDIR /usr/src/nomlish
RUN npm install
>>>>>>> 22846a6ea0bd247b9ce6f18d00ad5c3162feb61b

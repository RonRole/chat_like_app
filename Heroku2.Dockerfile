FROM ruby:latest
RUN mkdir /usr/src/front && \
    mkdir /usr/src/socket && \
    mkdir /usr/src/nomlish && \
    apt-get update -qq && apt-get install -y nodejs yarn postgresql-client

WORKDIR /usr/src
ADD ./back ./app
ADD ./front ./front
ADD ./front_heroku.env ./front
ADD ./socket ./socket
ADD ./nomlish ./nomlish


WORKDIR /usr/src/app
RUN gem update bundler && \
    bundle install

WORKDIR /usr/src/front
RUN yarn add express && \
    yarn add ejs && \ 
    yarn add express-http-proxy && \
    yarn install && \
    mv front_heroku.env .env && \
    yarn build
ADD ./heroku-express.js .

WORKDIR /usr/src/socket
RUN yarn install

WORKDIR /usr/src/nomlish
RUN yarn install
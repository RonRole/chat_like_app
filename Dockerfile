
# rails
FROM ruby:2.6.0-alpine
RUN mkdir /app

COPY ./back /app/back
RUN cd /app/back
RUN gem install bundler:1.17.2
RUN bundle install
RUN bundle update

# front
FROM node:latest-alpine
WORKDIR /app
COPY ./front /app/front
RUN cd /app/front
RUN yarn install

# socket
FROM node:latest-alpine
COPY ./socket /app/socket
RUN cd /app/socket
RUN yarn install

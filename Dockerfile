
# rails
FROM ruby:2.6.0-alpine
RUN mkdir /app
WORKDIR /app/back
ADD ./back /app/back
RUN gem install bundler:2.1.2
RUN bundle install
RUN bundle update

# front
FROM node:latest-alpine
RUN mkdir /app/front
WORKDIR /app/front
ADD ./front /app/front
RUN yarn install

# socket
FROM node:latest-alpine
RUN mkdir /app/socket
WORKDIR /app/socket
ADD ./socket /app/socket
RUN yarn install

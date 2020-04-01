
# rails
FROM ruby:2.6.0-alpine
RUN mkdir /app

ADD ./back /app/back
RUN cd /app/back
RUN gem install bundler:1.17.2
RUN bundle install
RUN bundle update

# front
FROM node:latest-alpine
WORKDIR /app
ADD ./front /app/front
RUN cd /app/front
RUN yarn install

# socket
FROM node:latest-alpine
ADD ./socket /app/socket
RUN cd /app/socket
RUN yarn install

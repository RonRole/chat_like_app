FROM node:10.13-alpine

WORKDIR /app

COPY . /app

RUN yarn install && \
    yarn build && \
    yarn global add serve

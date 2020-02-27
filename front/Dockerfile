FROM node:8.16.0-alpine

WORKDIR /usr/chat_like_app/front

COPY . /usr/chat_like_app/front

RUN npm ci
RUN npm run start
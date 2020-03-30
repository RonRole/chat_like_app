FROM node:10.13-alpine

WORKDIR /app

COPY ./package.json /app
COPY ./public /app
COPY ./src /app

CMD ["sh", "npm", "install"]

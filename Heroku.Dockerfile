FROM ruby:latest
RUN mkdir /usr/src/front && \
    mkdir /usr/src/socket && \
    mkdir /usr/src/nomlish && \
    apt-get update -qq && apt-get install -y nodejs npm postgresql-client

WORKDIR /usr/src
ADD ./back ./app
ADD ./front ./front
ADD ./socket ./socket
ADD ./nomlish ./nomlish


WORKDIR /usr/src/app
RUN gem update bundler && \
    bundle install

WORKDIR /usr/src/front
RUN npm install --save express && \
    npm install --save ejs && \ 
    npm install --save express-http-proxy && \
    npm install --save body-parser && \
    npm install && \
    cat << EOS
    REACT_APP_BACKEND_ADDRESS=$REACT_APP_BACKEND_ADDRESS
    REACT_APP_NOMLISH_ADDRESS=$REACT_APP_NOMLISH_ADDRESS
    REACT_APP_SOCKET_ADDRESS=$REACT_APP_SOCKET_ADDRESS
    REACT_APP_SOCKET_PATH=$REACT_APP_SOCKET_PATH
    REACT_APP_MAP_APIKEY=$REACT_APP_MAP_API_KEY
    EOS >> .env && \
    npm run build
ADD ./heroku-express.js .

WORKDIR /usr/src/socket
RUN npm install

WORKDIR /usr/src/nomlish
RUN npm install

FROM heroku/heroku:18-build
RUN gem install bundler
WORKDIR /app
COPY ./back /app
RUN bundle install
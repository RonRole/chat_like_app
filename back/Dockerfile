FROM ruby:latest

RUN mkdir /app

ENV APP_ROOT /app
WORKDIR $APP_ROOT

ADD ./Gemfile $APP_ROOT/Gemfile
ADD ./Gemfile.lock $APP_ROOT/Gemfile.lock
ADD . $APP_ROOT

RUN gem install bundler

RUN bundle install
RUN bundle update

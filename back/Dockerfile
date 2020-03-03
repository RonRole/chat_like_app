FROM ruby:latest

RUN mkdir /app

ENV APP_ROOT /app
WORKDIR $APP_ROOT

ADD ./Gemfile $APP_ROOT/Gemfile
ADD ./Gemfile.lock $APP_ROOT/Gemfile.lock

RUN gem install bundler:1.17.2

RUN bundle install
RUN bundle update

RUN rails db:create
RUN rails db:migrate RAILS_ENV=development
RUN rails db:migrate

CMD ["sh"]
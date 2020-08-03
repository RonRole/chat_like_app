class UserNews::NewsController < ApplicationController
    include NewsHelper

    def create
        @user = User.find(params[:user_id])
        @news = news_class.new(news_params)
        if(@user.received_news << @news)
            render :json => @news.with_description
        else
            render :json => @news.fail_result
        end
    end
end

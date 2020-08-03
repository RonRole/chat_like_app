class NewsController < ApplicationController
  def index
    @news_list = current_user.received_news.order(created_at: :desc).map(&:with_description)
    render :json => @news_list
  end
end

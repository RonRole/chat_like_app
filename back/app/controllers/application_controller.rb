class ApplicationController < ActionController::API
    include AuthorizeHelper

    before_action :is_user_logined?

    def is_user_logined?
        if !session[:user_id]
            render_authorize_error
        end
    end
end

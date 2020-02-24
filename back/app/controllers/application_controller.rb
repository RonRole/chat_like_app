class ApplicationController < ActionController::API
    include ActionController::Cookies
    include AuthorizeHelper
    include CurrentUserHelper

    before_action :is_user_logged_in?

    def is_user_logged_in?
        if !session[:user_id]
            render_authorize_error
            return false
        end
        return true
    end
end

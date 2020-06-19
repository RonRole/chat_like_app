class ApplicationController < ActionController::API
    include ActionController::Cookies
    include AuthorizeHelper
    include CurrentUserHelper

    before_action :is_user_logged_in?
end

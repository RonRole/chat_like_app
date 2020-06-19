module AuthorizeHelper

    def is_user_logged_in?
        if !session[:user_id]
            render_authorize_error
            return false
        end
        return true
    end
    
    def render_authorize_error
        render json:{message:'anauthorize'},status: 401
    end
end


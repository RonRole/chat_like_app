module AuthorizeHelper
    def render_authorize_error
        render json:{message:'anauthorize'},status: 401
    end
end
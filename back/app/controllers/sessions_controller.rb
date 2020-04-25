class SessionsController < ApplicationController
    skip_before_action :is_user_logged_in?, only:[:new, :create]

    def new
        @current_user = current_user
        if(@current_user) 
            render :json => @current_user#.hash_for_front
            return
        end
        render_authorize_error
    end

    def create
        @current_user = User.find_by(name:session_params[:name])
        if(@current_user && @current_user.authenticate(session_params[:password]))
            session[:user_id] = @current_user.id
            render :json => @current_user#.hash_for_front
            return
        else
            render :json => {
                isFail: true, 
                messages: ["#{User.human_attribute_name(:name)}か#{User.human_attribute_name(:password)}が間違っています"]
            }
        end
    end

    def destroy
    end

    private
        def session_params
            params.require(:session).permit(:name, :password, :password_confirmation)
        end
end

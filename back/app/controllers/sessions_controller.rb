class SessionsController < ApplicationController
    skip_before_action :is_user_logined?, only:[:create]

    def new
    end

    def create
        @current_user = User.find_by(name:params[:name])
        if(@current_user && @current_user.authenticate(params[:password]))
            session[:user_id] = @current_user.id
            render :json => @current_user#{name: @current_user.name, isLoggedIn:true}
        else
            render :json => nil
        end
    end

    def destroy
    end

    private
        def session_params
            params.require(:session).permit(:name, :password, :password_confirmation)
        end
end

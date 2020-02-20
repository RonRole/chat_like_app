class SessionsController < ApplicationController
    def new
        render :json => {isLogin: true}
    end

    def create
        @current_user = User.find_by(name:params[:name])
        if(@current_user && @current_user.authenticate(params[:password]))
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

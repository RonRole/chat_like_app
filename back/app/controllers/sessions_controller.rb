class SessionsController < ApplicationController
    def new
        render :json => {isLogin: true}
    end

    def create
        sleep(5)
        @current_user = User.find_by(name:params[:session][:name])
        if(@current_user && @current_user.authenticate(params[:session][:password]))
            render :json => {name: @current_user.name, isLoggedIn:true}
        else
            render :json => {isLoggedIn:false}
        end
    end

    def destroy
    end

    private
        def session_params
            params.require(:session).permit(:name, :password, :password_confirmation)
        end
end

class UsersController < ApplicationController
    def index
        render :json => User.all
    end

    def create
        @user = User.new(user_params)
        if(@user.save)
            render :json => @user
        else
            render :json => {isFail:true}
        end
    end

    def show
        render :json => User.find(params[:id])
    end

    def update

    end

    def destroy
    end

    private
        def user_params
            params.require(:user).permit(:name, :password, :password_confirmation, :image)
        end
end

class UsersController < ApplicationController

    skip_before_action :is_user_logged_in?, only:[:create]

    def index
        render :json => User.all
    end

    def create
        @user = User.new(user_params)
        if(@user.save)
            render :json => @user#.hash_for_front
        else
            render :json => {isFail:true}
        end
    end

    def show
        render :json => User.find(params[:id])#.hash_for_front
    end

    def update

    end

    def destroy
    end

    def self
        render :json => current_user#.hash_for_front
    end

    def


    private
        def user_params
            params.require(:user).permit(:name, :password, :password_confirmation, :image)
        end
end

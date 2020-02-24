class UsersController < ApplicationController
    def index
        render :json => User.all
    end

    def create
        @user = User.new(params[:user])
        if(@user.save)
            render :json => @user
        end
        
        render :json => {}
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
        end
end

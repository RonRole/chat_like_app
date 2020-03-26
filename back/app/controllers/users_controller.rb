class UsersController < ApplicationController
    include UserHelper

    skip_before_action :is_user_logged_in?, only:[:create]

    def index
        render :json => User.all
    end

    def create
        @user = User.new(user_params)
        if(@user.save)
            render :json => @user#.hash_for_front
            return
        else
            render :json => @user.fail_result
        end
    end

    def show
        @user = User.find_by(id:params[:id], name:params[:name])
        if(@user) 
            render :json => @user#.hash_for_front
        else
            render :json => {
                isFail: true, 
                messages: ['このID、名前の組み合わせのユーザーがいません']}
        end
    end

    def update

    end

    def destroy
    end

    def self
        render :json => current_user#.hash_for_front
    end
end

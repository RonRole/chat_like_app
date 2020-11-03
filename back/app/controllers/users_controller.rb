class UsersController < ApplicationController
    include UserHelper

    skip_before_action :is_user_logged_in?, only:[:create]

    def index
        @users = current_user.related_users
        render :json => @users
    end

    def create
        @user = User.new(user_params)
        if(@user.save)
            render :json => @user
        else
            render :json => @user.fail_result
        end
    end

    def search
        @user = User.find_by(self_id: params[:self_id], name: params[:name])
        if(@user) 
            render :json => @user
        else
            result = FailResultHelper.fail_result do |hash|
                hash[:messages]=["この#{User.human_attribute_name(:self_id)}、#{User.human_attribute_name(:name)}の組み合わせのユーザーがいません"]
            end
            render :json => result
        end
    end

    def update
        @user = User.find(params[:id])
        if(@user.update(user_params))
            render :json => @user
        else
            render :json => @user.fail_result
        end
    end

    def update_password
        @user = current_user
        params = update_password_params
        if(current_user.update_password(old_password: params[:old_password], password:params[:password], password_confirmation:params[:password_confirmation]))
            render :json => @user
        else
            render :json => @user.fail_result
        end
    end

    def destroy
    end

    def self
        render :json => current_user
    end
end

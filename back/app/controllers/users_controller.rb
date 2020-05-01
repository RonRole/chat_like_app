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
        @user = User.find_by(self_id: params[:id], name: params[:name])
        if(@user) 
            render :json => @user#.hash_for_front
        else
            render :json => {
                isFail: true, 
                messages: ["この#{User.human_attribute_name(:id)}、#{User.human_attribute_name(:name)}の組み合わせのユーザーがいません"]
            }
        end
    end

    def update
        @user = User.find(params[:id])
        if(@user.update(user_params))
            render :json => @user
            return
        else
            render :json => @user.fail_result
        end
    end

    def destroy
    end

    def self
        render :json => current_user#.hash_for_front
    end
end

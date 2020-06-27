class UsersBgms::BgmsController < ApplicationController
    include BgmsHelper
    def index
        @bgms = User.find(params[:user_id]).bgms
        render :json => @bgms
    end
    def create 
        @bgm = Bgm.new(users_bgm_params)
        if(User.find(params[:user_id]).bgms << @bgm)
            render :json => @bgm
        else
            render :json => @bgm.fail_result
        end
    end
end

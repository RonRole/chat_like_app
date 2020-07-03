class BgmsController < ApplicationController
    include BgmsHelper
    def index
        @bgms = current_user.bgms
        render :json => @bgms
    end

    def destroy
        @bgm = current_user.bgms.find(params[:id])
        if(@bgm.delete)
            render :json => @bgm
        else
            render :json => @bgm.fail_result
        end
    end

    def create 
        @bgm = Bgm.new(users_bgm_params)
        if(current_user.bgms << @bgm)
            render :json => @bgm
        else
            render :json => @bgm.fail_result
        end
    end

    def update
        @bgm = current_user.bgms.find(params[:id])
        if(@bgm.update_attributes(users_bgm_params))
            render :json => @bgm
        else
            render :json => @bgm.fail_result
        end
    end
end

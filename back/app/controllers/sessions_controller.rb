class SessionsController < ApplicationController
    def new
        render :json => {isLogin: true}
    end

    def create
    end

    def destroy
    end
end

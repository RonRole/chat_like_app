class SessionsController < ApplicationController

    skip_before_action :is_user_logged_in?, only:[:new, :create]

    def new
        @current_user = current_user
        if(@current_user) 
            render :json => @current_user
        else
            render_authorize_error
        end
    end

    def create
        @current_user = User.find_by(name:session_params[:name])
        if(@current_user && @current_user.authenticate(session_params[:password]))
            session[:user_id] = @current_user.id
            render :json => @current_user
        else
            render :json => self.fail_login_json
        end
    end

    def destroy
        session[:user_id] = nil
    end

    private
        def session_params
            params.require(:session).permit(:name, :password, :password_confirmation)
        end
        
        #ログイン失敗時にフロントに渡すjson
        def fail_login_json
            {
                isFail: true, 
                messages: ["#{User.human_attribute_name(:name)}か#{User.human_attribute_name(:password)}が間違っています"]
            }
        end
        
end

class UsersMessageImages::MessageImagesController < ApplicationController
    include MessageImagesHelper

    def index
        @users_message_images=User.find(params[:user_id]).message_images
        render :json => @users_message_images
    end
    
    def create
        @users_message_image=MessageImage.new(users_message_image_params)
        if(User.find(params[:user_id]).message_images << @users_message_image)
            render :json => @users_message_image
        else
            render :json => @users_message_image.fail_result
        end
    end

    def show
    end

    def update
    end

    def destroy
    end

end

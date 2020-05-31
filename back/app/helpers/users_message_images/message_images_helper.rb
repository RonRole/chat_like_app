module UsersMessageImages::MessageImagesHelper
    def users_message_image_params
        params.require(:message_image).permit(:src)
    end
end

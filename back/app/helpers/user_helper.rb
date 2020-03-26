module UserHelper
    def user_params
        params.require(:user).permit(:id, :name, :password, :password_confirmation, :image)
    end
end
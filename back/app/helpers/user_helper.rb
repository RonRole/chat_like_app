module UserHelper
    def user_params
        params.require(:user).permit(:id, :name, :password, :password_confirmation, :image, :self_id)
    end

    def update_password_params
        params.require(:password).permit(:old_password, :password, :password_confirmation)
    end
end
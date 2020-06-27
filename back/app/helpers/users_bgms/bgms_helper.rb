module UsersBgms::BgmsHelper
    def users_bgm_params
        params.require(:bgm).permit(:src, :title)
    end
end

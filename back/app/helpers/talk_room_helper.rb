module TalkRoomHelper
    def talkroom_params
        params.require(:talkroom).permit(:id, :title, :description, :image, :author_id)
    end

    def search_params
        params.require(:q).permit(:title_or_description_cont)
    end
end
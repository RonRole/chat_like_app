module TalkRoomHelper
    def talkroom_params
        params.require(:talkroom).permit(:id, :title, :description, :author_id)
    end
end
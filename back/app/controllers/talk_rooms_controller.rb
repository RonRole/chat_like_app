class TalkRoomsController < ApplicationController
    def index
        @talk_rooms = TalkRoom.all
        render :json => @talk_rooms
    end

    def create
        @talk_room = TalkRoom.new(title:params[:talkroom][:title], description:params[:talkroom][:description])
        if @talk_room&.save
            render :json => @talk_room
        end 
    end

    def show
    end

    def update
    end

    def destroy
        TalkRoom.find(params[:id]).destroy
    end

    private 
        def talkroom_params
            params.require(:talkroom).permit(:id, :title, :description)
        end

end

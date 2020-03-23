class TalkroomUsers::UsersController < ApplicationController
    include TalkRoomHelper
    include UserHelper
    def index
        @talkroom_users = TalkRoom.find(params[:talk_room_id]).users
        render :json => @talkroom_users
    end
    
    def update
        @talk_room = TalkRoom.find(params[:talk_room_id])
        @user = User.find(params[:id])
        if @user && @talk_room
            @talk_room.users << @user
            render :json => @user
        else
            render :json => {isFail:true}
        end
    end

    def destroy
    end

end

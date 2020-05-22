class TalkroomUsers::UsersController < ApplicationController
    include TalkRoomHelper
    include UserHelper
    def author
        @talk_room = TalkRoom.find(params[:talk_room_id])
        @author = @talk_room.author
        render :json => @author
    end

    def member
        @talk_room = TalkRoom.find(params[:talk_room_id])
        @talkroom_users = @talk_room.users
        render :json => @talkroom_users
    end

    def index
        @talk_room = TalkRoom.find(params[:talk_room_id])
        @talkroom_users = @talk_room.users + [@talk_room.author]
        render :json => @talkroom_users
    end

    def create
        @talk_room = TalkRoom.find(params[:talk_room_id])
        @user = User.find_by(user_params)
        if(@user)
            @talk_room.users << @user
            render :json => @user
        else
            render :json => {isFail:true}
        end
    end

    def destroy
    end

end

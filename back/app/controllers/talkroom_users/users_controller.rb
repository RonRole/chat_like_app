class TalkroomUsers::UsersController < ApplicationController
    include TalkRoomHelper
    include UserHelper
    def author
        @author = User.joins(:own_rooms).where('talk_rooms.id=?', params[:talk_room_id])
        render :json => @author
    end

    def member
        @members = User.joins(:talk_rooms).where('talk_rooms.id=?', params[:talk_room_id])
        render :json => @members
    end

    def index
        @author = User.joins(:own_rooms).where('talk_rooms.id=?', params[:talk_room_id])
        @members = User.joins(:talk_rooms).where('talk_rooms.id=?', params[:talk_room_id])
        render :json => [@author] + @members
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

    def destroy_multiple
        @talk_room = TalkRoom.find(params[:talk_room_id])
        @users = User.where(id:params[:ids])
        if(@talk_room.users.delete(@users))
            render :json => @users
        else
            render :json => {isFail:true}
        end
    end
end

class TalkRoomsController < ApplicationController
    # 自身が管理者のトークルームを取得する
    def own
        @talk_rooms = current_user.own_rooms
        render :json => @talk_rooms
    end

    # 自身がメンバーであるトークルームを取得する
    def join
        @talk_rooms = current_user.talk_rooms - current_user.own_rooms
        render :json => @talk_rooms
    end

    # 自身が管理者・メンバーであるトークルームを取得する
    def index
        @talk_rooms = current_user.talk_rooms
        render :json => @talk_rooms
    end

    def users
        @talkroom_users = TalkRoom.find(params[:talk_room_id]).users
        render :json => @talkroom_users
    end

    def create
        @current_user = current_user
        @talk_room = @current_user.talk_rooms.new(talkroom_params)
        if(@talk_room.save)
            render :json => @talk_room
        end 
    end

    def show
        @talk_room = TalkRoom.find(params[:id])
        render :json => @talk_room
    end

    def update
        @talk_room = TalkRoom.find(params[:id])
        if(@talk_room.update_attributes(talkroom_params))
            render :json => @talk_room
            return
        else
            render :json => {isFail: true}
        end
    end

    def destroy
        TalkRoom.find(params[:id]).destroy
    end


    private 
        def talkroom_params
            params.require(:talkroom).permit(:id, :title, :description, :author_id)
        end

end

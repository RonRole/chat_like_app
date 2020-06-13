class TalkRoomsController < ApplicationController
    include TalkRoomHelper
    # 自身が管理者のトークルームを取得する
    def own
        @talk_rooms = current_user.own_rooms.includes(:users)
        render :json => @talk_rooms.map(&:with_user_id_json)
    end

    # 自身がメンバーであるトークルームを取得する
    def join
        @talk_rooms = current_user.talk_rooms.includes(:users) - current_user.own_rooms.includes(:users)
        render :json => @talk_rooms.map(&:with_user_id_json)
    end

    # 自身が管理者・メンバーであるトークルームを取得する
    def index
        @talk_rooms = current_user.talk_rooms + current_user.own_rooms
        render :json => @talk_rooms
    end

    # 自身が管理者・メンバーであるトークルーム全ての管理者・メンバーを取得する
    def users
        @talk_rooms = 
            current_user.own_rooms.includes(:author).includes(:users) +
            current_user.talk_rooms.includes(:author).includes(:users)
        render :json => @talk_rooms.flat_map(&:author).uniq + @talk_rooms.flat_map(&:users).uniq
    end

    def create
        @current_user = current_user
        @talk_room = @current_user.talk_rooms.new(talkroom_params)
        if(@talk_room.save)
            render :json => @talk_room
        else
            render :json => @talk_room.fail_result
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
        else
            render :json => @talk_room.fail_result
        end
    end

    def destroy
        TalkRoom.find(params[:id]).destroy
    end
end

class TalkRoomsController < ApplicationController
    include TalkRoomHelper
    # 自身が管理者のトークルームを取得する
    def own
        @talk_rooms = current_user.own_rooms.includes(:users)
        # render :json => @talk_rooms.map(&:with_user_id_json)
        render :json => @talk_rooms.to_json(include: [:users])
    end

    # 自身がメンバーであるトークルームを取得する
    def join
        @talk_rooms = current_user.talk_rooms.includes(:users) - current_user.own_rooms.includes(:users)
        render :json => @talk_rooms.to_json(include: [:users])
    end

    # 自身が管理者・メンバーであるトークルームを取得する
    def index
        @talk_rooms = current_user.talk_rooms + current_user.own_rooms
        render :json => @talk_rooms.to_json(include: [:users])
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
        if(@talk_room.update(talkroom_params))
            render :json => @talk_room
        else
            render :json => @talk_room.fail_result
        end
    end

    def destroy
        TalkRoom.find(params[:id]).destroy
    end
end

class TalkRoomsController < ApplicationController
    # 自身が管理者のトークルームを取得する
    def own_index
        @talk_rooms = TalkRoom.where(author_id: session[:user_id])
        render :json => nil#@talk_rooms
    end

    # 自身がメンバーであるトークルームを取得する
    def index
        @talk_rooms = current_user.talk_rooms
        render :json => @talk_rooms
    end

    def create
        @current_user = current_user
        @talk_room = @current_user.talk_rooms.new(talkroom_params)
        if(@current_user.save)
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
            params.require(:talkroom).permit(:id, :title, :description, :author_id)
        end

end

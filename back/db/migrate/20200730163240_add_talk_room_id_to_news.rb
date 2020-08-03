class AddTalkRoomIdToNews < ActiveRecord::Migration[5.2]
  def change
    add_reference :news, :talk_room, foreign_key: true
  end
end

class AddIndexToUserTalkRoomRefs < ActiveRecord::Migration[5.2]
  def change
    add_index :user_talk_room_refs, [:user_id, :talk_room_id]
  end
end

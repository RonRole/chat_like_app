class CreateUserTalkRoomRefs < ActiveRecord::Migration[5.2]
  def change
    create_table :user_talk_room_refs do |t|
      t.references :user, foreign_key: true
      t.references :talk_room, foreign_key: true

      t.timestamps
    end
  end
end

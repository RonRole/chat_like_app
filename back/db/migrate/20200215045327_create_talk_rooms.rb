class CreateTalkRooms < ActiveRecord::Migration[5.2]
  def change
    create_table :talk_rooms do |t|
      t.string :title, null:false
      t.string :description
      t.timestamps
    end
  end
end

class AddImageColumnToTalkRooms < ActiveRecord::Migration[5.2]
  def change
    add_column :talk_rooms, :image, :string
  end
end

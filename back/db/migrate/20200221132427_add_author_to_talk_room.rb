class AddAuthorToTalkRoom < ActiveRecord::Migration[5.2]
  def change
    add_reference :talk_rooms, :author, {to_table: :users}
  end
end

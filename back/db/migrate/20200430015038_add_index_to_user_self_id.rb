class AddIndexToUserSelfId < ActiveRecord::Migration[5.2]
  def change
    add_index :users, :self_id
  end
end

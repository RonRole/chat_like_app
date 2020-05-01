class UpdateUsersSelfId < ActiveRecord::Migration[5.2]
  def change
    change_column_null :users, :self_id, false
  end
end

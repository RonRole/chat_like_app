class ChangeUserSelfIdDefaultToNull < ActiveRecord::Migration[5.2]
  def change
    change_column_default :users, :self_id, nil
  end
end

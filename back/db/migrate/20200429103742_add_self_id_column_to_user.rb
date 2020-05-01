class AddSelfIdColumnToUser < ActiveRecord::Migration[5.2]
  def change
    add_column :users, :self_id, :string, default:'default_id'
  end
end

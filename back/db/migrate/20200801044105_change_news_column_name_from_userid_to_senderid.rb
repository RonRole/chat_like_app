class ChangeNewsColumnNameFromUseridToSenderid < ActiveRecord::Migration[5.2]
  def change
    rename_column :news, :user_id, :sender_ud
  end
end

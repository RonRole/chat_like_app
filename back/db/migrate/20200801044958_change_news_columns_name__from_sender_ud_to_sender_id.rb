class ChangeNewsColumnsNameFromSenderUdToSenderId < ActiveRecord::Migration[5.2]
  def change
    rename_column :news, :sender_ud, :sender_id
  end
end

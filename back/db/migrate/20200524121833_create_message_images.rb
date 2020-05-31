class CreateMessageImages < ActiveRecord::Migration[5.2]
  def change
    create_table :message_images do |t|
      t.belongs_to :user
      t.string :src
      t.timestamps
    end
  end
end

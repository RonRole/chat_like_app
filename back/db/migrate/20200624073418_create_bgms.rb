class CreateBgms < ActiveRecord::Migration[5.2]
  def change
    create_table :bgms do |t|
      t.belongs_to :user
      t.string :src
      t.string :title, null: false
      t.timestamps
    end
  end
end

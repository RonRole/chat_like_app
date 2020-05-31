# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2020_05_24_121833) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "message_images", force: :cascade do |t|
    t.bigint "user_id"
    t.string "src"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["user_id"], name: "index_message_images_on_user_id"
  end

  create_table "talk_rooms", force: :cascade do |t|
    t.string "title", null: false
    t.string "description"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.bigint "author_id"
    t.index ["author_id"], name: "index_talk_rooms_on_author_id"
  end

  create_table "user_talk_room_refs", force: :cascade do |t|
    t.bigint "user_id"
    t.bigint "talk_room_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["talk_room_id"], name: "index_user_talk_room_refs_on_talk_room_id"
    t.index ["user_id", "talk_room_id"], name: "index_user_talk_room_refs_on_user_id_and_talk_room_id"
    t.index ["user_id"], name: "index_user_talk_room_refs_on_user_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "name", null: false
    t.string "password_digest", null: false
    t.string "remember_digest"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "image"
    t.string "self_id", null: false
    t.index ["self_id"], name: "index_users_on_self_id"
  end

  add_foreign_key "user_talk_room_refs", "talk_rooms"
  add_foreign_key "user_talk_room_refs", "users"
end

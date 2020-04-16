class TalkRoom < ApplicationRecord
    has_many :user_talk_room_refs, dependent: :destroy
    has_many :users, through: :user_talk_room_refs
    belongs_to :author, class_name: 'User', foreign_key: :author_id
end

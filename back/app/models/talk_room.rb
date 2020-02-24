class TalkRoom < ApplicationRecord
    has_many :user_talk_room_refs, dependent: :destroy
    has_many :users, through: :user_talk_room_refs
end

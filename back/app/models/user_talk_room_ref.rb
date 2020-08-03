class UserTalkRoomRef < ApplicationRecord
  validates :user_id, presence: true, uniqueness: {scope: :talk_room_id}
  validates :talk_room_id, presence: true
  
  belongs_to :user
  belongs_to :talk_room
end

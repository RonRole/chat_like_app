class TalkRoom < ApplicationRecord
    include FailResultHelper
    
    validates :title, presence: true
    validates :image, presence: true

    has_many :user_talk_room_refs, dependent: :destroy
    has_many :users, through: :user_talk_room_refs
    belongs_to :author, class_name: 'User', foreign_key: :author_id

    has_many :news, dependent: :destroy

    mount_uploader :image, TalkRoomImageUploader
end

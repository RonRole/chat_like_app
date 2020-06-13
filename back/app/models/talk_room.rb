class TalkRoom < ApplicationRecord
    include FailResultHelper
    
    validates :title, presence: true
    has_many :user_talk_room_refs, dependent: :destroy
    has_many :users, through: :user_talk_room_refs
    belongs_to :author, class_name: 'User', foreign_key: :author_id

    def with_user_id_json
        json = self.attributes
        json['user_ids'] = self.users.map(&:id)
        json
    end
end

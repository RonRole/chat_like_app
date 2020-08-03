class RemoveMemberNews < News
    validates :talk_room_id, presence: true
    belongs_to :talk_room

    def description
        "#{sender&.name}さんに「#{talk_room&.title}」から追い出されました..."
    end
end

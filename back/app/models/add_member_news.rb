class AddMemberNews < News
    validates :talk_room_id, presence: true
    belongs_to :talk_room

    def description
        "#{sender&.name}さんから「#{talk_room&.title}」に招待されました!!!"
    end
end

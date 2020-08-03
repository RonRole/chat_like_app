class NewsReceiverRef < ApplicationRecord
    validates :user_id, presence: true, uniqueness: {scope: :news_id}
    validates :news_id, presence: true
    
    belongs_to :user
    belongs_to :news
    
end


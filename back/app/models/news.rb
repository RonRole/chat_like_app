class News < ApplicationRecord
    include FailResultHelper

    belongs_to :sender, class_name: 'User', foreign_key: :sender_id
    has_many :news_receiver_refs, dependent: :destroy
    has_many :users, through: :news_receiver_refs

    def with_description
        result = self.attributes
        result[:description] = self.description
        result
    end

    def description
        raise "News must be abstract" if self.class.to_s == 'News'
        raise "Define method 'description' on #{self.class.to_s}"
    end
end    

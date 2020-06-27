class Bgm < ApplicationRecord
    include FailResultHelper
    
    mount_uploader :src, AudioUploader
    validates :title, presence: true
    
    belongs_to :user
end

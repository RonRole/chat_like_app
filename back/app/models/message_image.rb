class MessageImage < ApplicationRecord
    include FailResultHelper
    mount_uploader :src, ImageUploader
    belongs_to :user
end

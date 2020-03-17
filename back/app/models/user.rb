class User < ApplicationRecord
    # バリデーション
    validates :name, presence: true, uniqueness: true
    validates :password, presence: true
    validates :password, confirmation: true
    validates :password_confirmation, presence: true
    validates :image, presence: true

    has_secure_password

    # リレーション
    has_many :own_rooms, foreign_key: :author_id, class_name: 'TalkRoom'
    has_many :user_talk_room_refs
    has_many :talk_rooms, through: :user_talk_room_refs

    #イメージ画像
    mount_uploader :image, ImageUploader

    #登録失敗時のパラメータ(JSON)
    def fail_result
        fail_result = {isFail:true}
        self.errors.each do |name|
            fail_result[name] = self.errors.full_messages_for(name)
        end
        fail_result
    end

    #受け取った文字列をハッシュにして返す
    class << self
        def digest(string)
            cost = ActiveModel::SecurePassword.min_cost ? BCrypt::Engine::MIN_COST : BCrypt::Engine.cost
            BCrypt::Password.create(string, cost:cost)
        end

        #ランダムなトークンを返す
        def new_token
            SecureRandom.urlsafe_base64
        end
    end

    #ログイン処理用のトークンを保存する
    def create_remember_token
        #ランダムな文字列を生成
        remember_token = User.new_token
        #ハッシュ化してデータベースに保存
        update_attribute(:remember_digest, User.digest(remember_token))
    end
end

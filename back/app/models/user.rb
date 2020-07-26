class User < ApplicationRecord
    include FailResultHelper
    # バリデーション
    validates :name, presence: true
    validates :password, presence: true, on: :create
    validates :password, confirmation: true, on: :create
    validates :password_confirmation, presence: true, on: :create
    validates :image, presence: true
    validates :self_id, uniqueness: true

    has_secure_password

    # リレーション
    has_many :own_rooms, foreign_key: :author_id, class_name: 'TalkRoom'
    has_many :user_talk_room_refs
    has_many :talk_rooms, through: :user_talk_room_refs
    has_many :message_images
    has_many :bgms

    #イメージ画像
    mount_uploader :image, ImageUploader

    #デフォルトのself_idを設定する
    before_create :set_default_self_id

    scope :room_author, -> (talk_room_id) {
        joins(:own_rooms).where('talk_rooms.id=?', talk_room_id)
    }

    scope :room_member, -> (talk_room_id) {
        joins(:talk_rooms).where('talk_rooms.id=?', talk_room_id)
    }

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

    # 自身が管理者・メンバーであるトークルーム
    def related_rooms
        own_rooms = self.own_rooms.includes(:author).includes(:users)
        join_rooms = self.talk_rooms.includes(:author).includes(:users)
        own_rooms + join_rooms
    end

    # 自身が管理者・メンバーであるトークルーム全ての管理者とユーザー
    def related_users
        self.related_rooms.map(&:author) + self.related_rooms.map(&:users)
    end

    def join_rooms
        own_rooms = self.own_rooms.includes(:author).includes(:users)
        join_rooms = self.talk_rooms.includes(:author).includes(:users)
        join_rooms - own_rooms
    end

    private
        def set_default_self_id
            while self.self_id.blank? || User.find_by(self_id: self.self_id).present? do
                self.self_id = SecureRandom.base64(10)
            end
        end
end

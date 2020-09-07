require 'rails_helper'

RSpec.describe User, type: :model do

  it 'is invalid without a name' do
    user = build(:user, name: '')
    user.valid?
    expect(user).not_to be_valid
  end
  it 'is invalid without a password' do
    user = build(:user, password: '')
    user.valid?
    expect(user).not_to be_valid
  end
  
  it 'is invalid without a password_confirmatiomn' do
    user = build(:user, password_confirmation: '')
    user.valid?
    expect(user).not_to be_valid
  end
  
  it 'is valid with a blank self_id' do
    user = build(:user, self_id: '')
    user.valid?
    expect(user).to be_valid
  end

  it 'is invalid without a unique self_id' do
    user = build(:user, self_id: 'sawai')
    duplicated_user = build(:user, self_id: 'sawai')
    expect(duplicated_user).not_to be_valid
  end

  it 'set self_id before create when input self_id is blank' do
    user = create(:user, self_id: '')
    expect(user.self_id).not_to be_empty
  end

  it 'is invalid without a unique name' do
    user = build(:user, name:'sawai', self_id:'114514')
    user.save
    user2 = build(:user, name:'sawai', self_id:'8101919')
    user2.valid?
    expect(user2).not_to be_valid
  end

  it 'has own_rooms and join_rooms as related_rooms' do
    user = create(:user)

    own_room = build(:talk_room, title:'own')
    user.own_rooms << own_room

    join_room_author = create(:user, name: 'join_room_author')
    join_room = build(:talk_room, title:'join')
    join_room_author.own_rooms << join_room
    join_room.users << user

    expect(user.related_rooms.count).to eq(2)
  end

  describe 'User has own_room users and join_room authors and join_room users and own_news senders as related_users' do
    it 'count all when related_users are all unique' do
      user = create(:user, name:'test_user')
      own_room = create(:talk_room, author:user)
      #own_roomの参加者を一人追加
      own_room_user = create(:user, name:'own_room_user')
      own_room.users << own_room_user
      #join_roomを作成
      join_room_author = create(:user, name:'join_room_user')
      join_room = create(:talk_room, author:join_room_author)
      join_room.users << user
      #newsを作成
      news_sender = create(:user, name:'news_sender')
      news = create(:news, sender:news_sender)
      news.users << user
      #自分、管理ルームユーザー、参加ルームオーナー、ニュースの送り主で4人
      expect(user.related_users.count).to eq(4)
    end

    it 'count without duplicated users' do
      test_user = create(:user, name:'test_user')
      own_room = create(:talk_room, author:test_user)

      duplicated_user = create(:user, name:'duplicated')
      own_room.users << duplicated_user

      join_room = create(:talk_room, author:duplicated_user)
      join_room.users << test_user

      news = create(:news, sender:duplicated_user)
      news.users << test_user
      expect(test_user.related_users.count).to eq(2)
    end
  end
end

require 'rails_helper'

RSpec.describe News, type: :model do
  it 'occurs error when call description of abstract news' do
    news = build(:news)
    expect {
      news.description
    }.to raise_error
  end

  it 'has "description" attribute when called with_description' do
    news = build(:add_member_news)
    expect(news.with_description[:description]).not_to be_blank
  end

  it 'shows sender name and room title on description' do
    user = build(:user, name: 'takosuke')
    talk_room = build(:talk_room, title:'sawai_room')
    news = build(:add_member_news, sender:user, talk_room:talk_room)
    expect(news.description).to be_include('takosuke')
    expect(news.description).to be_include('sawai_room')
  end
end

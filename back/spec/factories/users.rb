FactoryBot.define do
  factory :user do
    name {|n| n}
    self_id {|n| n}
    password {'user_test'}
    password_confirmation {'user_test'}
  end
end

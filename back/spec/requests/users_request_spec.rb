require 'rails_helper'

RSpec.describe "Users", type: :request do
    let(:user) {
        create(:user, name:'test_user', password:'test_user', password_confirmation:'test_user')
    }

    describe 'when user logined' do
        before do
            post login_path, params: {
                session: {
                    name: user.name,
                    password: user.password,
                    password_confirmation: user.password_confirmation
                }
            }
        end

        it 'is success on index' do
            get users_path
            expect(response).to be_success
        end

        it 'returns related users on index' do
            test_room = create(:talk_room, author: user)
            test_user = create(:user, name:'sawai_kei')
            test_room.users << test_user
            get users_path
            expect(response.body).to be_include('sawai_kei') 
        end

        it 'not returns non_related users on index' do
            test_user = create(:user, name:'sawai_kei')
            test_room = create(:talk_room, author: test_user)
            get users_path
            expect(response.body).not_to be_include('sawai_kei')
        end
    end
end

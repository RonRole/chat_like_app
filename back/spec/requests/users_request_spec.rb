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

        describe 'test for #index' do
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

        describe 'test for #create' do
            it 'returns created user if successed' do
                post users_path params: {
                    user: {
                        name: 'alice',
                        password: 'password',
                        password_confirmation: 'password'
                    }
                }
                expect(response.body).to be_include('alice')
            end

            it 'returns fail_result if name is missing' do
                post users_path params: {
                    user: {
                        password: 'password',
                        password_confirmation: 'password'
                    }
                }
                response_data = JSON.parse(response.body)
                expect(response_data['isFail']).to be_truthy
                expect(response_data).to be_has_key('name')
            end

            it 'returns fail_result if password is missing' do
                post users_path params: {
                    user: {
                        name: 'alice',
                        password_confirmation: 'password'
                    }
                }
                response_data = JSON.parse(response.body)
                expect(response_data['isFail']).to be_truthy
                expect(response_data).to be_has_key('password')
            end

            it 'returns fail_result if password_confirmation is missing' do
                post users_path params: {
                    user: {
                        name: 'alice',
                        password: 'password'
                    }
                }
                response_data = JSON.parse(response.body)
                expect(response_data['isFail']).to be_truthy
                expect(response_data).to be_has_key('password_confirmation')
            end

            it 'returns fail_result if password_confirmation does not matces password' do
                post users_path params: {
                    user: {
                        name: 'alice',
                        password: 'password',
                        password_confirmation: 'fail_password'
                    }
                }
                response_data = JSON.parse(response.body)
                expect(response_data['isFail']).to be_truthy
                expect(response_data).to be_has_key('password_confirmation')
            end
        end
    end
end

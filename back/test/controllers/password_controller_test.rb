require 'test_helper'

class PasswordControllerTest < ActionDispatch::IntegrationTest
  test "should get :put" do
    get password_:put_url
    assert_response :success
  end

end

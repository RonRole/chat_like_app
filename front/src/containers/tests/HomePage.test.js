import {shallow} from 'enzyme';
import React from 'react';
import { HomePage } from '../../containers/HomePage';
import UserProfile from '../../components/UserProfile';


//テストユーザー
const testUser = {
    id : 364364,
    name : "TEST",
    image : {
        profile : {
            url : "/test.png",
        },
        thumb : {
            url : "/test_thumb.ong"
        } 
    }
}


const wrapper = shallow(<HomePage loginUser={testUser}/>)



describe('HomePage', () => {
    test('UserProfileが一つ表示される', () => {
        expect(wrapper.find(UserProfile).length).toBe(1)
    })
})

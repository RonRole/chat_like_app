import {shallow} from 'enzyme';
import React from 'react';
import { HomePage } from '../../containers/HomePage';


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
    test('h1要素にHome Pageを含んでいる', () => {
        expect(wrapper.find('h1').text()).toMatch(/.*Home ?Page.*/)
    })

    test('ログインしているユーザーの情報が表示される', () => {
        expect(wrapper.find('#loginUserID').text()).toContain(testUser.id)
        expect(wrapper.find('#loginUserName').text()).toContain(testUser.name)
        expect(wrapper.find('img').prop('src')).toContain(testUser.image.profile.url)
    })
})

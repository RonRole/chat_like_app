import React from 'react'
import { shallow } from "enzyme";
import SignUpPage from "../SignUpPage";
import SignUpForm from '../../containers/SignUpForm';

const wrapper = shallow(<SignUpPage />)

describe('SignUpPageの要素チェック', () => {
    test('strong要素で新規登録と表示されている', () => {
        expect(wrapper.find('strong').text()).toBe('新規登録')
    })
    test('SignUpFormを一つ含んでいる', () => {
        expect(wrapper.find(SignUpForm).length).toBe(1)
    })
})
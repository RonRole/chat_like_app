import React from 'react'
import { shallow } from 'enzyme'
import { TitleFormGroup } from '../TalkRoomFormGroups'
import { Form } from 'react-bootstrap'

/**
 * タイトルと説明は、要素の内容は共通しているので
 * 要素チェックは同じ内容で行う
 * @param {*} wrapper 
 */
const checkTalkRoomFormElements = (wrapper) => {
    test('Form.Groupを一つ含んでいる', () => {
        expect(wrapper.find(Form.Group).length).toBe(1)
    })
    test('Form.Labelを一つ含んでいる', () => {
        expect(wrapper.find(Form.Label).length).toBe(1)
    })
    test('Form.Controlを一つ含んでいる', () => {
        expect(wrapper.find(Form.Control).length).toBe(1)
    })
    test('Form.Control.Feedbackを一つ含んでいる', () => {
        expect(wrapper.find(Form.Control.Feedback).length).toBe(1)
    })
}

describe('トークルーム用のフォーム部品のテスト', () => {
    describe('TitleFormGroupのテスト', () => {
        const title_wrapper = shallow(<TitleFormGroup />)
        describe('要素のチェック', () => {
            checkTalkRoomFormElements(title_wrapper)
        })
    })
})
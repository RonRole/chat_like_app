import React from 'react'
import { shallow } from 'enzyme'
import { TitleFormGroup, DescriptionFormGroup } from '../TalkRoomFormGroups'
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

const checkFormWithoutError = (wrapper) => {
    describe('errorMessagesがない時', () => {
        test('isInvalidがfalseになる', () => {
            expect(wrapper.find(Form.Control).props().isInvalid).toBeFalsy()
        })
        test('Form.Control.Feedbackのテキストがない', () => {
            expect(wrapper.find(Form.Control.Feedback).text()).toBe('')
        })
    })
}

const checkFormWithError = (wrapper) => {
    describe('errorMessagesがある時', () => {
        test('isInvalidがtrueになる', () => {
            expect(wrapper.find(Form.Control).props().isInvalid).toBeTruthy()
        })
        test('errorMessagesの初めの要素がForm.Control.Feedbackのテキストになる', () => {
            expect(wrapper.find(Form.Control.Feedback).text()).toBe('test message')
        })
    })
}

describe('トークルーム用のフォーム部品のテスト', () => {
    describe('TitleFormGroupのテスト', () => {
        const title_wrapper = shallow(<TitleFormGroup />)
        describe('要素のチェック', () => {
            checkTalkRoomFormElements(title_wrapper)
        })
        describe('Form.Controlのテスト', () => {
            const title_wrapper_withoutError = shallow(<TitleFormGroup />)
            checkFormWithoutError(title_wrapper_withoutError)
            const title_wrapper_withError = shallow(<TitleFormGroup errorMessages={['test message']}/>)
            checkFormWithError(title_wrapper_withError)
        })
    })

    describe('DescriptionFormGroupのテスト', () => {
        const description_wrapper = shallow(<DescriptionFormGroup />)
        describe('要素のチェック', () => {
            checkTalkRoomFormElements(description_wrapper)
        })
        describe('Form.Controlのテスト', () => {
            const description_wrapper_withoutError = shallow(<DescriptionFormGroup />)
            checkFormWithoutError(description_wrapper_withoutError)
            const description_wrapper_withError = shallow(<DescriptionFormGroup errorMessages={['test message']}/>)
            checkFormWithError(description_wrapper_withError)
        })
    })
})




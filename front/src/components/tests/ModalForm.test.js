import React from 'react'
import { shallow } from "enzyme";
import ModalForm from "../ModalForm";
import { Modal, Form } from 'react-bootstrap';

const wrapper = shallow(<ModalForm />);

describe('モーダルフォームの要素チェック', () => {
    test('Modalコンポーネントを一つ含んでいる', () => {
        expect(wrapper.find(Modal).length).toBe(1)
    })
    test('Formコンポーネントを一つ含んでいる', () => {
        expect(wrapper.find(Form).length).toBe(1)
    })
    test('Modal.Headerを一つ含んでいる', () => {
        expect(wrapper.find(Modal.Header).length).toBe(1)
    })
    test('Modal.Bodyを一つ含んでいる', () => {
        expect(wrapper.find(Modal.Body).length).toBe(1)
    })
    test('Modal.Footerを一つ含んでいる', () => {
        expect(wrapper.find(Modal.Footer).length).toBe(1)
    })
})

describe('モーダルフォームの動作チェック', () => {
    wrapper.setProps({
        onSubmit:()=>'sawai kei',
        header:'header',
        body:'body',
        footer:'footer'
    })
    test('Formを送信した時、props.onSubmitが実行される', () => {
        expect(wrapper.find(Form).props().onSubmit()).toBe('sawai kei')
    })
    test('Modal.Headerの内容がprops.headerと一致する', () => {
        expect(wrapper.find(Modal.Header).text()).toBe('header')
    })
    test('Modal.Bodyの内容がprops.bodyと一致する', () => {
        expect(wrapper.find(Modal.Body).text()).toBe('body')
    })
    test('Modal.Footerの内容がprops.footerと一致する', () => {
        expect(wrapper.find(Modal.Footer).text()).toBe('footer')
    })
})
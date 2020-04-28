import { shallow } from "enzyme";
import LoginPage from "../LogInPage";
import { Alert } from "react-bootstrap";
import LoginForm from "../../containers/LoginForm";
import React from "react"

const wrapper = shallow(<LoginPage location = {{}} />)

describe("ログインページ", () => {
    test('フラッシュメッセージがない時、Alertは表示されない', () => {
        wrapper.setProps({location:{}})
        expect(wrapper.find(Alert).length).toBe(0)
    })
    test("フラッシュメッセージがある時、その内容がAlertで表示される", () => {
        wrapper.setProps({location : {
            flash : "sawai kei"
        }})
        expect(wrapper.find(Alert).length).toBe(1)
        expect(wrapper.find(Alert).prop('variant')).toBe('danger')
        expect(wrapper.find(Alert).text()).toBe('sawai kei')
    })
    test("ログインフォームを1つ含んでいる", () => {
        expect(wrapper.find(LoginForm).length).toBe(1)
    })
})
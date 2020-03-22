import { shallow } from "enzyme";
import LoginPage from "../../components/LoginPage";
import { Alert } from "react-bootstrap";
import LoginForm from "../../containers/LoginForm";
import React from "react"

const wrapper = shallow(<LoginPage location = {{}} />)

describe("ログインページ", () => {
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
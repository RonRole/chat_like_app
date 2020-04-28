import { shallow } from "enzyme";
import Aon from "../../components/Aon";
import React from "react"
import { Alert, Button } from "react-bootstrap";
import MessageSendButton from "../MessageSendButton";

const wrapper=shallow(<MessageSendButton />)

describe('メッセージ送信ボタン', () => {
    test("Buttonを1つだけもっている", () => {
        expect(wrapper.find(Button).length).toBe(1)
    })
    
    test("Buttonのtypeがsubmitである", () => {
        expect(wrapper.find(Button).props().type).toBe('submit')
    })
})
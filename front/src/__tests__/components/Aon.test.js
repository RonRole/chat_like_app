import { shallow } from "enzyme";
import Aon from "../../components/Aon";
import React from "react"
import { Alert } from "react-bootstrap";

const wrapper=shallow(<Aon />)

test("Alertコンポーネントを1つだけもっている", () => {
    expect(wrapper.find(Alert).length).toBe(1)
})

test("Alertのvariantがprimaryである", () => {
    expect(wrapper.find(Alert).props().variant).toBe('primary')
})
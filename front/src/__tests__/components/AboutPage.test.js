import {shallow, mount, render} from 'enzyme'
import AboutPage from '../../components/AboutPage'
import React from 'react'
import { OonButton } from '../../containers/OonButton'
import { Button, Container, Alert } from 'react-bootstrap'

const wrapper = shallow(<AboutPage />)

test("h1属性でAbout Pageと記載されている", () => {
    expect(wrapper.find("h1").text()).toEqual("About Page")
})

test("ボタンが子コンポーネントである", () => {
    expect(wrapper.find(Button).length).toBeGreaterThan(0)
})

test("アラートが子コンポーネントである", () => {
    expect(wrapper.find(Alert).length).toBeGreaterThan(0)
})
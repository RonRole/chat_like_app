import React from 'react'
import { shallow } from "enzyme";
import Navigation from "../Navigation";
import { Navbar, Nav } from "react-bootstrap";
import { Link } from 'react-router-dom';

const wrapper = shallow(<Navigation />)

describe('ナビゲーションバーの要素チェック', () => {
    test('Navbarが一つ表示される', () => {
        expect(wrapper.find(Navbar).length).toBe(1)
    })
    test('Navbar.Brandが一つ表示される', () => {
        expect(wrapper.find(Navbar.Brand).length).toBe(1)
    })
    test('Navbar.Toggleが一つ表示される', () => {
        expect(wrapper.find(Navbar.Toggle).length).toBe(1)
    })
    test('Navbar.Collapseが一つ表示される', () => {
        expect(wrapper.find(Navbar.Collapse).length).toBe(1)
    })
    test('Navが一つ表示される', () => {
        expect(wrapper.find(Nav).length).toBe(1)
    })
})

describe('ナビゲーションバーの動作チェック', () => {
    test('Navbarのexpandがsmである', () => {
        expect(wrapper.find(Navbar).props().expand).toBe('sm')
    })
    test('Navbarのstickyがtopである', () => {
        expect(wrapper.find(Navbar).props().sticky).toBe('top')
    })
    test('Navigationの子要素がNavの子要素になっている', () => {
        wrapper.setProps({children:['test code','test code 2', 'test code 3']})
        expect(wrapper.find(Nav).children().length).toBe(3)
        expect(wrapper.find(Nav).children().first().text()).toBe('test code')
    })
})
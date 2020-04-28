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
    test('Linkが四つ表示される', () => {
        expect(wrapper.find(Link).length).toBe(4)
    })
})

describe('ナビゲーションバーの動作チェック', () => {
    test('Homeリンクが/homeに繋がっている', () => {
        expect(wrapper.find({to:'/home'}).text()).toBe('Home')
    })
    test('Sign Upリンクが/signupに繋がっている', () => {
        expect(wrapper.find({to:'/signup'}).text()).toBe('Sign Up')
    })
    test('Sign Inリンクが/signinに繋がっている', () => {
        expect(wrapper.find({to:'/signin'}).text()).toBe('Sign In')
    })
    test('TalkRoomsリンクが/talk_roomsに繋がっている', () => {
        expect(wrapper.find({to:'/talk_rooms'}).text()).toBe('Talk Rooms')
    })

    describe('ウィンドウサイズがxsの時', () => {
        global.width = 767
        
    })
})
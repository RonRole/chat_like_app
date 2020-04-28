import { shallow } from 'enzyme';
import {App} from '../../containers/App';
import { BrowserRouter, Route, Link } from 'react-router-dom';
import React from 'react'
import LoginRequiredRoute from '../LoginRequiredRoute';
import Navigation from '../../components/Navigation';
import Loading from '../../containers/Loading';

const wrapper = shallow(<App defaultLogin={()=>console.log("defaultLogin")}/>, {lifecycleExperimental : true})

describe("App", () => {
  test("最初のdefaultLoadedステートがfalseである", () => {
    expect(shallow(<App defaultLogin={()=>""}/>).state('defaultLoaded')).toBeFalsy()
  })

  test("componentDidMountでdefaultLoginが1回呼ばれる", () => {
    
  })


  describe("defaultLoadedステートがtrueのとき", () => {
    wrapper.setState({
      defaultLoaded : true
    })
    test("Loadingコンポーネントを1つ含んでいる",()=>{
      expect(wrapper.find(Loading).length).toBe(1)
    })
  
    test("BrowserRouterを1つ含んでいる", () => {
      expect(wrapper.find(BrowserRouter).length).toBe(1)
    })
  
    test("Navigationを1つ含んでいる", () => {
      expect(wrapper.find(Navigation).length).toBe(1)
    })
  
    //LoginRequiredRouteはconnect済なのでconnectされた方をimportしないといけない
    test("Routeを2つ, LoginRequiredRouteを3つ含んでいる", () => {
      expect(wrapper.find(Route).length).toBe(2)
      expect(wrapper.find(LoginRequiredRoute).length).toBe(3)
    })

    test('Homeリンクが/homeに繋がっている', () => {
      expect(wrapper.find(Link).find({to:'/home'}).text()).toBe('Home')
    })
    test('Sign Upリンクが/signupに繋がっている', () => {
        expect(wrapper.find(Link).find({to:'/signup'}).text()).toBe('Sign Up')
    })
    test('Sign Inリンクが/signinに繋がっている', () => {
        expect(wrapper.find(Link).find({to:'/signin'}).text()).toBe('Sign In')
    })
    test('TalkRoomsリンクが/talk_roomsに繋がっている', () => {
        expect(wrapper.find(Link).find({to:'/talk_rooms'}).text()).toBe('Talk Rooms')
    })
  })
})
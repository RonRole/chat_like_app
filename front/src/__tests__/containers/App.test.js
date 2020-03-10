import { shallow } from 'enzyme';
import {App} from '../../containers/App';
import { BrowserRouter, Route } from 'react-router-dom';
import React from 'react'
import LoginRequiredRoute from '../../containers/LoginRequiredRoute';
import Navigation from '../../components/Navigation';
import Loading from '../../containers/Loading';

const appWrapper = shallow(<App defaultLogin={()=>console.log("defaultLogin")}/>, {lifecycleExperimental : true})

describe("App", () => {
  test("最初のdefaultLoadedステートがfalseである", () => {
    expect(shallow(<App defaultLogin={()=>""}/>).state('defaultLoaded')).toBeFalsy()
  })

  test("componentDidMountでdefaultLoginが1回呼ばれる", () => {
    
  })


  describe("defaultLoadedステートがtrueのとき", () => {
    appWrapper.setState({
      defaultLoaded : true
    })
    test("Loadingコンポーネントを1つ含んでいる",()=>{
      expect(appWrapper.find(Loading).length).toBe(1)
    })
  
    test("BrowserRouterを1つ含んでいる", () => {
      expect(appWrapper.find(BrowserRouter).length).toBe(1)
    })
  
    test("Navigationを1つ含んでいる", () => {
      expect(appWrapper.find(Navigation).length).toBe(1)
    })
  
    //LoginRequiredRouteはconnect済なのでconnectされた方をimportしないといけない
    test("Routeを2つ, LoginRequiredRouteを3つ含んでいる", () => {
      expect(appWrapper.find(Route).length).toBe(2)
      expect(appWrapper.find(LoginRequiredRoute).length).toBe(3)
    })
  })
})
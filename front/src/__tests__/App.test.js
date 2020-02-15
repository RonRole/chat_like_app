import { shallow } from 'enzyme';
import {App} from '../containers/App';
import { BrowserRouter, Route } from 'react-router-dom';
import React from 'react'
import Loading from '../components/Loading';
import LoginRequiredRoute from '../containers/LoginRequiredRoute';
import Navigation from '../components/Navigation';

const appWrapper = shallow(<App defaultLogin={()=>console.log("test")}/>)


test("when in loading, App should render <Loading />",()=>{
  appWrapper.setState({defLoginIsFinished:false})
  expect(appWrapper.find(Loading).length).toBe(1)
})

test("when in loading App should not render BrowserRouter", ()=>{
  appWrapper.setState({defLoginIsFinished:false})
  expect(appWrapper.find(BrowserRouter).length).toBe(0)
})

test("when not in loading, App should not render Loading", () => {
  appWrapper.setState({defLoginIsFinished:true})
  expect(appWrapper.find(Loading).length).toBe(0)
})

test("when not in loading, App should render BrowserRouter", () => {
  appWrapper.setState({defLoginIsFinished:true})
  expect(appWrapper.find(BrowserRouter).length).toBe(1)
})

test("App has a Navigation", () => {
  appWrapper.setState({defLoginIsFinished:true})
  expect(appWrapper.find(Navigation).length).toBe(1)
})

//LoginRequiredRouteはconnect済なのでconnectされた方をimportしないといけない
test("App has all routings", () => {
  appWrapper.setState({defLoginIsFinished:true})
  expect(appWrapper.find(Route).length).toBe(1)
  expect(appWrapper.find(LoginRequiredRoute).length).toBe(4)
})
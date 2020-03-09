import { shallow } from 'enzyme';
import {App} from '../../containers/App';
import { BrowserRouter, Route } from 'react-router-dom';
import React from 'react'
import LoginRequiredRoute from '../../containers/LoginRequiredRoute';
import Navigation from '../../components/Navigation';
import Loading from '../../containers/Loading';

const appWrapper = shallow(<App />)

test("App has a Loading",()=>{
  expect(appWrapper.find(Loading).length).toBe(1)
})

test("App has a BrowserRouter", () => {
  expect(appWrapper.find(BrowserRouter).length).toBe(1)
})

test("App has a Navigation", () => {
  expect(appWrapper.find(Navigation).length).toBe(1)
})

//LoginRequiredRouteはconnect済なのでconnectされた方をimportしないといけない
test("App has all routings", () => {
  expect(appWrapper.find(Route).length).toBe(2)
  expect(appWrapper.find(LoginRequiredRoute).length).toBe(3)
})
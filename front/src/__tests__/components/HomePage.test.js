import {shallow} from 'enzyme';
import React from 'react';
import HomePage from '../../components/HomePage';

const wrapper = shallow(<HomePage />)

test('h1要素にHome Pageを含んでいる', () => {
    expect(wrapper.find('h1').text()).toMatch(/.*Home ?Page.*/)
})
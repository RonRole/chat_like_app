import {shallow} from 'enzyme';
import React from 'react';
import { Loading } from '../../containers/Loading';
import { Spinner } from 'react-bootstrap';

const loading = shallow(<Loading />)

describe("Loading test", () => {
    test("ロード中でない時、何も表示されない" , () => {
        loading.setProps({loading : false})
        expect(loading.getElements().length).toBe(1)
        expect(loading.text()).toBe("")
    })

    test("ロード中の時、ロード中画面が表示される", () => {
        loading.setProps({loading:true})
        expect(loading.find(Spinner).length).toBe(1)
        expect(loading.text()).toContain("今日もいい天気")
    })
})
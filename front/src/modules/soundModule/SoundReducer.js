
import createReducerFactory from "../CreateReducerFactory"
import { SoundActionTypes } from "./SoundActions"


const initialState = {
    0 : {
        id:0,
        src:''
    }
}

const actionHandler={}
actionHandler[SoundActionTypes.ADD_BGM] = (state, action) => {
    const newBgms = [action.bgms].flat()
    const newState = newBgms.reduce((state, newBgm) => {
        state[newBgm.id] = newBgm
        return state
    }, state)
    return {
        ...state,
        ...newState
    }
}

const createReducer = createReducerFactory(initialState, actionHandler)

export default {
    createReducer
}


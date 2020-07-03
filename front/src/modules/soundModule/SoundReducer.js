
import createReducerFactory from "../CreateReducerFactory"
import { SoundActionTypes } from "./SoundActions"


const initialState = {
    currentBgmId : 0,
    0 : {
        id:0,
        src:''
    }
}

const actionHandler={}

actionHandler[SoundActionTypes.FETCH_BGMS] = (state, action) => {
    const newBgms = [action.bgms].flat()
    const newState = newBgms.reduce((state, newBgm) => {
        state[newBgm.id] = newBgm
        return state
    }, {currentBgmId : state.currentBgmId})
    return {
        ...newState
    }
}

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

actionHandler[SoundActionTypes.CHANGE_CURRENT_BGM_ID] = (state, action) => {
    const newBgmId = action.bgmId
    return {
        ...state,
        currentBgmId : newBgmId
    }
}

actionHandler[SoundActionTypes.DELETE_BGM] = (state, action) => {
    delete state[action.bgmId]
    return {
        ...state
    }
}

actionHandler[SoundActionTypes.UPDATE_BGM] = (state, action) => {
    state[action.bgmId].title = action.bgmTitle
    return {
        ...state
    }
}

const createReducer = createReducerFactory(initialState, actionHandler)

export default {
    createReducer
}


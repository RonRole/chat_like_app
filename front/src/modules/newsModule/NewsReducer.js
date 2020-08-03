
import createReducerFactory from "../CreateReducerFactory"
import { NewsActionTypes } from "./NewsActions"


const initialState = {
    receivedNews : []
}

const actionHandler={}

actionHandler[NewsActionTypes.ADD_RECEIVED_NEWS] = (state, action) => {
    return {
        ...state,
        receivedNews : [...action.receivedNews]
    }
}

const createReducer = createReducerFactory(initialState, actionHandler)

export default {
    createReducer
}


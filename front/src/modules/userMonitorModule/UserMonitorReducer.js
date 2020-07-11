import { UserMonitorActionTypes } from "./UserMonitorActions"

const { default: createReducerFactory } = require("../CreateReducerFactory")

const initialState = [{
    roomId : 0,
    userId : 0,
    action : 'joinRoom' | 'leaveRoom'
}]

const actionHandler = {}
actionHandler[UserMonitorActionTypes.ADD_USER_MONITOR_MESSAGE] = (state,action) => {
    const messages = [action.message, ...state]
    return [...messages]
}

const createReducer = createReducerFactory(initialState, actionHandler)

export default {
    createReducer
}
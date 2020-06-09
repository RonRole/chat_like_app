import {CurrentRoomStatusActionTypes} from "./CurrentRoomStatusActions"
import { LogActionTypes } from "../logModule/LogActions"
import createReducerFactory from "../CreateReducerFactory"


/**
 * トークルームのid : メッセージ一覧
 */
const initialState = {
    default: {
        currentUserIds:[],
        currentUserStatus: {
            default:''
        },
        messages:[]
    }
}

/**
 * CurrentRoomStatusReducer用のactionHandler
 */
const actionHandler = {}

actionHandler[LogActionTypes.LOG_IN] = () => initialState

actionHandler[CurrentRoomStatusActionTypes.ADD_MESSAGE] = 
actionHandler[CurrentRoomStatusActionTypes.RECEIVE_MESSAGE] = (state, action) => {
    state[action.roomId] = state[action.roomId] || initialState.default
    state[action.roomId]['messages'] = [
        ...state[action.roomId]['messages'],
        {
            className : action.className,
            userId      : action.user.id,
            text      : action.text
        }
    ]
    return {
        ...state
    }
} 

actionHandler[CurrentRoomStatusActionTypes.CLEAR_MESSAGE] = (state, action) => {
    state[action.roomId]['messages'] = []
    return {
        ...state
    } 
}

actionHandler[CurrentRoomStatusActionTypes.REFRESH_CURRENT_ROOM_USERS] = (state,action) => {
    const room = state[action.talkRoomId] || initialState.default
    room['currentUserIds'] = [...action.userIds]
    return {
        ...state
    }
}

actionHandler[CurrentRoomStatusActionTypes.CHANGE_CURRENT_USER_STATUS] = 
actionHandler[CurrentRoomStatusActionTypes.RECEIVE_CURRENT_USER_STATUS] = (state,action) => {
    const room = state[action.talkRoomId] || initialState.default
    room['currentUserStatus'] = room['currentUserStatus'] || {}
    room['currentUserStatus'][action.userId] = action.status
    return {
        ...state
    }
}

export default {
    createMessageReducer: createReducerFactory(initialState, actionHandler)
}


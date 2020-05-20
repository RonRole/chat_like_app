import {ActionTypes} from "./CurrentRoomStatusActions"
import { LogActionTypes } from "../logModule/LogActions"
import createReducerFactory from "../CreateReducerFactory"


/**
 * トークルームのid : メッセージ一覧
 */
const initialState = {
    0: {
        currentUserIds:[],
        currentUserStatus: {
            0:''
        },
        messages:[{
            roomID : 0,
            className : "",
            text : "",
            user : "",
        }]
    }
}

/**
 * state=>roomId=>messagesに変換するselector
 * @param {*} state 
 */
const getMessagesByRoomId = state => {
    return (roomId) => {
        const room = state['currentRoomStatus'][roomId] || initialState[0]
        return room['messages']
    }
}
/**
 * state=>roomId=>currentRoomStatusに変換するselector
 * @param {*} state 
 */
const getCurrentStatusOfRoom = state => {
    return (roomId) => {
        const room = state['currentRoomStatus'][roomId] || initialState[0]
        return room
    }
}

/**
 * CurrentRoomStatusReducer用のactionHandler
 */
const actionHandler = {}

actionHandler[LogActionTypes.LOG_IN] = () => initialState

actionHandler[ActionTypes.ADD_MESSAGE] = 
actionHandler[ActionTypes.RECEIVE_MESSAGE] = (state, action) => {
    state[action.roomId] = state[action.roomId] || initialState[0]
    state[action.roomId]['messages'] = [
        ...state[action.roomId]['messages'],
        {
            className : action.className,
            user      : action.user.id,
            text      : action.text
        }
    ]
    return {
        ...state
    }
} 

actionHandler[ActionTypes.CLEAR_MESSAGE] = (state, action) => {
    state[action.roomId]['messages'] = []
    return {
        ...state
    } 
}

actionHandler[ActionTypes.REFRESH_CURRENT_ROOM_USERS] = (state,action) => {
    const room = state[action.talkRoomId] || initialState[0]
    room['currentUserIds'] = [...action.userIds]
    return {
        ...state
    }
}

actionHandler[ActionTypes.CHANGE_CURRENT_USER_STATUS] = 
actionHandler[ActionTypes.RECEIVE_CURRENT_USER_STATUS] = (state,action) => {
    const room = state[action.talkRoomId] || initialState[0]
    room['currentUserStatus'] = room['currentUserStatus'] || {}
    room['currentUserStatus'][action.userId] = action.status
    return {
        ...state
    }
}

export default {
    initialState,
    getMessagesByRoomId,
    getCurrentStatusOfRoom,
    createMessageReducer: createReducerFactory(initialState, actionHandler)
}


import {ActionTypes} from "./CurrentRoomStatusActions"
import { LogActionTypes } from "../logModule/LogActions"


/**
 * トークルームのid : メッセージ一覧
 */
const initialState = {
    0:{
        currentUserIds:[],
        currentUserStatus: {
            0:''
        },
        messages:[{
            "roomID" : 0,
            "className" : "",
            "text" : "",
            "user" : "",
        }]
    }  
}

const getMessagesByRoomId = state => {
    return (roomId) => {
        const room = state['currentRoomStatus'][roomId] || initialState[0]
        return room['messages']
    }
}

const getCurrentStatusOfRoom = state => {
    return (roomId) => {
        const room = state['currentRoomStatus'][roomId] || initialState[0]
        return room
    }
}

const createReducer = (state = initialState, action) => {
    switch(action.type){
        case LogActionTypes.LOG_IN : {
            return {
                ...initialState
            }
        }
        case ActionTypes.ADD_MESSAGE:
        case ActionTypes.RECEIVE_MESSAGE: {
            state[action.roomId] = state[action.roomId] || {messages:[]}
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
        case ActionTypes.CLEAR_MESSAGE : {
            state[action.roomId]['messages'] = []
            return {
                ...state
            }
        }

        case ActionTypes.REFRESH_CURRENT_ROOM_USERS : {
            const room = state[action.talkRoomId] || {userIds:[]}
            room['currentUserIds'] = [...action.userIds]
            return {
                ...state
            }
        }

        case ActionTypes.CHANGE_CURRENT_USER_STATUS :
        case ActionTypes.RECEIVE_CURRENT_USER_STATUS : {
            const room = state[action.talkRoomId] || {userIds:[]}
            room['currentUserStatus'] = room['currentUserStatus'] || {}
            room['currentUserStatus'][action.userId] = action.status
            return {
                ...state
            }
        }

        default: {
            return state;
        }
    }
}

export default {
    getMessagesByRoomId,
    getCurrentStatusOfRoom,
    createMessageReducer: createReducer
}


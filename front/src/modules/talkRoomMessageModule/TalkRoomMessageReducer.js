import {ActionTypes} from "./TalkRoomMessageActoins"
import { LogActionTypes } from "../logModule/LogActions"


/**
 * トークルームのid : メッセージ一覧
 */
const initialState = {
    0:[{
        "roomID" : 0,
        "className" : "",
        "text" : "",
        "user" : "",
    }]
}

const getMessagesByRoomId = state => {
    return (roomId) => {
        return state.messages[roomId] || initialState[0]
    }
}

const createReducer = (state = initialState, action) => {
    switch(action.type){
        case LogActionTypes.LOG_IN : {
            return initialState
        }
        case ActionTypes.ADD_MESSAGE:
        case ActionTypes.RECEIVE_MESSAGE: {
            state[action.roomId] = state[action.roomId] || [] 
            state[action.roomId] = [
                ...state[action.roomId],
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
            state[action.roomId] = []
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
    createMessageReducer: createReducer
}


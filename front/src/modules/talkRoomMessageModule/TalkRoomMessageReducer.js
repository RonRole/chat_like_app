import {ActionTypes} from "./TalkRoomMessageActoins"

const defaultRoom = {
    messages:[],
    messageAreaBottom : window.innerHeight
}

const initialState = {
    0:defaultRoom
}

const getMessagesByRoomId = state => {
    return (roomId) => {
        return state.appReducer[roomId] ? state.appReducer[roomId].messages : []
    }
}

const getMessageAreaBottomById = state => {
    return (roomId) => {
        return state.appReducer[roomId] ? state.appReducer[roomId].messageAreaBottom : 0
    }
}

const createMessageReducer = (state = initialState, action) => {
    switch(action.type){
        case ActionTypes.ADD_MESSAGE:
        case ActionTypes.RECEIVE_MESSAGE: {
            if(!state[action.roomId]){
                state[action.roomId] = defaultRoom
            }
            state[action.roomId] = {
                messages: [
                    ...state[action.roomId].messages,
                    {
                        className:action.className,
                        text:action.text,
                        md:action.md
                    }
                ],
                messageAreaBottom:state[action.roomId].messageAreaBottom*2
            }
            return {
                ...state
            }

        }

        default: {
            return state;
        }
    }
}

export default TalkRoomMessageReducer = {
    getMessagesByRoomId,
    getMessageAreaBottomById,
    createMessageReducer
}


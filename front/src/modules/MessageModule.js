import {take, all} from 'redux-saga/effects'
import socket from '../socket/SocketSettings'


//color settings
export const Variants = {
    oon:"primary",
    aon:"danger"
} 

//actions
const ActionTypes = {
    ADD_MESSAGE    :"ADD_MESSAGE",
    RECEIVE_MESSAGE:"RECEIVE_MESSAGE"
}

//action creators
export const Actions = {
    addMessage:(className = "", text) => {
        return {
            type:ActionTypes.ADD_MESSAGE,
            className:className,
            md:{span:6, offset:6},
            text:text
        }
    },
    receiveMessage:(className = "secondary", text) => {
        return {
            type:ActionTypes.RECEIVE_MESSAGE,
            className:className,
            md:{span:6},
            text:text
        }
    }
}

//saga
function* handleAddMessage() {
    while(true) {
        const action = yield take(ActionTypes.ADD_MESSAGE)
        socket.emit('sendMessage', {className:action.className, text:action.text})
    }
}

export function* messageSaga() {
    yield all([
        handleAddMessage(),
    ])
}


//reducer
const initialState = {
    messages: [],
    messageAreaBottom: window.innerHeight,
}

//reducer
export const messageReducer = (state = initialState, action) => {
    switch(action.type){
        case ActionTypes.ADD_MESSAGE:
        case ActionTypes.RECEIVE_MESSAGE: {
            return {
                ...state,
                messages: [                    
                    ...state.messages,
                    {
                        className:action.className,
                        text:action.text,
                        md:action.md
                    }                    
                ],
                messageAreaBottom: state.messageAreaBottom+window.innerHeight,
            }
        }

        default: {
            return state;
        }
    }
}

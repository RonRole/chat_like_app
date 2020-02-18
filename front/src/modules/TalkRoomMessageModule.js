import {take, all, put, call, fork} from 'redux-saga/effects'
import socket from '../socket/SocketSettings'
import { eventChannel } from 'redux-saga'


//color settings
export const Variants = {
    oon:"primary",
    aon:"danger"
} 

//actions
const ActionTypes = {
    JOIN_ROOM      :"JOIN_ROOM",
    ADD_MESSAGE    :"ADD_MESSAGE",
    RECEIVE_MESSAGE:"RECEIVE_MESSAGE"
}

//action creators
export const Actions = {
    joinRoom:({roomId}) => {
        return {
            type:ActionTypes.JOIN_ROOM,
            roomId:roomId
        }
    },
    addMessage:({roomId, className = "", text}) => {
        return {
            type:ActionTypes.ADD_MESSAGE,
            roomId:roomId,
            className:className,
            md:{span:6, offset:6},
            text:text
        }
    },
    receiveMessage:({roomId, className = "secondary", text}) => {
        return {
            type:ActionTypes.RECEIVE_MESSAGE,
            roomId: roomId,
            className:className,
            md:{span:6},
            text:text
        }
    }
}

//saga
//メッセージ受信用のイベントチャンネル
function* createMessegeReceiveChannel(socket) {
    //イベントチャンネル：socketが受け取ったresponseをemitし、イベント発行
    return eventChannel(emit => {
        socket.on('return', response => {
            console.log(response)
            emit(response)
        })
        return () => {
            socket.close()
        }
    })
}
function* handleJoinRoom() {
    while(true) {
        //JOIN_ROOMが発行される毎に起動
        const action = yield take(ActionTypes.JOIN_ROOM)
        socket.emit('joinRoom',{roomId:action.roomId})
        yield fork(handleReceiveMessage)
    }
}
function* handleReceiveMessage() {
    const channel = yield call(createMessegeReceiveChannel,socket)
    //channelがemitするたびに起動
    while(true) {
        const response = yield take(channel)
        yield put(Actions.receiveMessage({
            roomId:response.roomId,
            className:response.className,
            text:response.text
        }))
    }
}
function* handleAddMessage() {
    while(true) {
        const action = yield take(ActionTypes.ADD_MESSAGE)
        socket.emit('sendMessage', {roomId:action.roomId, className:action.className, text:action.text})
    }
}

export function* messageSaga() {
    yield all([
        handleJoinRoom(),
        handleAddMessage(),
    ])
}


//reducer
const defaultRoom = {
    messages:[],
    messageAreaBottom:window.innerHeight
}

const initialState = {
    0:defaultRoom
}

export const getMessagesByRoomId = (state) => (roomId) => {
    return state.appReducer[roomId] ? state.appReducer[roomId].messages : []
}

export const getMessageAreaBottom = (state) => (roomId) => {
    return state.appReducer[roomId] ? state.appReducer[roomId].messageAreaBottom : 0
}

//reducer
export const messageReducer = (state = initialState, action) => {
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

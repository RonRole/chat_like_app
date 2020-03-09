import {ActionTypes} from "./TalkRoomMessageActoins"
import Actions from "./TalkRoomMessageActoins"
import { eventChannel } from "redux-saga"
import { call, take, put, all } from "redux-saga/effects"
import socketClient from "../socketClient"



//saga
//メッセージ受信用のイベントチャンネル
function* createMessegeReceiveChannel() {
    //イベントチャンネル：socketClientが受け取ったresponseをemitし、イベント発行
    return eventChannel(emit => {
        socketClient.on('receiveMessage', response => {
            emit(response)
        })
        return () => {
            socketClient.close()
        }
    })
}

function* handleReceiveMessage() {
    const channel = yield call(createMessegeReceiveChannel,socketClient)
    //channelがemitするたびに起動
    while(true) {
        const response = yield take(channel)
        yield put(Actions.receiveMessage({
            roomId    : response.roomId,
            className : response.className,
            text      : response.text,
            user      : response.user
        }))
    }
}

function* handleJoinRoom() {
    while(true) {
        //JOIN_ROOMが発行される毎に起動
        const action = yield take(ActionTypes.JOIN_ROOM)
        socketClient.connect()
        socketClient.emit('joinRoom',{user: action.user, roomId:action.roomId})
    }
}

function* handleLeaveRoom() {
    while(true) {
        const action = yield take(ActionTypes.LEAVE_ROOM)
        socketClient.emit('leaveRoom',{user:action.user, roomId:action.roomId})
        socketClient.disconnect()
    }
}

function* handleAddMessage() {
    while(true) {
        const action = yield take(ActionTypes.ADD_MESSAGE)
        socketClient.emit('sendMessage', {
            roomId    : action.roomId, 
            text      : action.text,
            user      : action.user
        })
    }
}

export default function* talkRoomMessageSaga() {
    yield all([
        handleJoinRoom(),
        handleLeaveRoom(),
        handleReceiveMessage(),
        handleAddMessage(),
    ])
}
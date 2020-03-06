import {ActionTypes} from "./TalkRoomMessageActoins"
import Actions from "./TalkRoomMessageActoins"
import { eventChannel } from "redux-saga"
import { call, take, put, all, takeEvery } from "redux-saga/effects"
import socketClient from "../socketClient"



//saga
//メッセージ受信用のイベントチャンネル
function* createMessegeReceiveChannel() {
    //イベントチャンネル：socketClientが受け取ったresponseをemitし、イベント発行
    return eventChannel(emit => {
        socketClient.on('return', response => {
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
            roomId:response.roomId,
            className:response.className,
            text:response.text
        }))
    }
}

function* handleJoinRoom() {
    //JOIN_ROOMが発行される毎に起動
    const action = yield take(ActionTypes.JOIN_ROOM)
    socketClient.emit('joinRoom',{roomId:action.roomId})
}

function* handleAddMessage() {
    const action = yield take(ActionTypes.ADD_MESSAGE)
    socketClient.emit('sendMessage', {roomId:action.roomId, className:action.className, text:action.text})
}

export default function* talkRoomMessageSaga() {
    yield all([
        takeEvery(ActionTypes.JOIN_ROOM, handleJoinRoom),
        handleReceiveMessage(),
        takeEvery(ActionTypes.ADD_MESSAGE, handleAddMessage),
    ])
}


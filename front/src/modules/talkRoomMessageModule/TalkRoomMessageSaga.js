import {ActionTypes} from "./TalkRoomMessageActoins"
import Actions from "./TalkRoomMessageActoins"
import { eventChannel } from "redux-saga"
import { call, take, put, all } from "redux-saga/effects"
import socketClient from "../socketClient"
import TalkRoomActions from "../talkRoomModule/TalkRoomActions"



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

export function* handleReceiveMessage() {
    const channel = yield call(createMessegeReceiveChannel)
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

//現在ユーザー取得用のイベントチャンネル
function* createCurrentUsersRecieveChannel() {
    return eventChannel(emit => {
        socketClient.on("currentUsers", response => {
            emit(response)
        })
        return () => {
            socketClient.close()
        }
    })
}

export function* handleGetCurrentUsers() {
    const channel = yield call(createCurrentUsersRecieveChannel)
    while(true) {
        const response = yield take(channel)
        // yield put(Actions.setCurrentUserIds(Object.keys(response)))
        console.log(response.users)
        yield put(TalkRoomActions.addUsersToTalkRoom({
            talkRoomId : response.roomId,
            userIds : Object.keys(response.users)
        }))
    }
}


export function* handleJoinRoom() {
    while(true) {
        //JOIN_ROOMが発行される毎に起動
        const action = yield take(ActionTypes.JOIN_ROOM)
        socketClient.connect()
        socketClient.emit('joinRoom',{user: action.user, roomId:action.roomId})
        socketClient.emit('currentUsers', action.roomId)
    }
}

export function* handleLeaveRoom() {
    //退出メッセージを受け取るためにイベントチャンネルを設定する
    while(true) {
        const action = yield take(ActionTypes.LEAVE_ROOM)
        socketClient.emit('leaveRoom',{user:action.user, roomId:action.roomId})
        socketClient.emit('currentUsers', action.roomId)
        //トークルームの内容をクリアする
        yield put(Actions.clearMessage(action.roomId))
        socketClient.disconnect()
    }
}

export function* handleAddMessage() {
    while(true) {
        const action = yield take(ActionTypes.ADD_MESSAGE)
        socketClient.emit('sendMessage', {
            roomId    : action.roomId, 
            text      : action.text,
            user      : action.user
        })
    }
}


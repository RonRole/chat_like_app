import {ActionTypes} from "./TalkRoomMessageActoins"
import Actions from "./TalkRoomMessageActoins"
import { eventChannel } from "redux-saga"
import { call, take, put, all } from "redux-saga/effects"
import socketClient from "../socketClient"
import TalkRoomActions from "../talkRoomModule/TalkRoomActions"
import UserActions from "../userModule/UserActions"



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

/**
 * socketサーバーからメッセージの追加を通知された時、
 * stateに通知されたメッセージを追加する
 */
export function* handleReceiveMessage() {
    const channel = yield call(createMessegeReceiveChannel)
    //channelがemitするたびに起動
    while(true) {
        const response = yield take(channel)
        yield put(UserActions.addUser(response.user))
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

/**
 * socketサーバーから現在ユーザーの更新通知を受け取り、
 * TalkRoomのuserIdsを更新する
 */
export function* handleGetCurrentUsers() {
    const channel = yield call(createCurrentUsersRecieveChannel)
    while(true) {
        const response = yield take(channel)
        yield put(TalkRoomActions.addUsersToTalkRoom({
            talkRoomId : response.roomId,
            userIds : Object.keys(response.users).map(key => response.users[key]["id"])
        }))
    }
}

/**
 * socketの接続を行い、
 * socketサーバーにトークルームへの参加を通知し、
 * 現在ユーザーの更新を依頼する。
 */
export function* handleJoinRoom() {
    while(true) {
        //JOIN_ROOMが発行される毎に起動
        const action = yield take(ActionTypes.JOIN_ROOM)
        socketClient.connect()
        socketClient.emit('joinRoom',{user: action.user, roomId:action.roomId})
        socketClient.emit('currentUsers', action.roomId)
    }
}

/**
 * socketサーバーにトークルームからの退出を通知し、
 * 現在ユーザーの更新を依頼する。
 * その後、socketの接続を解除する
 */
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

/**
 * socketサーバーにトークルームへのメッセージ追加を通知する
 */
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


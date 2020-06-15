import CurrentRoomStatusActions, {CurrentRoomStatusActionTypes} from "./CurrentRoomStatusActions"
import Actions from "./CurrentRoomStatusActions"
import { call, take, put } from "redux-saga/effects"
import { createMessageReceiveChannel, createCurrentUserReceiveChannel, clientToServerMethods, serverToClientMothods, createCurrentUserStatusReceiveChannel, createReceiveJoinChannel, createReceiveLeaveChannel } from "../socketClient"

export function* handleReceiveJoinRoom() {
    const channel = yield call(createReceiveJoinChannel)
    while(true) {
        const response = yield take(channel)
        yield put(Actions.receiveJoinRoom(response));
    }
}

export function* handleReceiveLeaveRoom() {
    const channel = yield call(createReceiveLeaveChannel)
    while(true) {
        const response = yield take(channel)
        yield put(Actions.receiveLeaveRoom(response))
    }
}

/**
 * socketサーバーからメッセージの追加を通知された時、
 * stateに通知されたメッセージを追加する
 */
export function* handleReceiveMessage() {
    const channel = yield call(createMessageReceiveChannel)
    //channelがemitするたびに起動
    while(true) {
        const response = yield take(channel)
        yield put(Actions.receiveMessage(response))
    }
}

/**
 * socketサーバーから現在ユーザーの更新通知を受け取り、
 * TalkRoomのcurrentUserIdsを更新する
 */
export function* handleGetCurrentUsers() {
    const channel = yield call(createCurrentUserReceiveChannel)
    while(true) {
        const response = yield take(channel)
        yield put(CurrentRoomStatusActions.refreshCurrentRoomUsers({
            talkRoomId : response.roomId,
            userIds : Object.keys(response.users).map(key => response.users[key]["id"])
        }))
    }
}



export function* handleGetCurrentUserStatus() {
    const channel = yield call(createCurrentUserStatusReceiveChannel)
    while(true) {
        const response = yield take(channel)
        yield put(CurrentRoomStatusActions.receiveCurrentUserStatus(response))
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
        const action = yield take(CurrentRoomStatusActionTypes.JOIN_ROOM)
        //reconnectイベントに備えることで、サーバーからの切断=>再接続に対応
        serverToClientMothods.readyToRecconect(action)
        clientToServerMethods.connectToServer()
        clientToServerMethods.tellJoinedRoom(action)
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
        const action = yield take(CurrentRoomStatusActionTypes.LEAVE_ROOM)
        clientToServerMethods.tellLeavedRoom(action)
        //トークルームの内容をクリアする
        yield put(Actions.clearMessage(action.roomId))
        clientToServerMethods.disconnectToServer()
    }
}

/**
 * サーバーから接続を切断された時、トークルーム一覧画面に移る
 */
export function* handleDisconnectedFromServer() {
    while(true) {
        const action = yield take(CurrentRoomStatusActionTypes.DISCONNECTED_FROM_SERVER)
        alert('サーバーから切断されました')
        action.history.push('/talk_rooms')
    }
}

/**
 * socketサーバーにトークルームへのメッセージ追加を通知する
 */
export function* handleSendMessage() {
    while(true) {
        const action = yield take(CurrentRoomStatusActionTypes.SEND_MESSAGE)
        clientToServerMethods.sendMessage(action)
    }
}

/**
 * socketサーバーにユーザーステータスの変化を通知する
 */
export function* handleChangeStatus() {
    while(true) {
        const action = yield take(CurrentRoomStatusActionTypes.CHANGE_CURRENT_USER_STATUS)
        clientToServerMethods.tellCurrentRoomUserStatusChanged(action)
    }
}

export function* handleSubmitTextMessage(action) {
    const translateMode = action.translateMode || {translate : text=>text}
    const text = yield translateMode.translate(action.text)
    yield put(CurrentRoomStatusActions.addMessage({
        ...action,
        messageType : 'text',
        messageClass : 'myMessage',
        text
    }))
    yield put(CurrentRoomStatusActions.sendMessage({
        ...action,
        messageType : 'text',
        messageClass : 'receiveMessage',
        text
    }))
} 

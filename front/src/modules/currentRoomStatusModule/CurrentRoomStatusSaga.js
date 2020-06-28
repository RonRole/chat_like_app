import CurrentRoomStatusActions from "./CurrentRoomStatusActions"
import Actions from "./CurrentRoomStatusActions"
import { call, take, put, fork } from "redux-saga/effects"
import { createMessageReceiveChannel, createCurrentUserReceiveChannel, clientToServerMethods, serverToClientMothods, createCurrentUserStatusReceiveChannel, createReceiveJoinChannel, createReceiveLeaveChannel, createCurrentUserPositionReceiveChannel, createReceiveRoomBgmChannel, createCurrentAllUserReceiveChannel } from "../socketClient"

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
        yield put(CurrentRoomStatusActions.receiveRefreshCurrentRoomUsers({
            talkRoomId : response.roomId,
            userIds : [response.users].flat().map(user => user.id)
        }))

    }
}

export function* handleFetchCurrentRoomUsers(action) {
    yield call(clientToServerMethods.fetchCurrentRoomUsers,{
        talkRoomId : action.talkRoomId
    })
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
export function* handleJoinRoom(action) {
    //JOIN_ROOMが発行される毎に起動
    yield call(serverToClientMothods.readyToRecconect, action)
    yield call(clientToServerMethods.connectToServer)
    yield call(clientToServerMethods.tellJoinedRoom,action)

}

/**
 * socketサーバーにトークルームからの退出を通知し、
 * 現在ユーザーの更新を依頼する。
 */
export function* handleLeaveRoom(action) {
    //退出メッセージを受け取るためにイベントチャンネルを設定する
    yield call(clientToServerMethods.tellLeavedRoom, action)
    //トークルームの内容をクリアする
    yield put(Actions.clearMessage(action.roomId))
}

/**
 * サーバーから接続を切断された時、トークルーム一覧画面に移る
 */
export function* handleDisconnectedFromServer(action) {
    alert('サーバーから切断されました')
    action.history.push('/talk_rooms')
}

/**
 * socketサーバーにトークルームへのメッセージ追加を通知する
 */
export function* handleSendMessage(action) {
    yield call(clientToServerMethods.sendMessage, action)
}

/**
 * socketサーバーにユーザーステータスの変化を通知する
 */
export function* handleChangeStatus(action) {
    yield call(clientToServerMethods.tellCurrentRoomUserStatusChanged, action)
}

export function* handleSubmitTextMessage(action) {
    const translateMode = action.translateMode || {translate : text=>text}
    const text = yield　call(translateMode.translate, action.text)
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

export function* changeRoomBgm(action) {
    yield call(clientToServerMethods.tellChangeRoomBgm, {
        talkRoomId : action.talkRoomId,
        bgmSrcUrl : action.bgmSrcUrl
    })
}

export function* handleReceiveChangeRoomBgm() {
    const channel = yield call(createReceiveRoomBgmChannel)
    while(true) {
        const response = yield take(channel)
        yield put(CurrentRoomStatusActions.receiveChangeRoomBgm({
            talkRoomId : response.talkRoomId,
            bgmSrcUrl : response.bgmSrcUrl
        }))
    }
}


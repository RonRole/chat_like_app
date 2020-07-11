import CurrentRoomStatusActions from "./CurrentRoomStatusActions"
import Actions from "./CurrentRoomStatusActions"
import { call, take, put, fork } from "redux-saga/effects"
import { createMessageReceiveChannel, createCurrentUserReceiveChannel, clientToServerMethods, serverToClientMothods, createCurrentUserStatusReceiveChannel, createReceiveJoinChannel, createReceiveLeaveRoomMessageChannel, createCurrentUserPositionReceiveChannel, createReceiveRoomBgmChannel, createCurrentAllUserReceiveChannel, createReceiveJoinRoomChannel, createReceiveJoinRoomMessageChannel, createReceiveLeaveRoomChannel } from "../socketClient"

export function* handleReceiveJoinRoomMessage() {
    const channel = yield call(createReceiveJoinRoomMessageChannel)
    while(true) {
        const response = yield take(channel)
        yield put(Actions.receiveJoinRoomMessage(response));
    }
}

export function* handleReceiveLeaveRoomMessage() {
    const channel = yield call(createReceiveLeaveRoomMessageChannel)
    while(true) {
        const response = yield take(channel)
        yield put(Actions.receiveLeaveRoomMessage(response))
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
    //トークルームへの再接続をオフに
    yield call(serverToClientMothods.removeRejoinRoom)
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
    const {type, ...messageProps} = {...action}
    yield call(clientToServerMethods.sendMessage, messageProps)
}

/**
 * socketサーバーにユーザーステータスの変化を通知する
 */
export function* handleChangeStatus(action) {
    yield call(clientToServerMethods.tellCurrentRoomUserStatusChanged, action)
}

export function* handleSubmitTextMessage(action) {
    const {roomId, user, translateMode, text} = {...action}

    const translatedText = yield　call(translateMode.translate, text)
    yield put(CurrentRoomStatusActions.addMessage({
        roomId,
        user,
        messageType : 'text',
        messageClass : 'myMessage',
        text : translatedText
    }))
    yield put(CurrentRoomStatusActions.sendMessage({
        roomId,
        user,
        messageType : 'text',
        messageClass : 'receiveMessage',
        text : translatedText
    }))
} 

export function* changeRoomBgm(action) {
    yield call(clientToServerMethods.tellChangeRoomBgm, {
        talkRoomId : action.talkRoomId,
        bgmId : action.bgmId,
        bgmSrcUrl : action.bgmSrcUrl
    })
}

export function* handleReceiveChangeRoomBgm() {
    const channel = yield call(createReceiveRoomBgmChannel)
    while(true) {
        const response = yield take(channel)
        yield put(CurrentRoomStatusActions.receiveChangeRoomBgm({
            talkRoomId : response.talkRoomId,
            bgmId :response.bgmId,
            bgmSrcUrl : response.bgmSrcUrl,
        }))
    }
}


import CurrentRoomStatusActions, {ActionTypes} from "./CurrentRoomStatusActions"
import Actions from "./CurrentRoomStatusActions"
import { eventChannel } from "redux-saga"
import { call, take, put, all } from "redux-saga/effects"
import socketClient from "../socketClient"
import TalkRoomActions, { TalkRoomActionTypes } from "../talkRoomModule/TalkRoomActions"
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
        yield put(UserActions.setUser(response.user))
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
 * TalkRoomのcurrentUserIdsを更新する
 */
export function* handleGetCurrentUsers() {
    const channel = yield call(createCurrentUsersRecieveChannel)
    while(true) {
        const response = yield take(channel)
        yield put(CurrentRoomStatusActions.refreshCurrentRoomUsers({
            talkRoomId : response.roomId,
            userIds : Object.keys(response.users).map(key => response.users[key]["id"])
        }))
    }
}

//現在ユーザーステータス取得用のイベントチャンネル
function* createCurrentUserStatusChannel() {
    return eventChannel(emit => {
        socketClient.on("currentUserStatus", response => {
            emit(response)
        })
        return () => {
            socketClient.close()
        }
    })
}

export function* handleGetCurrentUserStatus() {
    const channel = yield call(createCurrentUserStatusChannel)
    while(true) {
        const response = yield take(channel)
        yield put(CurrentRoomStatusActions.receiveCurrentUserStatus({
            talkRoomId : response.roomId,
            userId : response.userId,
            status : response.status
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
        //reconnectイベントに備えることで、サーバーからの切断=>再接続に対応
        socketClient.on('reconnect', () => {
            socketClient.emit('rejoinRoom',{user: action.user, roomId:action.roomId})
            socketClient.emit('currentUsers', action.roomId)
        })
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
 * サーバーから接続を切断された時、トークルーム一覧画面に移る
 */
export function* handleDisconnectedFromServer() {
    while(true) {
        const action = yield take(ActionTypes.DISCONNECTED_FROM_SERVER)
        alert('サーバーから切断されました')
        action.history.push('/talk_rooms')
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

/**
 * socketサーバーにユーザーステータスの変化を通知する
 */
export function* handleChangeStatus() {
    while(true) {
        const action = yield take(ActionTypes.CHANGE_CURRENT_USER_STATUS)
        socketClient.emit('currentUserStatus', {
            roomId : action.talkRoomId,
            userId : action.userId,
            status : action.status
        })
    }
}

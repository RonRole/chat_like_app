import { call, take, put } from "redux-saga/effects"
import { createReceiveJoinRoomChannel, createReceiveLeaveRoomChannel } from "../socketClient"
import UserMonitorActions, { UserMonitorActionTypes } from "./UserMonitorActions"

export function* handleReceiveJoinRoom() {
    const channel = yield call(createReceiveJoinRoomChannel)
    while(true) {
        const response = yield take(channel)
        yield put(UserMonitorActions.addUserMonitorMessage({
            message : {
                talkRoomId : response.roomId,
                userId : response.user.id,
                action : 'join',
                date : new Date()
            }
        }))
    }
}

export function* handleReceiveLeaveRoom() {
    const channel = yield call(createReceiveLeaveRoomChannel)
    while(true) {
        const response = yield take(channel)
        yield put(UserMonitorActions.addUserMonitorMessage({
            message : {
                talkRoomId : response.roomId,
                userId : response.user.id,
                action : 'leave',
                date : new Date()
            }
        }))
    }
}

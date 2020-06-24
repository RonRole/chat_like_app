import { clientToServerMethods, createCurrentUserPositionReceiveChannel } from "../socketClient";
import { call, take, put } from "redux-saga/effects";
import UserPositionActions from "./UserPositionActions";

export function* handleReceiveCurrentUserPosition() {
    const channel = yield call(createCurrentUserPositionReceiveChannel)
    while(true) {
        const response = yield take(channel)
        for(const user of response.users) {
            yield put(UserPositionActions.receiveChangeCurrentUserPosition({
                talkRoomId : response.talkRoomId,
                userId : user.id,
                position : user.position
            }))
        }
        
    }
}

export function* handleTellChangeUserPosition(action) {
    clientToServerMethods.tellCurrentRoomUserPositionChanged(action)
}

export function* handleTellCurrentUserPosition(action) {
    clientToServerMethods.tellGetCurrentRoomUserPosition(action);
}
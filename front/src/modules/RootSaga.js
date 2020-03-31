
/**
 * ActionTypeとSagaを結びつける
 */
import { all, takeEvery, put, join, fork } from "redux-saga/effects";
import * as loadingSaga from "./loadingModule/LoadingSaga"
import { LogActionTypes } from "./logModule/LogActions";
import * as logSaga from "./logModule/LogSaga";
import { TalkRoomActionTypes } from "./talkRoomModule/TalkRoomActions";
import * as talkRoomSaga from "./talkRoomModule/TalkRoomSaga"
import * as talkRoomMessageSaga from "./talkRoomMessageModule/TalkRoomMessageSaga"
import * as userSaga from "./userModule/UserSaga"
import { UserActionTypes } from "./userModule/UserActions";

function* initialize(action) {
    const login = yield fork(logSaga.handleGetDefLoginStart, action)
    yield join(login)
    const ownRooms = yield fork(talkRoomSaga.handleGetOwnRooms, action)
    const joinRooms = yield fork(talkRoomSaga.handleGetJoinedTalkRooms, action)
    yield join(ownRooms)
    yield join(joinRooms)

    action.then()
}

function* login(action) {
    const login = yield fork(logSaga.handleGetExecLoginStart, action)
    yield join(login)
    const ownRooms = yield fork(talkRoomSaga.handleGetOwnRooms, action)
    const joinRooms = yield fork(talkRoomSaga.handleGetJoinedTalkRooms, action)
    yield join(ownRooms)
    yield join(joinRooms)
    action.then()
}


const logSagas = [
    takeEvery(LogActionTypes.DEF_LOG_IN, loadingSaga.wrapSagaWithLoading(initialize)),
    takeEvery(LogActionTypes.EXEC_LOG_IN, loadingSaga.wrapSagaWithLoading(login)),
    takeEvery(LogActionTypes.LOG_OUT, logSaga.handleGetLogoutStart),
]

const talkRoomSagas = [
    //talkRoomSaga
    takeEvery(TalkRoomActionTypes.EXEC_GET_OWN_ROOMS, talkRoomSaga.handleGetOwnRooms),
    takeEvery(TalkRoomActionTypes.EXEC_GET_JOINED_ROOMS, talkRoomSaga.handleGetJoinedTalkRooms),
    takeEvery(TalkRoomActionTypes.EXEC_ADD_ROOM, talkRoomSaga.handleAddTalkRoom),
    takeEvery(TalkRoomActionTypes.EXEC_UPDATE_ROOM, talkRoomSaga.handleUpdateTalkRoom),
    takeEvery(TalkRoomActionTypes.EXEC_DELETE_ROOM, talkRoomSaga.handleDeleteTalkRoom),
    takeEvery(TalkRoomActionTypes.EXEC_GET_TALKROOM_MEMBERS, loadingSaga.wrapSagaWithLoading(talkRoomSaga.handleGetTalkRoomMembers)),
    takeEvery(TalkRoomActionTypes.EXEC_ADD_USER_TO_TALKROOM, talkRoomSaga.handleAddTalkRoomMember)
]

const talkRoomMessageSagas = [
    talkRoomMessageSaga.handleJoinRoom(),
    talkRoomMessageSaga.handleLeaveRoom(),
    talkRoomMessageSaga.handleReceiveMessage(),
    talkRoomMessageSaga.handleAddMessage(),
    talkRoomMessageSaga.handleGetCurrentUsers()
]

const userSagas = [
    takeEvery(UserActionTypes.EXEC_CREATE_USER, loadingSaga.wrapSagaWithLoading(userSaga.handleCreateUser)),
    takeEvery(UserActionTypes.EXEC_SEARCH_USER, loadingSaga.wrapSagaWithLoading(userSaga.handleExecSearchUser)),
    userSaga.handleGetCurrentRoomUsers()
]

//rootSaga
export default function* rootSaga(){
    yield all([
        ...logSagas,
        ...talkRoomSagas,
        ...talkRoomMessageSagas,
        ...userSagas
    ])
}

/**
 * ActionTypeとSagaを結びつける
 */
import { all, takeEvery　} from "redux-saga/effects";
import * as loadingSaga from "./loadingModule/LoadingSaga"
import { LogActionTypes } from "./logModule/LogActions";
import * as logSaga from "./logModule/LogSaga";
import { TalkRoomActionTypes } from "./talkRoomModule/TalkRoomActions";
import * as talkRoomSaga from "./talkRoomModule/TalkRoomSaga"
import * as talkRoomMessageSaga from "./currentRoomStatusModule/CurrentRoomStatusSaga"
import * as userSaga from "./userModule/UserSaga"
import * as errorSaga from './errorCodeModule/ErrorCodeSaga'
import { UserActionTypes } from "./userModule/UserActions";
import { ErrorCodeActionTypes } from "./errorCodeModule/ErrorCodeActions";

const logSagas = [
    takeEvery(LogActionTypes.EXEC_DEF_LOG_IN, loadingSaga.addLoadingStateUntilSagaFinish(logSaga.handleGetDefLoginStart)),
    takeEvery(LogActionTypes.EXEC_LOG_IN, loadingSaga.addLoadingStateUntilSagaFinish(logSaga.handleGetExecLoginStart)),
    takeEvery(LogActionTypes.EXEC_LOG_OUT, loadingSaga.addLoadingStateUntilSagaFinish(logSaga.handleGetExecLogoutStart)),
]

const talkRoomSagas = [
    //talkRoomSaga
    takeEvery(LogActionTypes.LOG_IN, loadingSaga.addLoadingStateUntilSagaFinish(talkRoomSaga.handleGetOwnRooms)),
    takeEvery(LogActionTypes.LOG_IN, loadingSaga.addLoadingStateUntilSagaFinish(talkRoomSaga.handleGetJoinedTalkRooms)),
    takeEvery(TalkRoomActionTypes.EXEC_GET_OWN_ROOMS, talkRoomSaga.handleGetOwnRooms),
    takeEvery(TalkRoomActionTypes.EXEC_GET_JOINED_ROOMS, talkRoomSaga.handleGetJoinedTalkRooms),
    takeEvery(TalkRoomActionTypes.EXEC_ADD_ROOM, talkRoomSaga.handleAddTalkRoom),
    takeEvery(TalkRoomActionTypes.EXEC_UPDATE_ROOM, talkRoomSaga.handleUpdateTalkRoom),
    takeEvery(TalkRoomActionTypes.EXEC_DELETE_ROOM, talkRoomSaga.handleDeleteTalkRoom),
    takeEvery(TalkRoomActionTypes.EXEC_GET_TALKROOM_MEMBERS, talkRoomSaga.handleGetTalkRoomMembers),
    takeEvery(TalkRoomActionTypes.EXEC_ADD_USER_TO_TALKROOM, talkRoomSaga.handleAddTalkRoomMember)
]

const talkRoomMessageSagas = [
    talkRoomMessageSaga.handleJoinRoom(),
    talkRoomMessageSaga.handleLeaveRoom(),
    talkRoomMessageSaga.handleReceiveMessage(),
    talkRoomMessageSaga.handleAddMessage(),
    talkRoomMessageSaga.handleGetCurrentUsers(),
    talkRoomMessageSaga.handleGetCurrentUserStatus(),
    talkRoomMessageSaga.handleChangeStatus()
]

const userSagas = [
    takeEvery(UserActionTypes.EXEC_CREATE_USER, loadingSaga.addLoadingStateUntilSagaFinish(userSaga.handleCreateUser)),
    takeEvery(UserActionTypes.EXEC_SEARCH_USER, loadingSaga.addLoadingStateUntilSagaFinish(userSaga.handleExecSearchUser)),
    takeEvery(UserActionTypes.EXEC_UPDATE_USER, loadingSaga.addLoadingStateUntilSagaFinish(userSaga.handleUpdateUser)),
    userSaga.handleReceiveMessage(),
    userSaga.handleGetCurrentRoomUsers()
]

const ErrorCodeSagas = [
    takeEvery(ErrorCodeActionTypes.HANDLE_ERROR_CODE, errorSaga.handleError)
]

//rootSaga
export default function* rootSaga(){
    yield all([
        ...logSagas,
        ...talkRoomSagas,
        ...talkRoomMessageSagas,
        ...userSagas,
        ...ErrorCodeSagas
    ])
}
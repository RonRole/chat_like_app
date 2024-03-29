
/**
 * ActionTypeとSagaを結びつける
 */
import { all, takeEvery } from "redux-saga/effects";
import * as loadingSaga from "./loadingModule/LoadingSaga"
import { LogActionTypes } from "./logModule/LogActions";
import * as logSaga from "./logModule/LogSaga";
import { TalkRoomActionTypes } from "./talkRoomModule/TalkRoomActions";
import * as talkRoomSaga from "./talkRoomModule/TalkRoomSaga"
import {CurrentRoomStatusActionTypes} from "./currentRoomStatusModule/CurrentRoomStatusActions"
import * as talkRoomMessageSaga from "./currentRoomStatusModule/CurrentRoomStatusSaga"
import * as userSaga from "./userModule/UserSaga"
import * as errorSaga from './errorCodeModule/ErrorCodeSaga'
import { UserActionTypes } from "./userModule/UserActions";
import { ErrorCodeActionTypes } from "./errorCodeModule/ErrorCodeActions";
import { MessageImageActionTypes } from "./messageImageModule/MessageImageActions";
import * as messageImageSaga from "./messageImageModule/MessageImageSaga"
import * as soundSaga from "./soundModule/SoundSaga"
import {UserPositionActionTypes} from './userPositionModule/UserPositionActions'
import * as userPositionSaga from './userPositionModule/UserPositionSaga'
import { SoundActionTypes } from "./soundModule/SoundActions";
import * as userMonitorSaga from './userMonitorModule/UserMonitorSaga'
import * as newsSaga from './newsModule/NewsSaga'
import { NewsActionTypes } from "./newsModule/NewsActions";
import NewsTypes from "./newsModule/NewsTypes";

const logSagas = [
    takeEvery(LogActionTypes.EXEC_DEF_LOG_IN, loadingSaga.addLoadingStateUntilSagaFinish(logSaga.handleGetDefLoginStart)),
    takeEvery(LogActionTypes.EXEC_LOG_IN, loadingSaga.addLoadingStateUntilSagaFinish(logSaga.handleGetExecLoginStart)),
    takeEvery(LogActionTypes.EXEC_LOG_OUT, loadingSaga.addLoadingStateUntilSagaFinish(logSaga.handleGetExecLogoutStart)),
]

const messageImageSagas = [
    takeEvery(LogActionTypes.LOG_IN, loadingSaga.addLoadingStateUntilSagaFinish(messageImageSaga.handleClearMessageImage,messageImageSaga.handleFetchLoginUsersMessageImages)),
    takeEvery(MessageImageActionTypes.EXEC_UPLOAD_MESSAGE_IMAGE, loadingSaga.addLoadingStateUntilSagaFinish(messageImageSaga.handleUploadMessageImage)),
    takeEvery(MessageImageActionTypes.EXEC_DELETE_MESSAGE_IMAGE, loadingSaga.addLoadingStateUntilSagaFinish(messageImageSaga.handleDeleteMessageImage))
]

const talkRoomSagas = [
    //talkRoomSaga
    takeEvery(LogActionTypes.LOG_IN, loadingSaga.addLoadingStateUntilSagaFinish(talkRoomSaga.handleSearchOwnRooms)),
    takeEvery(LogActionTypes.LOG_IN, loadingSaga.addLoadingStateUntilSagaFinish(talkRoomSaga.handleSearchJoinRooms)),
    takeEvery(TalkRoomActionTypes.EXEC_GET_OWN_ROOMS, talkRoomSaga.handleGetOwnRooms),
    takeEvery(TalkRoomActionTypes.EXEC_GET_JOINED_ROOMS, talkRoomSaga.handleGetJoinedTalkRooms),
    takeEvery(TalkRoomActionTypes.EXEC_ADD_ROOM, loadingSaga.addLoadingStateUntilSagaFinish(talkRoomSaga.handleAddTalkRoom)),
    takeEvery(TalkRoomActionTypes.EXEC_UPDATE_ROOM, talkRoomSaga.handleUpdateTalkRoom),
    takeEvery(TalkRoomActionTypes.EXEC_DELETE_ROOM, talkRoomSaga.handleDeleteTalkRoom),
    takeEvery(TalkRoomActionTypes.EXEC_ADD_USER_TO_TALKROOM, talkRoomSaga.handleAddTalkRoomMember),
    takeEvery(TalkRoomActionTypes.EXEC_REMOVE_USERS_FROM_TALKROOM, talkRoomSaga.handleRemoveUsersFromTalkRoom),
    takeEvery(TalkRoomActionTypes.EXEC_SEARCH_OWN_ROOMS, loadingSaga.addLoadingStateUntilSagaFinish(talkRoomSaga.handleSearchOwnRooms)),
    takeEvery(TalkRoomActionTypes.EXEC_SEARCH_JOIN_ROOMS, loadingSaga.addLoadingStateUntilSagaFinish(talkRoomSaga.handleSearchJoinRooms))
]

const talkRoomMessageSagas = [
    takeEvery(CurrentRoomStatusActionTypes.JOIN_ROOM, loadingSaga.addLoadingStateUntilSagaFinish(talkRoomMessageSaga.handleJoinRoom)),
    talkRoomMessageSaga.handleReceiveJoinRoomMessage(),

    takeEvery(CurrentRoomStatusActionTypes.LEAVE_ROOM, talkRoomMessageSaga.handleLeaveRoom),
    talkRoomMessageSaga.handleReceiveLeaveRoomMessage(),

    takeEvery(CurrentRoomStatusActionTypes.SEND_MESSAGE, talkRoomMessageSaga.handleSendMessage),
    talkRoomMessageSaga.handleReceiveMessage(),
    
    takeEvery(CurrentRoomStatusActionTypes.EXEC_REFRESH_CURRENT_ROOM_USERS, talkRoomMessageSaga.handleFetchCurrentRoomUsers),
    talkRoomMessageSaga.handleGetCurrentUsers(),

    takeEvery(CurrentRoomStatusActionTypes.CHANGE_CURRENT_USER_STATUS, talkRoomMessageSaga.handleChangeStatus),
    talkRoomMessageSaga.handleGetCurrentUserStatus(),

    takeEvery(CurrentRoomStatusActionTypes.SUBMIT_TEXT_MESSAGE,　loadingSaga.addLoadingStateUntilSagaFinish(talkRoomMessageSaga.handleSubmitTextMessage)),
    takeEvery(CurrentRoomStatusActionTypes.CHANGE_ROOM_BGM, talkRoomMessageSaga.changeRoomBgm),
    talkRoomMessageSaga.handleReceiveChangeRoomBgm(),
]

const userSagas = [
    takeEvery(LogActionTypes.LOG_IN, loadingSaga.addLoadingStateUntilSagaFinish(userSaga.handleGetRelatedUsers)),
    takeEvery(UserActionTypes.EXEC_CREATE_USER, loadingSaga.addLoadingStateUntilSagaFinish(userSaga.handleCreateUser)),
    takeEvery(UserActionTypes.EXEC_SEARCH_USER, loadingSaga.addLoadingStateUntilSagaFinish(userSaga.handleExecSearchUser)),
    takeEvery(UserActionTypes.EXEC_UPDATE_USER, loadingSaga.addLoadingStateUntilSagaFinish(userSaga.handleUpdateUser)),
    takeEvery(UserActionTypes.EXEC_UPDATE_PASSWORD, loadingSaga.addLoadingStateUntilSagaFinish(userSaga.handleUpdatePassword)),
    userSaga.handleReceiveMessage(),
    userSaga.handleGetCurrentRoomUsers()
]

const userPositionSagas = [
    userPositionSaga.handleReceiveCurrentUserPosition(),
    takeEvery(UserPositionActionTypes.CHANGE_CURRENT_USER_POSITION, userPositionSaga.handleTellChangeUserPosition),
    takeEvery(CurrentRoomStatusActionTypes.JOIN_ROOM, userPositionSaga.handleTellChangeUserPosition)
]

const ErrorCodeSagas = [
    takeEvery(ErrorCodeActionTypes.HANDLE_ERROR_CODE, errorSaga.handleError)
]

const SoundSagas = [
    // takeEvery(CurrentRoomStatusActionTypes.JOIN_ROOM, soundSaga.playJoinRoomSound),
    // takeEvery(CurrentRoomStatusActionTypes.RECEIVE_JOIN_ROOM, soundSaga.playJoinRoomSound),
    // takeEvery(CurrentRoomStatusActionTypes.LEAVE_ROOM, soundSaga.playLeaveRoomSound),
    // takeEvery(CurrentRoomStatusActionTypes.RECEIVE_LEAVE_ROOM, soundSaga.playLeaveRoomSound),
    takeEvery(CurrentRoomStatusActionTypes.ADD_MESSAGE, soundSaga.playAddMessageSound),
    takeEvery(CurrentRoomStatusActionTypes.RECEIVE_MESSAGE, soundSaga.playReceiveMessageSound),

    takeEvery(SoundActionTypes.START_BGM, soundSaga.playBGM),
    takeEvery(SoundActionTypes.STOP_BGM, soundSaga.stopBGM),
    takeEvery(CurrentRoomStatusActionTypes.LEAVE_ROOM, soundSaga.stopBGM),
    takeEvery(CurrentRoomStatusActionTypes.DISCONNECTED_FROM_SERVER, soundSaga.stopBGM),

    takeEvery(SoundActionTypes.EXEC_UPLOAD_BGM, loadingSaga.addLoadingStateUntilSagaFinish(soundSaga.uploadBGM)),
    takeEvery(LogActionTypes.LOG_IN, soundSaga.fetchUserBgms),

    takeEvery(SoundActionTypes.EXEC_DELETE_BGM, loadingSaga.addLoadingStateUntilSagaFinish(soundSaga.execDeleteBgm)),
    takeEvery(SoundActionTypes.EXEC_UPDATE_BGM, loadingSaga.addLoadingStateUntilSagaFinish(soundSaga.execUpdateBgm)),

    takeEvery(CurrentRoomStatusActionTypes.CHANGE_ROOM_BGM, soundSaga.playBGM),
    takeEvery(CurrentRoomStatusActionTypes.RECEIVE_CHANGE_ROOM_BGM, soundSaga.playBGM),
    soundSaga.readyToBgmEnd()
]

const UserMonitorSagas = [
    userMonitorSaga.handleReceiveJoinRoom(),
    userMonitorSaga.handleReceiveLeaveRoom()
]

const NewsSagas = [
    takeEvery(LogActionTypes.LOG_IN, newsSaga.handleFetchReceivedNews),
    takeEvery(NewsActionTypes.EXEC_FETCH_RECEIVED_NEWS, newsSaga.handleFetchReceivedNews),
    takeEvery(TalkRoomActionTypes.ADD_USERS_TO_TALK_ROOM, newsSaga.handleSendAddMemberNews),
    takeEvery(TalkRoomActionTypes.REMOVE_USERS_FROM_TALKROOM, newsSaga.handleSendRemoveMemberNews),
]

//rootSaga
export default function* rootSaga(){
    yield all([
        ...logSagas,
        ...messageImageSagas,
        ...talkRoomSagas,
        ...talkRoomMessageSagas,
        ...userSagas,
        ...ErrorCodeSagas,
        ...SoundSagas,
        ...userPositionSagas,
        ...UserMonitorSagas,
        ...NewsSagas
    ])
}
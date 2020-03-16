import DataAccessor from "../DataAccessor"
import TalkRoomActions, { TalkRoomActionTypes } from "./TalkRoomActions"
import { put, take, call, all, takeLatest, takeEvery } from "redux-saga/effects"
import handleError from "../ErrorHandler"
import UserActions from "../userModule/UserActions"

const getOwnRooms = () => {
    return DataAccessor.get({
        url : `${process.env.REACT_APP_BACKEND_ADDRESS}/talk_rooms/own`
    })
}

const getJoinRooms = () => {
    return DataAccessor.get({
        url : `${process.env.REACT_APP_BACKEND_ADDRESS}/talk_rooms/join`
    })
}

const getAllRooms = () => {
    return DataAccessor.get({
        url : `${process.env.REACT_APP_BACKEND_ADDRESS}/talk_rooms` 
    })
}


const createTalkRoom = ({
    title,
    description,
    authorId
}) => {
    return DataAccessor.post({
        url       : `${process.env.REACT_APP_BACKEND_ADDRESS}/talk_rooms`,
        parameter : {
            talkroom : {
                title      :title,
                description:description,
                author_id   :authorId
            }
        } 
    })
}

const deleteTalkRoom = (talkRoomId) => {
    return DataAccessor.delete({
        url : `${process.env.REACT_APP_BACKEND_ADDRESS}/talk_rooms/${talkRoomId}`
    })
}

//トークルームのメンバー取得
const getTalkRoomMembers = (
    talkRoomId,
) => {
    return DataAccessor.get({
        url : `${process.env.REACT_APP_BACKEND_ADDRESS}/talk_rooms/${talkRoomId}/users`
    })
}

//メンバー追加
const addMemberToTalkRoom = ({
    talkRoomId,
    userId
}) => {
    return DataAccessor.post({
        url : `${process.env.REACT_APP_BACKEND_ADDRESS}/talk_rooms/${talkRoomId}/users`,
        parameter:userId
    })
}

//saga
export function* handleGetOwnRooms(action) {
    const result = yield call(getOwnRooms)
    if(result.isSuccess) {
        yield put(TalkRoomActions.setOwnRooms(result.data))
    }
    if(result.isError) {
        handleError({
            error   : result.data,
            history : action.history
        })
    }
}

export function* handleGetJoinedTalkRooms(action) {
    const talkRoomResult = yield call(getJoinRooms)
    if(talkRoomResult.isSuccess) {
        yield put(TalkRoomActions.setJoinedRooms(talkRoomResult.data))
    }
    if(talkRoomResult.isFail) {
        alert('トークルームを取得できませんでした')
    }
    if(talkRoomResult.isError) {
        handleError({
            error   : talkRoomResult.data,
            history : action.history
        })
    }
}

export function* handleAddTalkRoom(action) {
    const addTalkRoomResult = yield call(createTalkRoom, {
        title       : action.title,
        description : action.description,
        authorId    : action.authorId
    })
    if(addTalkRoomResult.isSuccess) {
        yield put(TalkRoomActions.addTalkRoom(addTalkRoomResult.data))
    }
    if(addTalkRoomResult.isFail) {
        alert('トークルームを追加できませんでした')
    }
    if(addTalkRoomResult.isError) {
        handleError({
            error   : addTalkRoomResult.data,
            history : action.history
        })
    }
}

export function* handleDeleteTalkRoom(action) {
    const deleteTalkRoomResult = yield call(deleteTalkRoom, action.talkRoomId)
    if(deleteTalkRoomResult.isSuccess) {
        yield put(TalkRoomActions.deleteTalkRoom({
            talkRoomId : action.talkRoomId
        }))
    }
    if(deleteTalkRoomResult.isFail) {
        alert(`トークルームを削除できませんでした`)
    }
    if(deleteTalkRoomResult.isError) {
        handleError({
            error : deleteTalkRoomResult.error,
            history : action.history
        })
    }
}

export function* handleGetTalkRoomMembers(action) {
    const result = yield call(getTalkRoomMembers, action.talkRoomId)
    if(result.isSuccess) {
        yield put(TalkRoomActions.addUsersToTalkRoom({
            talkRoomId : action.talkRoomId,
            userIds : [...Object.keys(result.data).map(key => result.data[key]["id"])]
        }))
        yield put(UserActions.addUser(...Object.keys(result.data).map(key => result.data[key])))
    }
    if(result.isError) {
        handleError({
            error : result.error,
            history : action.history
        })
    }
}

export function* handleAddTalkRoomMember(action) {
    const result = yield call(addMemberToTalkRoom, {talkRoomId:action.talkRomId, userId : action.userId})
    if(result.isSuccess) {
        alert(`${result.data}を追加しました`)
        yield put(UserActions.addUser(result.data))
    }
    if(result.isError) {
        handleError({
            error : result.error,
            history : action.history
        })
    }
}





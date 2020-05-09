import DataAccessor from "../DataAccessor"
import TalkRoomActions from "./TalkRoomActions"
import { put, call, fork} from "redux-saga/effects"

import UserActions from "../userModule/UserActions"
import FormErrorActions from "../FormErrorModule/FormErrorActions"
import ErrorCodeActions from "../errorCodeModule/ErrorCodeActions"

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
                title,
                description,
                author_id   :authorId
            }
        } 
    })
}

const updateTalkRoom = talkRoom => {
    return DataAccessor.put({
        url : `${process.env.REACT_APP_BACKEND_ADDRESS}/talk_rooms/${talkRoom.id}`,
        parameter : {
            talkroom : talkRoom
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
        parameter : {
            user : {
                id : userId
            }
        }
    })
}

//saga
export function* handleGetOwnRooms(action) {
    const result = yield call(getOwnRooms)
    if(result.isSuccess) {
        yield put(TalkRoomActions.setOwnRooms(result.data))
        //取得したトークルームのユーザーを設定する
        for(let room of result.data) {
            yield fork(handleGetTalkRoomMembers, TalkRoomActions.execGetTalkRoomUser(room.id))
        }
    }
    if(result.isError) {
        yield put(ErrorCodeActions.execHandleError({errorResult:result.data}))
    }
}

export function* handleGetJoinedTalkRooms(action) {
    const talkRoomResult = yield call(getJoinRooms)
    if(talkRoomResult.isSuccess) {
        yield put(TalkRoomActions.setJoinedRooms(talkRoomResult.data))
        //取得したトークルームのユーザーを設定する
        for(let room of talkRoomResult.data) {
            yield fork(handleGetTalkRoomMembers, TalkRoomActions.execGetTalkRoomUser(room.id))
        }
    }
    if(talkRoomResult.isFail) {
        alert('トークルームを取得できませんでした')
    }
    if(talkRoomResult.isError) {
        yield put(ErrorCodeActions.execHandleError({errorResult:talkRoomResult.data}))
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
        yield put(ErrorCodeActions.execHandleError({errorResult:addTalkRoomResult.data}))
    }
}

export function* handleUpdateTalkRoom(action) {
    const updateTalkRoomResult = yield call(updateTalkRoom, {
        id : action.talkRoomId,
        title : action.title,
        description : action.description,
    })
    if(updateTalkRoomResult.isSuccess) {
        yield put(TalkRoomActions.updateTalkRoom({
            talkRoomId : action.talkRoomId,
            talkRoom : updateTalkRoomResult.data
        }))
    }
    if(updateTalkRoomResult.isFail) {
        alert(`${action.talkRoom.title}の更新ができませんでした`)
    }
    if(updateTalkRoomResult.isError) {
        yield put(ErrorCodeActions.execHandleError({errorResult:updateTalkRoomResult.data}))
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
        yield put(ErrorCodeActions.execHandleError({errorResult:deleteTalkRoomResult.data}))
    }
}

export function* handleGetTalkRoomMembers(action) {
    const result = yield call(getTalkRoomMembers, action.talkRoomId)
    if(result.isSuccess) {
        yield put(TalkRoomActions.addUsersToTalkRoom({
            talkRoomId : action.talkRoomId,
            userIds : [...Object.keys(result.data).map(key => result.data[key]["id"])]
        }))
        yield put(UserActions.setUser(...Object.keys(result.data).map(key => result.data[key])))
    }
    if(result.isError) {
        yield put(ErrorCodeActions.execHandleError({errorResult:result.data}))
    }
}

export function* handleAddTalkRoomMember(action) {
    const result = yield call(addMemberToTalkRoom, {talkRoomId:action.talkRoomId, userId:action.userId})
    if(result.isSuccess) {
        alert(`${result.data.name}を追加しました`)
        yield put(UserActions.setUser(result.data))
        yield put(TalkRoomActions.addUsersToTalkRoom({
            talkRoomId : action.talkRoomId,
            userIds : [action.userId]
        }))
    }
    if(result.isFail) {
        alert("そんなユーザーいません")
        yield put(FormErrorActions.setError({
            formName : "userInviteForm",
            errorJson : {
                messages : ["このID,名前の組合わせが存在しません"]
            }
        }))
    }
    if(result.isError) {
        yield put(ErrorCodeActions.execHandleError({errorResult:result.data}))
    }
}





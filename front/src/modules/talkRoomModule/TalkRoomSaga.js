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

//トークルームの管理者取得
const getTalkRoomAuthor = (
    talkRoomId
) => {
    return DataAccessor.get({
        url:`${process.env.REACT_APP_BACKEND_ADDRESS}/talk_rooms/${talkRoomId}/users/author`
    })
}


//トークルームのメンバー取得
const getTalkRoomMembers = (
    talkRoomId,
) => {
    return DataAccessor.get({
        url : `${process.env.REACT_APP_BACKEND_ADDRESS}/talk_rooms/${talkRoomId}/users/member`
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
    }
    if(result.isError) {
        yield put(ErrorCodeActions.execHandleError({errorResult:result.data}))
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
        yield put(ErrorCodeActions.execHandleError({errorResult:talkRoomResult.data}))
    }
}

export function* handleGetRelatedUsers() {
    const relatedUsers = yield call(() => DataAccessor.get({url:`${process.env.REACT_APP_BACKEND_ADDRESS}/talk_rooms/users`}))
    yield put(UserActions.setUser(...relatedUsers.data))
}

export function* handleAddTalkRoom(action) {
    const addTalkRoomResult = yield call(createTalkRoom, {
        title       : action.title,
        description : action.description,
        authorId    : action.authorId
    })
    if(addTalkRoomResult.isSuccess) {
        alert(`「${addTalkRoomResult.data.title}」を追加しました`)
        yield put(TalkRoomActions.addTalkRoom(addTalkRoomResult.data))
    }
    if(addTalkRoomResult.isFail) {
        alert('トークルームを追加できませんでした')
        yield put(FormErrorActions.setError({
            formName : "createTalkRoomForm",
            errorJson : addTalkRoomResult.data
        }))
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
        yield put(FormErrorActions.setError({
            formName : "updateTalkRoomForm",
            errorJson : updateTalkRoomResult.data
        }))
    }
    if(updateTalkRoomResult.isError) {
        yield put(ErrorCodeActions.execHandleError({errorResult:updateTalkRoomResult.data}))
    }
}

export function* handleDeleteTalkRoom(action) {
    const deleteTalkRoomResult = yield call(deleteTalkRoom, action.talkRoomId)
    if(deleteTalkRoomResult.isSuccess) {
        alert('削除しました')
        yield put(TalkRoomActions.deleteTalkRoom({
            talkRoomId : action.talkRoomId
        }))
    }
    if(deleteTalkRoomResult.isFail) {
        alert(`削除できませんでした`)
    }
    if(deleteTalkRoomResult.isError) {
        yield put(ErrorCodeActions.execHandleError({errorResult:deleteTalkRoomResult.data}))
    }
}

export function* handleGetTalkRoomAuthor(action) {
    const result = yield call(getTalkRoomAuthor, action.talkRoomId)
    if(result.isSuccess) {
        yield put(UserActions.setUser(result.data))
    }
    if(result.isError) {
        yield put(ErrorCodeActions.execHandleError({errorResult:result.data}))
    }
}

export function* handleGetTalkRoomMembers(action) {
    const result = yield call(getTalkRoomMembers, action.talkRoomId)
    if(result.isSuccess) {
        yield put(TalkRoomActions.addMembersToTalkRoom({
            talkRoomId : action.talkRoomId,
            userIds : [...Object.keys(result.data).map(key => result.data[key]["id"])]
        }))
        yield put(UserActions.setUser(...result.data))
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
        yield put(TalkRoomActions.addMembersToTalkRoom({
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





import DataAccessor from "../DataAccessor"
import TalkRoomActions from "./TalkRoomActions"
import { put, call, fork, actionChannel} from "redux-saga/effects"

import UserActions from "../userModule/UserActions"
import FormErrorActions from "../FormErrorModule/FormErrorActions"
import ErrorCodeActions from "../errorCodeModule/ErrorCodeActions"
import NewsActions from "../newsModule/NewsActions"
import FormNames from "../FormErrorModule/FormNames"
import NewsTypes from "../newsModule/NewsTypes"

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

const createTalkRoomFormData = ({
    ...params
}) => {
    return Object.keys(params).reduce((formData, paramName) => {
        formData.append(`talkroom[${paramName}]`, params[paramName])
        return formData
    }, new FormData())
}


const createTalkRoom = ({
    ...talkRoomParams
}) => {
    const formData = createTalkRoomFormData(talkRoomParams)
    return DataAccessor.post({
        url       : `${process.env.REACT_APP_BACKEND_ADDRESS}/talk_rooms`,
        parameter : formData,
        headers : {
            'Content-Type' : 'multipart/form-data'
        }
    })
}

const updateTalkRoom = ({
    ...talkRoomParams
}) => {
    const formData = createTalkRoomFormData(talkRoomParams)
    return DataAccessor.put({
        url : `${process.env.REACT_APP_BACKEND_ADDRESS}/talk_rooms/${talkRoomParams.id}`,
        parameter : formData,
        headers : {
            'Content-Type' : 'multipart/form-data'
        }
    })
}

const deleteTalkRoom = (talkRoomId) => {
    return DataAccessor.delete({
        url : `${process.env.REACT_APP_BACKEND_ADDRESS}/talk_rooms/${talkRoomId}`
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
export function* handleGetOwnRooms() {
    const result = yield call(getOwnRooms)
    if(result.isSuccess) {
        const talkRooms = Object.values(result.data).reduce((result, talkRoom) => {
            talkRoom.user_ids = talkRoom.users.map(user=>user.id)
            delete talkRoom.users
            return [...result, talkRoom]
        }, [])
        yield put(TalkRoomActions.setOwnRooms(talkRooms))
    }
    if(result.isError) {
        yield put(ErrorCodeActions.execHandleError({errorResult:result.data}))
    }
}

export function* handleGetJoinedTalkRooms() {
    const result = yield call(getJoinRooms)
    const talkRooms = Object.values(result.data).reduce((result, talkRoom) => {
        talkRoom.user_ids = talkRoom.users.map(user=>user.id)
        delete talkRoom.users
        return [...result, talkRoom]
    }, [])
    if(result.isSuccess) {
        yield put(TalkRoomActions.setJoinedRooms(talkRooms))
    }
    if(result.isFail) {
        alert('トークルームを取得できませんでした')
    }
    if(result.isError) {
        yield put(ErrorCodeActions.execHandleError({errorResult:result.data}))
    }
}

export function* handleAddTalkRoom(action) {
    const {type, authorId, ...params} = {...action}
    const addTalkRoomResult = yield call(createTalkRoom, {
        author_id : authorId,
        ...params
    })
    if(addTalkRoomResult.isSuccess) {
        alert(`「${addTalkRoomResult.data.title}」を追加しました`)
        yield put(TalkRoomActions.addTalkRoom(addTalkRoomResult.data))
    }
    if(addTalkRoomResult.isFail) {
        alert('トークルームを追加できませんでした')
        yield put(FormErrorActions.setError({
            formName : FormNames.createTalkRoomForm,
            errorJson : addTalkRoomResult.data
        }))
    }
    if(addTalkRoomResult.isError) {
        yield put(ErrorCodeActions.execHandleError({errorResult:addTalkRoomResult.data}))
    }
}

export function* handleUpdateTalkRoom(action) {
    const {type, ...params} = {...action}
    const updateTalkRoomResult = yield call(updateTalkRoom, {
        ...params
    })
    if(updateTalkRoomResult.isSuccess) {
        yield put(TalkRoomActions.updateTalkRoom({
            talkRoomId : updateTalkRoomResult.data.id,
            ...updateTalkRoomResult.data
        }))
    }
    if(updateTalkRoomResult.isFail) {
        alert(`${action.talkRoom.title}の更新ができませんでした`)
        yield put(FormErrorActions.setError({
            formName : FormNames.updateTalkRoomForm,
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

export function* handleAddTalkRoomMember(action) {
    const {type, authorId, talkRoomId, userId} = {...action}
    const result = yield call(addMemberToTalkRoom, {talkRoomId, userId})
    if(result.isSuccess) {
        alert(`${result.data.name}を追加しました`)
        yield put(UserActions.setUser(result.data))
        yield put(TalkRoomActions.addMembersToTalkRoom({
            authorId,
            talkRoomId,
            userIds : [userId]
        }))
    }
    if(result.isFail) {
        alert("そんなユーザーいません")
        yield put(FormErrorActions.setError({
            formName : FormNames.userInviteForm,
            errorJson : {
                messages : ["このID,名前の組合わせが存在しません"]
            }
        }))
    }
    if(result.isError) {
        yield put(ErrorCodeActions.execHandleError({errorResult:result.data}))
    }
}

export function* handleRemoveUsersFromTalkRoom(action) {
    const {type, authorId, talkRoomId, userIds} = {...action}
    const result = yield call(DataAccessor.delete, {
        url : `${process.env.REACT_APP_BACKEND_ADDRESS}/talk_rooms/${talkRoomId}/users/destroy_multiple`,
        parameter : {
            ids: userIds
        }
    })
    if(result.isSuccess) {
        alert("ユーザーをトークルームから追い出しました")
        yield put(TalkRoomActions.removeUsersFromTalkRoom({
            authorId,
            userIds,
            talkRoomId
        }))
    }
    if(result.isFail) {
        alert('削除できませんでした')
    }
    if(result.isError) {
        yield put(ErrorCodeActions.execHandleError({errorResult:result.data}))
    }
}

export function* handleSearchOwnRooms(action) {
    const {type, q} = {...action}
    const result = yield call(DataAccessor.post, {
        url : `${process.env.REACT_APP_BACKEND_ADDRESS}/talk_rooms/search_own`,
        parameter : {
            q
        }
    })
    if(result.isSuccess) {
        yield put(TalkRoomActions.setOwnRooms(result.data))
    }
}

export function* handleSearchJoinRooms(action) {
    const {type, q} = {...action}
    const result = yield call(DataAccessor.post, {
        url : `${process.env.REACT_APP_BACKEND_ADDRESS}/talk_rooms/search_join`,
        parameter : {
            q
        }
    })
    if(result.isSuccess) {
        yield put(TalkRoomActions.setJoinedRooms(result.data))
    }
}





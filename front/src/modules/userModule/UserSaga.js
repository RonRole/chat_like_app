import LogActions from "../logModule/LogActions"
import DataAccessor from "../DataAccessor"
import { call, put, take } from "redux-saga/effects"
import UserActions from "./UserActions"

import { createCurrentUserReceiveChannel, createMessageReceiveChannel } from "../socketClient"

import FormErrorActions from "../FormErrorModule/FormErrorActions"
import ErrorCodeActions from "../errorCodeModule/ErrorCodeActions"

const getSelf = () => {
    return DataAccessor.get(({
        url:`${process.env.REACT_APP_BACKEND_ADDRESS}/users/self`
    }))
}

/**
 * Tips
 * FormDataで入れ子のデータ構造を送る場合,
 * formData.append("hoge[fuga]", foobar)
 * という書き方でいける
 */
const createUser = (
    userParams
) => {
    const formData = Object.keys(userParams).reduce((formData,paramName) => {
        formData.append(`user[${paramName}]`, userParams[paramName])
        return formData
    }, new FormData())
    return DataAccessor.post({
        url : `${process.env.REACT_APP_BACKEND_ADDRESS}/users`,
        parameter : formData,
        headers : {
            'Content-Type' : 'multipart/form-data'
        }
    })
}

const updateUser = (
    userParams
) => {
    const formData = Object.keys(userParams).reduce((formData,paramName) => {
        formData.append(`user[${paramName}]`, userParams[paramName])
        return formData
    }, new FormData())
    return DataAccessor.put({
        url : `${process.env.REACT_APP_BACKEND_ADDRESS}/users/${userParams.id}`,
        parameter : formData,
        headers : {
            'Content-Type' : 'multipart/form-data'
        }
    })
}

const searchUser = ({
    userSelfId,
    userName
}) => {
    return DataAccessor.get({
        url : `${process.env.REACT_APP_BACKEND_ADDRESS}/users/search?self_id=${userSelfId}&name=${userName}`
    })
}

export function* handleGetRelatedUsers() {
    const relatedUsers = yield call(() => DataAccessor.get({url:`${process.env.REACT_APP_BACKEND_ADDRESS}/users`}))
    yield put(UserActions.setUser(...relatedUsers.data))
}

export function* handleReceiveMessage() {
    const channel = yield call(createMessageReceiveChannel)
    //channelがemitするたびに起動
    while(true) {
        const response = yield take(channel)
        yield put(UserActions.setUser(response.user))
    }
}


//saga
export function* handleGetSelf() {
    const result = yield call(getSelf)
    if(result.isSuccess) {
    }
}


export function* handleCreateUser(action) {
    const result = yield call(createUser, action.userParams)
    if(result.isSuccess) {
        yield put(LogActions.execLogin({
            session: {
                name : action.userParams.name,
                password : action.userParams.password
            },
            history : action.history,
        }))
    }
    if(result.isFail) {
        alert("ユーザーを作成できませんでした")
        yield put(FormErrorActions.setError({
            formName : "signUpForm",
            errorJson : result.data
        }))
    }
    if(result.isError) {
        yield put(ErrorCodeActions.execHandleError({errorResult:result.data}))
    }
}

export function* handleUpdateUser(action) {
    const result = yield call(updateUser, action.userParams)
    if(result.isSuccess) {
        alert('プロフィールを更新しました。')
        yield put(UserActions.setUser(result.data))
        yield put(LogActions.login(result.data))
    }
    if(result.isFail) {
        yield put(FormErrorActions.setError({
            formName: 'updateUserForm',
            errorJson : result.data
        }))
    }
    if(result.isError) {
        yield put(ErrorCodeActions.execHandleError({errorResult:result.data}))
    }
}

export function* handleGetCurrentRoomUsers() {
    const channel = yield call(createCurrentUserReceiveChannel)
    while(true) {
        const response = yield take(channel)
        yield put(UserActions.setUser(...Object.values(response.users)))
    }
}

export function* handleExecSearchUser(action) {
    const searchResult = yield call(searchUser, {
        userSelfId : action.userSelfId,
        userName : action.userName
    })
    if(searchResult.isSuccess) {
        yield put(UserActions.setSearchedUsers(searchResult.data))
    }
    if(searchResult.isFail) {
        alert("ユーザーが見つかりませんでした")
        yield put(UserActions.setSearchedUsers())
        yield put(FormErrorActions.setError({
            formName : "userInviteForm",
            errorJson : searchResult.data
        }))
    }
    if(searchResult.isError) {
        yield put(ErrorCodeActions.execHandleError({errorResult:searchResult.data}))
    }
}

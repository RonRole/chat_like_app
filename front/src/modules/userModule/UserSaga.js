import LogActions from "../logModule/LogActions"
import DataAccessor from "../DataAccessor"
import { call, put, take } from "redux-saga/effects"
import handleError from "../ErrorHandler"
import UserActions from "./UserActions"

import { createCurrentUserReceiveChannel } from "../socketClient"

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
    const formData = new FormData()
    Object.keys(userParams).forEach(paramName => {
        formData.append(`user[${paramName}]`, userParams[paramName])
    })
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
    const formData = new FormData()
    Object.keys(userParams).forEach(paramName => {
        formData.append(`user[${paramName}]`, userParams[paramName])
    }) 
    return DataAccessor.put({
        url : `${process.env.REACT_APP_BACKEND_ADDRESS}/users/${userParams.id}`,
        parameter : formData,
        headers : {
            'Content-Type' : 'multipart/form-data'
        }
    })
}

const searchUser = ({
    userId,
    userName
}) => {
    return DataAccessor.get({
        url : `${process.env.REACT_APP_BACKEND_ADDRESS}/users/${userId}?name=${userName}`
    })
}



//saga
export function* handleGetSelf(action) {
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
        yield put(UserActions.setUser(...Object.keys(response.users).map(key => response.users[key])))
    }
}

export function* handleExecSearchUser(action) {
    const searchResult = yield call(searchUser, {
        userId : action.userId,
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

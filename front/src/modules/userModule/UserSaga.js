import LogActions from "../logModule/LogActions"
import DataAccessor from "../DataAccessor"
import { call, put, all, takeEvery } from "redux-saga/effects"
import handleError from "../ErrorHandler"
import { UserActionTypes } from "./UserActions"
import LoadingActions from "../loadingModule/LoadingActions"

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
    }
    if(result.isError) {
        handleError({
            error : result.data,
            history : action.history
        })
    }
}

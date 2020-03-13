import LogActions, { LogActionTypes } from "./LogActions"
import { put, take, call, all, fork, takeEvery, takeLatest } from "redux-saga/effects"
import DataAccessor from "../DataAccessor"
import handleError from "../ErrorHandler"

//saga
export function* handleGetDefLoginStart(action) {
    const accessResult = yield call(DataAccessor.get, {
        url : `${process.env.REACT_APP_BACKEND_ADDRESS}/login`
    })

    if(accessResult.isSuccess) {
        yield put(LogActions.login(accessResult.data))
    }
    else {
        handleError({
            error   : accessResult.data,
            history : action.history
        })   
    }
}

export function* handleGetExecLoginStart(loginAction) {
    //初期処理
    const accessResult = yield call(DataAccessor.post,{
        url       :`${process.env.REACT_APP_BACKEND_ADDRESS}/login`,
        parameter :loginAction.session,
    })
    if(accessResult.isSuccess){
        alert(`ようこそ${accessResult.data.name}さん!`)
        yield put(LogActions.login(accessResult.data))
        loginAction.history.push('/home')
    }
    if(accessResult.isFail){
        alert("ログインに失敗しました")
        //yield put(LogActions.logout())
        //yield put(LogActions.loginFailed(accessResult.data))
    }
    if(accessResult.isError) {
        handleError({
            error   : accessResult.data,
            history : loginAction.history
        })
    }
    loginAction.then();
}

export function* handleGetLogoutStart(action) {
    yield put(LogActions.logout());
}

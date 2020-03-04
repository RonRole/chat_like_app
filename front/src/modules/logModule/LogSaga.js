import LogActions, { LogActionTypes } from "./LogActions"
import { put, take, call, all, fork, takeEvery, takeLatest } from "redux-saga/effects"
import DataAccessor from "../DataAccessor"
import ErrorHandler from "../ErrorHandler"

//saga
function* handleGetDefLoginStart(action) {
    const accessResult = yield call(DataAccessor.get, {
        url : `${process.env.REACT_APP_BACKEND_ADDRESS}/login`
    })
    if(accessResult.isSuccess) {
        yield put(LogActions.login(accessResult.data))
    }
    else {
        const errorObject = ErrorHandler({
            error   : accessResult.data,
            history : action.history
        })
        alert(errorObject.message)
    }
    action.then()
}

function* handleGetExecLoginStart(loginAction) {
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
        yield put(LogActions.logout())
        yield put(LogActions.loginFailed(accessResult.data))
    }
    if(accessResult.isError) {
        const errorObject = ErrorHandler({
            error   : accessResult.data,
            history : loginAction.history
        })
        alert(errorObject.message)
    }
    loginAction.then();

}

function* handleGetLogoutStart(action) {
    const logoutAction = yield take(LogActionTypes.LOG_OUT)
    yield put(logoutAction);

}

export　default function* logSaga() {
    yield all([
        takeEvery(LogActionTypes.DEF_LOG_IN, handleGetDefLoginStart),
        takeEvery(LogActionTypes.EXEC_LOG_IN,handleGetExecLoginStart),
        takeLatest(LogActionTypes.LOG_OUT,handleGetLogoutStart),
    ])
}
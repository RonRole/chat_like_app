import LogActions, { LogActionTypes } from "./LogActions"
import { put, take, call, all, fork, takeEvery, takeLatest } from "redux-saga/effects"
import DataAccessor from "../DataAccessor"
import handleError from "../ErrorHandler"
import LoadingActions from "../loadingModule/LoadingActions"

//saga
function* handleGetDefLoginStart(action) {
    yield put(LoadingActions.startLoading())
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
    yield put(LoadingActions.finishLoading())
}

function* handleGetExecLoginStart(loginAction) {
    yield put(LoadingActions.startLoading())
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
        const errorObject = handleError({
            error   : accessResult.data,
            history : loginAction.history
        })
        alert(errorObject.message)
    }
    loginAction.then();
    yield put(LoadingActions.finishLoading())
}

function* handleGetLogoutStart(action) {
    const logoutAction = yield take(LogActionTypes.LOG_OUT)
    yield put(logoutAction());
}

export　default function* logSaga() {
    yield all([
        takeEvery(LogActionTypes.DEF_LOG_IN, handleGetDefLoginStart),
        takeEvery(LogActionTypes.EXEC_LOG_IN,handleGetExecLoginStart),
        takeEvery(LogActionTypes.LOG_OUT,handleGetLogoutStart),
    ])
}
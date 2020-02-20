import LogActions, { LogActionTypes } from "./LogActions"
import { put, take, call, all, fork } from "redux-saga/effects"
import DataAccessor from "../DataAccessor"

//saga
function* handleGetLoginStart() {
    while(true) {
        const loginAction = yield take(LogActionTypes.TRY_TO_LOG_IN)
        //初期処理
        const accessResult = yield call(DataAccessor.post,{
            url       :`${process.env.REACT_APP_BACKEND_ADDRESS}/login`,
            parameter :loginAction.session,

        })
        if(accessResult.isSuccess){
            alert(`ようこそ${accessResult.data.name}さん!`)
            yield put(LogActions.login())
            loginAction.ifSuccess()
        }
        if(accessResult.isFail){
            alert("ログインに失敗しました")
            yield put(LogActions.logout())
            loginAction.ifFail()
        }
        if(accessResult.isError) {
            alert(`エラーが発生しました ${accessResult.data}`)
        }
        loginAction.then();
    }
}

function* handleGetLogoutStart() {
    while(true) {
        const logoutAction = yield take(LogActionTypes.LOG_OUT)
        yield put(logoutAction);
    }
}

export　default function* logSaga() {
    yield all([
        handleGetLoginStart(),
        handleGetLogoutStart()
    ])
}
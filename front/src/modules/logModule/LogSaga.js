import { LogActionTypes } from "./LogActions"
import { put, take, call } from "redux-saga/effects"
import { LogActions } from "../LoginModule"

//saga
const confirmLogin = (infoToLogin) => {
    return Axios.post(`${process.env.REACT_BACKEND_ADDRESS}/login`, infoToLogin)
                .then(response => {
                    return {
                        result:"success",
                        data  :response.data  
                    }
                })
                .catch(error => {
                    return {
                        result : "error",
                        data   : error
                    }
                })
} 

function* handleGetLoginStart() {
    while(true) {
        const loginAction = yield take(LogActionTypes.TRY_TO_LOG_IN)
        //初期処理
        const loginResult = yield call(confirmLogin, loginAction.session)
        if(loginResult.result === 'error') {
            alert(`エラーが発生しました ${loginResult.data}`)
        }
        else if(loginResult.data.isLoggedIn){
            alert(`ようこそ${loginResult.data.name}さん!`)
            yield put(loginAction)
            yield put(LogActions.login())
            loginAction.ifSuccess()
        }
        else {
            alert("ログインに失敗しました")
            yield put(LogActions.logout())

        }
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
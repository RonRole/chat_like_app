import LogActions, { LogActionTypes } from "./LogActions"
import { put, call} from "redux-saga/effects"
import DataAccessor from "../DataAccessor"
import FormErrorActions from "../FormErrorModule/FormErrorActions"
import UserActions from "../userModule/UserActions"
import ErrorCodeActions from "../errorCodeModule/ErrorCodeActions"
import FrontAddress from "../../address"
import FormNames from "../FormErrorModule/FormNames"

//saga
export function* handleGetDefLoginStart() {
    const accessResult = yield call(DataAccessor.get, {
        url : `${process.env.REACT_APP_BACKEND_ADDRESS}/login`
    })
    if(accessResult.isSuccess) {
        yield put(UserActions.setUser(accessResult.data))
        yield put(LogActions.login(accessResult.data))
    }
    else {
        yield put(ErrorCodeActions.execHandleError({errorResult:accessResult.data}))
    }
    yield put(LogActions.finishDefLogin())
}

export function* handleGetExecLoginStart(loginAction) {
    //初期処理
    const accessResult = yield call(DataAccessor.post,{
        url       :`${process.env.REACT_APP_BACKEND_ADDRESS}/login`,
        parameter :loginAction.session,
    })
    if(accessResult.isSuccess){
        alert(`ようこそ${accessResult.data.name}さん!`)
        yield put(UserActions.setUser(accessResult.data))
        yield put(LogActions.login(accessResult.data))
        loginAction.history.push(FrontAddress.home)
    }
    if(accessResult.isFail){
        alert("ログインに失敗しました")
        yield put(FormErrorActions.setError({
            formName : FormNames.loginForm,
            errorJson: accessResult.data
        }))
    }
    if(accessResult.isError) {
        yield put(ErrorCodeActions.execHandleError({errorResult:accessResult.data}))
    }
    loginAction.then();
}

export function* handleGetExecLogoutStart(logoutAction) {
    const result = yield call(DataAccessor.delete, {
        url :`${process.env.REACT_APP_BACKEND_ADDRESS}/logout`
    })
    if(result.isSuccess) {
        yield put(LogActions.logout());
        alert('ログアウトしました')
        logoutAction.history.push(FrontAddress.signinå)
    }
    if(result.isError) {
        yield put(ErrorCodeActions.execHandleError({
            errorResult:result.data,
        }))
    }
}

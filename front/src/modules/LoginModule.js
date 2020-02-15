import {takeLatest, put, call, take, takeEvery, all, putResolve} from 'redux-saga/effects'
import Axios from 'axios'
import { useLayoutEffect } from 'react'
import history from './HistoryModule'

//actions
const LogActionTypes = {
    TRY_TO_LOG_IN:"TRY_TO_LOG_IN",
    DEF_LOG_IN:"DEF_LOG_IN",
    LOG_IN:"LOG_IN",
    LOG_OUT:"LOG_OUT"
}

//action creators
export const LogActions = {
    tryToLogin:({
        session  ={name:"",password:""},
        ifSuccess=()=>console.log("login success"),
        ifFail   =()=>console.log("login failed"),
        then     =()=>console.log("tryed to login")
    }) => {
        return {
            type     :LogActionTypes.TRY_TO_LOG_IN,
            session  :session,
            ifSuccess:ifSuccess,
            ifFail   :ifFail,
            then     :then
        }
    },
    defLogin:({
        session  ={name:"",password:""},
    }) => {
        return {
            type:LogActionTypes.LOG_IN,
            session:session,
        }
    },
    login: () => {
        return {
            type     :LogActionTypes.LOG_IN,
        }
    },
    logout: () => {
        return {
            type:LogActionTypes.LOG_OUT
        }
    }
}

const confirmLogin = (infoToLogin) => {
    return Axios.post('http://localhost:4000/login', infoToLogin)
                .then(response => {
                    return {result:"success",data: response.data}
                })
                .catch(error => {
                    return {result:"error", data:error};
                })
}

//saga
function* handleGetLoginStart() {
    while(true) {
        const loginAction = yield take(LogActionTypes.TRY_TO_LOG_IN)
        //初期処理
        const loginResult = yield call(confirmLogin, loginAction.session)
        if(loginResult.result === "error"){
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
            loginAction.ifFail()
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

export function* logSaga() {
    yield all([
        handleGetLoginStart(),
        handleGetLogoutStart()
    ])
}

//Reducers
const initialState = {
    //ログインを試みたかどうか
    tryedToLogin: false,
    //ログイン状態
    isLoggedIn  : false,
}

export const logReducer = (state = initialState, action) => {
    switch(action.type){
        case LogActionTypes.TRY_TO_LOG_IN: {
            return {
                ...state,
                tryedToLogin:true
            }
        }
        case LogActionTypes.LOG_IN: {
            return {
                ...state,
                isLoggedIn:true
            }
        }

        case LogActionTypes.LOG_OUT: {
            return {
                ...state,
                isLoggedIn:false
            }
        }
        default: {
            return state;
        }
    }
}
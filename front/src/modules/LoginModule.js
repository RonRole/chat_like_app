import {takeLatest, put, call, take, takeEvery, all, putResolve} from 'redux-saga/effects'
import Axios from 'axios'
import { useLayoutEffect } from 'react'

//actions
const LogActionTypes = {
    DEF_LOG_IN:"DEF_LOG_IN",
    LOG_IN:"LOG_IN",
    LOG_OUT:"LOG_OUT"
}

//action creators
export const LogActions = {
    defLogin:({
                session  ={name:"",password:""},
                ifSuccess=()=>console.log("login success"),
                ifFail   =()=>console.log("login failed")
             }) => {
        return {
            type:LogActionTypes.LOG_IN,
            session:session,
            ifSuccess:ifSuccess,
            ifFail:ifFail
        }
    },
    login: ({
                session  ={name:"",password:""},
                ifSuccess=()=>console.log("login success"),
                ifFail   =()=>console.log("login failed")
            }) => {
        return {
            type:LogActionTypes.LOG_IN,
            session:session,
            ifSuccess:ifSuccess,
            ifFail:ifFail
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
                    return response.data
                })
                .catch(error => {
                    return error;
                })
}

//saga
function* handleGetLoginStart() {
    while(true) {
        const loginAction = yield take(LogActionTypes.LOG_IN)
        //初期処理
        const loginResult = yield call(confirmLogin, loginAction.session)
        if(loginResult && loginResult.isLoggedIn){
            loginAction.ifSuccess(loginResult)
            yield put(LogActions.login({}))
        }
        else {
            loginAction.ifFail(loginResult)
            yield put(LogActions.logout())
        }
    }
}

function* handleGetLogoutStart() {
    while(true) {
        yield take(LogActionTypes.LOG_OUT)
        yield put(LogActions.logout());
    }
}

export function* logSaga() {
    yield all([
        handleGetLoginStart(),
        handleGetLogoutStart()
    ])
}

const initialState = {
    isLoggedIn: false
}

export const logReducer = (state = initialState, action) => {
    switch(action.type){
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
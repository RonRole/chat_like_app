import {takeLatest, put, call, take, takeEvery, all} from 'redux-saga/effects'
import Axios from 'axios'


//actions
const LogActionTypes = {
    LOG_IN:"LOG_IN",
    LOG_OUT:"LOG_OUT"
}

//action creators
export const LogActions = {
    login: () => {
        return {
            type:LogActionTypes.LOG_IN
        }
    },
    logout: () => {
        return {
            type:LogActionTypes.LOG_OUT
        }
    }
}

//saga
function* handleGetLoginStart() {
    while(true) {
        yield take(LogActionTypes.LOG_IN)
        console.log(`${LogActionTypes.LOG_IN} is called!`)
        yield put(LogActions.login());
    }
}

function* handleGetLogoutStart() {
    while(true) {
        yield take(LogActionTypes.LOG_OUT)
        console.log("KENGO")
        yield put(LogActions.logout());
    }
}

export function* logSaga() {
    yield all([
        handleGetLoginStart(),
        handleGetLogoutStart()
    ])
}

    

//reducer
const initialState = {
    isLoggedIn:false,
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
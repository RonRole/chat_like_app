import { LogActionTypes } from "./LogActions"
import createReducerFactory from "../CreateReducerFactory"

//Reducers
const initialState = {
    //セッションによるログインを行なったかどうか
    defaultLoginFinished : false,
    //ログイン状態
    isLoggedIn  : false,
}

const actionHandler = {}
actionHandler[LogActionTypes.TRY_LOG_IN] = (state) => {
    return {
        ...state
    }
}
actionHandler[LogActionTypes.FINISH_DEF_LOG_IN] = (state) => {
    return {
        ...state,
        defaultLoginFinished : true
    }
}
actionHandler[LogActionTypes.LOG_IN] = (state, action) => {
    return {
        ...state,
        isLoggedIn:action.loginUser,
        loginErrorMessages : []
    }
}
actionHandler[LogActionTypes.LOG_OUT] = (state) => {
    return {
        ...state,
        isLoggedIn:false,
        loginErrorMessages : []
    }
}

const creatReducer = createReducerFactory(initialState, actionHandler)

export default {
    creatReducer
}
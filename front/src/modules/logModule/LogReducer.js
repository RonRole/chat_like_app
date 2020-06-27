import { LogActionTypes } from "./LogActions"
import createReducerFactory from "../CreateReducerFactory"

//Reducers
const initialState = {
    //セッションによるログインを行なったかどうか
    defaultLoginFinished : false,
    //ログインしているユーザー
    loginUser : null,
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
        loginUser:action.loginUser,
        loginErrorMessages : []
    }
}
actionHandler[LogActionTypes.LOG_OUT] = (state) => {
    return {
        ...state,
        loginUser:false,
        loginErrorMessages : []
    }
}

const creatReducer = createReducerFactory(initialState, actionHandler)

export default {
    creatReducer
}
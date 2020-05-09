import { ErrorCodeActionTypes } from "./ErrorCodeActions"
import createReducerFactory from "../CreateReducerFactory"

const initialState = {}

const errorCodeHandler = {}
errorCodeHandler[401] = (state) => {
    return {
        ...state,
        isLoggedIn : false
    }
}
const actionHandler = {}
actionHandler[ErrorCodeActionTypes.HANDLE_ERROR_CODE] = (state, action) => {
    const errorHandler = errorCodeHandler[action.errorCode]
    if(errorHandler) {
        return errorHandler(state)
    }
    return state
}


export default {
    createReducer : createReducerFactory(initialState, actionHandler)
}
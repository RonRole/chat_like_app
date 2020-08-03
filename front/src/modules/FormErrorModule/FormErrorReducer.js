import { FormErrorActionTypes } from "./FormErrorActions"
import { LogActionTypes } from "../logModule/LogActions"
import createReducerFactory from "../CreateReducerFactory"
import FormNames from "./FormNames"


const initialState = Object.keys(FormNames).reduce((result, key) => {
    result[key] = {
        message:[]
    }
    return result
}, {})

initialState.default = {
    "formName" : {
        "paramName" : []
    }
}

const actionHandler = {}
actionHandler[LogActionTypes.LOG_IN] = () => {
    return initialState
}

actionHandler[FormErrorActionTypes.SET_ERROR] = 
actionHandler[FormErrorActionTypes.CLEAR_ERROR_BY_NAME] = (state, action) => {
    state[action.formName] = action.errorJson
    return {
        ...state
    }
}

const createReducer = createReducerFactory(initialState, actionHandler)

export default {
    createReducer 
}
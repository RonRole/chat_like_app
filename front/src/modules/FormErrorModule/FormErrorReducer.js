import { FormErrorActionTypes } from "./FormErrorActions"
import { LogActionTypes } from "../logModule/LogActions"
import createReducerFactory from "../CreateReducerFactory"


const initialState = {

}

initialState.default = {
    "formCategory" : {
        "formName" : ""
    }
}

const getErrorsOf = (state) => (formCategory) => (formName) => {
    return (state["formErrors"][formCategory] || [])[formName] || []
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
    getErrorsOf,
    createReducer 
}
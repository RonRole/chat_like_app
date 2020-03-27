import { FormErrorActionTypes } from "./FormErrorActions"
import { LogActionTypes } from "../logModule/LogActions"


const initialState = {}

const getErrorsOf = (state) => (formCategory) => (formName) => {
    return (state["formErrors"][formCategory] || [])[formName] || []
}

const createReducer = (state = initialState, action) => {
    switch(action.type) {
        case LogActionTypes.LOG_IN: {
            return initialState
        }
        case FormErrorActionTypes.SET_ERROR :
        case FormErrorActionTypes.CLEAR_ERROR_BY_NAME : {
            state[action.formName] = action.errorJson
            return {
                ...state
            }
        }
        default : {
            return state
        }
    }
}

export default {
    getErrorsOf,
    createReducer
}
import { FormErrorActionTypes } from "./FormErrorActions"

const initialState = {}

const getErrorsOf = (state) => (formCategory) => (formName) => {
    return (state["formErrors"][formCategory] || [])[formName] || []
}

const createReducer = (state = initialState, action) => {
    switch(action.type) {
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
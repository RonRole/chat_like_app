import { ErrorCodeActionTypes } from "./ErrorCodeActions"

const initialState = {}

const createReducer = (state = initialState, action) => {
    if(action.type !== ErrorCodeActionTypes.HANDLE_ERROR_CODE) {
        return state
    }
    switch(action.errorCode) {
        default : {
            return state
        }
    }
}

export default {
    createReducer
}
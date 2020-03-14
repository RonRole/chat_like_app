import { LoadingActionTypes } from "./LoadingActions"

const initialState = false

const createReducer = (state = initialState, action) => {
    switch(action.type) {
        case LoadingActionTypes.START_LOADING : {
            return true
        }
        case LoadingActionTypes.FINISH_LOADING : {
            return false
        }
        default : {
            return state
        }
    }
}

export default {
    createReducer
}
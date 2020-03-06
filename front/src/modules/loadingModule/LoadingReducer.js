import { LoadingActionTypes } from "./LoadingActions"

const initialState = {
    loading : false
}

const createReducer = (state = initialState, action) => {
    switch(action.type) {
        case LoadingActionTypes.START_LOADING : {
            return {
                ...state,
                loading : true
            }
        }
        case LoadingActionTypes.FINISH_LOADING : {
            return {
                ...state,
                loading : false
            }
        }
        default : {
            return {
                ...state
            }
        }
    }
}

export default {
    createReducer
}
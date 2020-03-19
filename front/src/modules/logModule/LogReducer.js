import { LogActionTypes } from "./LogActions"

//Reducers
const initialState = {
    //ログイン状態
    isLoggedIn  : false,
}

const creatReducer = (state = initialState, action) => {
    switch(action.type){
        case LogActionTypes.TRY_LOG_IN: {
            return {
                ...state
            }
        }
        case LogActionTypes.LOG_IN: {
            return {
                ...state,
                isLoggedIn:action.loginUser,
                loginErrorMessages : []
            }
        }
        case LogActionTypes.LOG_OUT: {
            return {
                ...state,
                isLoggedIn:false,
                loginErrorMessages : []
            }
        }
        default: {
            return state;
        }
    }
}

export default {
    creatReducer
}
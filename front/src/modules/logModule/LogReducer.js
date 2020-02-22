import { LogActionTypes } from "./LogActions"

//Reducers
const initialState = {
    //ログインを試みたかどうか
    tryedToLogin: false,
    //ログイン状態
    isLoggedIn  : false,
}

const creatReducer = (state = initialState, action) => {
    switch(action.type){
        case LogActionTypes.TRY_TO_LOG_IN: {
            return {
                ...state,
                tryedToLogin:true
            }
        }
        case LogActionTypes.LOG_IN: {
            return {
                ...state,
                isLoggedIn:action.loginUser
            }
        }

        case LogActionTypes.LOG_OUT: {
            return {
                ...state,
                isLoggedIn:false
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
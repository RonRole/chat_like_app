import { LogActionTypes } from "./LogActions"

//Reducers
const initialState = {
    //ログインエラー
    loginError : null,
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
                loginError : null
            }
        }
        case LogActionTypes.FAIL_LOG_IN : {
            return {
                ...state,
                loginError:action.data
            }
        }
        case LogActionTypes.LOG_OUT: {
            return {
                ...state,
                isLoggedIn:false,
                loginError : null
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
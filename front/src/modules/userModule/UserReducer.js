import { UserActionTypes } from "./UserActions"
import { LogActionTypes } from "../logModule/LogActions"
import createReducerFactory from "../CreateReducerFactory"

const defaultUser = {
    "id" : 0,
    "name" : "",
    "image" : {
        "url" : "",
        "profile" : {
            "url" : ""
        },
        "thumb" : {
            "url" : ""
        }
    }
}

const initialState = {
    //ユーザー検索時、見つけたユーザーのIDを入れる
    searchedUserIds : [],
    //ID:ユーザー
    default      : defaultUser,
    0            : defaultUser,
}

const actionHandler = {}
actionHandler[LogActionTypes.LOG_IN] = () => {
    return {...initialState}
}
actionHandler[UserActionTypes.ADD_USER] = (state, action) => {
    const newState = action.users.reduce((state, user) => {
        state[user.id] = user
        return state
    }, state)
    return {
        ...state,
        ...newState
    }
}
actionHandler[UserActionTypes.SET_SEARCHED_USER_IDS] = (state, action) => {
    const newState = action.users.reduce((state, user) => {
        state[user.id] = user
        return state
    }, state)
    return {
        ...state,
        ...newState,
        searchedUserIds : action.users.map(user => user.id),
    }
}

const createReducer = createReducerFactory(initialState, actionHandler)
    
export default {
    defaultUser,
    createReducer
}
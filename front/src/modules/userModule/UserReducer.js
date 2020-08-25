import { UserActionTypes } from "./UserActions"
import { LogActionTypes } from "../logModule/LogActions"
import createReducerFactory from "../CreateReducerFactory"

const defaultUser = {
    "id" : 0,
    "name" : "",
    "image" : {
        "url" : `${process.env.PUBLIC_URL}/pictures/default_profile.png`,
        "profile" : {
            "url" : `${process.env.PUBLIC_URL}/pictures/default_profile.png`
        },
        "thumb" : {
            "url" : `${process.env.PUBLIC_URL}/pictures/default_profile.png`
        }
    }
}

const selectUserImage = (user) => {
    if(!user.image) {
        return defaultUser.image
    }
    if(!user.image.url) {
        return defaultUser.image
    }
    return user.image
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
    const {users} = {...action}
    const newState = users.reduce((state, user) => {
        user.image = selectUserImage(user)
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
        user.image = selectUserImage(user)
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
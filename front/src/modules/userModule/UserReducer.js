import { UserActionTypes } from "./UserActions"
import { LogActionTypes } from "../logModule/LogActions"

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
    0            : defaultUser,
}

const createGetUserById = (state) => (id) => {
    return state["users"][id] || defaultUser
}

const createReducer = (state = initialState, action) => {
    switch(action.type) {
        case LogActionTypes.LOG_IN : {
            return initialState
        }
        case UserActionTypes.ADD_USER : {
            action.users.forEach(user => {
                state[user.id] = user
            })
            return {
                ...state
            }
        }
        case UserActionTypes.SET_SEARCHED_USER_IDS : {
            return {
                ...state,
                searchedUserIds : action.userIds
            }
        }
        default : {
            return state
        }
    }
}

export default {
    getUserById: createGetUserById,
    createReducer
}
import { UserActionTypes } from "./UserActions"

const initialState = {
    0:{
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
}

const createGetUserById = (state) => (id) => {
    return state["users"][id] || initialState[0]
}

const createReducer = (state = initialState, action) => {
    switch(action.type) {
        case UserActionTypes.ADD_USER : {
            console.log(action.users)
            action.users.forEach(user => {
                state[user.id] = user
            })
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
    getUserById: createGetUserById,
    createReducer
}
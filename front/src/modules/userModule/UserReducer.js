import { UserActionTypes } from "./UserActions"

const initialState = {
    'signUpFormErrors' : null,
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

const getErrorsFromStateByFormName = (state) => (name) => {
    return (state["users"]["signUpFormErrors"] || {})[name] || []
}

const createReducer = (state = initialState, action) => {
    switch(action.type) {
        case UserActionTypes.ADD_USER : {
            action.users.forEach(user => {
                state[user.id] = user
            })
            return {
                ...state
            }
        }
        case UserActionTypes.SET_CREATE_FORM_ERRORS : 
        case UserActionTypes.CLEAR_CREATE_FORM_ERRORS : {
            state["signUpFormErrors"] = action.errors
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
    getErrorsFromStateByFormName,
    createReducer
}
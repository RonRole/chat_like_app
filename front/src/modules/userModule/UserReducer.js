import { UserActionTypes } from "./UserActions"

const initialState = {
    users : {}
}

const createReducer = (state = initialState, action) => {
    switch(action.type) {
        case UserActionTypes.ADD_USER : {
            action.users.forEach(user => {
                state.users[action.users.id] = user
            })
            console.log(state)
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
    createReducer
}
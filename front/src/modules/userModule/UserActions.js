export const UserActionTypes = {
    EXEC_GET_SELF : "EXEC_GET_SELF",
    EXEC_CREATE_USER : "EXEC_CREATE_USER",
    ADD_USER : "ADD_USER"
}

export default {
    execGetSelf : () => {
        return {
            type: UserActionTypes.EXEC_GET_SELF
        }
    },
    execCreateUser : ({
        history,
        userParams
    }) => {
        return {
            type : UserActionTypes.EXEC_CREATE_USER,
            history: history,
            userParams: userParams
        }
    },

    addUser : (...users) => {
        return {
            type : UserActionTypes.ADD_USER,
            users : users
        }
    }
}
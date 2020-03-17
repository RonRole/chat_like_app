export const UserActionTypes = {
    EXEC_GET_SELF : "EXEC_GET_SELF",
    EXEC_CREATE_USER : "EXEC_CREATE_USER",
    SET_CREATE_FORM_ERRORS : "SET_CREATE_FORM_ERRORS",
    CLEAR_CREATE_FORM_ERRORS : "CLEAR_CREATE_FORM_ERRORS",
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

    setCreateFormErrors : (failResultJson) => {
        return {
            type : UserActionTypes.SET_CREATE_FORM_ERRORS,
            errors : failResultJson
        }
    },

    clearCreateFormErrors : () => {
        return {
            type : UserActionTypes.CLEAR_CREATE_FORM_ERRORS,
            errors : {}
        }
    },

    addUser : (...users) => {
        return {
            type : UserActionTypes.ADD_USER,
            users : users
        }
    }
}
export const UserActionTypes = {
    EXEC_GET_SELF : "EXEC_GET_SELF",
    EXEC_CREATE_USER : "EXEC_CREATE_USER",
    EXEC_UPDATE_USER : "EXEC_UPDATE_USER",
    EXEC_UPDATE_PASSWORD : "EXEC_UPDATE_PASSWORD",
    EXEC_SEARCH_USER : "EXEC_SEARCH_USER",
    SET_CREATE_FORM_ERRORS : "SET_CREATE_FORM_ERRORS",
    CLEAR_CREATE_FORM_ERRORS : "CLEAR_CREATE_FORM_ERRORS",
    SET_SEARCHED_USER_IDS : "SET_SEARCHED_USER",
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
            history,
            userParams,
        }
    },
    execUpdateUser : (
        userParams
    ) => {
        return {
            type: UserActionTypes.EXEC_UPDATE_USER,
            userParams
        }
    },
    execUpdatePassword : ({
        ...passwordParams
    }) => {
        return {
            type : UserActionTypes.EXEC_UPDATE_PASSWORD,
            ...passwordParams
        }
    },
    execSearchUser : ({
        userSelfId,
        userName
    }) => {
        return {
            type : UserActionTypes.EXEC_SEARCH_USER,
            userSelfId,
            userName
        }
    },
    //errorsはJSON
    setCreateFormErrors : (errors) => {
        return {
            type : UserActionTypes.SET_CREATE_FORM_ERRORS,
            errors
        }
    },

    clearCreateFormErrors : () => {
        return {
            type : UserActionTypes.CLEAR_CREATE_FORM_ERRORS,
            errors : {}
        }
    },

    setSearchedUsers : (...users) => {
        return {
            type : UserActionTypes.SET_SEARCHED_USER_IDS,
            users
        }
    },

    clearSearchedUsers : () => {
        return {
            type : UserActionTypes.SET_SEARCHED_USER_IDS,
            users : []
        }
    },

    setUser : (...users) => {
        return {
            type : UserActionTypes.ADD_USER,
            users
        }
    }
}
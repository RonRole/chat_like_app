export const UserActionTypes = {
    EXEC_CREATE_USER : "EXEC_CREATE_USER",
}

export default {
    execCreateUser : ({
        history,
        userParams
    }) => {
        return {
            type : UserActionTypes.EXEC_CREATE_USER,
            history: history,
            userParams: userParams
        }
    }
}
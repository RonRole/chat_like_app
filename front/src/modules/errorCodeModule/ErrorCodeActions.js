export const ErrorCodeActionTypes = {
    EXEC_HANDLE_ERROR_CODE : 'EXEC_HANDLE_ERROR_CODE',
    HANDLE_ERROR_CODE : 'HANDLE_ERROR_CODE'
}

export default {
    execHandleError : ({errorResult, history={}}) => {
        return {
            type: ErrorCodeActionTypes.HANDLE_ERROR_CODE,
            errorCode : errorResult.response.status,
            history
        }
    },
    handleError : errorCode => {
        return {
            type : ErrorCodeActionTypes.EXEC_HANDLE_ERROR_CODE,
            errorCode
        }
    }
}




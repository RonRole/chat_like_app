export const FormErrorActionTypes = {
    SET_ERROR : "SET_ERROR",
    CLEAR_ERROR_BY_NAME : "CLEAR_ERROR_BY_NAME"
}

export default {
    setError : ({
        formName,
        errorJson
    }) => {
        return {
            type:FormErrorActionTypes.SET_ERROR,
            formName,
            errorJson
        }
    },

    clearErrorByName : (formName) => {
        return {
            type:FormErrorActionTypes.CLEAR_ERROR_BY_NAME,
            formName,
            errorJson : {}
        }
    }
}
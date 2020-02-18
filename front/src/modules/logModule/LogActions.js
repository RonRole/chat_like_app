import Axios from "axios"

export const LogActionTypes = {
    TRY_TO_LOG_IN:"TRY_TO_LOG_IN",
    DEF_LOG_IN:"DEF_LOG_IN",
    LOG_IN:"LOG_IN",
    LOG_OUT:"LOG_OUT"
}

export default {
    tryToLogin:({
        session  ={name:"",password:""},
        ifSuccess=()=>console.log("login success"),
        ifFail   =()=>console.log("login failed"),
        then     =()=>console.log("tryed to login")
    }) => {
        return {
            type     :LogActionTypes.TRY_TO_LOG_IN,
            session  :session,
            ifSuccess:ifSuccess,
            ifFail   :ifFail,
            then     :then
        }
    },
    defLogin:({
        session  ={name:"",password:""},
    }) => {
        return {
            type:LogActionTypes.LOG_IN,
            session:session,
        }
    },
    login: () => {
        return {
            type     :LogActionTypes.LOG_IN,
        }
    },
    logout: () => {
        return {
            type:LogActionTypes.LOG_OUT
        }
    }    
}

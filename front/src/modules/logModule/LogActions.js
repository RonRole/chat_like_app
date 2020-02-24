import Axios from "axios"

export const LogActionTypes = {
    EXEC_LOG_IN:"EXEC_LOG_IN",
    DEF_LOG_IN:"DEF_LOG_IN",
    TRY_LOG_IN:"TRY_LOG_IN",
    LOG_IN:"LOG_IN",
    LOG_OUT:"LOG_OUT"
}

export default {
    execLogin:({
        session  ={name:"",password:""},
        history  ={},
        then     =()=>console.log("tryed to login")
    }) => {
        return {
            type     :LogActionTypes.EXEC_LOG_IN,
            session  :session,
            history  :history,
            then     :then
        }
    },
    cookieLogin:({
        history,
        then
    }) => {
        return {
            type    : LogActionTypes.DEF_LOG_IN,
            history : history,
            then    : then
        }
    },
    setLoginTried:() => {
        return {
            type : LogActionTypes.TRY_LOG_IN
        }
    },
    login: (user) => {
        return {
            type     :LogActionTypes.LOG_IN,
            loginUser:user
        }
    },
    logout: () => {
        return {
            type:LogActionTypes.LOG_OUT
        }
    }    
}

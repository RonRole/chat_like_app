export const LogActionTypes = {
    EXEC_DEF_LOG_IN:"EXEC_DEF_LOG_IN",
    FINISH_DEF_LOG_IN:"FINISH_DEF_LOG_IN",
    EXEC_LOG_IN:"EXEC_LOG_IN",
    LOG_IN:"LOG_IN",
    EXEC_LOG_OUT:'EXEC_LOG_OUT',
    LOG_OUT:"LOG_OUT",
}

export default {
    execLogin:({
        session  ={name:"",password:""},
        history  ={},
        then     =()=>console.log("tryed to login")
    }) => {
        return {
            type     :LogActionTypes.EXEC_LOG_IN,
            session,
            history,
            then
        }
    },
    cookieLogin:() => {
        return {
            type    : LogActionTypes.EXEC_DEF_LOG_IN,
        }
    },
    finishDefLogin:() => {
        return {
            type : LogActionTypes.FINISH_DEF_LOG_IN
        }
    },

    login: (loginUser) => {
        return {
            type     :LogActionTypes.LOG_IN,
            loginUser
        }
    },
    execLogout : ({history={}}) => {
        return {
            type : LogActionTypes.EXEC_LOG_OUT,
            history
        }
    },
    logout: () => {
        return {
            type:LogActionTypes.LOG_OUT
        }
    },
}

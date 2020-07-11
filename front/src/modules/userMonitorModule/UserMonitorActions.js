export const UserMonitorActionTypes = {
    ADD_USER_MONITOR_MESSAGE : "ADD_USER_MONITOR_MESSAGE",
    CLEAR_USER_MONITOR_MESSAGE : "CLEAR_USER_MONITOR_MESSAGE"
}

export default {
    addUserMonitorMessage : ({
        message
    }) => {
        return {
            type : UserMonitorActionTypes.ADD_USER_MONITOR_MESSAGE,
            message
        }
    },

    clearUserMonitorMessage : ({
        talkRoomId,
    }) => {
        return {
            type : UserMonitorActionTypes.CLEAR_USER_MONITOR_MESSAGE,
            talkRoomId
        }
    }
}
export const NewsActionTypes = {
    EXEC_FETCH_RECEIVED_NEWS : 'FETCH_RECEIVED_NEWS',
    ADD_RECEIVED_NEWS : 'ADD_RECEIVED_NEWS',
    EXEC_SEND_NEWS : 'SEND_NEWS'
}

export default {
    fetchReceivedNews : () => {
        return {
            type : NewsActionTypes.EXEC_FETCH_RECEIVED_NEWS
        }
    },
    addReceivedNews : (...receivedNews) => {
        return {
            type : NewsActionTypes.ADD_RECEIVED_NEWS,
            receivedNews
        }
    },
    sendNews : ({
        receiverId,
        newsType,
        ...params
    }) => {
        return {
            type : NewsActionTypes.EXEC_SEND_NEWS,
            receiverId,
            newsType,
            ...params
        }
    }
}
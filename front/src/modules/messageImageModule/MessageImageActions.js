
export const MessageImageActionTypes = {
    //for saga
    EXEC_UPLOAD_MESSAGE_IMAGE:'EXEC_UPLOAD_MESSAGE_IMAGE',
    EXEC_FETCH_MESSAGE_IMAGES:'EXEC_FETCH_MESSAGE_IMAGES',
    EXEC_DELETE_MESSAGE_IMAGE:'EXEC_DELETE_MESSAGE_IMAGE',
    //for reducer
    CLEAR_MESSAGE_IMAGE:'CLEAR_MESSAGE_IMAGE',
    ADD_MESSAGE_IMAGE:'ADD_MESSAGE_IMAGE',
    REMOVE_MESSAGE_IMAGE:'REMOVE_MESSAGE_IMAGE'
}

export default {
    execUploadMessageImage : ({
        userId,
        messageImageParams
    }) => {
        return {
            type : MessageImageActionTypes.EXEC_UPLOAD_MESSAGE_IMAGE,
            userId,
            messageImageParams
        }
    },
    execFetchMessageImages : (userId) => {
        return {
            type : MessageImageActionTypes.EXEC_FETCH_MESSAGE_IMAGES,
            userId
        }
    },
    execDeleteMessageImage : ({
        messageImageId,
        userId
    }) => {
        return {
            type : MessageImageActionTypes.EXEC_DELETE_MESSAGE_IMAGE,
            userId,
            messageImageId
        }
    },
    addMessageImage : (...messageImages) => {
        return {
            type : MessageImageActionTypes.ADD_MESSAGE_IMAGE,
            messageImages
        }
    },
    clearMessageImage : () => {
        return {
            type:MessageImageActionTypes.CLEAR_MESSAGE_IMAGE
        }
    },
    removeMessageImage : (messageImageId) => {
        return {
            type: MessageImageActionTypes.REMOVE_MESSAGE_IMAGE,
            messageImageId
        }
    }
}
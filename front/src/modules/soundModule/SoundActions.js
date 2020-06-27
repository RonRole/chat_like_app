export const SoundActionTypes = {
    START_BGM : 'START_BGM', 
    EXEC_UPLOAD_BGM : 'UPLOAD_BGM',
    ADD_BGM : 'ADD_BGM',
}

export default {
    startBgm : ({
        bgmSrcUrl
    }) => {
        return {
            type : SoundActionTypes.START_BGM,
            bgmSrcUrl
        }
    },

    uploadBgm : ({
        userId,
        bgmParams
    }) => {
        return {
            type : SoundActionTypes.EXEC_UPLOAD_BGM,
            userId,
            bgmParams
        }
    },

    addBgms : ({
        bgms
    }) => {
        return {
            type : SoundActionTypes.ADD_BGM,
            bgms
        }
    }
}
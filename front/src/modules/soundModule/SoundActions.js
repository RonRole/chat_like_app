export const SoundActionTypes = {
    //playing
    START_BGM : 'START_BGM', 
    STOP_BGM : "END_BGM",
    CHANGE_CURRENT_BGM_ID : 'CHANGE_CURRENT_BGM_ID',

    //resource
    FETCH_BGMS : 'FETCH_BGMS',
    EXEC_UPLOAD_BGM : 'UPLOAD_BGM',
    ADD_BGM : 'ADD_BGM',

    EXEC_DELETE_BGM : 'EXEC_DELETE_BGM',
    DELETE_BGM : 'DELETE_BGM'
}

export default {
    startBgm : ({
        bgmId,
        bgmSrcUrl
    }) => {
        return {
            type : SoundActionTypes.START_BGM,
            bgmId,
            bgmSrcUrl
        }
    },

    stopBgm : () => {
        return {
            type : SoundActionTypes.STOP_BGM,
        }
    },

    changeCurrentBgmId : ({
        bgmId
    }) => {
        return {
            type : SoundActionTypes.CHANGE_CURRENT_BGM_ID,
            bgmId
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

    fetchBgms : ({
        bgms
    }) => {
        return {
            type :SoundActionTypes.FETCH_BGMS,
            bgms
        }
    },

    addBgms : ({
        bgms
    }) => {
        return {
            type : SoundActionTypes.ADD_BGM,
            bgms
        }
    },

    execDeleteBgm : ({
        bgmId
    }) => {
        return {
            type : SoundActionTypes.EXEC_DELETE_BGM,
            bgmId
        }
    },

    deleteBgm : ({
        bgmId
    }) => {
        return {
            type : SoundActionTypes.DELETE_BGM,
            bgmId
        }
    }
}
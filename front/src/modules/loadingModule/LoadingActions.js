/**
 *　ロード画面の表示などで使う想定。
 *  画面からは呼び出さない想定
 */
export const LoadingActionTypes = {
    START_LOADING:"START_LOADING",
    FINISH_LOADING:"FINISH_LOADING"
}

export default {
    startLoading : () => {
        return {
            type: LoadingActionTypes.START_LOADING
        }
    },

    finishLoading : () => {
        return {
            type: LoadingActionTypes.FINISH_LOADING
        }
    }
}
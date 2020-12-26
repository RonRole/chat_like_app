import createReducerFactory from "../CreateReducerFactory"
import DataAccessor from "../DataAccessor"

const { TranslateModeActionTypes: TranslateModeActions } = require("./TranslateModeActions")

const initialState = {
    simple : {
        modeId : 'simple',
        modeName : 'Simple',
        modeTitle : '【翻訳なし】',
        placeholder : 'メッセージを入力してね',
        description : '翻訳せず、書いたまま送信します。',
        translate :　text => text
    },
    nomlishLv1 : {
        modeId : 'nomlishLv1',
        modeName : 'NomlishLv1',
        modeTitle : '【ノムリッシュ翻訳Lv1】',
        placeholder : '翻訳モード:ノムリッシュLv1',
        description : '翻訳モード:ノムリッシュLv1',
        translate : (text) => DataAccessor.get({
                url :`${process.env.REACT_APP_NOMLISH_ADDRESS}/translate/1?text=${text}`
            })
            .then(response => response.data)
            .catch(err=>{console.error(err)
                return ''
            })
    },
    nomlishLv2 : {
        modeId : 'nomlishLv2',
        modeName : 'NomlishLv2',
        modeTitle: '【ノムリッシュ翻訳Lv2】',
        placeholder : '翻訳モード:ノムリッシュLv2',
        description : '翻訳モード:ノムリッシュLv2',
        translate : (text) => DataAccessor.get({
            url :`${process.env.REACT_APP_NOMLISH_ADDRESS}/translate/2?text=${text}`
        })
        .then(response => response.data)
        .catch(err=>{console.error(err)
            return ''
        })
    },
    nomlishLv3 : {
        modeId : 'nomlishLv3',
        modeName : 'NomlishLv3',
        modeTitle: '【ノムリッシュ翻訳Lv3】',
        placeholder : '翻訳モード:ノムリッシュLv3',
        description : '翻訳モード:ノムリッシュLv3',
        translate : (text) => DataAccessor.get({
            url :`${process.env.REACT_APP_NOMLISH_ADDRESS}/translate/3?text=${text}`
        })
        .then(response => response.data)
        .catch(err=>{console.error(err)
            return ''
        })
    },
    nomlishLv4 : {
        modeId : 'nomlishLv4',
        modeName : 'NomlishLv4',
        modeTitle: '【ノムリッシュ翻訳Lv4】',
        placeholder : '翻訳モード:ノムリッシュLv4',
        description : '翻訳モード:ノムリッシュLv4',
        translate : (text) => DataAccessor.get({
            url :`${process.env.REACT_APP_NOMLISH_ADDRESS}/translate/4?text=${text}`
        })
        .then(response => response.data)
        .catch(err=>{console.error(err)
            return ''
        })
    }
}

const actionHandler = {}
actionHandler[TranslateModeActions.CHANGE_TRANSLATE_MODE_DESCRIPTION] = (state,action) => {
    const translateMode = state[action.translateMode] || {}
    translateMode.descripition = action.description
    return {
        ...state,
    }
}

export default {
    createReducer: createReducerFactory(initialState, actionHandler)
}
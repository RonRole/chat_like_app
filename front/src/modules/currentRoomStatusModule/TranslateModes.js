import DataAccessor from "../DataAccessor"

const translateModes = {
    simple : {
        modeName : 'Simple',
        modeTitle : '【翻訳なし】',
        placeholder : 'メッセージを入力してね',
        description : '翻訳せず、書いたまま送信します。',
        translate :　text => text
    },
    nomlish : {
        modeName : 'Nomlish',
        modeTitle: '【ノムリッシュ翻訳】',
        placeholder : '魂を刻みし文言を入力して与えよ',
        description : '書いたメッセージをノムティスリスッシュ(テーマ曲:星降る峡谷)にトランスレートして...そして、この地上は滅びつつあるのだから送信、通称"フェンリルの牙"しながら、それでも人はあがき続けるのか......。',
        translate : (text) => DataAccessor.get({
                                    url :`${process.env.REACT_APP_NOMLISH_ADDRESS}/translate/2?text=${text}`
                                })
                                .then(response => response.data)
                                .catch(err=>{console.error(err)
                                    return ''
                                })
    }
}

export default translateModes
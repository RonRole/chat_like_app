/**
 * APIアクセス時のエラーを処理する
 */

const handleError = ({
    error,
    history
}) => {
    if(!error){
        return 
    }
    //ネットワークエラー
    if(!error.response) {
        alert("ネットワークエラーです")
        return {
            message : 'ネットワークエラーです'
        }
    }
    //anauthorizeの時、リダイレクト
    //今のままだとurlが変わるだけでレンダリングされない
    //historyモジュールを追加し、BrowserRouterから普通のRouterに修正してみる
    if(error.response.status === 401) {
        history.push('/login')
        return {
            message : 'ログインしろよ'
        }
    }
    alert("エラーが発生しました")
    return {
        message : 'エラーが発生しました'
    }
}

export default handleError


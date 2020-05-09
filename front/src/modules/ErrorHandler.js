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
    if(error.response.status === 401) {
        history.push('/login')

        return {
            message : 'ログインしろよ'
        }
    }
    return {
        message : 'エラーが発生しました'
    }
}

export default handleError


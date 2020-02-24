/**
 * APIアクセス時のエラーを処理する
 */

const ErrorHandler = ({
    error,
    history
}) => {
    if(!error){
        return 
    }
    //ネットワークエラー
    if(!error.response) {
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

export default ErrorHandler


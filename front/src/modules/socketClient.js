/**
 * socketのクライアント側の設定
 */

import io from 'socket.io-client'

export default io.connect('localhost:8000')

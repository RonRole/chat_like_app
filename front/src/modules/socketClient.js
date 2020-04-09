/**
 * socketのクライアント側の設定
 */

import io from 'socket.io-client'

console.log(`socket client connect to ${process.env.REACT_APP_SOCKET_ADDRESS}`)

export default io(process.env.REACT_APP_SOCKET_ADDRESS)

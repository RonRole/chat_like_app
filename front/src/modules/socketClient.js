/**
 * socketのクライアント側の設定
 */

import io from 'socket.io-client'

console.log(`socket client connect to ${process.env.REACT_APP_SOCKET_ADDRESS}`)

const socketClient = io.connect(process.env.REACT_APP_SOCKET_ADDRESS, {path: (process.env.REACT_APP_SOCKET_PATH || '/socket.io')})

export default socketClient

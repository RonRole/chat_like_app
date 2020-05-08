/**
 * socketのクライアント側の設定
 */

import io from 'socket.io-client'
import { eventChannel } from 'redux-saga'

console.log(`socket client connect to ${process.env.REACT_APP_SOCKET_ADDRESS}`)

const socketClient = io.connect(process.env.REACT_APP_SOCKET_ADDRESS, {path: (process.env.REACT_APP_SOCKET_PATH || '/socket.io')})

//イベントチャンネル
export function* createMessageReceiveChannel() {
    return eventChannel(emit => {
        socketClient.on('receiveMessage', response => {
            emit(response)
        })
        return () => {
            socketClient.close()
        }
    })
}

export function* createCurrentUserReceiveChannel() {
    return eventChannel(emit => {
        socketClient.on('currentUsers', response => {
            emit(response)
        })
        return () => {
            socketClient.close()
        }
    })
}

//現在ユーザーステータス取得用のイベントチャンネル
export function* createCurrentUserStatusReceiveChannel() {
    return eventChannel(emit => {
        socketClient.on("currentUserStatus", response => {
            emit(response)
        })
        return () => {
            socketClient.close()
        }
    })
}

//ソケット通信　クライアント=>サーバー
export const clientToServerMethods = {
    connectToServer : () => socketClient.connect(),
    disconnectToServer : () => socketClient.disconnect(),
    tellJoinedRoom : ({
        user,
        roomId
    }) => {
        socketClient.emit('joinRoom',{user, roomId})
        socketClient.emit('currentUsers', roomId)
    },
    tellLeavedRoom : ({
        user,
        roomId
    }) => {
        socketClient.emit('leaveRoom',{user, roomId})
        socketClient.emit('currentUsers', roomId)
    },
    tellCurrentRoomUsersChanged : (roomId) => socketClient.emit('currentUsers', roomId),
    tellCurrentRoomUserStatusChanged : ({
        roomId,
        userId,
        status
    }) => {
        socketClient.emit('currentUserStatus', {
            roomId,
            userId,
            status
        })
    },
    sendMessage : ({
        roomId,
        text,
        user
    }) => {
        socketClient.emit('sendMessage', {
            roomId, 
            text,
            user
        })
    }
}

//ソケット通信　サーバー=>クライアント
export const serverToClientMothods = {
    readyToRecconect : ({
        user,
        roomId
    }) => {
        socketClient.on('reconnect', () => {
            socketClient.emit('rejoinRoom',{user, roomId})
            socketClient.emit('currentUsers', roomId)
        })
    }
}

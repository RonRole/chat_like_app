/**
 * socketのクライアント側の設定
 */

import io from 'socket.io-client'
import { eventChannel } from 'redux-saga'

console.log(`socket client connect to ${process.env.REACT_APP_SOCKET_ADDRESS}`)

const socketClient = io.connect(process.env.REACT_APP_SOCKET_ADDRESS, {path: (process.env.REACT_APP_SOCKET_PATH || '/socket.io')})

//イベントチャンネル
export function* createReceiveJoinChannel() {
    return eventChannel(emit => {
        socketClient.on('joinRoomMessage', response => {
            emit(response)
        })
        return () => {
            socketClient.close()
        }
    })
}

export function* createReceiveLeaveChannel() {
    return eventChannel(emit => {
        socketClient.on('leaveRoomMessage', response => {
            emit(response)
        })
        return () => {
            socketClient.close()
        }
    })
}

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

export function* createCurrentAllUserReceiveChannel() {
    return eventChannel(emit => {
        socketClient.on('currentAllUserIds', response => {
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

export function* createCurrentUserPositionReceiveChannel() {
    return eventChannel(emit => {
        socketClient.on('currentUserPosition', response => {
            emit(response)
        })
        return () => {
            socketClient.close()
        }
    })
}

export function* createReceiveRoomBgmChannel() {
    return eventChannel(emit => {
        socketClient.on('changeRoomBgm', response => {
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
        roomId,
        messageType,
        messageClass,
        text,
        user
    }) => {
        socketClient.emit('joinRoomMessage',{
            roomId,
            messageType,
            messageClass,
            text,
            user
        })
        socketClient.emit('currentUsers', roomId)
    },
    fetchCurrentRoomUsers : ({
        talkRoomId
    }) => {
        socketClient.emit('currentUsers', talkRoomId)
    },
    tellLeavedRoom : ({
        roomId,
        messageType,
        messageClass,
        text,
        user
    }) => {
        socketClient.emit('leaveRoomMessage',{
            roomId,
            messageType,
            messageClass,
            text,
            user
        })
        socketClient.emit('currentUsers', roomId)
    },
    tellCurrentRoomUsersChanged : (roomId) => socketClient.emit('currentUsers', roomId),
    tellCurrentRoomUserStatusChanged : ({
        talkRoomId,
        userId,
        status
    }) => {
        socketClient.emit('currentUserStatus', {
            talkRoomId,
            userId,
            status
        })
    },
    tellCurrentRoomUserPositionChanged : ({
        talkRoomId,
        userId,
        position = {latitude:0, longitude: 0}
    }) => {
        socketClient.emit('changeUserPosition', {
            talkRoomId,
            userId,
            position
        })
    },
    tellGetCurrentRoomUserPosition : ({
        talkRoomId
    }) => {
        socketClient.emit('currentUserPosition', {
            talkRoomId
        })
    },
    sendMessage : ({
        roomId,
        messageType,
        messageClass,
        text,
        user
    }) => {
        socketClient.emit('sendMessage', {
            roomId, 
            messageType,
            messageClass,
            text,
            user
        })
    },
    tellChangeRoomBgm : ({
        talkRoomId,
        bgmSrcUrl
    }) => {
        socketClient.emit('changeRoomBgm', {
            talkRoomId,
            bgmSrcUrl
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

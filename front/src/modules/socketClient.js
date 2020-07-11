/**
 * socketのクライアント側の設定
 */

import io from 'socket.io-client'
import { eventChannel } from 'redux-saga'

console.log(`socket client connect to ${process.env.REACT_APP_SOCKET_ADDRESS}`)

const socketClient = io.connect(process.env.REACT_APP_SOCKET_ADDRESS, {path: (process.env.REACT_APP_SOCKET_PATH || '/socket.io')})

//イベントチャンネル
export function* createReceiveJoinRoomMessageChannel() {
    return eventChannel(emit => {
        socketClient.on('joinRoomMessage', response => {
            emit(response)
        })
        return () => {
            socketClient.close()
        }
    })
}

export function* createReceiveLeaveRoomMessageChannel() {
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

export function* createReceiveJoinRoomChannel() {
    return eventChannel(emit => {
        socketClient.on('joinRoom', response => {
            emit(response)
        })
        return () => {
            socketClient.close()
        }
    })
}

export function* createReceiveLeaveRoomChannel() {
    return eventChannel(emit => {
        socketClient.on('leaveRoom', response => {
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
        socketClient.emit('joinRoom', {
            roomId,
            user
        })
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
        socketClient.emit('leaveRoom', {
            roomId,
            user
        })
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
        user,
        ...others
    }) => {
        socketClient.emit('sendMessage', {
            roomId, 
            messageType,
            messageClass,
            text,
            user,
            ...others
        })
    },
    tellChangeRoomBgm : ({
        talkRoomId,
        bgmId,
        bgmSrcUrl
    }) => {
        socketClient.emit('changeRoomBgm', {
            talkRoomId,
            bgmId,
            bgmSrcUrl
        })
    }
}

//ソケット通信　サーバー=>クライアント
export const serverToClientMothods = {
    readyToRecconect : ({
        user = {},
        roomId
    }) => {
        socketClient.on('reconnect', () => {
            socketClient.emit('rejoinRoomMessage',{user, roomId})
            socketClient.emit('currentUsers', roomId)
        })
    },

    removeRejoinRoom : () => {
        socketClient.off('reconnect')
    }
}

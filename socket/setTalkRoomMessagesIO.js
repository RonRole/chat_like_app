
//トークルームのメッセージ用のSocketIO
module.exports = (server) => {
    const io = require('./node_modules/socket.io').listen(server)
    //talkRoomID : joinRoomしたメンバーたち
    const currentRoomMembers = {
        0:{
            0:{

            }
        }
    }
    
    io.sockets.on('connection', socket => {
        //トークルーム参加
        socket.on('joinRoomMessage', ({
            roomId, 
            messageType = 'text', 
            messageClass='receiveMessage', 
            user, 
            text
        }) => {
            currentRoomMembers[roomId] = currentRoomMembers[roomId] || {}
            currentRoomMembers[roomId][socket.id] = user
            socket.join(roomId)
            socket.to(roomId).broadcast.emit('joinRoomMessage', {
                roomId,
                user,
                messageType,
                messageClass,
                text
            })
        })
        socket.on('rejoinRoomMessage', ({user = {}, roomId }) => {
            currentRoomMembers[roomId] = currentRoomMembers[roomId] || {}
            currentRoomMembers[roomId][socket.id] = user
            socket.join(roomId)
        })
        socket.on('leaveRoomMessage', ({
            roomId, 
            messageType = 'text', 
            messageClass='receiveMessage', 
            user, 
            text
        }) => {
            delete (currentRoomMembers[roomId] || {})[socket.id]
            socket.leave(roomId)
            socket.to(roomId).broadcast.emit('leaveRoomMessage', {
                roomId,
                user,
                messageType,
                messageClass,
                text
            })
        })
        //メッセージ送信
        socket.on('sendMessage',({
            roomId, 
            messageType = 'text', 
            messageClass='receiveMessage', 
            user, 
            text
        }) => {
            socket.to(roomId).broadcast.emit('receiveMessage', {
                roomId,
                messageType,
                messageClass,
                user,
                text
            })
        })
        //現在のトークルームのメンバーを取得
        socket.on('currentUsers', (roomId) => {
            const users = Object.values(currentRoomMembers[roomId] || {})
            console.log(users)
            io.sockets.emit('currentUsers', {
                roomId,
                users
            })
        })
        socket.on('currentUserStatus', ({
            talkRoomId,
            userId,
            status
        }) => {
            socket.to(talkRoomId).broadcast.emit('currentUserStatus', {
                talkRoomId,
                userId,
                status
            })
        })
        socket.on('changeUserPosition', ({
            talkRoomId,
            position
        }) => {
            currentRoomMembers[talkRoomId] = currentRoomMembers[talkRoomId] || {}
            currentRoomMembers[talkRoomId][socket.id] ? currentRoomMembers[talkRoomId][socket.id].position = position : {}
            io.sockets.in(talkRoomId).emit('currentUserPosition', {
                talkRoomId,
                users : [...Object.values(currentRoomMembers[talkRoomId])]
            })
        })
        socket.on('currentUserPosition', ({
            talkRoomId
        }) => {
            currentRoomMembers[talkRoomId] = currentRoomMembers[talkRoomId] || {}
            io.sockets.in(talkRoomId).emit('currentUserPosition', {
                talkRoomId,
                users : [...Object.values(currentRoomMembers[talkRoomId])]
            })
        }),
        socket.on('changeRoomBgm',({
            talkRoomId,
            bgmId,
            bgmSrcUrl
        }) => {
            io.sockets.in(talkRoomId).emit('changeRoomBgm', {
                talkRoomId,
                bgmId,
                bgmSrcUrl
            })
        }),
        //切断された時
        socket.on('disconnect', () => {
            //切断されたユーザーのいるトークルームのIDを取得
            const disconnectedRooms = Object.keys(currentRoomMembers)
                                .filter(roomId => 
                                    Object.keys(currentRoomMembers[roomId])
                                            .some(memberId => memberId === socket.id)
                                )
            //切断されたユーザーをトークルームから削除し、そのメンバーに対象のユーザーが切断されたことを通知する
            for(let roomId of disconnectedRooms) {
                const user = currentRoomMembers[roomId][socket.id]
                io.sockets.in(roomId).emit('receiveMessage', {
                    roomId,
                    messageClass : "leaveRoom",
                    user : user,
                    text : `${user.name}が切断されました`
                })
                delete currentRoomMembers[roomId][socket.id]
                io.sockets.in(roomId).emit(
                    'currentUsers', {
                    roomId,
                    users : {...currentRoomMembers[roomId]}
                })
            }
        })
    })
}


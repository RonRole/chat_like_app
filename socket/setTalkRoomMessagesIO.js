
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
        socket.on('joinRoom', ({
            roomId, 
            messageType = 'text', 
            messageClass='receiveMessage', 
            user, 
            text
        }) => {
            currentRoomMembers[roomId] = currentRoomMembers[roomId] || {}
            currentRoomMembers[roomId][socket.id] = user
            socket.join(roomId)
            socket.to(roomId).broadcast.emit('joinRoom', {
                roomId,
                user,
                messageType,
                messageClass,
                text
            })
        })
        socket.on('rejoinRoom', ({user = {}, roomId }) => {
            currentRoomMembers[roomId] = currentRoomMembers[roomId] || {}
            currentRoomMembers[roomId][socket.id] = user
            socket.join(roomId)
        })
        socket.on('leaveRoom', ({
            roomId, 
            messageType = 'text', 
            messageClass='receiveMessage', 
            user, 
            text
        }) => {
            delete (currentRoomMembers[roomId] || {})[socket.id]
            socket.to(roomId).broadcast.emit('leaveRoom', {
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
            io.sockets.in(roomId).emit('currentUsers', {
                roomId,
                users : {...currentRoomMembers[roomId]}
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
        socket.on('currentUserPosition', ({
            talkRoomId,
            userId,
            position
        }) => {
            socket.to(talkRoomId).broadcast.emit('currentUserPosition', {
                talkRoomId,
                userId,
                position
            })
        })
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
                io.sockets.in(roomId).emit('currentUsers', {
                    roomId,
                    users : {...currentRoomMembers[roomId]}
                })
            }
        })
    })
}


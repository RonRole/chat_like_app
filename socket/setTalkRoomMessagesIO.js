
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
        console.log('socket : connected')
        //トークルーム参加
        socket.on('joinRoom', ({user = {},　roomId}) => {
            currentRoomMembers[roomId] = currentRoomMembers[roomId] || {}
            currentRoomMembers[roomId][socket.id] = user
            console.log(`${roomId}に${user.name}が現れた!!!`)
            console.log(currentRoomMembers[socket.id])
            socket.join(roomId)
            io.sockets.in(roomId).emit('receiveMessage', {
                roomId : roomId,
                className : "joinRoom",
                user : user,
                text : `${user.name}が参加しました`,
            })
        })
        socket.on('rejoinRoom', ({user = {}, roomId}) => {
            currentRoomMembers[roomId] = currentRoomMembers[roomId] || {}
            currentRoomMembers[roomId][socket.id] = user
            console.log(`${roomId}に${user.name}が再び現れた!!!`)
            console.log(currentRoomMembers[socket.id])
            socket.join(roomId)
            io.sockets.in(roomId).emit('receiveMessage', {
                roomId : roomId,
                className : "joinRoom",
                user : user,
                text : `${user.name}が復帰しました`,
            })
        })
        socket.on('leaveRoom', ({user = {}, roomId}) => {
            console.log(socket.id)
            delete (currentRoomMembers[roomId] || {})[socket.id]
            console.log(`${roomId}から${user.name}が離れました`)
            console.log(currentRoomMembers[roomId])
            io.sockets.in(roomId).emit('receiveMessage', {
                roomId : roomId,
                className : "leaveRoom",
                user : user,
                text : `${user.name}が退出しました`
            })
        })
        //メッセージ送信
        socket.on('sendMessage',({roomId, user, text}) => {
            console.log(`${roomId},${user},${text}`)
            socket.to(roomId).broadcast.emit('receiveMessage', {
                roomId: roomId, 
                className:"receiveMessage", 
                user : user,
                text : text
            })
        })
        //現在のトークルームのメンバーを取得
        socket.on('currentUsers', (roomId) => {
            console.log("get current users")
            console.log(currentRoomMembers)
            io.sockets.in(roomId).emit('currentUsers', {
                roomId : roomId,
                users : {...currentRoomMembers[roomId]}
            })
        })
        socket.on('currentUserStatus', ({
            roomId,
            userId,
            status
        }) => {
            console.log('change user status')
            console.log(`roomId:${roomId}, userId:${userId}, status:${status}`)
            socket.to(roomId).broadcast.emit('currentUserStatus', {
                roomId,
                userId,
                status
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
                console.log(`${user.name}が切断されました`)
                io.sockets.in(roomId).emit('receiveMessage', {
                    roomId : roomId,
                    className : "leaveRoom",
                    user : user,
                    text : `${user.name}が切断されました`
                })
                delete currentRoomMembers[roomId][socket.id]
                io.sockets.in(roomId).emit('currentUsers', {
                    roomId : roomId,
                    users : {...currentRoomMembers[roomId]}
                })
            }
        })
    })
}


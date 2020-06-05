
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
        socket.on('joinRoom', ({user = {},　roomId, text = '参加者が現れた!'}) => {
            currentRoomMembers[roomId] = currentRoomMembers[roomId] || {}
            currentRoomMembers[roomId][socket.id] = user
            socket.join(roomId)
            io.sockets.in(roomId).emit('receiveMessage', {
                roomId,
                className : 'joinRoom',
                user,
                text,
            })
        })
        socket.on('rejoinRoom', ({user = {}, roomId, text　= '復帰しました'}) => {
            currentRoomMembers[roomId] = currentRoomMembers[roomId] || {}
            currentRoomMembers[roomId][socket.id] = user
            socket.join(roomId)
            io.sockets.in(roomId).emit('receiveMessage', {
                roomId,
                className : "joinRoom",
                user,
                text
            })
        })
        socket.on('leaveRoom', ({user = {}, roomId, text='退出しました'}) => {
            delete (currentRoomMembers[roomId] || {})[socket.id]
            io.sockets.in(roomId).emit('receiveMessage', {
                roomId,
                className : "leaveRoom",
                user,
                text
            })
        })
        //メッセージ送信
        socket.on('sendMessage',({roomId, className='receiveMessage', user, text}) => {
            socket.to(roomId).broadcast.emit('receiveMessage', {
                roomId, 
                className, 
                user,
                text
            })
        })
        //現在のトークルームのメンバーを取得
        socket.on('currentUsers', (roomId) => {
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
                io.sockets.in(roomId).emit('receiveMessage', {
                    roomId,
                    className : "leaveRoom",
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


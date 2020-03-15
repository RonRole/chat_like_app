console.log("server started")

const http = require('http')
const server = http.createServer();
const io = require('socket.io').listen(server)
server.listen(8000)

//talkRoomID : joinRoomしたメンバーたち
const currentRoomMembers = {
    0:{
        0:{

        }
    }
}

io.sockets.on('connection', socket => {
    //トークルーム参加
    socket.on('joinRoom', ({user = {},　roomId}) => {
        if(!currentRoomMembers[roomId]) {
            currentRoomMembers[roomId] = {}
        }
        currentRoomMembers[roomId][user.id] = user
        console.log(`${roomId}に${user.name}が現れた!!!`)
        console.log(currentRoomMembers[roomId])
        socket.join(roomId)
        io.sockets.in(roomId).emit('receiveMessage', {
            roomId : roomId,
            className : "joinRoom",
            user : user,
            text : `${user.name}が参加しました`,
        })
    })
    socket.on('leaveRoom', ({user = {}, roomId}) => {
        if(currentRoomMembers[roomId] && currentRoomMembers[roomId][user.id]){
            delete currentRoomMembers[roomId][user.id]
        }
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
            users : currentRoomMembers[roomId]
        })
    })
})




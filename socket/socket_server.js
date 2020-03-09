console.log("server started")

const http = require('http')
const server = http.createServer();
const io = require('socket.io').listen(server)
server.listen(8000)

io.sockets.on('connection', socket => {
    //トークルーム参加
    socket.on('joinRoom', ({user = {},　roomId}) => {
        console.log(`${roomId}に新参者が現れた!!!`)
        socket.join(roomId)
        io.sockets.in(roomId).emit('receiveMessage', {
            roomId : roomId,
            className : "joinRoom",
            user : user,
            text : `${user.name}が参加しました`,
        })
    })
    socket.on('leaveRoom', ({user = {}, roomId}) => {
        console.log(`${roomId}から人が離れました`)
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
})




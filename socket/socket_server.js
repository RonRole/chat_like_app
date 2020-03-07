console.log("server started")

const http = require('http')
const server = http.createServer();
const io = require('socket.io').listen(server)
server.listen(8000)

io.sockets.on('connection', socket => {
    //トークルーム参加
    socket.on('joinRoom', ({name="新参者", roomId}) => {
        console.log(`${roomId}に新参者が現れた!!!`)
        socket.join(roomId)
        socket.to(roomId).emit('return', {
            roomId : roomId,
            className : 'primary',
            text : `${name}が現れた!`
        })
    })
    //メッセージ送信
    socket.on('sendMessage',({roomId, className="",text=""}) => {
        console.log(`roomId:${roomId} class:${className} text:${text}`)
        socket.to(roomId).broadcast.emit('return', {roomId: roomId, className:"secondary", text:text})
    })
})




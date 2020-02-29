console.log("server started")

const http = require('http')
const server = http.createServer();
const io = require('socket.io').listen(server)
server.listen(8000)

io.sockets.on('connection', socket => {

    //トークルーム参加
    socket.on('joinRoom', ({roomId}) => {
        console.log(`${roomId}に新参者が現れた!!!`)
        socket.join(roomId)
    })
    //メッセージ送信
    socket.on('sendMessage',({roomId, className="",text=""}) => {
        console.log(`roomId:${roomId} class:${className} text:${text}`)
        socket.to(roomId).broadcast.emit('return', {roomId: roomId, className:"secondary", text:text})
    })
})




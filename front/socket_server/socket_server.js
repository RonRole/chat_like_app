console.log("server started")

const http = require('http')
const server = http.createServer();
const io = require('socket.io').listen(server)
server.listen(8000)

io.sockets.on('connection', socket => {
    socket.on('sendMessage',({className="",text=""}) => {
        console.log(`class:${className} text:${text}`)
        socket.broadcast.emit('return', {className:className, text:text})
    })
})




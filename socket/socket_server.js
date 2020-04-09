console.log(`PORT:${process.env.SOCKET_PORT || 8000}`)
console.log(`HOST:${process.env.SOCKET_HOST || 'localhost'}`)

const http = require('http')

const server = http.createServer((req,res) => {
    if(req.url==='/' && req.method==='GET') {
        res.write('socket server is running')
    }
});
server.listen(process.env.SOCKET_PORT || 8000, process.env.SOCKET_HOST || 'localhost')

const io = require('./talkRoomMessagesIO').listen(server)
io.path(process.env.SOCKET_PATH || '/socket.io')
console.log(`io:${io}`)
console.log(server.address())
console.log("socket server started")
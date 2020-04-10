console.log("socket server started")
console.log(`PORT:${process.env.SOCKET_PORT || 8000}`)
console.log(`HOST:${process.env.SOCKET_HOST || 'localhost'}`)

const http = require('http')

const server = http.createServer();

server.listen(process.env.SOCKET_PORT || 8000, process.env.SOCKET_HOST || 'localhost')

require('./setTalkRoomMessagesIO')(server)


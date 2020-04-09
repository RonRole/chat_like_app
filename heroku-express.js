const proxy = require('express-http-proxy');
const express = require('express')
const PORT = process.env.PORT || 5000

console.log(`api is served on ${process.env.API_HOST}:${process.env.API_PORT}`)
console.log(`socket is served on ${process.env.SOCKET_HOST}:${process.env.SOCKET_PORT}`)

const server = express()
                  .use(express.static('/usr/src/front/build'))
                  .get('/', (req, res) => res.sendFile('/usr/src/front/build/index.html'))
                  .use('/api', proxy(`${process.env.API_HOST}:${process.env.API_PORT}`))
                  .listen(PORT, () => console.log(`Front Listening on ${ PORT }`))

require('/usr/src/socket/talkRoomMessagesIO')(server)


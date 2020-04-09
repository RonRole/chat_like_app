const proxy = require('express-http-proxy');
const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000
const io = require('/usr/src/socket/talkRoomMessagesIO')

const app = express().use(express.static('/usr/src/front/build'))
                      .get('/', (req, res) => res.sendFile('/usr/src/front/build/index.html'))
                      .use('/api', proxy('0.0.0.0:4000'))

const server = require('http').Server(app)
io.listen(server)

server.listen(PORT, () => console.log(`Front Listening on ${ PORT }`))




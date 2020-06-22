const proxy = require('express-http-proxy');
const express = require('express')
const bodyParser = require('body-parser')
const PORT = process.env.PORT || 5000
const setTalkRoomMessagesIO = (server) => require('/usr/src/socket/setTalkRoomMessagesIO')(server)

console.log(`api is served on ${process.env.API_HOST}:${process.env.API_PORT}`)
console.log(`socket is served on ${process.env.SOCKET_HOST}:${process.env.SOCKET_PORT}`)
console.log(`nomlish is served on ${process.env.NOMLISH_HOST}:${process.env.NOMLISH_PORT}`)

express.uses
const server = express()
                .use(bodyParser.urlencoded({
                    limit: '50mb',
                    exetended:true
                }))
                .use(express.static('/usr/src/front/build'))
                .use('/api', proxy(`${process.env.API_HOST}:${process.env.API_PORT}`))
                .use('/nomlish', proxy(`${process.env.NOMLISH_HOST}:${process.env.NOMLISH_PORT}`, {
                    timeout : 3000000
                }))
                .get('/socket.io', proxy(`${process.env.SOCKET_HOST}:${process.env.SOCKET_PORT}`))
                .get('/talk_rooms/*', (req, res) => res.redirect('/talk_rooms'))
                .get('/*', (req, res) => res.sendFile('/usr/src/front/build/index.html'))
                .listen(PORT, () => console.log(`Front Listening on ${ PORT }`))
setTalkRoomMessagesIO(server)
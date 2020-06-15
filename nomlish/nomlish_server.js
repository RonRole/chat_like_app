const express = require('express')
const nomlish = require('nomlish')
/**
 * $NOMLISH_ADDRESS/translate/2?text=***
 */
const server = express().get('/translate/:level',(req, res) => {
    res.header('Access-Control-Allow-Origin', process.env.REACT_APP_FRONTEND_ADDRESS)
    res.header('Access-Control-Allow-Credentials','true')
    const text = req.query.text
    nomlish.translate(text, req.params.level)
            .then(response => res.send(response))
            .catch(err=>console.error(err))
}).listen(`${process.env.NOMLISH_PORT}`,() => console.log('hello nomlish'))

console.log(server.address())
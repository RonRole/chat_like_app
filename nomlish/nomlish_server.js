const express = require('express')
const nomlish = require('nomlish')
/**
 * $NOMLISH_ADDRESS/translate/2?text=***
 */
const app = express()
app.get('/translate/:level', (req, res) => {
    res.header('Access-Control-Allow-Origin', process.env.REACT_APP_FRONTEND_ADDRESS)
    res.header('Access-Control-Allow-Credentials','true')
    const text = req.query.text
    nomlish.translate(text, req.params.level)
            .then(response => res.send(response))
            .catch(err=>console.error(err))
})
app.listen(process.env.NOMLISH_PORT, process.env.NOMLISH_HOST, 0, () => console.log(`nomlish server started at ${process.env.NOMLISH_HOST}:${process.env.NOMLISH_PORT}`))

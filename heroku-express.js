const proxy = require('express-http-proxy');
const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000

express()
//  .use(express.static(path.join(__dirname, 'public')))
//  .set('views', path.join(__dirname, 'views'))
//  .set('view engine', 'ejs')
  .get('/', (req, res) => res.sendFile('./build/index.html'))
  .use('/api', proxy('0.0.0.0:4000'))
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))
const nomlish = require('nomlish')
const testText = 'testText'

nomlish.translate(testText, 2).then(response => console.log(response)).catch(err=>console.error(err))
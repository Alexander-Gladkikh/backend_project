const express = require('express');

const app = express()
const port = 8080;

app.get('/', (req, res) => {
    res.send('Hello World')
})

app.get('/samurais', (req, res) => {
    res.send('Hello samurais')
})

app.listen(port, () => console.log(`App started in ${port} port`))

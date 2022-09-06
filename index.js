const express = require('express')
const ejsLayouts = require('express-ejs-layouts')

const app = express()
const PORT = 3000


app.set('view engine', 'ejs')
app.use(ejsLayouts)
app.use(express.static(__dirname + '/public'))

app.listen(PORT, ()=> {
    console.log('yeee')
})

app.get('/', (req, res) => {
    res.render('index')
})
const { urlencoded } = require('body-parser')
const express = require('express')
const ejsLayouts = require('express-ejs-layouts')
const fs = require('fs')
 
const app = express()
const PORT = 3000


app.set('view engine', 'ejs')
app.use(ejsLayouts)
// allows data to be added to the db
app.use(express.urlencoded({extended:false}))
// allows styles.
app.use(express.static(__dirname + '/public'))

app.listen(PORT, ()=> {
    console.log('yeee')
})

app.get('/', (req, res) => {
    res.render('home')
    // res.send('Welcome to the Dino Crud app')

})








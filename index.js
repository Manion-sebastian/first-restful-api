const express = require('express')
const ejsLayouts = require('express-ejs-layouts')
const fs = require('fs')

const app = express()
const PORT = 3000


app.set('view engine', 'ejs')
app.use(ejsLayouts)
app.use(express.static(__dirname + '/public'))

app.listen(PORT, ()=> {
    console.log('yeee')
})

app.get('/', (req, res) => {
    // res.render('index')
    res.send('Welcome to the Dino Crud app')

})

app.get('/dinosaurs', (req, res) => {
    res.send('show all dinos')
})
app.get('/dinosaurs/new', (req, res) => {
    res.send('show a form to create a new dino')
})

app.post('/dinosaurs', (req, res) => {
    res.send('creates a new dino in the db')
})

app.get('/dinosaurs/:id', (req, res) => {
    res.send(`show deatails for dino with id of ${req.params.id}`)
})

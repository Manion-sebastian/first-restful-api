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

const readDinoFile = () => {
    const dinosaurs = fs.readFileSync('./dinosaurs.json')
    const dinoData = JSON.parse(dinosaurs)
    return dinoData
}

app.get('/dinosaurs', (req, res) => {
    // use fs to read the dino.json 
    // parse the file into json data
    // send the dino info to the client. 
    // read file
    const dinoData = readDinoFile()
    // res.send('show all dinos')
    res.json(dinoData)
})
app.get('/dinosaurs/new', (req, res) => {
    res.send('show a form to create a new dino')
})

app.post('/dinosaurs', (req, res) => {
    // do not render a template. 
    // redirect to where you can find a template.
    const dinoData = readDinoFile()
    console.log(req.body)
    res.send('creates a new dino in the db')
})

app.get('/dinosaurs/:id', (req, res) => {
    const dinoData = readDinoFile()
    const dino = dinoData[req.params.id]
    res.json(dino)
})

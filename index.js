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
    res.render('index', {dinos: dinoData})
})
app.get('/dinosaurs/new', (req, res) => {
    res.render('dinos/new')
})

app.post('/dinosaurs', (req, res) => {
    // do not render a template. 
    // redirect to where you can find a template.
    const dinoData = readDinoFile()
    console.log(req.body)
    dinoData.push(req.body)
    fs.writeFileSync('./dinosaurs.json', JSON.stringify(dinoData))

    res.redirect('/dinosaurs')
})

app.get('/dinosaurs/:id', (req, res) => {
    const dinoData = readDinoFile()
    const dino = dinoData[req.params.id]
    res.json(dino)
})

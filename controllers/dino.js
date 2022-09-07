const express = require('express')
const router = express.Router()
const fs = require('fs')

router.get('/', (req, res) => {
    res.render('dhome')
})

const readDinoFile = () => {
    const dinosaurs = fs.readFileSync('./dinosaurs.json')
    const dinoData = JSON.parse(dinosaurs)
    return dinoData
}

router.get('/dinosaurs', (req, res) => {
    // use fs to read the dino.json 
    // parse the file into json data
    // send the dino info to the client. 
    // read file
    const dinoData = readDinoFile()
    // res.send('show all dinos')
    res.render('dinos/index', {dinos: dinoData})
})
router.get('/dinosaurs/new', (req, res) => {
    res.render('dinos/new')
})

router.post('/dinosaurs', (req, res) => {
    // do not render a template. 
    // redirect to where you can find a template.
    const dinoData = readDinoFile()
    console.log(req.body)
    dinoData.push(req.body)
    fs.writeFileSync('./dinosaurs.json', JSON.stringify(dinoData))

    res.redirect('/dinosaurs')
})

router.get('/dinosaurs/:id', (req, res) => {
    const dinoData = readDinoFile()
    const dino = dinoData[req.params.id]
    res.json(dino)
})

module.exports = router
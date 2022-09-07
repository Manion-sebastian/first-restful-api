const express = require('express')
const router = express.Router()
const fs = require('fs')

router.get('/', (req, res) => {
    res.render('dinos/dhome')
    // res.send('hello')
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
    dinoData.push(req.body)
    console.log(req.body)
    fs.writeFileSync('./dinosaurs.json', JSON.stringify(dinoData))

    res.redirect('/dinos/dinosaurs')
})

router.get('/dinosaurs/:id', (req, res) => {
    const dinoData = readDinoFile()
    const dino = dinoData[req.params.id]
    res.json(dino)
})

// DELETE /dinosaurs/:id -- delete a specific dinosaur from the database
router.delete('/dinosaurs/:id', (req, res) => {
    const dinoData = readDinoFile()
    const dino = dinoData[req.params.id]

    // remove a dinosaur from the array
    // .splice is an array method that takes 2 arguments
    // array.splice(indexToBeginAt, numOfThingsToRemove)

    dinoData.splice(req.params.id, 1)

    // save the new dinosaurs to the dinosaurs.json file
    fs.writeFileSync('./dinosaurs.json', JSON.stringify(dinoData))
    res.redirect('/dinos/dinosaurs')
})

router.get('/dinosaurs/edit/:id', (req,res) => {
    const dinoData = readDinoFile()
    const dino = dinoData[req.params.id]

    res.render('dinos/edit', {dino: dino, dinoId: req.params.id})
})

router.put('/dinosaurs/:id', (req,res) => {
    const dinoData = readDinoFile()

    dinoData[req.params.id].name = req.body.name
    dinoData[req.params.id].type = req.body.type

    fs.writeFileSync('./dinosaurs.json', JSON.stringify(dinoData))
    res.redirect('/dinos/dinosaurs')
})

module.exports = router
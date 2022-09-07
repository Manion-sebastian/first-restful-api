const express = require('express')
const router = express.Router()
const fs = require('fs')

router.get('/', (req, res) => {
    res.render('phome')
})


const readPreFile = () => {
    const prehistorics = fs.readFileSync('./prehe.json')
    const preheData = JSON.parse(prehistorics)
    return preheData
}



router.get('/prehes', (req, res) => {
    const preheData = readPreFile()
    res.render('prehe/indexp', {prehes: preheData})
})
router.get('/prehes/newp', (req, res) => {
    res.render('prehes/newp')
})

router.post('/prehes', (req,res) => {
    const preData = readPreFile()
    preData.push(req.body)
    fs.writeFileSync('./prehe.json', JSON.stringify(preData))

    res.redirect('/prehe')
})

router.get('/prehe/:id', (req, res) => {
    const preData = readPreFile()
    const pre = preData[req.params.id]
    res.json(pre)
})

module.exports = router
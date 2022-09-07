const express = require('express')
const router = express.Router()
const fs = require('fs')

router.get('/', (req, res) => {
    res.render('prehe/phome')
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
    res.render('prehe/newp')
})

router.post('/prehes', (req,res) => {
    const preData = readPreFile()
    preData.push(req.body)
    fs.writeFileSync('./prehe.json', JSON.stringify(preData))

    res.redirect('/prehe/prehes')
})

router.get('/prehe/:id', (req, res) => {
    const preData = readPreFile()
    const pre = preData[req.params.id]
    res.json(pre)
})

router.delete('/prehes/:id' , (req,res) => {
    const preData = readPreFile()
    const pre = preData[req.params.id]
    preData.splice(req.params.id, 1)
    fs.writeFileSync('./prehe.json', JSON.stringify(preData))
    res.redirect('/prehe/prehes')
})

router.get('/prehes/edit/:id', (req,res) => {
    const preData = readPreFile()
    const pre = preData[req.params.id]
    res.render('prehe/edit', {pre : pre, preId: req.params.id})

})

router.put('/prehes/:id', (req,res) => {
    const preData = readPreFile()

    preData[req.params.id].type = req.params.type
    preData[req.params.id].img_url = req.params.img_url

    fs.writeFileSync('./prehe.json', JSON.stringify(preData))
    res.redirect('/prehe/prehes')
})

module.exports = router
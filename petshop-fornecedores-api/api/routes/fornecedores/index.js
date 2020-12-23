const router = require('express').Router()
const ModelTable = require('../../database/ModelFornecedorTable')

router.use('/', async (req, res) => {
    const result = await  ModelTable.findAll()
    res.send(
        JSON.stringify(result)
    )
    
})

module.exports = router
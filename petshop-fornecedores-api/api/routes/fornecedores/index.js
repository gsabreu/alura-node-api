const router = require('express').Router()
const ModelTable = require('../../database/ModelFornecedorTable')
const Fornecedor = require('./Fornecedor')

router.get('/', async (req, res) => {
    const result = await  ModelTable.findAll()
    res.send(
        JSON.stringify(result)
    )  
})

router.post('/', async (req, res) => {
    const dataRequest = req.body
    const fornecedor = new Fornecedor(dataRequest)
    await fornecedor.create()

    res.send(
        JSON.stringify(fornecedor)
    )
})

module.exports = router
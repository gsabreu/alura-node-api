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

router.get('/:id', async (req, res) => {
    const id = req.params.id
    const fornecedor = new Fornecedor({ id:id })
    
    const result = await ModelTable.findOne({
        where: {
            id: id
        }
    })

    if(!result) {
        res.send(
            JSON.stringify({ mensagem: 'Fornecodr não encontrado'})
        )
    }

    res.send(
        JSON.stringify(result)
    )
    
})

module.exports = router
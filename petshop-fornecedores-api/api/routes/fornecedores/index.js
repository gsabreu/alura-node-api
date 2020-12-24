const router = require('express').Router()
const Fornecedor = require('./Fornecedor')
const TableFornecedor = require('./FornecedorTable')

router.get('/', async (req, res) => {
    const result = await  TableFornecedor.list()
    res.send(
        JSON.stringify(result)
    )  
})

router.post('/', async (req, res) => {
    const dataRequest = req.body
    const fornecedor = new Fornecedor(dataRequest)
    await TableFornecedor.create()

    res.send(
        JSON.stringify(fornecedor)
    )
})

router.get('/:id', async (req, res) => {
    try {
        const id = req.params.id
        const fornecedor = new Fornecedor({ id: id })

        await fornecedor.getById()
        resposta.send(
            JSON.stringify(fornecedor)
        )
    } catch (error) {
        res.send(
            JSON.stringify({ mensagem: error.message})
        )
    }
})

router.put('/:id', async (req, res) => {
    try{
        const id = req.params.id
        const body = req.body
        const data = Object.assign({}, body, { id: id})

        const fornecedor = new Fornecedor(data)

        await fornecedor.update()
        res.end()
    } catch(error) {
        res.send(JSON.stringify({
            mensagem: error.message
        }))
    }
})

module.exports = router
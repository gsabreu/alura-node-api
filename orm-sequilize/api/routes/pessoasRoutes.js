const { Router } = require('express')
const PessoaController = require('../controllers/PessoaController')

const router = Router()

router.get('/pessoas', PessoaController.getAll)

router.get('/pessoas/:id', PessoaController.getById)

router.post('/pessoas', PessoaController.createPerson)

module.exports = router
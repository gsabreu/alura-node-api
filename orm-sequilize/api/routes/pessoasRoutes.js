const { Router } = require('express')
const PessoaController = require('../controllers/PessoaController')

const router = Router()

router.get('/pessoas', PessoaController.getAll)

router.get('/pessoas/:id', PessoaController.getById)

router.post('/pessoas', PessoaController.createPerson)

router.put('/pessoas/:id', PessoaController.updatePerson)

router.delete('/pessoas/:id', PessoaController.deletePerson)

module.exports = router
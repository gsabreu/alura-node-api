const { Router } = require('express')
const PessoaController = require('../controllers/PessoaController')

const router = Router()

router.get('/pessoas', PessoaController.getAllActives)

router.get('/pessoas/todos', PessoaController.getAll)

router.get('/pessoas/:id', PessoaController.getById)

router.get('/pessoas/:estudanteId/matricula/:matriculaId', PessoaController.getMatriculaById)

router.get('/pessoas/:estudanteId/matricula/', PessoaController.getMatriculas)

router.get('/pessoas/matricula/:turmaId/confirmadas', PessoaController.getMatriculasPorTurma)

router.post('/pessoas', PessoaController.createPerson)

router.post('/pessoas/:id/restaura', PessoaController.restauraPessoa)

router.put('/pessoas/:id', PessoaController.updatePerson)

router.delete('/pessoas/:id', PessoaController.deletePerson)



router.post('/pessoas/:estudanteId/matricula', PessoaController.createMatricula)

router.put('/pessoas/:estudanteId/matricula/:matriculaId', PessoaController.updateMatricula)

router.delete('/pessoas/:estudanteId/matricula/:matriculaId', PessoaController.deleteMatricula)

module.exports = router
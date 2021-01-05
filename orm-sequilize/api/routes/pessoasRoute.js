const { Router } = require('express')
const PessoaController = require('../controllers/PessoaController')

const router = Router()

router.get('/pessoas', PessoaController.getAll)

router.get('/pessoas/ativas', PessoaController.getAllActives)

router.get('/pessoas/:id', PessoaController.getById)

router.get('/pessoas/:estudanteId/matricula/:matriculaId', PessoaController.getMatriculaById)

router.get('/pessoas/:estudanteId/matricula/', PessoaController.getMatriculas)

router.get('/pessoas/matricula/:turmaId/confirmadas', PessoaController.getMatriculasPorTurma)

router.get('/pessoas/matricula/lotada', PessoaController.getFullTurmas)

router.post('/pessoas', PessoaController.createPerson)

router.post('/pessoas/:id/restaura', PessoaController.restauraPessoa)

router.put('/pessoas/:id', PessoaController.updatePerson)

router.post('/pessoas/:estudanteId/cancela', PessoaController.cancelPerson)

router.delete('/pessoas/:id', PessoaController.deletePerson)

router.post('/pessoas/:estudanteId/matricula', PessoaController.createMatricula)

router.put('/pessoas/:estudanteId/matricula/:matriculaId', PessoaController.updateMatricula)

router.delete('/pessoas/:estudanteId/matricula/:matriculaId', PessoaController.deleteMatricula)

module.exports = router
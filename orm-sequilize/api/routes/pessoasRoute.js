const { Router } = require('express')
const PessoaController = require('../controllers/PessoaController')
const MatriculaController = require('../controllers/MatriculaController')

const router = Router()

router.get('/pessoas', PessoaController.getAll)

router.get('/pessoas/ativas', PessoaController.getAllActives)

router.get('/pessoas/:id', PessoaController.getById)

router.get('/pessoas/:estudanteId/matricula/:matriculaId', MatriculaController.getMatriculaById)

router.get('/pessoas/:estudanteId/matricula/', PessoaController.getMatriculas)

router.get('/pessoas/matricula/:turmaId/confirmadas', MatriculaController.getMatriculasPorTurma)

router.get('/pessoas/matricula/lotada', MatriculaController.getFullTurmas)

router.post('/pessoas', PessoaController.createPerson)

router.post('/pessoas/:id/restaura', PessoaController.restauraPessoa)

router.put('/pessoas/:id', PessoaController.updatePerson)

router.post('/pessoas/:estudanteId/cancela', PessoaController.cancelPerson)

router.delete('/pessoas/:id', PessoaController.deletePerson)

router.post('/pessoas/:estudanteId/matricula', MatriculaController.createMatricula)

router.put('/pessoas/:estudanteId/matricula/:matriculaId', MatriculaController.updateMatricula)

router.delete('/pessoas/:estudanteId/matricula/:matriculaId', MatriculaController.deleteMatricula)

module.exports = router
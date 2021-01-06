const Sequelize = require('sequelize')
const { MatriculasServices } = require('../services')
const matriculasServices = new MatriculasServices()

class MatriculaController {

    static async getMatriculaById(req, res) {
        const { estudanteId, matriculaId } = req.params
        try {
            const matricula = await matriculasServices.getOneRegister({
                id: Number(matriculaId),
                estudante_id: Number(estudanteId)
             })
            return res.status(200).json(matricula)
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }

    static async createMatricula(req, res){
        const { estudanteId } = req.params
        const matriculaRequest = { ...req.body, estudante_id: Number(estudanteId) } 
        try {
            const createdMatricula = await matriculasServices.createRegister(matriculaRequest)
            return res.status(200).json(createdMatricula)
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }

    static async updateMatricula(req, res) {
        const { estudanteId, matriculaId } = req.params
        const requestMatricula = req.body
        try {
            await matriculasServices.updateRegisters(requestMatricula, { 
                id: Number(matriculaId),
                estudante_id: Number(estudanteId)
            })
            const matriculaUpdated = await database.Matriculas.findOne({ where: { id: Number(matriculaId) }})
            return res.status(200).json(matriculaUpdated)
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }

    static async deleteMatricula(req, res){
        const { matriculaId } = req.params
        try {
            await matriculasServices.deleteRegister(Number(matriculaId))
            return res.status(200).json({ mensage: `id ${matriculaId} deletado`})
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }

    static async restoreMatricula(req, res) {
        const { matriculaId } = req.params
        try {
            const matriculas = await matriculasServices.restoreRegister(matriculaId)
            return res.status(200).json({ mensagem: `id ${matriculaId} restaurado`})
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }

    static async getMatriculasPorTurma(req, res){
        const { turmaId } = req.params
        try {
            const matriculas = await matriculasServices.findAndCountRegisters({ 
                        turma_id : Number(turmaId),
                        status: 'confirmado'
                    },
                    {
                        limit:10,
                        order: [['estudante_id', 'ASC']]
                    })
            return res.status(200).json(matriculas)
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }

    static async getFullTurmas(req, res){
        const lotacaoTurma = 2
        try {
            const fullTurmas = await matriculasServices.findAndCountRegisters({ status: 'confirmado'},
            {
                attributes: ['turma_id'],
                group: ['turma_id'],
                having: Sequelize.literal(`count(turma_id) >= ${lotacaoTurma}`)
            })
            return res.status(200).json(fullTurmas.count)
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }

}

module.exports = MatriculaController
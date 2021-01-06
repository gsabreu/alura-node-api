const { TurmasServices } = require('../services')
const Sequelize = require('sequelize')
const Op = Sequelize.Op

const turmasService = new TurmasServices()
class TurmaController {
    static async getAll(req, res){
        const {data_inicial, data_final } = req.query
        const where = {}
        data_inicial || data_final ? where.data_inicial = {} : null
        data_inicial ? where.data_inicio[Op.gte] = data_inicial : null
        data_final ? where.data_inicio[Op.lte] = data_final: null
        try {
            const turmas = await turmasService.getAllRegisters(where)
            return res.status(200).json(turmas)
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }

    static async getById(req,res) {
        const { id } = req.params
        try {
            const turma = await turmasService.getOneRegister({ id })
            return res.status(200).json(turma)
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }

    static async create(req, res) {
        const turmaRequest = req.body
        try {
            const createdTurma = await turmasService.createRegister(turmaRequest)
            return res.status(200).json(createdTurma)
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }

    static async update(req, res) {
        const { id } = req.params
        const requestTurma = req.body
        try {
            await turmasService.updateRegister(requestTurma, id)
            const turmaUpdated = await turmasService.getOneRegister({ id })
            return res.status(200).json(turmaUpdated)
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }

    static async delete(req, res) {
        const { id } = req.params
        try {
            await  turmasService.deleteRegister(id)
            return res.status(200).json({ mensage: `id ${id} deletado`})
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }

    static async restoreTurma(req, res) {
        const { id } = req.params
        try {
            turmasService.restoreRegister(Number(id))
            return res.status(200).json({ mensagem: `id ${id} restaurado` })
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }

}

module.exports = TurmaController
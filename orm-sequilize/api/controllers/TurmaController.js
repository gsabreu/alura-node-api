const database = require('../models')

class TurmaController {
    static async getAll(req, res){
        try {
            const turmas = await database.Turmas.findAll()
            return res.status(200).json(turmas)
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }

    static async getById(req,res) {
        const { id } = req.params
        try {
            const turma = await database.Turmas.findOne({ where : { id: Number(id) }})
            return res.status(200).json(turma)
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }

    static async create(req, res) {
        const turmaRequest = req.body
        try {
            const createdTurma = await database.Turmas.create(turmaRequest)
            return res.status(200).json(createdTurma)
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }

    static async update(req, res) {
        const { id } = req.params
        const requestTurma = req.body
        try {
            await database.Turma.update(requestTurma, { where : { id: Number(id) }})
            const turmaUpdated = await database.Turmas.findOne({ where : { id: Number(id) }})
            return res.status(200).json(turmaUpdated)
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }

    static async delete(req, res) {
        const { id } = req.params
        try {
            await database.Turma.destroy({ where : { id: Number(id) }})
            return res.status(200).json({ mensage: `id ${id} deletado`})
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }

}

module.exports = TurmaController
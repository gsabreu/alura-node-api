const database = require('../models')

class PessoaController {
    static async getAllActives(req, res) {
        try {
            const people = await database.Pessoas.findAll()
            return res.status(200).json(people)
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }

    static async getAll(req, res) {
        try {
            const people = await database.Pessoas.scope('all').findAll()
            return res.status(200).json(people)
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }

    static async getById(req, res) {
        const { id } = req.params
        try {
            const person = await database.Pessoas.findOne({ 
                where: {
                    id: Number(id)
                 }
            })
            return res.status(200).json(person)
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }

    static async createPerson(req, res){
        const personRequest = req.body
        try {
            const createdPerson = await database.Pessoas.create(personRequest)
            return res.status(200).json(createdPerson)
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }

    static async updatePerson(req, res) {
        const { id } = req.params
        const requestPerson = req.body
        try {
            await database.Pessoas.update(requestPerson, { where: { id: Number(id) } })
            const personUpdated = await database.Pessoas.findOne({ where: { id: Number(id) }})
            return res.status(200).json(personUpdated)
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }

    static async deletePerson(req, res){
        const { id } = req.params
        try {
            await database.Pessoas.destroy({ where: { id: Number(id) } })
            return res.status(200).json({ mensage: `id ${id} deletado`})
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }

    static async restauraPessoa(req, res) {
        const { id } = req.params
        try {
            await database.Pessoas.restore({ where : { id: Number(id) }})
            return res.status(200).json({ mensagem: `id ${id} restaurado`})
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }

    static async getMatriculaById(req, res) {
        const { estudanteId, matriculaId } = req.params
        try {
            const matricula = await database.Matriculas.findOne({ 
                where: {
                    id: Number(matriculaId),
                    estudante_id: Number(estudanteId)
                 }
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
            const createdMatricula = await database.Matriculas.create(matriculaRequest)
            return res.status(200).json(createdMatricula)
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }

    static async updateMatricula(req, res) {
        const { estudanteId, matriculaId } = req.params
        const requestMatricula = req.body
        try {
            await database.Matriculas.update(requestMatricula, {
                where: { 
                    id: Number(matriculaId),
                    estudante_id: Number(estudanteId)
                } 
            })
            const matriculaUpdated = await database.Matriculas.findOne({ where: { id: Number(matriculaId) }})
            return res.status(200).json(matriculaUpdated)
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }

    static async deleteMatricula(req, res){
        const { estudanteId, matriculaId } = req.params
        try {
            await database.Matriculas.destroy({ where: { id: Number(matriculaId) } })
            return res.status(200).json({ mensage: `id ${matriculaId} deletado`})
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }
     
}

module.exports = PessoaController
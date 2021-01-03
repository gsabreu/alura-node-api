const database = require('../models')

class PessoaController {
    static async getAll(req, res) {
        try {
            const people = await database.Pessoas.findAll()
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
     
}

module.exports = PessoaController
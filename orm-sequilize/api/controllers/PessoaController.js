const database = require('../models')

class PessoaController {

    static async getAllPeople(req, res) {
        try {
            const people = await database.Pessoas.findAll()
            return res.status(200).json(people)
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }
     
}

module.exports = PessoaController
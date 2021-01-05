// const database = require('../models')
// const Sequelize = require('sequelize')
const { PessoasServices } = require('../services')
const pessoasServices = new PessoasServices()

class PessoaController {
    static async getAllActives(req, res) {
        try {
            const people = await pessoasServices.getActiveRegisters()
            return res.status(200).json(people)
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }

    static async getAll(req, res) {
        try {
            const people = await pessoasServices.getAllRegisters()
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

    static async getMatriculas(req, res){
        const { estudanteId } = req.params
        try {
            const person = await database.Pessoas.findOne({ where: {id: Number(estudanteId)} })
            const matriculas = await person.getAulasMatriculadas()
            return res.status(200).json(matriculas)
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }

    static async getMatriculasPorTurma(req, res){
        const { turmaId } = req.params
        try {
            const matriculas = await database.Matriculas
                .findAndCountAll({
                    where: { 
                        turma_id : Number(turmaId),
                        status: 'confirmado'
                    },
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
            const fullTurmas = await database.Matriculas.findAndCountAll({
                where : {
                    status: 'confirmado'
                },
                attributes: ['turma_id'],
                group: ['turma_id'],
                having: Sequelize.literal(`count(turma_id) >= ${lotacaoTurma}`)
            })
            return res.status(200).json(fullTurmas.count)
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }

    static async cancelPerson(req, res){
        const { estudanteId } = req.params
        try {
            await pessoasServices.cancelPersonAndMatricula(Number(estudanteId))
            return res.status(200).json({ message: `matriculas ref. estudante ${estudanteId} canceladas` })            
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }
     
}

module.exports = PessoaController
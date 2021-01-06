// const database = require('../models')
// const Sequelize = require('sequelize')
const pessoas = require('../models/pessoas')
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
            const person = await pessoasServices.getOneRegister(Number(id))
            return res.status(200).json(person)
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }

    static async createPerson(req, res){
        const personRequest = req.body
        try {
            const createdPerson = await pessoasServices.createRegister(personRequest)
            return res.status(200).json(createdPerson)
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }

    static async updatePerson(req, res) {
        const { id } = req.params
        const requestPerson = req.body
        try {
            await pessoasServices.updateRegister(requestPerson, id)
            const personUpdated = await pessoasServices.getOneRegister(Number(id))
            return res.status(200).json(personUpdated)
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }

    static async deletePerson(req, res){
        const { id } = req.params
        try {
            await pessoasServices.deleteRegister(Number(id))
            return res.status(200).json({ mensage: `id ${id} deletado`})
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }

    static async restauraPessoa(req, res) {
        const { id } = req.params
        try {
            await pessoasServices.restoreRegister(Number(id))
            return res.status(200).json({ mensagem: `id ${id} restaurado`})
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }

    static async getMatriculas(req, res) {  
        const { estudanteId } = req.params
        try {
          const matriculas = await pessoasServices
            .getMatriculaByStudent({ id: Number(estudanteId) })
          return res.status(200).json(matriculas)
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
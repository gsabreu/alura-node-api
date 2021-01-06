// const database = require('../models')
const NiveisServices = require('../services/NiveisServices')
const Services = require('../services/Services')
const niveisServices = new NiveisServices()
class NivelController {
    static async getAll(req, res) {
        try {
            const niveis = niveisServices.getAllRegisters()
            return res.status(200).json(niveis)
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }

    static async getById(req, res) {
        const { id } = req.params
        try {
            const nivel = await niveisServices.getOneRegister(Number(id))
            return res.status(200).json(nivel)
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }

    static async create(req, res) {
        const nivelRequest = req.body
        try {
            const nivel = await niveisServices.createRegister(nivelRequest)
            return res.status(200).json(nivel)
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }

    static async update(req, res) {
        const { id } = req.params
        const nivelRequest = req.body
        try {
            await niveisServices.update(nivelRequest, { where: { id: Number(id) }})
            const nivel = await niveisServices.getOneRegister(Number(id))
            return res.status(200).json(nivel)
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }

    static async delete(req, res) {
        const { id } = req.params
        try {
            await niveisServices.deleteRegister(Number(id))
            return res.status(200).json({ mensage: `id ${id} deletado`})
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }
}

module.exports = NivelController
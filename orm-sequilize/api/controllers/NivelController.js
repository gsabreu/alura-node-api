// const database = require('../models')
const Services = require('../services/Services')
const niveisServices = new Services('Niveis')
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
            const nivel = await database.Niveis.findOne({ where: { id: Number(id) }})
            return res.status(200).json(nivel)
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }

    static async create(req, res) {
        const nivelRequest = req.body
        try {
            const nivel = await database.Niveis.create(nivelRequest)
            return res.status(200).json(nivel)
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }

    static async update(req, res) {
        const { id } = req.params
        const nivelRequest = req.body
        try {
            await database.Niveis.update(nivelRequest, { where: { id: Number(id) }})
            const nivel = await database.Niveis.findOne({ where: { id: Number(id) }})
            return res.status(200).json(nivel)
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }

    static async delete(req, res) {
        const { id } = req.params
        try {
            await database.Niveis.destroy({ where: { id: Number(id) }})
            return res.status(200).json({ mensage: `id ${id} deletado`})
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }
}

module.exports = NivelController
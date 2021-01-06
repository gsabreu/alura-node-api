const database = require('../models')

class Service {
    constructor(modelName){
        this.modelName = modelName
    }

    async getAllRegisters( where = {}){
        return database[this.modelName].findAll({ where: { ...where} })
    }

    async getOneRegister(where = {}){
        return database[this.modelName].findOne({ where: { ...where } })
    }

    async createRegister(data){
        return database[this.modelName].create(data)
    }
    
    async updateRegister(data, id, transaction = {}){
        return database[this.modelName]
            .update(data, { where: { id: id } }, transaction)

    }

    async updateRegisters(data, where, transaction = {}){
        return database[this.modelName]
            .update(data, { where: { ...where } }, transaction)

    }

    async deleteRegister(id){
        database[this.modelName].destroy({ where: { id: id } })
    }

    async restoreRegister(id) {
        database[this.modelName].restore({ where: { id: id } })
    }

    async findDeletedRegister(id) {
        return database[this.modelName]
            .findOne({ paranoid: false, where : { id: id } })
    }

    async findAndCountRegisters(where = {}, aggregations) {
        return database[this.modelName]
            .findAndCountAll({ where: { ...where } , ...aggregations})
    }
}

module.exports = Service
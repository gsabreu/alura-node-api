const database = require('../models')

class Service {
    constructor(modelName){
        this.modelName = modelName
    }

    async getAllRegisters(){
        return database[this.modelName].findAll()
    }
    async getOneRegister(id){
        //
    }

    async createRegister(data){
        
    }
    
    async updateRegister(data, id, transaction = {}){
        return database[this.modelName]
            .upddate(data, { where: { id: id } }, transaction)

    }

    async updateRegisters(data, where, transaction = {}){
        return database[this.modelName]
            .upddate(data, { where: { ...where } }, transaction)

    }

    async deleteRegister(data){

    }
}

module.exports = Service
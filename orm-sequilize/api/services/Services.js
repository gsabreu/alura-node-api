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
    
    async updateRegister(data, id){

    }
    async deleteRegister(data){
        
    }
}

module.exports = Service
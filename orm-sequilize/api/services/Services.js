const database = require('../models')

class Service {
    constructor(modelName){
        this.modelName = modelName
    }

    async getAllRegisters(){
        return database[this.modelName].findAll()
    }
}

module.exports = Service
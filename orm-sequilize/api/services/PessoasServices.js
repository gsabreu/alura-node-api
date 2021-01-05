const Services = require('./Services')
const database = require('../models')

class PessoasServices extends Services {
    constructor(){
        super('Pessoas')
    }
    
    async getActiveRegisters(where = {}){
        return database[this.modelName].findAll({
            where : { ...where }
        })
    }

    async getAllRegisters(where = {}){
        return database[this.modelName]
            .scope('all')
            .findAll({ where: { ...where } })
    }
}

module.exports = PessoasServices
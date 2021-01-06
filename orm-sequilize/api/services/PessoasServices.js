const Services = require('./Services')
const database = require('../models')

class PessoasServices extends Services {
    constructor(){
        super('Pessoas')
        this.matriculas = new Services('Matriculas')
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

    async cancelPersonAndMatricula(estudanteId){
        database.sequelize.transaction(async transaction => {
            await super.updateRegister({ ativo: false },
                estudanteId,
                {transaction: transaction})
            
            await this.matriculas.updateRegisters( { status: 'cancelado'},
                {estudante_id: estudanteId},
                {transaction: transaction})        
        })
    }

    async getMatriculaByStudent(where = {}){
        const matriculas = await database[this.modelName]
            .findOne({ where: { ...where } })
            return matriculas.getAulasMatriculadas()
    }
}

module.exports = PessoasServices
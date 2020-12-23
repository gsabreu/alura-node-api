const connection = require('../infra/database/connection')
const moment = require('moment')
const axios = require('axios')
const repository = require('../repositories/atendimentos')

class Atendimento {

    constructor() {
        this.isValidDate = (date, createdDate) => moment(date).isSameOrAfter(createdDate)
        this.isValidClient = (tamanho) => tamanho >= 5

        this.validate = params => this.validate.filter(data => {
            const { name } = data
            const param = params[name]

            return !data.valid(param)
        })

        this.validations = [
            {
                name: 'date',
                valid : this.isValidDate,
                message: 'Date needs to be bigger than actual date'
            },
            {
                name: 'client',
                valid : this.isValidClient,
                message: 'Client needs to be bigger than 5 chars'
            }
        ]

        
        
    }

    add(atendimento){
        const createdDate = moment().format('YYYY-MM-DD HH:MM:SS')
        const date = moment(atendimento.date, 'DD/MM/YYYY').format('YYYY-MM-DD HH:MM:SS')

        const params =  {
            date: { date, createdDate },
            client: { tamanho: atendimento.client.lenght }
        }

        const errors = validations.filter(data => !data.valid)
        const hasErrors = this.validate(params)

        if(hasErrors){
            return new Promise((resolve, reject) => reject(errors))
        }
        else {
        const atendimentoDatado = {...atendimento, createdDate, date}

        return repository.add(atendimentoDatado)
            .then((results) => {
                const id = results.insertId
                return { ...atendimento, id }
            })
        }
    }

    list(){
        return repository.list()
    }

    getById(id){
        return repository.getById(id, async (error, results) => {
            if(error){
                return error
            }
            else {
                const atendimento = results[0]
                const cpf = atendimento.client
    
                const {data} = await axios.get(`http://localhost:8082/${cpf}`)
                atendimento.client = data
                return atendimento 
            }
        })
    }

    update(id, data){

        if(data.date){
            data.date = moment(data.date, 'DD/MM/YYYY').format('YYYY-MM-DD HH:MM:SS')
        }

        return repository.update(id, data)
    }

    delete(id){
        return repository.delete(id);
    }
}

module.exports = new Atendimento()
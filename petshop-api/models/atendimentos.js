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

    getById(id, res){
        const sql = `SELECT * FROM atendimentos WHERE id = ${id}`

        connection.query(sql , async (error, results) => {
            const atendimento = results[0]
            const cpf = atendimento.client

            if (error){
                res.status(400).json(error)
            } else {
                const {data} = await axios.get(`http://localhost:8082/${cpf}`)
                atendimento.client = data
                res.status(200).json(atendimento)
            }
        })
    }

    update(id, data, res){

        if(data.date){
            data.date = moment(data.date, 'DD/MM/YYYY').format('YYYY-MM-DD HH:MM:SS')
        }
        const sql = 'UPDATE atendimentos SET ? WHERE id=?'

        connection.query(sql, [data, id], (error, results) => {
            if(error){
                res.status(400).json(error)
            } else {
                res.status(200).json({...data,id})
            }
        })
    }

    delete(id, res){
        const sql = `DELETE FROM atendimentos WHERE id=?`

        connection.query(sql, id, (error, results) => {
            if (error){
                res.status(400).json(error)
            } else {
                res.status(200).json({id})
            }
        })
    }
}

module.exports = new Atendimento()
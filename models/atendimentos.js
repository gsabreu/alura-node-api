const connection = require('../infra/connection')
const moment = require('moment')

class Atendimento {
    add(atendimento, res){
        const createdDate = moment().format('YYYY-MM-DD HH:MM:SS')
        const date = moment(atendimento.date, 'DD/MM/YYYY').format('YYYY-MM-DD HH:MM:SS')

        const isValidDate = moment(date).isSameOrAfter(createdDate)
        const isValidClient = atendimento.client.length >= 5

        const validations = [
            {
                name: 'date',
                valid : isValidDate,
                message: 'Date needs to be bigger than actual date'
            },
            {
                name: 'client',
                valid : isValidClient,
                message: 'Client needs to be bigger than 5 chars'
            }
        ]

        const errors = validations.filter(data => !data.valid)
        const hasErrors = errors.length

        if(hasErrors){
            res.status(400).json(errors)
        }
        else {

        const atendimentoDatado = {...atendimento, createdDate, date}

        const sql = 'INSERT INTO atendimentos SET ?'

        connection.query(sql, atendimentoDatado, (error, results) => {
            if(error){
                res.status(400).json(error)
            }
            else {
                res.status(201).json(results)
            }
        })

        }
    }
}

module.exports = new Atendimento()
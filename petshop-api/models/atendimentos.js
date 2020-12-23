const connection = require('../infra/database/connection')
const moment = require('moment')
const axios = require('axios')
const repository = require('../repositories/atendimento')

class Atendimento {
    add(atendimento){
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

    list(res){
        const sql = 'SELECT * FROM atendimentos'

        connection.query(sql , (error, results) => {
            if (error){
                res.status(400).json(error)
            } else {
                res.status(200).json(results)
            }
        })
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
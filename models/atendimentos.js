const connection = require('../infra/connection')
const moment = require('moment')

class Atendimento {
    add(atendimento){
        const createdDate = moment().format('YYYY-MM-DD HH:MM:SS')
        const date = moment(atendimento.date, 'DD/MM/YYYY').format('YYYY-MM-DD HH:MM:SS')
        const atendimentoDatado = {...atendimento, createdDate, date}

        const sql = 'INSERT INTO atendimentos SET ?'

        connection.query(sql, atendimentoDatado, (error, results) => {
            if(error){
                console.log(error)
            }
            else {
                console.log(results);
            }
        })

    }
}

module.exports = new Atendimento()
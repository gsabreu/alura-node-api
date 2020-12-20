const connection = require('../infra/connection')

class Atendimento {
    add(atendimento){
        const sql = 'INSERT INTO atendimentos SET ?'

        connection.query(sql, atendimento, (error, results) => {
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
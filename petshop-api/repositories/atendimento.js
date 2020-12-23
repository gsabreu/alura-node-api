const query = require('../infra/database/queries')

class Atendimento {
    add(atendimento){
        const sql = 'INSERT INTO atendimentos SET ?'
        return query(sql, atendimento)
    }

}

module.exports = new Atendimento()
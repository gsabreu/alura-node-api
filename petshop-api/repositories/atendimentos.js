const query = require('../infra/database/queries')

class Atendimento {
    add(atendimento){
        const sql = 'INSERT INTO atendimentos SET ?'
        return query(sql, atendimento)
    }

    list(){
        const sql = 'SELECT * FROM atendimentos'
        return query(sql)
    }

    getById(id){
        const sql = `SELECT * FROM atendimentos WHERE id = ${id}`
        return query(sql)
    }

    update(id, data){
        const sql = 'UPDATE atendimentos SET ? WHERE id=?'
        return query(sql, [data, id])
    }

}

module.exports = new Atendimento()
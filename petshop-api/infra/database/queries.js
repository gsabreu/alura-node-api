const connection = require('./connection')

const executeQuery = (query, params = '') => {
    return new Promise((resolve, reject) => {
        connection.query(query, params, (errors, results) => {
            if(errors){
                reject(errors)
            }else {
                resolve(results)
            }
        })
    }) 
}

module.exports = executeQuery
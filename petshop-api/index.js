const customExpress = require('./config/customExpress')
const connection= require('./infra/database/connection')
const Tables = require('./infra/database/tables')

connection.connect(erro =>{
    if(erro) {
        console.log(erro);
    } else {
        console.log('database connection was success');

        Tables.init(connection)
        const app = customExpress()
        app.listen(3000, () => console.log('servidor rodando na porta 3000'))
    }
})

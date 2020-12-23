const ModelTable = require('./ModelFornecedorTable')

ModelTable
    .sync()
    .then(() => console.log('Tabela Criada com sucesso'))
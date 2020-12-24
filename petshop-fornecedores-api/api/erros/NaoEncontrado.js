class NaoEncontrado extends Error {
    constructor(){
        super('Fornecedor não foi encontrado!')
        this.name = 'NaoENcontrado'
        this.idErro = 0
    }
}

module.exports= NaoEncontrado
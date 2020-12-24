const FornecedorTable = require('../../database/ModelFornecedorTable')

class Fornecedor {

    constructor({ id, email, company, category, createdDate, updatedDate, version}){
       this.id = id
       this.email = email
       this.company = company
       this.category = category
       this.createdDate = createdDate
       this.updatedDate = updatedDate
       this.version = version 
    }

    async create(){
        const result = await FornecedorTable.create({
            company: this.company,
            email: this.email,
            category: this.category
        })

        this.id = result.id
        this.createdDate = result.createdDate
        this.updatedDate = result.updatedDate
        this.version = this.version
    }

    async getById(){
        const result = await FornecedorTable.getById(this.id)
        
        this.company = result.company
        this.email = result.email
        this.category = result.category
        this.createdDate = result.createdDate
        this.updatedDate = result.updatedDate
        this.version = result.version
    }

}

module.exports = Fornecedor
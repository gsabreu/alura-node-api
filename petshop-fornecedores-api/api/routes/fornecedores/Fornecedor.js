const TableFornecedor = require('./FornecedorTable')

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
        const result = await TableFornecedor.create({
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
        const result = await TableFornecedor.getById(this.id)
        
        this.company = result.company
        this.email = result.email
        this.category = result.category
        this.createdDate = result.createdDate
        this.updatedDate = result.updatedDate
        this.version = result.version
    }

    async update(){
        await TableFornecedor.getById(this.id)
        const datas = ['company', 'email', 'category']

        const dataToUpdate = { }

        datas.forEach(dataValue => {
            const value = this[dataValue]
            if(typeof value === 'string' && value.length > 0){
                dataToUpdate[dataValue] = value
            }
        })

        if (Object.keys(dataToUpdate).length === 0){
            throw new Error('Não foram fornecidos dados para atualizar!')
        }

        await TableFornecedor.update(this.id, dataToUpdate)
    }
}

module.exports = Fornecedor
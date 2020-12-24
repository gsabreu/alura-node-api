const Model = require('../../database/ModelFornecedorTable')

module.exports = {
    list() {
        return Model.findAll()
    },

    create(fornecedor) {
        return Model.create(fornecedor)
    },
    async getById (id) {
        const result = await Model.findOne({
            where: {
                id: id
            }
        })

        if (!result) {
            throw new Error('Fornecedor não encontrado')
        }

        return encontrado
    },
    update(id, dataToUpdate) {
        return Model.update(
            dataToUpdate,
            {
                where: { id: id }
            }
        )
    }
}
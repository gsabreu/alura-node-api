const roteador = require('express').Router({mergeParams: true})
const Produto = require('./Produto')
const Tabela = require('./TabelaProduto')


roteador.get('/', async (requisicao, resposta) => {
    const produtos = await Tabela.listar(requisicao.params.idFornecedor)
    resposta.send(
        JSON.stringify(produtos)
    )
})

roteador.post('/', async (requisicao, resposta) => {
    const idFornecedor = requisicao.params.idFornecedor
    const dados = Object.assign({}, requisicao.body, { fornecedor: idFornecedor })

    const produto = new Produto(dados)
    await produto.criar()
    resposta.status(201)
    resposta.send(produto)
})

module.exports = roteador
module.exports = app => {
    app.get('/atendimentos', (req, res) => res.send('Você está na rota de atendimento'))

    app.post('/atendimentos', (req, res) => {res.send('rota de atendimento POST')})
}
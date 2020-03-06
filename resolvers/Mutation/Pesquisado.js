const { executaSQL } = require('../../data/conexao')

module.exports = {
    async novoPesquisado(_, { dados }, ctx) {
        ctx && ctx.validarAdmin()

        const dataAtual = new Date()

        const params = [dados.nome, dados.telefone, dados.email, dataAtual]

        //adicionando ao banco
        await executaSQL('INSERT INTO PESQUISADOS (nome, telefone, email, inicioAvaliacao) VALUES (?, ?, ?, ?)', params)

        //confirmando se foi adionado                                         //a data e para garantir voltar o usuario certo
        let pesquisado = await executaSQL('select * from pesquisados where email = ? and inicioAvaliacao = ?',[dados.email, dataAtual])

        //retornando o pesquisado adicionado
        return pesquisado[0]
    },
    // async excluirPesquisado(_, { filtro }, ctx) {
    //     //Por ora nao vai ser necessario
    // },
    // async alterarPesquisado(_, { filtro, dados }, ctx) {
    //     //Por ora nao vai ser necessario
    // }
}
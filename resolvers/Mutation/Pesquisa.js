const { executaSQL } = require('../../data/conexao')
const { pesquisa: obterPesquisa} = require('../Query/Pesquisa')

module.exports = {
    async novaPesquisa(_, { dados }, ctx) {
        ctx && ctx.validarAdmin()

        let existe = await obterPesquisa(_,{ filtro: {pesquisado_id: dados.pesquisado_id}})

        if(existe) return existe

        const params = [dados.pesquisado_id, dados.chave]

        //adicionando ao banco
        await executaSQL('INSERT INTO PESQUISAS (pesquisado_id, chave) VALUES (?, ?)', params)

        //confirmando se foi adionado
        let pesquisa = await obterPesquisa(_,{ filtro: {pesquisado_id: dados.pesquisado_id}})

        //retornando o pesquisa adicionado
        return pesquisa
    },
    // async excluirPesquisa(_, { filtro }, ctx) {
    //     //Por ora nao vai ser necessario
    // },
    // async alterarPesquisa(_, { filtro, dados }, ctx) {
    //     //Por ora nao vai ser necessario
    // }
}
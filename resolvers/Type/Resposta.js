const { executaSQL } = require('../../data/conexao')
const { questionarios } = require('../../data/db')

const { formataData } = require('../../utils/funcoesAux')

module.exports = {
    id(resposta) {
        return resposta.ID
    },
    resposta(resposta) {
        return resposta.RESPOSTA
    },
    pesquisa_id(resposta) {
        return resposta.PESQUISA_ID
    },
    pergunta_id(resposta) {
        return resposta.PERGUNTA_ID
    },
}
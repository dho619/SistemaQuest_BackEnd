const { executaSQL } = require('../../data/conexao')
const {formataData} = require('../../utils/funcoesAux')

module.exports = {
    id(pesquisado) {
        return pesquisado.ID
    },
    nome(pesquisado) {
        return pesquisado.NOME
    },
    email(pesquisado) {
        return pesquisado.EMAIL
    },
    telefone(pesquisado) {
        return pesquisado.TELEFONE
    },
    inicioAvaliacao(pesquisado){
        return pesquisado.INICIOAVALIACAO
    },
    inicioAvaliacaoFormatado(pesquisado){
        return formataData(pesquisado.INICIOAVALIACAO)
    },
    async pesquisa(pesquisado){
        let pesquisa = await executaSQL(`Select pq.* from pesquisas pq inner join pesquisados p
                                         on p.id = pq.pesquisado_id where p.id = ?`, 
                                         [pesquisado.ID]
                                       )
        return pesquisa[0]
    }
}
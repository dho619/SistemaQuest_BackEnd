const { executaSQL } = require('../../data/conexao')
const { questionarios } = require('../../data/db')

const { formataData } = require('../../utils/funcoesAux')

module.exports = {
    id(pesquisa) {
        return pesquisa.ID
    },
    chave(pesquisa) {
        return pesquisa.CHAVE
    },
    pesquisado_id(pesquisa) {
        return pesquisa.PESQUISADO_ID
    },
    resultado(pesquisa) {
        return pesquisa.RESULTADO
    },
    async pesquisado(pesquisa){
        let pesquisado = await executaSQL(`Select * from pesquisados where id = ?`, 
                                         [pesquisa.PESQUISADO_ID]
                                       )
        return pesquisado[0]
    },
    async questionario(pesquisa){
        let pq_quest = await executaSQL(`SELECT s.QUESTIONARIO_ID id FROM PESQUISAS a
                                            inner join SCHEDULES s on s.CHAVE = a.CHAVE
                                            where a.id = ?`, [pesquisa.ID]
                                       )
        let id = pq_quest[0].ID
        return questionarios.filter(q => q.id === id)[0]
    },
    async respostas(pesquisa){
        let respostas = await executaSQL(`Select r.* from respostas r inner join pesquisas pq
                                         on r.pesquisa_id = pq.id where pq.id = ?`, 
                                         [pesquisa.ID]
                                       )
        return respostas
    },
}
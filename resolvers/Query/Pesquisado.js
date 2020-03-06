const { executaSQL } = require('../../data/conexao')
const {schedule: obterSchedule} = require('./Schedule')

module.exports = {
    pesquisados(parent, args, ctx){
        ctx && ctx.validarAdmin()
        return executaSQL("SELECT * from pesquisados")
    },
    async pesquisado(_, { filtro }, ctx) {
        ctx && ctx.validarAdmin()
        if (!filtro) throw new Error('Filtro necessário!')
        let { id } = filtro
        let pesquisado = []
        if(id) {
            pesquisado = await executaSQL(`SELECT * from PESQUISADOS p
            where p.id = ?`, [id])
        } else {
            throw new Error('Filtro válido necessário!')
        }

        return pesquisado[0]
    },

    async pesquisadoChave(_, { filtro }, ctx) {
        //pegando schedule
        const schedule = await obterSchedule(_,{filtro})
        //verificar se a chave buscada, pertence ao usuario que esta logado
        ctx && ctx.validarUsuarioFiltro({id: schedule.usuario_id})
        return executaSQL(`SELECT p.* from PESQUISADOS p
                            inner join PESQUISAS pq on pq.PESQUISADO_ID = p.ID
                            where pq.CHAVE = ?`, [filtro.chave])
    }
}
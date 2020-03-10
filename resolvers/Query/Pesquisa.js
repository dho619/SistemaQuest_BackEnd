const { executaSQL } = require('../../data/conexao')

module.exports = {
    pesquisas(parent, args, ctx){
        ctx && ctx.validarAdmin()
        return executaSQL("SELECT * from pesquisas")
    },
    async pesquisa(_, { filtro }, ctx) {
        if (!filtro) throw new Error('Filtro necessário!')
        let { id, pesquisado_id } = filtro
        let pesquisa = []
        if(id) {
            pesquisa = await executaSQL(`SELECT s.USUARIO_ID, p.* from PESQUISAS p
                    inner join SCHEDULES s on s.CHAVE = p.chave where p.id = ?`, [id])
        } else if(pesquisado_id){
            pesquisa = await executaSQL(`SELECT s.USUARIO_ID, p.* from PESQUISAS p
                    inner join SCHEDULES s on s.CHAVE = p.chave where p.pesquisado_id = ?`, [pesquisado_id])
        } else {
            throw new Error('Filtro válido necessário!')
        }
        //os inner join era so pra buscar o usuario que criou a chave 
        //para poder ver se e o mesmo que esta logado
        if (pesquisa.length) {
            ctx && ctx.validarUsuarioFiltro({id: pesquisa[0].USUARIO_ID})
            delete pesquisa.USUARIO_ID
        }
        return pesquisa[0]
    },

    async pesquisaChave(_, { filtro }, ctx) {
        if (!filtro) throw new Error('Filtro necessário!')
        const {chave} = filtro
        let pesquisas = []
        if(chave){
            pesquisas = await executaSQL(`SELECT s.USUARIO_ID, p.* from PESQUISAS p
            inner join SCHEDULES s on s.CHAVE = p.chave where p.chave = ?`, [chave])
        }else{
            throw new Error('Filtro válido necessário!')
        }
        //verificar se a chave buscada, pertence ao usuario que esta logado
        if (pesquisas.length) {
            ctx && ctx.validarUsuarioFiltro({id: pesquisa[0].USUARIO_ID})
            delete pesquisas.USUARIO_ID
        }
        return this.pesquisas
    }
}
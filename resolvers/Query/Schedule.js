const { executaSQL } = require('../../data/conexao')

const {usuario: obterUsuario} = require('../Query/Usuario')

module.exports = {
    schedules(parent, args, ctx){
        ctx && ctx.validarAdmin()
        return executaSQL("SELECT * from schedules")
    },
    async schedule(_, { filtro }, ctx) {
        if (!filtro) throw new Error('Filtro necessário!')
        let { id, chave } = filtro
        let schedule = []
        if(id) {
            schedule = await executaSQL("SELECT * from schedules where id = ? ", [id])
        } else if(chave){
            schedule = await executaSQL("SELECT * from schedules where chave = ? ", [chave])
        }

        //verificar se schedule buscado e realmente do usuario
        if(schedule.length){
            ctx && ctx.validarUsuarioFiltro({id: schedule[0].USUARIO_ID})
            return schedule[0]
        } else {
            return null
        }
    },
    async schedulesUsuario(_, { filtro }, ctx) {
        ctx && ctx.validarUsuarioFiltro(filtro)
        const usuario = await obterUsuario(_, {filtro})
        return executaSQL("SELECT * from schedules where usuario_id = ?", [usuario.ID])
    }
}
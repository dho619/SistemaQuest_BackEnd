const { executaSQL } = require('../../data/conexao')

module.exports = {
    perfis(parent, args, ctx){
        ctx && ctx.validarAdmin()
        return executaSQL("SELECT * from perfis")
    },
    async perfil(_, { filtro }, ctx) {
        ctx && ctx.validarAdmin()
        if (!filtro) return null
        let { id, nome } = filtro
        if(id) {
            let perfil = await executaSQL("SELECT * from perfis where id = ? ", [id])
            return perfil[0]
        } else if(nome){
            let perfil = await executaSQL("SELECT * from perfis where nome = ? ", [nome])
            return perfil[0]
        }
        return null
    }
}
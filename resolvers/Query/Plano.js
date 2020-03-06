const { planos } = require('../../data/db')

const { idUsuario } = require('../../utils/funcoesAux')

module.exports = {
    planos(parent, args, ctx){
        ctx && ctx.validarAdmin()
        return planos
    },
    plano(_, { filtro }, ctx) {
        ctx && ctx.validarUsuarioFiltro({id: filtro.usuario_id})
        let { id } = filtro
        if (!id) return null
        let plano= {}
        if(id){
            plano = planos
                    .filter(p => p.id === id)
        } else return null
        return plano[0]
    },
    planosUsuario(_, { filtro }, ctx) {
        if (!filtro) return null
        ctx && ctx.validarUsuarioFiltro(filtro)
        const id  = idUsuario(filtro)
        let PlanosUsuario= {}
        if(id > 0){
            PlanosUsuario = planos
                    .filter(p => p.usuario_id === id)
        } else return null

        return PlanosUsuario
    }
}
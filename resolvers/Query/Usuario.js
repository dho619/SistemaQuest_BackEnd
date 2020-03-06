const bcrypt = require('bcrypt-nodejs')
const { getUsuarioLogado } = require('../Public/Usuario')
const { executaSQL } = require('../../data/conexao')

const query = {
    async login(_, {dados}){
        const usuario = await query.usuario(_,{filtro: {email: dados.email}})

        //verifica se tem usuario e se tem, se ele esta ativo
        if(!usuario || !usuario.ATIVO){
            throw new Error('Usuario ou senha inválidos!')
        }
        //compara senhas
        const senhaCorreta = bcrypt.compareSync(dados.senha, usuario.SENHA)

        //se a senha esta errada
        if(!senhaCorreta){
            throw new Error('Usuario ou senha inválidos!')
        }

        return getUsuarioLogado(usuario)
    },
    usuarios(parent, args, ctx){
        ctx && ctx.validarAdmin()
        return executaSQL("SELECT * from usuarios")
    },
    async usuario(_, { filtro }, ctx) {
        ctx && ctx.validarUsuarioFiltro(filtro)
        if(!filtro) return null
        const { id, email } = filtro
        if(id) {
            let usuario = await executaSQL("SELECT * from usuarios where id = ? ", [id])
            return usuario[0]
        } else if(email){
            let usuario = await executaSQL("SELECT * from usuarios where email = ? ", [email])
            return usuario[0]
        }
        return null
    },
}

module.exports = query
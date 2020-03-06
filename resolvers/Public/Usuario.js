const jwt = require('jwt-simple')
const { perfis: obterPerfis } = require('../Type/Usuario')

module.exports = {
    async getUsuarioLogado(usuario){
        const perfis = await obterPerfis(usuario)
        const agora = Math.floor(Date.now() / 1000)
        const usuarioInfo = {
            ID: usuario.ID,
            NOME: usuario.NOME,
            EMAIL: usuario.EMAIL,
            TELEFONE: usuario.TELEFONE,
            CREATED_AT:usuario.CREATED_AT, 
            UPDATED_AT:usuario.UPDATED_AT,
            DELETED_AT:usuario.DELETED_AT,
            ATIVO:usuario.ATIVO,
            perfis: perfis.map(p => p.NOME),
            iat: agora,
            exp: agora + (3*24*60*60)//3dias em segundos
        }
        return {
            ...usuarioInfo,
            token: jwt.encode(usuarioInfo, process.env.APP_AUTH_SECRET)
        }
    }
}
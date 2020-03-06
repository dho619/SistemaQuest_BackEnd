const { getUsuarioLogado } = require('../resolvers/Public/Usuario')
const { executaSQL } = require('../data/conexao')

const Obterusuario = async(id) => {
    const usuario_perfil = await executaSQL('Select * from usuarios_perfis where perfil_id = ?',[id])
    const usuario = await executaSQL('Select * from usuarios where id = ?',[usuario_perfil[0].USUARIO_ID])
    return usuario[0]
}

module.exports = async req => {
    let usuario = await Obterusuario(1)
    const { token } = await getUsuarioLogado(usuario)
    req.headers = {
        authorization: `Bearer ${token}`
    }
}
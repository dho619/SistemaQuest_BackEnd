const { executaSQL } = require('../../data/conexao')

const { formataData } = require('../../utils/funcoesAux')

module.exports = {
    id(perfil) {
        return perfil.ID
    },
    nome(perfil) {
        return perfil.NOME
    },
    rotulo(perfil) {
        return perfil.ROTULO
    },
    ativo(perfil) {
        return perfil.ATIVO
    },
    updated_at(perfil) {
        return formataData(perfil.UPDATED_AT)
    },
    created_at(perfil) {
        return formataData(perfil.CREATED_AT)
    },
    async usuarios(perfil){
        let usuarios = await executaSQL(`Select * from usuarios u inner join usuarios_perfis up
                                         on up.usuario_id = u.id where up.PERFIL_ID = ?`, 
                                         [perfil.ID]
                                       )
        return usuarios
    }
}
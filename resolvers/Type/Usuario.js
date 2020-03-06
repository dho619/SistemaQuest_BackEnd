const { usuarios_perfis, perfis, planos } = require('../../data/db')

const { executaSQL } = require('../../data/conexao')

const { formataData } = require('../../utils/funcoesAux')

module.exports = {
    id(usuario){
        return usuario.ID
    },
    nome(usuario){
        return usuario.NOME
    },
    email(usuario){
        return usuario.EMAIL
    },
    telefone(usuario){
        return usuario.TELEFONE
    },
    ativo(usuario){
        return usuario.ATIVO
    },
    updated_at(usuario) {
        return formataData(usuario.UPDATED_AT)
    },
    created_at(usuario) {
        return formataData(usuario.CREATED_AT)
    },
    deleted_at(usuario) {
        return formataData(usuario.DELETED_AT)
    },
    async perfis(usuario){
        let perfis = await executaSQL(`Select * from perfis p inner join 
                                       usuarios_perfis up on up.PERFIL_ID = p.id where 
                                       up.usuario_id = ?`, [usuario.ID]
                                     )
        return perfis
    },
    planos(usuario){
        let ids = []
        //Pegando os ids dos planos
        for (let p of planos){
            if((p.usuario_id === usuario.id) && (p.ativo)){
                ids.push(p.id)
            }
        }

        let planosUsuario = []
        //Pegando as planos
        for (let plano of planos){
            if(ids.includes(plano.id)){
                planosUsuario.push(plano)
            }
        }
        return planosUsuario
    }
}
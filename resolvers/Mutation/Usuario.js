const bcrypt = require('bcrypt-nodejs')
const { getUsuarioLogado } = require('../Public/Usuario')

const { executaSQL } = require('../../data/conexao')
const { usuario: obterUsuario} = require('../Query/Usuario')
const { perfil: obterPerfil } = require('../Query/Perfil.js')

async function obterIDsPerfis(_, perfis){
    const idsPerfis = []
    if(perfis){
        var perfil = null
        for (filtro of perfis){
            perfil = await obterPerfil(_, {filtro})
            if(perfil){
                idsPerfis.push(perfil.ID)
            }
        }
    }
    //Se esta vazio os ids perfis, adiciona o de comum
    if(!idsPerfis.length){
        let perfil = await obterPerfil(_, {filtro: {nome: "comum"}})
        idsPerfis.push(perfil.ID)
    }
    return idsPerfis
}

const mutations = {
    registrarUsuario(_,{ dados }){
        return mutations.novoUsuario(_,{
            dados: {
                nome: dados.nome,
                telefone: dados.telefone,
                email: dados.email,
                senha: dados.senha,
            }
        })
    },
    async novoUsuario(_, { dados }, ctx){
        ctx && ctx.validarAdmin()

        //verificando se o email ja existe
        const emailExistente = await obterUsuario(_, {filtro: {email: dados.email}})
        if(emailExistente) {
            throw new Error('Esse email já está cadastrado!')
        }
        
        //pegando ids dos perfis passados
        const idsPerfis = await obterIDsPerfis(_, dados.perfis)

        //criptografia da senha
        const salt = bcrypt.genSaltSync()
        dados.senha = bcrypt.hashSync(dados.senha, salt)

        //adicionar novo usuario
        let params = [dados.email, dados.nome, dados.telefone, dados.senha]
        await executaSQL('INSERT INTO USUARIOS (EMAIL, NOME, TELEFONE, SENHA) VALUES (?, ?, ?, ?)', params)

        const novo = await obterUsuario(_, {filtro: {email: dados.email}})
        //adicionando perfis do usuario
        for (perfil_id of idsPerfis){
            let params = [ novo.ID, perfil_id]
            await executaSQL('INSERT INTO USUARIOS_PERFIS (USUARIO_ID, PERFIL_ID) VALUES (?, ?)', params)
        }

        return getUsuarioLogado(novo)
    },
    async excluirUsuario(_, { filtro }, ctx){
        ctx && ctx.validarAdmin()
        //verifica se existe o perfil
        const usuario = await obterUsuario(_,{filtro})
        if(!usuario) throw new Error('Usuario não Cadastrado!')

         //Excluir todos ligamentos do usuario
         await executaSQL('DELETE FROM USUARIOS_PERFIS WHERE USUARIO_ID = ?',[usuario.ID])

         //desativando usuario
         await executaSQL('UPDATE USUARIOS SET ATIVO = 0, DELETED_AT = ? WHERE ID = ?',[new Date(), usuario.ID])
        
        return usuario
    },
    async alterarUsuario(_, {filtro, dados}, ctx){
        ctx && ctx.validarAdmin()
        //verifica se existe o perfil
        const usuarioAtual = await obterUsuario(_,{filtro})
        if(!usuarioAtual) throw new Error('Usuario não Cadastrado!')

        if (ctx.admin && dados.perfis) {
            //Excluir todos ligamentos do usuario
             await executaSQL('DELETE FROM USUARIOS_PERFIS WHERE USUARIO_ID = ?',[usuarioAtual.ID])

            //pegando ids dos perfis passados
            const idsPerfis = await obterIDsPerfis(dados.perfis)

            //adicionando perfis do usuario
            for (perfil_id of idsPerfis){
                let params = [ usuarioAtual.ID, perfil_id]
                await executaSQL('INSERT INTO USUARIOS_PERFIS (USUARIO_ID, PERFIL_ID) VALUES (?, ?)', params)
            }
        }
        
        if(dados.senha){
            //criptografia da senha
            const salt = bcrypt.genSaltSync()
            dados.senha = bcrypt.hashSync(dados.senha, salt)
        }

        const usuario = {
            ...usuarioAtual,
            NOME: dados.nome? dados.nome: usuarioAtual.NOME,
            EMAIL: dados.email? dados.email: usuarioAtual.EMAIL,
            TELEFONE: dados.telefone? dados.telefone: usuarioAtual.TELEFONE,
            SENHA: dados.senha? dados.senha: usuarioAtual.SENHA,
            UPDATE_AT: new Date()
        }
        
        let params = [usuario.NOME, usuario.EMAIL, usuario.TELEFONE, usuario.SENHA, usuario.UPDATE_AT, usuario.ID]
        await executaSQL(`UPDATE USUARIOS SET nome = ?, email= ?, telefone= ?, 
                          senha= ?, updated_at = ? WHERE ID = ?`,params)

        return usuario
    }
}

module.exports = mutations
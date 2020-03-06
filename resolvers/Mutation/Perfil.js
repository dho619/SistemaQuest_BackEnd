const { executaSQL } = require('../../data/conexao')
const { perfil: obterPerfil} = require('../Query/Perfil')

module.exports = {
    async novoPerfil(_, { dados }, ctx) {
        ctx && ctx.validarAdmin()

        //verificando se esse perfil ja existe
        const nomeExistente = await obterPerfil(_, {filtro: {nome: dados.nome}})
        if(nomeExistente) {
            throw new Error('Esse perfil já está cadastrado!')
        }

        //adicionando ao banco
        await executaSQL('INSERT INTO PERFIS (NOME, ROTULO) VALUES (?, ?)', [dados.nome, dados.rotulo])

        //confirmando se foi adionado
        let perfil = await obterPerfil(_,{ filtro: {nome: dados.nome}})

        //retornando o perfil adicionado
        return perfil
    },
    async excluirPerfil(_, { filtro }, ctx) {
        ctx && ctx.validarAdmin()
        //verifica se existe o perfil
        const perfil = await obterPerfil(_,{filtro})
        if(!perfil) throw new Error('Perfil não Cadastrado!')

        //Excluir todos ligamentos do perfil
        await executaSQL('DELETE FROM USUARIOS_PERFIS WHERE PERFIL_ID = ?',[perfil.ID])

        //desativando perfil
        await executaSQL('UPDATE PERFIS SET ATIVO = 0, UPDATED_AT = ? WHERE ID = ?',[new Date(), perfil.ID])

        return obterPerfil(_,{filtro})
    },
    async alterarPerfil(_, { filtro, dados }, ctx) {
        ctx && ctx.validarAdmin()
        //verifica se existe o perfil
        const perfilExistente = await obterPerfil(_,{filtro})
        if(!perfilExistente) throw new Error('Perfil não Cadastrado!')

        //verificando se esse novo nome do perfil ja existe
        if(dados.nome){
            const nomeExistente = await obterPerfil(_, {filtro: {nome: dados.nome}})
            if(nomeExistente) {
                throw new Error('Esse nome já está cadastrado!')
            }
        }
        
        //Atencao com o case dos obj, a biblioteca do firebird, os retorna maiusculos
        const perfil = {
            nome: dados.nome? dados.nome: perfilExistente.NOME,
            rotulo: dados.rotulo? dados.rotulo: perfilExistente.ROTULO
        }

        //Atualizando perfil
        let params = [perfil.nome, perfil.rotulo, new Date(), perfilExistente.ID]
        await executaSQL('UPDATE PERFIS SET NOME = ?, ROTULO = ?, UPDATED_AT = ? WHERE ID = ?', params)

        return obterPerfil(_,{filtro: {id: perfilExistente.ID}})
    }
}
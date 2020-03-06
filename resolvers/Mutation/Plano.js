const { planos, quest_Planos,proximoId7, proximoId8 } = require('../../data/db')
const { plano: obterPlano } = require('../Query/Plano')
const { questionario: obterQuestionario } = require('../Query/Questionario')


module.exports = {
    novoPlano(_, { dados }, ctx) {
        ctx.validarUsuario()

        var questionarios = []

        if(dados.questionarios && dados.questionarios.length){
            questionarios = dados.questionarios
            delete dados.questionario
        }
        
        const novo = {
            id: proximoId7(),
            data_Inicio: new Date(),
            ativo: true,
            ...dados
        }

        planos.push(novo)

        //adicionando questionarios
        for(filtro of questionarios){
            let questionario = obterQuestionario(_, {filtro}, ctx)
            if(questionario){
                let novoQuest = {
                    id: proximoId8(),
                    plano_id: novo.id,
                    questionario_id: questionario.id
                }
                quest_Planos.push(novoQuest)
            }
        }
        return novo
    },
    excluirPlano(_, { filtro }, ctx) {
        const { id } = filtro

        if (!id) throw new Error('Filtro necessario!')
        
        plano = obterPlano(_, {filtro}, ctx)
        ctx.validarUsuarioFiltro({id: plano.usuario_id})
        
        let i = planos.findIndex(p => p.id === id)
        planoAlterado = {
            ...plano,
            ativo: false,
        }
        planos.splice(i, 1, planoAlterado)

        return planoAlterado
    },

    alterarPlano(_, { filtro, dados }, ctx) {
        if (!filtro) throw new Error('Filtro necessario!')
        
        plano = obterPlano(_, {filtro}, ctx)
        ctx.validarUsuarioFiltro({id: plano.usuario_id})

        const {questionarios} = dados
        if (!questionarios) throw new Error('Questionarios necessarios!')

        //eliminando ligaçoes desse plano
        for(let i in quest_Planos){
            if(quest_Planos[i].plano_id === plano.id){
                quest_Planos.splice(i, 1, {})
            }
        }

        //adicionando questionarios
        for(filtro of questionarios){
            let questionario = obterQuestionario(_, {filtro}, ctx)
            if(questionario){
                let novoQuest = {
                    id: proximoId8(),
                    plano_id: plano.id,
                    questionario_id: questionario.id
                }
                quest_Planos.push(novoQuest)
            }
        }

        return plano
    }
}
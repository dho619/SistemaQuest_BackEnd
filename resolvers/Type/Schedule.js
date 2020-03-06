const { questionarios } = require('../../data/db')
const {usuario: obterUsuario} = require('../Query/Usuario')
const { formataData } = require('../../utils/funcoesAux')

module.exports = {
    id(schedule){
        return schedule.ID
    },
    desc(schedule){
        return schedule.DESCRICAO
    },
    dataInicio(schedule){
        return schedule.DATAINICIO
    },
    dataFim(schedule){
        return schedule.DATAFIM
    },
    usuario_id(schedule){
        return schedule.USUARIO_ID
    },
    questionario_id(schedule){
        return schedule.QUESTIONARIO_ID
    },
    chave(schedule){
        return schedule.CHAVE
    },
    ativo(schedule){
        return schedule.ATIVO
    },
    created_at(schedule){
        return schedule.CREATED_AT
    },
    updated_at(schedule){
        return schedule.UPDATED_AT
    },
    questionario(schedule){
        //Pegando o questionario
        let questSchedule = questionarios.filter(q => q.id === schedule.QUESTIONARIO_ID)
        return questSchedule[0]
    },
    usuario(schedule){
        return obterUsuario([],{filtro: {id: schedule.USUARIO_ID}})
    },
    dataInicioFormatada(schedule){
        return formataData(new Date(schedule.DATAINICIO), false)//o false e para nao exibir as horas
    },
    dataFimFormatada(schedule){
        return formataData(new Date(schedule.DATAFIM), false)
    }
}
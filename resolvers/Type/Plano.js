const { quest_Planos, questionarios } = require('../../data/db')

const { formataData } = require('../../utils/funcoesAux')

module.exports = {
    questionarios(plano){
        let ids = []
        //Pegando os ids dos questionarios
        for (let qp of quest_Planos){
            if(qp.plano_id === plano.id){
                ids.push(qp.questionario_id)
            }
        }
        
        let questPlanos = []
        //Pegando os questionarios
        for (let questionario of questionarios){
            if(ids.includes(questionario.id)){
                questPlanos.push(questionario)
            }
        }
        return questPlanos
    },
    data_Inicio(plano){
        return formataData(plano.data_Inicio)
    },
    data_Fim(plano){
        //Caso nao tenha data fim, sair
        if (!plano.data_Fim) return null

        return formataData(plano.data_Fim)
    }
}
const { perguntas, usuarios, planos, quest_Planos } = require('../../data/db')

module.exports = {
    perguntas(questionario){
        let ids = []
        //Pegando os ids das perguntas
        for (let p of perguntas){
            if(p.questionario_id === questionario.id){
                ids.push(p.id)
            }
        }

        let perguntasQuest = []
        //Pegando as perguntas
        for (let pergunta of perguntas){
            if(ids.includes(pergunta.id)){
                perguntasQuest.push(pergunta)
            }
        }
        return perguntasQuest
    },
    usuarios(questionario){
        let idsPlanos = []
        //Pegando os ids dos planos
        for (let qp of quest_Planos){
            if(qp.questionario_id === questionario.id){
                idsPlanos.push(qp.plano_id)
            }
        }

        let idsUsuarios = []
        //Pegando os ids dos usuarios
        for (let p of planos){
            if(idsPlanos.includes(p.id)){
                idsUsuarios.push(p.usuario_id)
            }
        }

        let usuariosQuest = []
        //Pegando os usuarios
        for (let usuario of usuarios){
            if(idsUsuarios.includes(usuario.id)){
                usuariosQuest.push(usuario)
            }
        }
        return usuariosQuest
    }
}
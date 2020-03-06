const { opcoes } = require('../../data/db')

module.exports = {
    opcoes(pergunta){
        let ids = []
        //Pegando os ids das opcoes
        for (let op of opcoes){
            if(op.pergunta_id === pergunta.id){
                ids.push(op.id)
            }
        }
        let opcoesPerg = []
        //Pegando as opcoes
        for (let opcao of opcoes){
            if(ids.includes(opcao.id)){
                opcoesPerg.push(opcao)
            }
        }
        return opcoesPerg
    }
}
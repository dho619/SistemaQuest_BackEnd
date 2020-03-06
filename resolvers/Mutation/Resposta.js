const { executaSQL } = require('../../data/conexao')

module.exports = {
    async novaResposta(_, { dados }, ctx) {
        ctx && ctx.validarAdmin()

        let existe = await executaSQL('Select * from respostas where pesquisa_id = ? and pergunta_id = ?' ,[dados.pesquisa_id, dados.pergunta_id])

        if(existe && existe.length) throw new Error('Já existe resposta desta pergunta, para esse questionário!')

        const params = [dados.pesquisa_id, dados.pergunta_id, dados.resposta, 2]
        //adicionando ao banco
        await executaSQL('INSERT INTO RESPOSTAS (pesquisa_id, pergunta_id, resposta, valor) VALUES (?, ?, ?, ?)', params)

        //confirmando se foi adionadopesquisa_id
        let resposta = await executaSQL('Select * from respostas where pesquisa_id = ? and pergunta_id = ?' ,[dados.pesquisa_id, dados.pergunta_id])

        //retornando a resposta adicionado
        return resposta[0]
    },
    // async excluirResposta(_, { filtro }, ctx) {
    //     //Por ora nao vai ser necessario
    // },
    // async alterarResposta(_, { filtro, dados }, ctx) {
    //     //Por ora nao vai ser necessario
    // }
}
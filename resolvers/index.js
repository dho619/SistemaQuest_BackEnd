const Query = require('./Query') //pega o arquivo index dentro da pasta Query
const Mutation = require('./Mutation') //pega o arquivo index dentro da pasta Mutation
//Resolvendo as chaves estrangeiras
const Usuario = require('./Type/Usuario')
const Perfil = require('./Type/Perfil')
const Questionario = require('./Type/Questionario')
const Pergunta = require('./Type/Pergunta')
const Plano = require('./Type/Plano')
const Schedule = require('./Type/Schedule')
const Pesquisado = require('./Type/Pesquisado')
const Pesquisa = require('./Type/Pesquisa')
const Resposta = require('./Type/Resposta')

module.exports = {
    Query,
    Mutation,
    Usuario,
    Perfil,
    Questionario,
    Pergunta,
    Plano,
    Schedule,
    Pesquisado,
    Pesquisa,
    Resposta
}